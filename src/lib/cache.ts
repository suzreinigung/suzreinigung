// Cache management utilities for SUZ Reinigung website

export interface CacheConfig {
  name: string;
  version: string;
  maxAge: number; // in milliseconds
  maxEntries: number;
}

export interface CacheEntry<T = any> {
  data: T;
  timestamp: number;
  expires: number;
}

// Default cache configurations
export const CACHE_CONFIGS = {
  IMAGES: {
    name: 'suz-images',
    version: '1.0.0',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    maxEntries: 100,
  },
  API: {
    name: 'suz-api',
    version: '1.0.0',
    maxAge: 5 * 60 * 1000, // 5 minutes
    maxEntries: 50,
  },
  STATIC: {
    name: 'suz-static',
    version: '1.0.0',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    maxEntries: 200,
  },
} as const;

/**
 * Browser cache manager with TTL and size limits
 */
export class BrowserCache {
  private config: CacheConfig;
  private storageKey: string;

  constructor(config: CacheConfig) {
    this.config = config;
    this.storageKey = `${config.name}-${config.version}`;
  }

  /**
   * Store data in cache with TTL
   */
  async set<T>(key: string, data: T): Promise<void> {
    try {
      const now = Date.now();
      const entry: CacheEntry<T> = {
        data,
        timestamp: now,
        expires: now + this.config.maxAge,
      };

      const cache = await this.getCache();
      cache[key] = entry;

      // Enforce size limits
      await this.enforceMaxEntries(cache);

      localStorage.setItem(this.storageKey, JSON.stringify(cache));
    } catch (error) {
      console.warn('[Cache] Failed to set cache entry:', error);
    }
  }

  /**
   * Retrieve data from cache if not expired
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const cache = await this.getCache();
      const entry = cache[key] as CacheEntry<T>;

      if (!entry) {
        return null;
      }

      const now = Date.now();
      if (now > entry.expires) {
        // Entry expired, remove it
        delete cache[key];
        localStorage.setItem(this.storageKey, JSON.stringify(cache));
        return null;
      }

      return entry.data;
    } catch (error) {
      console.warn('[Cache] Failed to get cache entry:', error);
      return null;
    }
  }

  /**
   * Check if key exists and is not expired
   */
  async has(key: string): Promise<boolean> {
    const data = await this.get(key);
    return data !== null;
  }

  /**
   * Remove specific cache entry
   */
  async delete(key: string): Promise<void> {
    try {
      const cache = await this.getCache();
      delete cache[key];
      localStorage.setItem(this.storageKey, JSON.stringify(cache));
    } catch (error) {
      console.warn('[Cache] Failed to delete cache entry:', error);
    }
  }

  /**
   * Clear all cache entries
   */
  async clear(): Promise<void> {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.warn('[Cache] Failed to clear cache:', error);
    }
  }

  /**
   * Get cache statistics
   */
  async getStats(): Promise<{
    size: number;
    entries: number;
    oldestEntry: number | null;
    newestEntry: number | null;
  }> {
    try {
      const cache = await this.getCache();
      const entries = Object.values(cache);
      const timestamps = entries.map(entry => entry.timestamp);

      return {
        size: JSON.stringify(cache).length,
        entries: entries.length,
        oldestEntry: timestamps.length > 0 ? Math.min(...timestamps) : null,
        newestEntry: timestamps.length > 0 ? Math.max(...timestamps) : null,
      };
    } catch (error) {
      console.warn('[Cache] Failed to get cache stats:', error);
      return { size: 0, entries: 0, oldestEntry: null, newestEntry: null };
    }
  }

  /**
   * Clean expired entries
   */
  async cleanup(): Promise<number> {
    try {
      const cache = await this.getCache();
      const now = Date.now();
      let removedCount = 0;

      for (const [key, entry] of Object.entries(cache)) {
        if (now > entry.expires) {
          delete cache[key];
          removedCount++;
        }
      }

      if (removedCount > 0) {
        localStorage.setItem(this.storageKey, JSON.stringify(cache));
      }

      return removedCount;
    } catch (error) {
      console.warn('[Cache] Failed to cleanup cache:', error);
      return 0;
    }
  }

  private async getCache(): Promise<Record<string, CacheEntry>> {
    try {
      const cached = localStorage.getItem(this.storageKey);
      return cached ? JSON.parse(cached) : {};
    } catch (error) {
      console.warn('[Cache] Failed to parse cache, resetting:', error);
      return {};
    }
  }

  private async enforceMaxEntries(cache: Record<string, CacheEntry>): Promise<void> {
    const entries = Object.entries(cache);
    if (entries.length <= this.config.maxEntries) {
      return;
    }

    // Sort by timestamp (oldest first) and remove excess entries
    entries.sort(([, a], [, b]) => a.timestamp - b.timestamp);
    const toRemove = entries.length - this.config.maxEntries;

    for (let i = 0; i < toRemove; i++) {
      delete cache[entries[i][0]];
    }
  }
}

// Pre-configured cache instances
export const imageCache = new BrowserCache(CACHE_CONFIGS.IMAGES);
export const apiCache = new BrowserCache(CACHE_CONFIGS.API);
export const staticCache = new BrowserCache(CACHE_CONFIGS.STATIC);

/**
 * Cache-aware fetch wrapper
 */
export async function cachedFetch<T = any>(
  url: string,
  options: RequestInit = {},
  cacheInstance: BrowserCache = apiCache
): Promise<T> {
  const cacheKey = `${url}-${JSON.stringify(options)}`;

  // Try cache first
  const cached = await cacheInstance.get<T>(cacheKey);
  if (cached) {
    return cached;
  }

  // Fetch from network
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  
  // Cache the result
  await cacheInstance.set(cacheKey, data);
  
  return data;
}

/**
 * Preload and cache critical resources
 */
export async function preloadCriticalResources(): Promise<void> {
  const criticalImages = [
    '/assets/logos/logo.png',
    '/assets/images/services/Hotelzimmerreinigung-min.png',
    '/assets/images/services/Teppichreinigung-min.png',
    '/assets/images/services/Bodenreinigung-min.png',
    '/assets/images/services/Gemeinschaftsräume-min.png',
    '/assets/images/services/Büroreinigung-min.png',
    '/assets/images/services/Krankenhausreinigung-min.png',
  ];

  const preloadPromises = criticalImages.map(async (src) => {
    try {
      const response = await fetch(src);
      if (response.ok) {
        const blob = await response.blob();
        await imageCache.set(src, URL.createObjectURL(blob));
      }
    } catch (error) {
      console.warn(`[Cache] Failed to preload ${src}:`, error);
    }
  });

  await Promise.allSettled(preloadPromises);
}

/**
 * Initialize cache system
 */
export async function initializeCache(): Promise<void> {
  // Cleanup expired entries on startup
  await Promise.all([
    imageCache.cleanup(),
    apiCache.cleanup(),
    staticCache.cleanup(),
  ]);

  // Preload critical resources
  await preloadCriticalResources();

  console.log('[Cache] Cache system initialized');
}
