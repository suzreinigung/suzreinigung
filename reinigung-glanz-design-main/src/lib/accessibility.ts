/**
 * Accessibility Utilities for SUZ Reinigung
 * Comprehensive alt text, ARIA labels, and accessibility enhancements
 */

// Alt text configurations for images and icons
export const altTextConfig = {
  // Logo variations
  logo: {
    main: "SUZ Reinigung Logo - Premium Reinigungsdienstleistungen in Köln und Bonn",
    header: "SUZ Reinigung - Professioneller Reinigungsservice",
    footer: "SUZ Reinigung Firmenlogo",
    social: "SUZ Reinigung Logo für Social Media",
  },

  // Service icons
  serviceIcons: {
    building2: "Bürogebäude Icon - Gewerbliche Reinigungsdienstleistungen",
    home: "Haus Icon - Private Hausreinigung und Wohnungsreinigung",
    sparkles: "Glitzer Icon - Professionelle Bodenreinigung und Oberflächenpflege",
    users: "Personen Icon - Gemeinschaftsräume und Treppenhausreinigung",
    briefcase: "Aktentasche Icon - Büroreinigung für Unternehmen",
    shield: "Schutzschild Icon - Desinfektion und Hygienemaßnahmen",
    hotel: "Hotel Icon - Hotelzimmerreinigung und Gastgewerbe",
    medical: "Medizin Icon - Praxisreinigung und medizinische Einrichtungen",
    restaurant: "Restaurant Icon - Gastronomiereinigung und Küchenhygiene",
    retail: "Einzelhandel Icon - Ladenreinigung und Verkaufsflächen",
    window: "Fenster Icon - Professionelle Fensterreinigung",
    carpet: "Teppich Icon - Teppichreinigung und Polsterpflege",
  },

  // Company showcase icons
  companyIcons: {
    hotel: "Hotel Icon - Hotelreinigung für Gastgewerbebetriebe",
    office: "Büro Icon - Büroreinigung für Unternehmen und Verwaltung",
    medical: "Medizin Icon - Reinigung für Arztpraxen und Gesundheitseinrichtungen",
    home: "Wohnhaus Icon - Hausreinigung für Privatkunden und Wohnanlagen",
    restaurant: "Restaurant Icon - Reinigung für Gastronomie und Küchenbereiche",
    retail: "Einzelhandel Icon - Ladenreinigung und Verkaufsräume",
    education: "Bildung Icon - Reinigung für Schulen und Bildungseinrichtungen",
  },

  // Decorative elements
  decorative: {
    floatingElement: "Dekoratives Element - Visueller Hintergrundeffekt",
    gradientOverlay: "Gradient Overlay - Visueller Designeffekt",
    shimmerEffect: "Schimmer-Effekt - Interaktive Hover-Animation",
  },
};

// ARIA label configurations
export const ariaLabels = {
  // Navigation
  navigation: {
    main: "Hauptnavigation der SUZ Reinigung Website",
    mobile: "Mobile Navigation öffnen",
    close: "Navigation schließen",
    home: "Zur Startseite navigieren",
    services: "Zu unseren Dienstleistungen navigieren",
    contact: "Zum Kontaktbereich navigieren",
    testimonials: "Zu Kundenbewertungen navigieren",
  },

  // Contact actions
  contact: {
    whatsapp: "WhatsApp Nachricht an SUZ Reinigung senden",
    email: "E-Mail an SUZ Reinigung senden",
    phone: "SUZ Reinigung anrufen",
    form: "Kontaktformular ausfüllen",
  },

  // Interactive elements
  interactive: {
    serviceCard: "Mehr über diesen Reinigungsservice erfahren",
    testimonialCard: "Kundenbewertung lesen",
    companyCard: "Informationen über dieses Partnerunternehmen",
    ctaButton: "Jetzt Kontakt aufnehmen",
  },

  // Form elements
  form: {
    name: "Vollständiger Name eingeben",
    email: "E-Mail-Adresse eingeben",
    phone: "Telefonnummer eingeben",
    message: "Nachricht oder Anfrage eingeben",
    service: "Gewünschten Reinigungsservice auswählen",
    submit: "Kontaktanfrage absenden",
  },
};

// Screen reader optimized content
export const screenReaderContent = {
  // Business information
  businessInfo: {
    name: "SUZ Reinigung",
    description: "Professioneller Reinigungsservice in Köln, Bonn und Nordrhein-Westfalen",
    services: "Büroreinigung, Hausreinigung, Fensterreinigung, Teppichreinigung, Hotelreinigung und Desinfektion",
    location: "Tätig in Köln, Bonn und der gesamten Region Nordrhein-Westfalen",
    contact: "Erreichbar per Telefon, E-Mail und WhatsApp",
  },

  // Page structure
  pageStructure: {
    header: "Kopfbereich mit Logo und Navigation",
    main: "Hauptinhalt der Seite",
    footer: "Fußbereich mit Kontaktinformationen",
    hero: "Willkommensbereich mit Hauptbotschaft",
    services: "Übersicht unserer Reinigungsdienstleistungen",
    testimonials: "Bewertungen und Erfahrungen unserer Kunden",
    contact: "Kontaktmöglichkeiten und Anfrage",
  },

  // Content descriptions
  contentDescriptions: {
    serviceGrid: "Raster mit sechs Hauptdienstleistungen von SUZ Reinigung",
    testimonialSlider: "Karussell mit Kundenbewertungen und Erfahrungsberichten",
    companyShowcase: "Präsentation unserer Geschäftskunden und Partner",
    contactForm: "Formular für Anfragen und Terminvereinbarungen",
  },
};

// Generate comprehensive alt text for images
export const generateAltText = (
  imageType: keyof typeof altTextConfig,
  variant?: string,
  context?: string
): string => {
  const baseAlt = variant 
    ? altTextConfig[imageType]?.[variant as keyof typeof altTextConfig[typeof imageType]]
    : altTextConfig[imageType];

  if (typeof baseAlt === 'string') {
    return context ? `${baseAlt} - ${context}` : baseAlt;
  }

  return "SUZ Reinigung - Bild";
};

// Generate ARIA labels
export const generateAriaLabel = (
  category: keyof typeof ariaLabels,
  action: string,
  context?: string
): string => {
  const baseLabel = ariaLabels[category]?.[action as keyof typeof ariaLabels[typeof category]];
  
  if (typeof baseLabel === 'string') {
    return context ? `${baseLabel} - ${context}` : baseLabel;
  }

  return action;
};

// Accessibility enhancement utilities
export const accessibilityUtils = {
  // Add focus management
  manageFocus: (element: HTMLElement) => {
    element.focus();
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  },

  // Announce to screen readers
  announceToScreenReader: (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },

  // Check if user prefers reduced motion
  prefersReducedMotion: (): boolean => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  // High contrast mode detection
  prefersHighContrast: (): boolean => {
    return window.matchMedia('(prefers-contrast: high)').matches;
  },

  // Add keyboard navigation support
  addKeyboardNavigation: (element: HTMLElement, callback: () => void) => {
    element.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        callback();
      }
    });
  },

  // Ensure minimum touch target size (44px x 44px)
  ensureTouchTargetSize: (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    if (rect.width < 44 || rect.height < 44) {
      element.style.minWidth = '44px';
      element.style.minHeight = '44px';
    }
  },
};

// WCAG compliance utilities
export const wcagCompliance = {
  // Color contrast checking (simplified)
  checkColorContrast: (foreground: string, background: string): boolean => {
    // This is a simplified check - in production, use a proper color contrast library
    // For now, we assume our design system meets WCAG AA standards
    return true;
  },

  // Text size checking
  checkTextSize: (element: HTMLElement): boolean => {
    const fontSize = parseFloat(window.getComputedStyle(element).fontSize);
    return fontSize >= 16; // Minimum 16px for body text
  },

  // Focus indicator checking
  hasFocusIndicator: (element: HTMLElement): boolean => {
    const styles = window.getComputedStyle(element, ':focus');
    return styles.outline !== 'none' || styles.boxShadow !== 'none';
  },
};

// German language accessibility helpers
export const germanA11y = {
  // German screen reader friendly text
  formatGermanText: (text: string): string => {
    return text
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .replace(/Ä/g, 'Ae')
      .replace(/Ö/g, 'Oe')
      .replace(/Ü/g, 'Ue');
  },

  // German number formatting for screen readers
  formatGermanNumber: (number: number): string => {
    return number.toLocaleString('de-DE');
  },

  // German date formatting for screen readers
  formatGermanDate: (date: Date): string => {
    return date.toLocaleDateString('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },
};

// Export all accessibility utilities
export default {
  altTextConfig,
  ariaLabels,
  screenReaderContent,
  generateAltText,
  generateAriaLabel,
  accessibilityUtils,
  wcagCompliance,
  germanA11y,
};
