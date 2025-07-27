/**
 * Service Worker for S.U.Z. Reinigung Contract Generator
 * 
 * Provides offline functionality and caching for better performance
 */

const CACHE_NAME = 'suz-contract-generator-v1.0.0';
const STATIC_CACHE_NAME = 'suz-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'suz-dynamic-v1.0.0';

// Files to cache for offline functionality
const STATIC_FILES = [
    '/',
    '/index.html',
    '/css/main.css',
    '/css/components.css',
    '/css/print.css',
    '/js/app.js',
    '/js/form-handler.js',
    '/js/utils.js',
    '/js/pdf-generator.js',
    '/assets/images/logo-new.png',
    '/assets/images/logo.jpg',
    '/manifest.json',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
];

// Files that should always be fetched from network
const NETWORK_FIRST = [
    '/api/',
    '/.netlify/functions/'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching static files');
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                console.log('Service Worker: Static files cached successfully');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Service Worker: Failed to cache static files', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE_NAME && 
                            cacheName !== DYNAMIC_CACHE_NAME &&
                            cacheName !== CACHE_NAME) {
                            console.log('Service Worker: Deleting old cache', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Activated successfully');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve cached files or fetch from network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension and other non-http requests
    if (!request.url.startsWith('http')) {
        return;
    }
    
    // Network first for API calls
    if (NETWORK_FIRST.some(path => url.pathname.startsWith(path))) {
        event.respondWith(networkFirst(request));
        return;
    }
    
    // Cache first for static files
    if (STATIC_FILES.includes(url.pathname) || 
        url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/)) {
        event.respondWith(cacheFirst(request));
        return;
    }
    
    // Stale while revalidate for HTML pages
    if (request.headers.get('accept').includes('text/html')) {
        event.respondWith(staleWhileRevalidate(request));
        return;
    }
    
    // Default to network first
    event.respondWith(networkFirst(request));
});

// Cache first strategy
async function cacheFirst(request) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('Cache first failed:', error);
        return new Response('Offline - Content not available', {
            status: 503,
            statusText: 'Service Unavailable'
        });
    }
}

// Network first strategy
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('Network first fallback to cache:', error);
        const cachedResponse = await caches.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Return offline page for HTML requests
        if (request.headers.get('accept').includes('text/html')) {
            return caches.match('/');
        }
        
        return new Response('Offline - Content not available', {
            status: 503,
            statusText: 'Service Unavailable'
        });
    }
}

// Stale while revalidate strategy
async function staleWhileRevalidate(request) {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    }).catch(() => {
        // Network failed, return cached version if available
        return cachedResponse;
    });
    
    // Return cached version immediately if available, otherwise wait for network
    return cachedResponse || fetchPromise;
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
    if (event.tag === 'contract-form-sync') {
        event.waitUntil(syncFormData());
    }
});

// Sync form data when back online
async function syncFormData() {
    try {
        const cache = await caches.open(DYNAMIC_CACHE_NAME);
        const requests = await cache.keys();
        
        for (const request of requests) {
            if (request.url.includes('/api/process-form') && request.method === 'POST') {
                try {
                    await fetch(request);
                    await cache.delete(request);
                    console.log('Synced form data:', request.url);
                } catch (error) {
                    console.error('Failed to sync form data:', error);
                }
            }
        }
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

// Push notification handling (for future use)
self.addEventListener('push', (event) => {
    if (!event.data) return;
    
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: '/assets/icons/icon-192x192.png',
        badge: '/assets/icons/icon-96x96.png',
        vibrate: [200, 100, 200],
        data: data.data,
        actions: data.actions
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow(event.notification.data.url || '/')
    );
});

// Message handling from main thread
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({ version: CACHE_NAME });
    }
});

// Error handling
self.addEventListener('error', (event) => {
    console.error('Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
    console.error('Service Worker unhandled rejection:', event.reason);
});

console.log('Service Worker: Loaded successfully');
