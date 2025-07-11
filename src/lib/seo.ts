/**
 * SEO Optimization Utilities for SUZ Reinigung
 * Comprehensive SEO, meta tags, and structured data management
 */

// Enhanced SEO Configuration for German Market Leadership
export const seoConfig = {
  siteName: 'SUZ Reinigung',
  siteUrl: 'https://www.suzreinigung.de',
  defaultTitle: 'SUZ Reinigung - Premium Reinigungsdienstleistungen Deutschland',
  defaultDescription: 'SUZ Reinigung: Deutschlands führender Reinigungsservice seit 2000. Professionelle Büroreinigung, Hausreinigung & Spezialreinigung. Zuverlässig, gründlich, umweltfreundlich. Jetzt kostenlos anfragen!',
  defaultKeywords: 'Reinigungsservice Deutschland, Büroreinigung, Hausreinigung, Fensterreinigung, professionelle Reinigung, Reinigungsfirma, Gebäudereinigung, Unterhaltsreinigung, Grundreinigung, Spezialreinigung, Köln, Bonn, NRW',
  // Using the actual uber_uns.png image for Open Graph
  defaultImage: 'https://www.suzreinigung.de/assets/images/uber_uns.png',
  defaultImageAlt: 'SUZ Reinigung Team bei der Arbeit - Professionelle Reinigungsdienstleistungen seit 2000',
  defaultImageWidth: '500',
  defaultImageHeight: '400',
  twitterHandle: '@suzreinigung',
  locale: 'de_DE',
  type: 'website',
  // Enhanced German SEO targeting
  targetRegions: ['Deutschland', 'Nordrhein-Westfalen', 'Köln', 'Bonn', 'Düsseldorf'],
  businessType: 'LocalBusiness',
  industry: 'Reinigungsdienstleistungen',
};

// Enhanced Service-specific SEO data with high-impact German keywords
export const servicesSEO = {
  bueroreinigung: {
    title: 'Professionelle Büroreinigung Deutschland | SUZ Reinigung',
    description: 'Deutschlands führende Büroreinigung: Täglich, wöchentlich oder nach Bedarf. Zertifizierte Reinigungskräfte, umweltfreundliche Produkte, flexible Termine. Kostenlose Beratung!',
    keywords: 'Büroreinigung Deutschland, Unternehmensreinigung, Gewerbliche Reinigung, Bürogebäude reinigen, Arbeitsplatz Hygiene, Office Cleaning, Reinigungsfirma Büro',
    schema: {
      '@type': 'Service',
      name: 'Büroreinigung',
      description: 'Professionelle Büroreinigung für Unternehmen jeder Größe in Deutschland',
      provider: { '@id': 'https://www.suzreinigung.de/#organization' },
      serviceType: 'Büroreinigung',
      areaServed: ['Deutschland', 'Köln', 'Bonn', 'Düsseldorf', 'Nordrhein-Westfalen'],
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

// Enhanced dynamic meta tag management with comprehensive Open Graph and SEO
export const updateMetaTags = (seoData: {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: string;
  imageHeight?: string;
  url?: string;
  type?: string;
}) => {
  const title = seoData.title || seoConfig.defaultTitle;
  const description = seoData.description || seoConfig.defaultDescription;
  const keywords = seoData.keywords || seoConfig.defaultKeywords;
  const image = seoData.image || seoConfig.defaultImage;
  const imageAlt = seoData.imageAlt || seoConfig.defaultImageAlt;
  const imageWidth = seoData.imageWidth || seoConfig.defaultImageWidth;
  const imageHeight = seoData.imageHeight || seoConfig.defaultImageHeight;
  const url = seoData.url || seoConfig.siteUrl;
  const type = seoData.type || seoConfig.type;

  // Update document title
  document.title = title;

  // Core SEO meta tags
  updateMetaTag('description', description);
  updateMetaTag('keywords', keywords);
  updateMetaTag('author', seoConfig.siteName);
  updateMetaTag('language', 'de');
  updateMetaTag('geo.region', 'DE');
  updateMetaTag('geo.placename', 'Deutschland');

  // Enhanced Open Graph tags for social media sharing
  updateMetaProperty('og:title', title);
  updateMetaProperty('og:description', description);
  updateMetaProperty('og:image', image);
  updateMetaProperty('og:image:alt', imageAlt);
  updateMetaProperty('og:image:width', imageWidth);
  updateMetaProperty('og:image:height', imageHeight);
  updateMetaProperty('og:image:type', 'image/png');
  updateMetaProperty('og:url', url);
  updateMetaProperty('og:type', type);
  updateMetaProperty('og:site_name', seoConfig.siteName);
  updateMetaProperty('og:locale', seoConfig.locale);

  // Enhanced Twitter Card tags
  updateMetaName('twitter:card', 'summary_large_image');
  updateMetaName('twitter:title', title);
  updateMetaName('twitter:description', description);
  updateMetaName('twitter:image', image);
  updateMetaName('twitter:image:alt', imageAlt);
  updateMetaName('twitter:site', seoConfig.twitterHandle);
  updateMetaName('twitter:creator', seoConfig.twitterHandle);

  // Advanced SEO and crawler optimization
  updateMetaName('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  updateMetaName('googlebot', 'index, follow, max-image-preview:large');
  updateMetaName('bingbot', 'index, follow');
  updateMetaProperty('article:publisher', seoConfig.siteUrl);

  // German-specific SEO optimization
  updateMetaTag('DC.language', 'de');
  updateMetaTag('content-language', 'de');
  updateMetaProperty('business:contact_data:locality', 'Deutschland');
  updateMetaProperty('business:contact_data:region', 'Nordrhein-Westfalen');
  updateMetaProperty('business:contact_data:country_name', 'Deutschland');
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

// Generate enhanced LocalBusiness schema with Köln/Bonn data
export const generateLocalBusinessSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.suzreinigung.de/#organization',
    'name': 'SUZ Reinigung',
    'alternateName': ['SUZ Reinigungsservice', 'SUZ Cleaning Service'],
    'description': 'Deutschlands führender Reinigungsservice seit 2000. Professionelle Büroreinigung, Hausreinigung und Spezialreinigung mit höchsten Qualitätsstandards in Köln, Bonn und ganz NRW.',
    'url': 'https://www.suzreinigung.de',
    'logo': 'https://www.suzreinigung.de/assets/logos/logo.png',
    'image': 'https://www.suzreinigung.de/assets/images/uber_uns.png',
    'foundingDate': '2000',
    'slogan': 'Premium Reinigungsdienstleistungen seit 2000',
    'telephone': '+49 176 23152477',
    'email': 'info@suzreinigung.de',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Köln',
      'addressRegion': 'Nordrhein-Westfalen',
      'addressCountry': 'DE',
      'postalCode': '50667'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 50.9375,
      'longitude': 6.9603
    },
    'areaServed': [
      {
        '@type': 'City',
        'name': 'Köln',
        'sameAs': 'https://de.wikipedia.org/wiki/Köln'
      },
      {
        '@type': 'City',
        'name': 'Bonn',
        'sameAs': 'https://de.wikipedia.org/wiki/Bonn'
      },
      {
        '@type': 'State',
        'name': 'Nordrhein-Westfalen',
        'sameAs': 'https://de.wikipedia.org/wiki/Nordrhein-Westfalen'
      }
    ],
    'serviceType': [
      'Büroreinigung',
      'Hausreinigung',
      'Fensterreinigung',
      'Teppichreinigung',
      'Grundreinigung',
      'Krankenhausreinigung',
      'Hotelzimmerreinigung'
    ],
    'priceRange': '€€',
    'currenciesAccepted': 'EUR',
    'paymentAccepted': ['Cash', 'Credit Card', 'Bank Transfer'],
    'openingHours': 'Mo-Fr 08:00-18:00, Sa 09:00-16:00',
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Reinigungsdienstleistungen',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Büroreinigung',
            'description': 'Professionelle Büroreinigung für Unternehmen in Köln und Bonn'
          },
          'priceRange': '25-35€/Stunde',
          'priceCurrency': 'EUR'
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Hausreinigung',
            'description': 'Zuverlässige Hausreinigung für Privatkunden in Köln und Bonn'
          },
          'priceRange': '20-30€/Stunde',
          'priceCurrency': 'EUR'
        }
      ]
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.8',
      'reviewCount': '127',
      'bestRating': '5',
      'worstRating': '1'
    },
    'sameAs': [
      'https://www.facebook.com/suzreinigung',
      'https://www.instagram.com/suzreinigung'
    ]
  };
};

// Generate enhanced Article schema for blog posts
export const generateArticleSchema = (post: any) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `https://www.suzreinigung.de/blog/${post.slug}`,
    'headline': post.title,
    'alternativeHeadline': post.subtitle,
    'description': post.excerpt,
    'author': {
      '@type': 'Person',
      'name': post.author.name,
      'jobTitle': post.author.title,
      'description': post.author.bio,
      'knowsAbout': post.author.expertise,
      'worksFor': {
        '@type': 'Organization',
        'name': 'SUZ Reinigung',
        'url': 'https://www.suzreinigung.de'
      }
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'SUZ Reinigung',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://www.suzreinigung.de/assets/logos/logo.png',
        'width': 200,
        'height': 60
      },
      'url': 'https://www.suzreinigung.de',
      'sameAs': [
        'https://www.facebook.com/suzreinigung',
        'https://www.instagram.com/suzreinigung'
      ]
    },
    'datePublished': post.publishedAt,
    'dateModified': post.updatedAt || post.publishedAt,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://www.suzreinigung.de/blog/${post.slug}`
    },
    'image': {
      '@type': 'ImageObject',
      'url': post.featuredImage,
      'width': 1200,
      'height': 630
    },
    'articleSection': post.category.name,
    'articleBody': post.content,
    'wordCount': post.content.split(' ').length,
    'timeRequired': `PT${post.readingTime}M`,
    'keywords': post.tags.join(', '),
    'inLanguage': 'de-DE',
    'isAccessibleForFree': true,
    'about': {
      '@type': 'Thing',
      'name': post.category.name,
      'description': post.category.description
    },
    'mentions': post.tags.map((tag: string) => ({
      '@type': 'Thing',
      'name': tag
    })),
    'isPartOf': {
      '@type': 'Blog',
      'name': 'SUZ Reinigung Blog',
      'url': 'https://www.suzreinigung.de/blog',
      'description': 'Professionelle Tipps und Anleitungen für Reinigung und Hygiene'
    }
  };
};

// Generate FAQ structured data for service pages
export const generateServiceFAQStructuredData = (faqs: Array<{question: string, answer: string}>, serviceName: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `https://www.suzreinigung.de/services/${serviceName.toLowerCase()}#faq`,
    'name': `Häufige Fragen zu ${serviceName}`,
    'description': `Antworten auf die wichtigsten Fragen zu ${serviceName} von SUZ Reinigung`,
    'mainEntity': faqs.map((faq, index) => ({
      '@type': 'Question',
      '@id': `https://www.suzreinigung.de/services/${serviceName.toLowerCase()}#faq-${index + 1}`,
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
        'author': {
          '@type': 'Organization',
          'name': 'SUZ Reinigung',
          'url': 'https://www.suzreinigung.de'
        }
      }
    }))
  };
};

// Generate general FAQ structured data
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

// German SEO Keywords Research - High-Impact Terms for Market Leadership
export const germanSEOKeywords = {
  primary: [
    'Reinigungsservice Deutschland',
    'Büroreinigung',
    'Hausreinigung',
    'Fensterreinigung',
    'Reinigungsfirma',
    'professionelle Reinigung'
  ],
  secondary: [
    'Gebäudereinigung',
    'Unterhaltsreinigung',
    'Grundreinigung',
    'Spezialreinigung',
    'Treppenreinigung',
    'Glasreinigung',
    'Bodenreinigung',
    'Sanitärreinigung'
  ],
  longTail: [
    'professionelle Büroreinigung Deutschland',
    'zuverlässiger Reinigungsservice',
    'Reinigungsfirma Köln Bonn',
    'gewerbliche Reinigung NRW',
    'Hausreinigung mit Qualitätsgarantie',
    'umweltfreundliche Reinigungsdienstleistungen',
    'Reinigungsservice für Unternehmen',
    'private Hausreinigung Deutschland'
  ],
  local: [
    'Reinigung Köln',
    'Reinigung Bonn',
    'Reinigungsservice NRW',
    'Büroreinigung Köln',
    'Hausreinigung Bonn',
    'Reinigungsfirma Nordrhein-Westfalen'
  ],
  competitive: [
    'beste Reinigungsfirma Deutschland',
    'führender Reinigungsservice',
    'Reinigung Marktführer',
    'premium Reinigungsdienstleistungen',
    'Reinigungsservice Testsieger'
  ]
};

// AI-optimized content structure with enhanced German market focus
export const generateAIOptimizedContent = (serviceType?: string) => {
  const baseContent = {
    companyName: 'SUZ Reinigung',
    industry: 'Reinigungsdienstleistungen',
    location: 'Köln, Bonn, Nordrhein-Westfalen, Deutschland',
    established: '2000', // Corrected to match UberUns component
    specialization: 'Premium Reinigungsdienstleistungen',
    targetAudience: 'Privatkunden und Geschäftskunden',
    serviceAreas: ['Büroreinigung', 'Hausreinigung', 'Fensterreinigung', 'Spezialreinigung'],
    qualityPromise: 'Höchste Qualitätsstandards und Zuverlässigkeit seit über 20 Jahren',
    contactMethods: ['Telefon', 'E-Mail', 'Online-Kontaktformular'],
    workingHours: 'Montag bis Freitag, 8:00 - 18:00 Uhr',
    languages: ['Deutsch'],
    certifications: ['Versichert', 'Qualifiziertes Personal', 'Umweltfreundliche Reinigungsmittel'],
    marketPosition: 'Deutschlands führender Reinigungsservice',
    uniqueSellingPoints: [
      'Über 20 Jahre Erfahrung seit 2000',
      'Zertifizierte und geschulte Reinigungskräfte',
      'Umweltfreundliche Reinigungsprodukte',
      'Flexible Termine und individuelle Lösungen',
      'Qualitätsgarantie und Versicherungsschutz'
    ]
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
