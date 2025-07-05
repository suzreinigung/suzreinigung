/**
 * Google Tag Manager Integration for SUZ Reinigung
 * GDPR-compliant implementation with consent management
 * Integrates with existing GA4 and cookie consent system
 */

// GTM Configuration
export const GTM_CONFIG = {
  containerId: 'GTM-5GTZDMZN', // Your actual GTM container ID
  dataLayerName: 'dataLayer',
  auth: '', // Add auth parameter if using GTM environments
  preview: '', // Add preview parameter if using GTM environments
};

// Enhanced data layer events for cleaning services
export interface GTMEvent {
  event: string;
  event_category?: string;
  event_action?: string;
  event_label?: string;
  value?: number;
  service_type?: string;
  contact_method?: string;
  page_location?: string;
  user_consent?: boolean;
}

// Initialize GTM with consent management
export const initializeGTM = (): void => {
  if (typeof window === 'undefined') return;

  // Initialize dataLayer if it doesn't exist
  (window as any).dataLayer = (window as any).dataLayer || [];

  // GTM initialization function
  const gtag = (...args: any[]) => {
    (window as any).dataLayer.push(args);
  };

  // Set default consent state (denied until user consents)
  gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'functionality_storage': 'denied',
    'personalization_storage': 'denied',
    'security_storage': 'granted', // Always granted for security
    'wait_for_update': 2000, // Wait 2 seconds for consent update
  });

  // Load GTM script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONFIG.containerId}`;
  document.head.appendChild(script);

  // Initialize GTM
  gtag('js', new Date());
  gtag('config', GTM_CONFIG.containerId);

  console.log('🏷️ Google Tag Manager initialized for SUZ Reinigung');
};

// Update consent based on user choice
export const updateGTMConsent = (consentGiven: boolean): void => {
  if (typeof window === 'undefined') return;

  const gtag = (...args: any[]) => {
    (window as any).dataLayer.push(args);
  };

  if (consentGiven) {
    gtag('consent', 'update', {
      'analytics_storage': 'granted',
      'ad_storage': 'granted',
      'functionality_storage': 'granted',
      'personalization_storage': 'granted',
    });
    console.log('✅ GTM consent granted');
  } else {
    gtag('consent', 'update', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied',
      'functionality_storage': 'denied',
      'personalization_storage': 'denied',
    });
    console.log('❌ GTM consent denied');
  }
};

// Enhanced event tracking for cleaning services
export const trackGTMEvent = (eventData: GTMEvent): void => {
  if (typeof window === 'undefined') return;

  const dataLayer = (window as any).dataLayer || [];
  
  // Add timestamp and page info
  const enhancedEventData = {
    ...eventData,
    timestamp: new Date().toISOString(),
    page_location: window.location.href,
    page_title: document.title,
    user_agent: navigator.userAgent,
  };

  dataLayer.push(enhancedEventData);
  console.log('📊 GTM Event tracked:', enhancedEventData);
};

// Predefined events for cleaning services
export const GTMEvents = {
  // Service inquiry events
  serviceInquiry: (serviceType: string, contactMethod: string) => 
    trackGTMEvent({
      event: 'service_inquiry',
      event_category: 'Lead Generation',
      event_action: 'Service Inquiry',
      event_label: serviceType,
      service_type: serviceType,
      contact_method: contactMethod,
      value: 1,
    }),

  // Contact form events
  contactFormSubmit: (formType: string) =>
    trackGTMEvent({
      event: 'form_submit',
      event_category: 'Contact',
      event_action: 'Form Submit',
      event_label: formType,
      value: 1,
    }),

  // Phone call tracking
  phoneCallClick: () =>
    trackGTMEvent({
      event: 'phone_call',
      event_category: 'Contact',
      event_action: 'Phone Call Click',
      event_label: 'Header Phone',
      contact_method: 'phone',
      value: 1,
    }),

  // Email contact tracking
  emailClick: () =>
    trackGTMEvent({
      event: 'email_click',
      event_category: 'Contact',
      event_action: 'Email Click',
      event_label: 'Contact Email',
      contact_method: 'email',
      value: 1,
    }),

  // Service page views
  servicePageView: (serviceType: string) =>
    trackGTMEvent({
      event: 'service_page_view',
      event_category: 'Engagement',
      event_action: 'Service Page View',
      event_label: serviceType,
      service_type: serviceType,
    }),

  // Quote request events
  quoteRequest: (serviceType: string) =>
    trackGTMEvent({
      event: 'quote_request',
      event_category: 'Lead Generation',
      event_action: 'Quote Request',
      event_label: serviceType,
      service_type: serviceType,
      value: 5, // Higher value for quote requests
    }),

  // Testimonial interaction
  testimonialView: (businessName: string) =>
    trackGTMEvent({
      event: 'testimonial_view',
      event_category: 'Engagement',
      event_action: 'Testimonial View',
      event_label: businessName,
    }),

  // Company showcase interaction
  companyShowcaseView: (companyName: string) =>
    trackGTMEvent({
      event: 'company_showcase_view',
      event_category: 'Engagement',
      event_action: 'Company Showcase View',
      event_label: companyName,
    }),

  // Performance tracking
  coreWebVitals: (metric: string, value: number, rating: string) =>
    trackGTMEvent({
      event: 'core_web_vitals',
      event_category: 'Performance',
      event_action: metric,
      event_label: rating,
      value: Math.round(value),
    }),
};

// GTM noscript fallback for accessibility
export const getGTMNoscript = (): string => {
  return `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_CONFIG.containerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`;
};

// Integration with existing analytics
export const integrateWithExistingAnalytics = (): void => {
  // This function helps bridge GTM with existing GA4 implementation
  if (typeof window !== 'undefined' && (window as any).gtag) {
    console.log('🔗 GTM integrated with existing GA4 setup');
    
    // Send a test event to verify integration
    trackGTMEvent({
      event: 'gtm_integration_test',
      event_category: 'System',
      event_action: 'GTM Integration',
      event_label: 'Success',
    });
  }
};
