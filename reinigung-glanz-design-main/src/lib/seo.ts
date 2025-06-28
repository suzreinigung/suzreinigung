/**
 * SEO Optimization Utilities for SUZ Reinigung
 * Comprehensive SEO, meta tags, and structured data management
 */

// SEO Configuration
export const seoConfig = {
  siteName: 'SUZ Reinigung',
  siteUrl: 'https://www.suzreinigung.de',
  defaultTitle: 'SUZ Reinigung - Premium Reinigungsdienstleistungen',
  defaultDescription: 'SUZ Reinigung bietet professionelle Reinigungsdienstleistungen in höchster Qualität. Vertrauen Sie auf unsere Erfahrung für Büro-, Wohn- und Spezialreinigung.',
  defaultKeywords: 'Reinigung, Reinigungsservice, Büroreinigung, Hausreinigung, professionelle Reinigung, Deutschland, Köln, Bonn',
  defaultImage: 'https://www.suzreinigung.de/assets/suz-logo-og.png',
  twitterHandle: '@suzreinigung',
  locale: 'de_DE',
  type: 'website',
};

// Service-specific SEO data
export const servicesSEO = {
  bueroreinigung: {
    title: 'Professionelle Büroreinigung | SUZ Reinigung',
    description: 'Zuverlässige Büroreinigung für Unternehmen. Täglich, wöchentlich oder nach Bedarf. Höchste Qualitätsstandards und flexible Termine.',
    keywords: 'Büroreinigung, Unternehmensreinigung, Gewerbliche Reinigung, Bürogebäude, Arbeitsplatz Hygiene',
    schema: {
      '@type': 'Service',
      name: 'Büroreinigung',
      description: 'Professionelle Büroreinigung für Unternehmen jeder Größe',
      provider: { '@id': 'https://www.suzreinigung.de/#organization' },
      serviceType: 'Büroreinigung',
      areaServed: ['Köln', 'Bonn', 'Düsseldorf'],
    },
  },
  hausreinigung: {
    title: 'Zuverlässige Hausreinigung | SUZ Reinigung',
    description: 'Private Hausreinigung mit persönlichem Service. Regelmäßig oder einmalig. Vertrauensvolle und gründliche Reinigung Ihres Zuhauses.',
    keywords: 'Hausreinigung, Privatreinigung, Wohnungsreinigung, Haushaltshilfe, Putzfrau',
    schema: {
      '@type': 'Service',
      name: 'Hausreinigung',
      description: 'Zuverlässige Hausreinigung für Privatkunden',
      provider: { '@id': 'https://www.suzreinigung.de/#organization' },
      serviceType: 'Hausreinigung',
      areaServed: ['Köln', 'Bonn', 'Düsseldorf'],
    },
  },
  fensterreinigung: {
    title: 'Professionelle Fensterreinigung | SUZ Reinigung',
    description: 'Streifenfreie Fensterreinigung für Privat und Gewerbe. Innen und außen, auch in großen Höhen. Kristallklare Ergebnisse garantiert.',
    keywords: 'Fensterreinigung, Glasreinigung, Schaufensterreinigung, Fassadenreinigung',
    schema: {
      '@type': 'Service',
      name: 'Fensterreinigung',
      description: 'Professionelle Fensterreinigung für streifenfreie Ergebnisse',
      provider: { '@id': 'https://www.suzreinigung.de/#organization' },
      serviceType: 'Fensterreinigung',
      areaServed: ['Köln', 'Bonn', 'Düsseldorf'],
    },
  },
};

// Location-specific SEO data
export const locationsSEO = {
  koeln: {
    title: 'Reinigungsservice Köln | SUZ Reinigung',
    description: 'Professioneller Reinigungsservice in Köln und Umgebung. Büro-, Haus- und Spezialreinigung. Schnell, zuverlässig und gründlich.',
    keywords: 'Reinigung Köln, Reinigungsservice Köln, Putzservice Köln, Büroreinigung Köln',
  },
  bonn: {
    title: 'Reinigungsservice Bonn | SUZ Reinigung',
    description: 'Zuverlässiger Reinigungsservice in Bonn. Alle Arten der professionellen Reinigung für Privat und Gewerbe.',
    keywords: 'Reinigung Bonn, Reinigungsservice Bonn, Putzservice Bonn, Büroreinigung Bonn',
  },
};

// Dynamic meta tag management
export const updateMetaTags = (seoData: {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}) => {
  const title = seoData.title || seoConfig.defaultTitle;
  const description = seoData.description || seoConfig.defaultDescription;
  const keywords = seoData.keywords || seoConfig.defaultKeywords;
  const image = seoData.image || seoConfig.defaultImage;
  const url = seoData.url || seoConfig.siteUrl;
  const type = seoData.type || seoConfig.type;

  // Update document title
  document.title = title;

  // Update or create meta tags
  updateMetaTag('description', description);
  updateMetaTag('keywords', keywords);
  updateMetaTag('author', seoConfig.siteName);

  // Open Graph tags
  updateMetaProperty('og:title', title);
  updateMetaProperty('og:description', description);
  updateMetaProperty('og:image', image);
  updateMetaProperty('og:url', url);
  updateMetaProperty('og:type', type);
  updateMetaProperty('og:site_name', seoConfig.siteName);
  updateMetaProperty('og:locale', seoConfig.locale);

  // Twitter Card tags
  updateMetaName('twitter:card', 'summary_large_image');
  updateMetaName('twitter:title', title);
  updateMetaName('twitter:description', description);
  updateMetaName('twitter:image', image);
  updateMetaName('twitter:site', seoConfig.twitterHandle);

  // Additional SEO tags
  updateMetaName('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  updateMetaName('googlebot', 'index, follow');
  updateMetaProperty('article:publisher', seoConfig.siteUrl);
};

// Helper function to update meta tags
const updateMetaTag = (name: string, content: string) => {
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
};

// Helper function to update meta property tags
const updateMetaProperty = (property: string, content: string) => {
  let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.content = content;
};

// Helper function to update meta name tags
const updateMetaName = (name: string, content: string) => {
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
};

// Structured data injection
export const injectStructuredData = (data: any) => {
  const existingScript = document.querySelector('script[type="application/ld+json"][data-dynamic="true"]');
  if (existingScript) {
    existingScript.remove();
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-dynamic', 'true');
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};

// Generate breadcrumb structured data
export const generateBreadcrumbs = (path: string) => {
  const pathSegments = path.split('/').filter(Boolean);
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Startseite',
        item: seoConfig.siteUrl,
      },
    ],
  };

  pathSegments.forEach((segment, index) => {
    const position = index + 2;
    const name = segment.charAt(0).toUpperCase() + segment.slice(1);
    const item = `${seoConfig.siteUrl}/${pathSegments.slice(0, index + 1).join('/')}`;

    breadcrumbs.itemListElement.push({
      '@type': 'ListItem',
      position,
      name,
      item,
    });
  });

  return breadcrumbs;
};

// Generate FAQ structured data
export const generateFAQStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Welche Reinigungsdienstleistungen bietet SUZ Reinigung an?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SUZ Reinigung bietet umfassende Reinigungsdienstleistungen: Büroreinigung, Hausreinigung, Fensterreinigung, Teppichreinigung, Grundreinigung und Unterhaltsreinigung für Privat- und Geschäftskunden.',
        },
      },
      {
        '@type': 'Question',
        name: 'In welchen Gebieten ist SUZ Reinigung tätig?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Wir sind hauptsächlich in Köln, Bonn und der gesamten Region Nordrhein-Westfalen tätig. Für größere Projekte können wir auch deutschlandweit agieren.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wie kann ich einen Termin für eine Reinigung vereinbaren?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sie können uns telefonisch, per E-Mail oder über unser Kontaktformular erreichen. Wir erstellen Ihnen gerne ein kostenloses und unverbindliches Angebot.',
        },
      },
      {
        '@type': 'Question',
        name: 'Sind die Reinigungsmittel umweltfreundlich?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, wir verwenden ausschließlich umweltfreundliche und gesundheitsschonende Reinigungsmittel, die höchste Reinigungsstandards erfüllen.',
        },
      },
    ],
  };
};

// AI-optimized content structure
export const generateAIOptimizedContent = (serviceType?: string) => {
  const baseContent = {
    companyName: 'SUZ Reinigung',
    industry: 'Reinigungsdienstleistungen',
    location: 'Köln, Bonn, Nordrhein-Westfalen, Deutschland',
    established: '2020',
    specialization: 'Premium Reinigungsdienstleistungen',
    targetAudience: 'Privatkunden und Geschäftskunden',
    serviceAreas: ['Büroreinigung', 'Hausreinigung', 'Fensterreinigung', 'Spezialreinigung'],
    qualityPromise: 'Höchste Qualitätsstandards und Zuverlässigkeit',
    contactMethods: ['Telefon', 'E-Mail', 'Online-Kontaktformular'],
    workingHours: 'Montag bis Freitag, 8:00 - 18:00 Uhr',
    languages: ['Deutsch'],
    certifications: ['Versichert', 'Qualifiziertes Personal', 'Umweltfreundliche Reinigungsmittel'],
  };

  if (serviceType && servicesSEO[serviceType as keyof typeof servicesSEO]) {
    const serviceData = servicesSEO[serviceType as keyof typeof servicesSEO];
    return {
      ...baseContent,
      currentService: serviceData.schema,
      serviceDescription: serviceData.description,
      serviceKeywords: serviceData.keywords,
    };
  }

  return baseContent;
};

// Export all SEO utilities
export default {
  seoConfig,
  servicesSEO,
  locationsSEO,
  updateMetaTags,
  injectStructuredData,
  generateBreadcrumbs,
  generateFAQStructuredData,
  generateAIOptimizedContent,
};
