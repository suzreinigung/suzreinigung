// Core Web Vitals monitoring and optimization utilities

export interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

export interface PerformanceMetrics {
  lcp?: WebVitalsMetric; // Largest Contentful Paint
  fid?: WebVitalsMetric; // First Input Delay
  cls?: WebVitalsMetric; // Cumulative Layout Shift
  fcp?: WebVitalsMetric; // First Contentful Paint
  ttfb?: WebVitalsMetric; // Time to First Byte
}

// Core Web Vitals thresholds
export const WEB_VITALS_THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 }, // milliseconds
  FID: { good: 100, poor: 300 },   // milliseconds
  CLS: { good: 0.1, poor: 0.25 },  // score
  FCP: { good: 1800, poor: 3000 }, // milliseconds
  TTFB: { good: 800, poor: 1800 }, // milliseconds
} as const;

/**
 * Get performance rating based on thresholds
 */
function getPerformanceRating(
  metricName: keyof typeof WEB_VITALS_THRESHOLDS,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = WEB_VITALS_THRESHOLDS[metricName];
  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Monitor Core Web Vitals using the web-vitals library approach
 */
export class WebVitalsMonitor {
  private metrics: PerformanceMetrics = {};
  private observers: PerformanceObserver[] = [];

  constructor(private onMetric?: (metric: WebVitalsMetric) => void) {
    this.initializeObservers();
  }

  private initializeObservers(): void {
    // Largest Contentful Paint (LCP)
    this.observeLCP();
    
    // First Input Delay (FID)
    this.observeFID();
    
    // Cumulative Layout Shift (CLS)
    this.observeCLS();
    
    // First Contentful Paint (FCP)
    this.observeFCP();
    
    // Time to First Byte (TTFB)
    this.observeTTFB();
  }

  private observeLCP(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & { renderTime?: number; loadTime?: number };
        
        if (lastEntry) {
          const value = lastEntry.renderTime || lastEntry.loadTime || lastEntry.startTime;
          const metric: WebVitalsMetric = {
            name: 'LCP',
            value,
            rating: getPerformanceRating('LCP', value),
            delta: value - (this.metrics.lcp?.value || 0),
            id: `lcp-${Date.now()}`,
          };
          
          this.metrics.lcp = metric;
          this.onMetric?.(metric);
        }
      });

      observer.observe({ type: 'largest-contentful-paint', buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn('[Performance] LCP observer failed:', error);
    }
  }

  private observeFID(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const value = entry.processingStart - entry.startTime;
          const metric: WebVitalsMetric = {
            name: 'FID',
            value,
            rating: getPerformanceRating('FID', value),
            delta: value - (this.metrics.fid?.value || 0),
            id: `fid-${Date.now()}`,
          };
          
          this.metrics.fid = metric;
          this.onMetric?.(metric);
        });
      });

      observer.observe({ type: 'first-input', buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn('[Performance] FID observer failed:', error);
    }
  }

  private observeCLS(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      let clsValue = 0;
      let sessionValue = 0;
      let sessionEntries: PerformanceEntry[] = [];

      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            const firstSessionEntry = sessionEntries[0];
            const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

            if (sessionValue && 
                entry.startTime - lastSessionEntry.startTime < 1000 &&
                entry.startTime - firstSessionEntry.startTime < 5000) {
              sessionValue += entry.value;
              sessionEntries.push(entry);
            } else {
              sessionValue = entry.value;
              sessionEntries = [entry];
            }

            if (sessionValue > clsValue) {
              clsValue = sessionValue;
              
              const metric: WebVitalsMetric = {
                name: 'CLS',
                value: clsValue,
                rating: getPerformanceRating('CLS', clsValue),
                delta: clsValue - (this.metrics.cls?.value || 0),
                id: `cls-${Date.now()}`,
              };
              
              this.metrics.cls = metric;
              this.onMetric?.(metric);
            }
          }
        });
      });

      observer.observe({ type: 'layout-shift', buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn('[Performance] CLS observer failed:', error);
    }
  }

  private observeFCP(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            const value = entry.startTime;
            const metric: WebVitalsMetric = {
              name: 'FCP',
              value,
              rating: getPerformanceRating('FCP', value),
              delta: value - (this.metrics.fcp?.value || 0),
              id: `fcp-${Date.now()}`,
            };
            
            this.metrics.fcp = metric;
            this.onMetric?.(metric);
          }
        });
      });

      observer.observe({ type: 'paint', buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn('[Performance] FCP observer failed:', error);
    }
  }

  private observeTTFB(): void {
    try {
      // Use Navigation Timing API for TTFB
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigationEntry) {
        const value = navigationEntry.responseStart - navigationEntry.requestStart;
        const metric: WebVitalsMetric = {
          name: 'TTFB',
          value,
          rating: getPerformanceRating('TTFB', value),
          delta: value - (this.metrics.ttfb?.value || 0),
          id: `ttfb-${Date.now()}`,
        };
        
        this.metrics.ttfb = metric;
        this.onMetric?.(metric);
      }
    } catch (error) {
      console.warn('[Performance] TTFB measurement failed:', error);
    }
  }

  /**
   * Get current metrics
   */
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  /**
   * Get performance score (0-100)
   */
  getPerformanceScore(): number {
    const metrics = Object.values(this.metrics);
    if (metrics.length === 0) return 0;

    const scores = metrics.map(metric => {
      switch (metric.rating) {
        case 'good': return 100;
        case 'needs-improvement': return 75;
        case 'poor': return 50;
        default: return 0;
      }
    });

    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  }

  /**
   * Disconnect all observers
   */
  disconnect(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

/**
 * Performance optimization utilities
 */
export class PerformanceOptimizer {
  /**
   * Preload critical resources
   */
  static preloadCriticalResources(): void {
    const criticalResources = [
      { href: '/assets/logos/logo.png', as: 'image' },
    ];

    criticalResources.forEach(({ href, as }) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      document.head.appendChild(link);
    });
  }

  /**
   * Optimize images for better LCP
   */
  static optimizeImages(): void {
    const images = document.querySelectorAll('img[data-optimize]');
    
    images.forEach((img) => {
      const imageElement = img as HTMLImageElement;
      
      // Add loading optimization
      if (!imageElement.loading) {
        imageElement.loading = 'lazy';
      }
      
      // Add decode optimization
      imageElement.decoding = 'async';
      
      // Add size hints if missing
      if (!imageElement.width || !imageElement.height) {
        imageElement.style.aspectRatio = '16/9';
      }
    });
  }

  /**
   * Reduce layout shifts
   */
  static reduceLayoutShifts(): void {
    // Add size attributes to images without dimensions
    const images = document.querySelectorAll('img:not([width]):not([height])');
    images.forEach((img) => {
      const imageElement = img as HTMLImageElement;
      imageElement.style.aspectRatio = '16/9';
      imageElement.style.width = '100%';
      imageElement.style.height = 'auto';
    });

    // Reserve space for dynamic content
    const dynamicContainers = document.querySelectorAll('[data-dynamic]');
    dynamicContainers.forEach((container) => {
      const element = container as HTMLElement;
      if (!element.style.minHeight) {
        element.style.minHeight = '200px';
      }
    });
  }

  /**
   * Optimize fonts for better performance
   */
  static optimizeFonts(): void {
    // Add font-display: swap to existing font faces
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: -apple-system;
        font-display: swap;
      }
    `;
    document.head.appendChild(style);
  }
}

// Initialize performance monitoring
let webVitalsMonitor: WebVitalsMonitor | null = null;

export function initializePerformanceMonitoring(): void {
  if (webVitalsMonitor) return;

  webVitalsMonitor = new WebVitalsMonitor((metric) => {
    console.log(`[Performance] ${metric.name}:`, {
      value: Math.round(metric.value),
      rating: metric.rating,
      delta: Math.round(metric.delta),
    });

    // Send to analytics if needed
    // analytics.track('web-vital', metric);
  });

  // Apply optimizations
  PerformanceOptimizer.preloadCriticalResources();
  PerformanceOptimizer.optimizeImages();
  PerformanceOptimizer.reduceLayoutShifts();
  PerformanceOptimizer.optimizeFonts();

  console.log('[Performance] Performance monitoring initialized');
}

export function getPerformanceMetrics(): PerformanceMetrics | null {
  return webVitalsMonitor?.getMetrics() || null;
}

export function getPerformanceScore(): number {
  return webVitalsMonitor?.getPerformanceScore() || 0;
}
