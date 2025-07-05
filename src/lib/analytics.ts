/**
 * Analytics Integration for SUZ Reinigung
 * Supports Vercel Analytics, Speed Insights, and Google Analytics 4
 */

import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { track } from '@vercel/analytics';

// Environment variables
const GA_MEASUREMENT_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
const VERCEL_ANALYTICS_ID = import.meta.env.VITE_VERCEL_ANALYTICS_ID;
const APP_URL = import.meta.env.VITE_APP_URL || 'https://suz-reinigung.vercel.app';

// Analytics configuration
export const analyticsConfig = {
  ga4: {
    measurementId: GA_MEASUREMENT_ID,
    enabled: !!GA_MEASUREMENT_ID,
  },
  vercel: {
    enabled: true,
    debug: import.meta.env.DEV,
  },
  speedInsights: {
    enabled: true,
    debug: import.meta.env.DEV,
  },
};

// Initialize analytics
export const initializeAnalytics = () => {
  try {
    // Initialize Vercel Analytics
    if (analyticsConfig.vercel.enabled) {
      inject({
        debug: analyticsConfig.vercel.debug,
      });
      console.log('✅ Vercel Analytics initialized');
    }

    // Initialize Vercel Speed Insights
    if (analyticsConfig.speedInsights.enabled) {
      injectSpeedInsights({
        debug: analyticsConfig.speedInsights.debug,
      });
      console.log('✅ Vercel Speed Insights initialized');
    }

    // Initialize Google Analytics 4
    if (analyticsConfig.ga4.enabled) {
      initializeGA4();
      console.log('✅ Google Analytics 4 initialized');
    }
  } catch (error) {
    console.error('❌ Analytics initialization failed:', error);
  }
};

// Google Analytics 4 initialization
const initializeGA4 = () => {
  if (!analyticsConfig.ga4.measurementId) return;

  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.ga4.measurementId}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  
  gtag('js', new Date());
  gtag('config', analyticsConfig.ga4.measurementId, {
    page_title: 'SUZ Reinigung - Premium Reinigungsdienstleistungen',
    page_location: APP_URL,
    custom_map: {
      custom_parameter_1: 'cleaning_service_type',
      custom_parameter_2: 'service_location',
    },
  });

  // Make gtag globally available
  (window as any).gtag = gtag;
};

// Event tracking functions
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  try {
    // Track with Vercel Analytics
    if (analyticsConfig.vercel.enabled) {
      track(eventName, parameters);
    }

    // Track with Google Analytics 4
    if (analyticsConfig.ga4.enabled && (window as any).gtag) {
      (window as any).gtag('event', eventName, {
        event_category: 'engagement',
        event_label: parameters?.label || '',
        value: parameters?.value || 0,
        ...parameters,
      });
    }
  } catch (error) {
    console.error('❌ Event tracking failed:', error);
  }
};

// Page view tracking
export const trackPageView = (path: string, title?: string) => {
  try {
    // Track with Google Analytics 4
    if (analyticsConfig.ga4.enabled && (window as any).gtag) {
      (window as any).gtag('config', analyticsConfig.ga4.measurementId, {
        page_path: path,
        page_title: title || document.title,
        page_location: `${APP_URL}${path}`,
      });
    }
  } catch (error) {
    console.error('❌ Page view tracking failed:', error);
  }
};

// Business-specific event tracking
export const trackBusinessEvents = {
  // Service inquiries
  serviceInquiry: (serviceType: string) => {
    trackEvent('service_inquiry', {
      service_type: serviceType,
      event_category: 'lead_generation',
      event_label: `Service: ${serviceType}`,
    });
  },

  // Contact form submissions
  contactFormSubmit: (formType: string) => {
    trackEvent('contact_form_submit', {
      form_type: formType,
      event_category: 'lead_generation',
      event_label: `Form: ${formType}`,
    });
  },

  // Phone number clicks
  phoneClick: () => {
    trackEvent('phone_click', {
      event_category: 'contact',
      event_label: 'Phone number clicked',
    });
  },

  // Email clicks
  emailClick: () => {
    trackEvent('email_click', {
      event_category: 'contact',
      event_label: 'Email address clicked',
    });
  },

  // Service page views
  servicePageView: (serviceType: string) => {
    trackEvent('service_page_view', {
      service_type: serviceType,
      event_category: 'engagement',
      event_label: `Service page: ${serviceType}`,
    });
  },

  // Testimonial interactions
  testimonialView: (companyName: string) => {
    trackEvent('testimonial_view', {
      company_name: companyName,
      event_category: 'engagement',
      event_label: `Testimonial: ${companyName}`,
    });
  },

  // Performance metrics
  performanceMetric: (metricName: string, value: number) => {
    trackEvent('performance_metric', {
      metric_name: metricName,
      metric_value: value,
      event_category: 'performance',
      event_label: `${metricName}: ${value}`,
    });
  },
};

// GDPR compliance functions
export const analyticsConsent = {
  // Grant consent
  grant: () => {
    if (analyticsConfig.ga4.enabled && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
      });
    }
    localStorage.setItem('analytics_consent', 'granted');
  },

  // Deny consent
  deny: () => {
    if (analyticsConfig.ga4.enabled && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
      });
    }
    localStorage.setItem('analytics_consent', 'denied');
  },

  // Check consent status
  hasConsent: (): boolean => {
    return localStorage.getItem('analytics_consent') === 'granted';
  },
};

// Performance monitoring
export const performanceMonitoring = {
  // Monitor Core Web Vitals
  monitorCoreWebVitals: () => {
    if ('web-vital' in window) {
      // This will be handled by Vercel Speed Insights automatically
      return;
    }

    // Fallback performance monitoring
    if ('performance' in window) {
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          const metrics = {
            loadTime: navigation.loadEventEnd - navigation.loadEventStart,
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            firstPaint: 0,
            firstContentfulPaint: 0,
          };

          // Get paint metrics
          const paintEntries = performance.getEntriesByType('paint');
          paintEntries.forEach((entry) => {
            if (entry.name === 'first-paint') {
              metrics.firstPaint = entry.startTime;
            } else if (entry.name === 'first-contentful-paint') {
              metrics.firstContentfulPaint = entry.startTime;
            }
          });

          // Track performance metrics
          Object.entries(metrics).forEach(([key, value]) => {
            if (value > 0) {
              trackBusinessEvents.performanceMetric(key, Math.round(value));
            }
          });
        }
      });
    }
  },

  // Monitor animation performance
  monitorAnimationPerformance: () => {
    let frameCount = 0;
    let lastTime = performance.now();

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        if (fps < 55) { // Below 55 FPS threshold
          trackBusinessEvents.performanceMetric('low_fps_detected', fps);
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);
  },
};

// Export types for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default {
  initializeAnalytics,
  trackEvent,
  trackPageView,
  trackBusinessEvents,
  analyticsConsent,
  performanceMonitoring,
  analyticsConfig,
};
