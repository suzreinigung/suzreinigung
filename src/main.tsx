import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializeCache } from './lib/cache'
import { initializePerformanceMonitoring } from './lib/performance'

// Force CSS reload in development
if (import.meta.env.DEV) {
  console.log('🎨 Apple-inspired design system loaded - v3.0');
}

// Register service worker for caching
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);

        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available, prompt user to refresh
                if (confirm('Neue Version verfügbar. Seite neu laden?')) {
                  newWorker.postMessage({ type: 'SKIP_WAITING' });
                  window.location.reload();
                }
              }
            });
          }
        });
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Initialize cache system
initializeCache().catch(console.error);

// Initialize performance monitoring
initializePerformanceMonitoring();

// Add force-apple-design class to body
document.body.classList.add('force-apple-design');

createRoot(document.getElementById("root")!).render(<App />);
