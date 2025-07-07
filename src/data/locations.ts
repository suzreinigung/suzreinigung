import { ServiceArea, LocalService, LocalTestimonial, COLOGNE_DISTRICTS, BONN_DISTRICTS } from '@/types/location';

// Service Areas Data
export const serviceAreas: Record<string, ServiceArea> = {
  'koeln-innenstadt': {
    id: 'koeln-innenstadt',
    name: 'Köln Innenstadt',
    slug: 'koeln-innenstadt',
    city: 'Köln',
    state: 'Nordrhein-Westfalen',
    postalCodes: ['50667', '50668', '50670', '50672', '50674', '50676', '50678', '50679'],
    coordinates: { lat: 50.9375, lng: 6.9603 },
    description: 'Premium Reinigungsservice im Herzen von Köln. Perfekt für Büros, Geschäfte und Praxen in der belebten Innenstadt.',
    landmarks: ['Kölner Dom', 'Hauptbahnhof', 'Schildergasse', 'Heumarkt', 'Neumarkt', 'Rudolfplatz'],
    serviceRadius: 15,
    coverageLevel: 'primary',
    demographics: {
      population: 118000,
      businessCount: 8500,
      averageIncome: '55000€',
      primaryIndustries: ['Einzelhandel', 'Bürodienstleistungen', 'Gastronomie', 'Medien', 'Beratung']
    },
    seo: {
      title: 'Reinigungsservice Köln Innenstadt | Büro- & Geschäftsreinigung',
      description: 'Professionelle Reinigung in Köln Innenstadt ✓ Büroreinigung ✓ Geschäftsreinigung ✓ 24h Service ✓ Kostenlose Beratung ☎ 0176 23152477',
      keywords: ['Reinigungsservice Köln Innenstadt', 'Büroreinigung Köln Zentrum', 'Geschäftsreinigung Innenstadt', 'Reinigungsfirma Köln Innenstadt'],
      h1: 'Reinigungsservice Köln Innenstadt - Ihr Partner für saubere Geschäfte',
      localKeywords: ['Dom Umgebung', 'Schildergasse', 'Hohe Straße', 'Neumarkt', 'Heumarkt', 'Rudolfplatz'],
      competitorAnalysis: {
        mainCompetitors: ['Perfekt Reinigung', 'Sauber & Co', 'Blitz Clean'],
        opportunityKeywords: ['Express Reinigung Köln', '24h Reinigungsservice', 'Notfallreinigung Innenstadt']
      },
      schema: {
        areaServed: 'Köln Innenstadt, Nordrhein-Westfalen',
        geo: { latitude: 50.9375, longitude: 6.9603 },
        address: {
          streetAddress: 'Musterstraße 123',
          addressLocality: 'Köln',
          addressRegion: 'NRW',
          postalCode: '50667',
          addressCountry: 'DE'
        }
      }
    }
  },

  'koeln-lindenthal': {
    id: 'koeln-lindenthal',
    name: 'Köln Lindenthal',
    slug: 'koeln-lindenthal',
    city: 'Köln',
    state: 'Nordrhein-Westfalen',
    postalCodes: ['50931', '50933', '50935', '50937', '50939'],
    coordinates: { lat: 50.9280, lng: 6.9160 },
    description: 'Exklusive Hausreinigung und Büropflege in Kölns grünstem Stadtteil. Ideal für Familien und kleinere Unternehmen.',
    landmarks: ['Universität zu Köln', 'Stadtwald', 'Dürener Straße', 'Aachener Straße', 'Melaten-Friedhof'],
    serviceRadius: 12,
    coverageLevel: 'primary',
    demographics: {
      population: 142000,
      businessCount: 2800,
      averageIncome: '68000€',
      primaryIndustries: ['Bildung', 'Forschung', 'Medizin', 'Beratung', 'IT-Services']
    },
    seo: {
      title: 'Hausreinigung Köln Lindenthal | Professionelle Reinigungskraft',
      description: 'Hausreinigung in Köln Lindenthal ✓ Zuverlässig ✓ Uni-Nähe ✓ Flexible Termine ✓ Familien & Senioren ☎ 0176 23152477',
      keywords: ['Hausreinigung Köln Lindenthal', 'Putzfrau Lindenthal', 'Reinigungskraft Uni Köln', 'Haushaltsservice Lindenthal'],
      h1: 'Hausreinigung Köln Lindenthal - Entspannt leben in Kölns grünstem Viertel',
      localKeywords: ['Dürener Straße', 'Aachener Straße', 'Uni Köln', 'Stadtwald', 'Melaten'],
      schema: {
        areaServed: 'Köln Lindenthal, Nordrhein-Westfalen',
        geo: { latitude: 50.9280, longitude: 6.9160 },
        address: {
          streetAddress: 'Dürener Straße 456',
          addressLocality: 'Köln',
          addressRegion: 'NRW',
          postalCode: '50931',
          addressCountry: 'DE'
        }
      }
    }
  },

  'bonn-zentrum': {
    id: 'bonn-zentrum',
    name: 'Bonn Zentrum',
    slug: 'bonn-zentrum',
    city: 'Bonn',
    state: 'Nordrhein-Westfalen',
    postalCodes: ['53111', '53113', '53115', '53117', '53119'],
    coordinates: { lat: 50.7374, lng: 7.0982 },
    description: 'Erstklassiger Reinigungsservice in der ehemaligen Hauptstadt. Spezialisiert auf Regierungsgebäude, Büros und gehobene Wohnanlagen.',
    landmarks: ['Bundeshaus', 'Universität Bonn', 'Münster', 'Marktplatz', 'Poppelsdorf', 'Bad Godesberg'],
    serviceRadius: 15,
    coverageLevel: 'primary',
    demographics: {
      population: 160000,
      businessCount: 4200,
      averageIncome: '72000€',
      primaryIndustries: ['Öffentlicher Dienst', 'Bildung', 'IT', 'Beratung', 'International Orgs']
    },
    seo: {
      title: 'Büroreinigung Bonn | Reinigungsservice für Behörden & Unternehmen',
      description: 'Büroreinigung in Bonn ✓ Behörden-erfahren ✓ Sicherheitsüberprüft ✓ Regierung & Wirtschaft ✓ Premium Service ☎ 0176 23152477',
      keywords: ['Büroreinigung Bonn', 'Reinigungsservice Bonn Zentrum', 'Behördenreinigung', 'Büropflege Bonn'],
      h1: 'Büroreinigung Bonn - Professionell wie die Hauptstadt',
      localKeywords: ['Bundesviertel', 'Regierungsviertel', 'Uni Bonn', 'Poppelsdorf', 'Bad Godesberg'],
      schema: {
        areaServed: 'Bonn Zentrum, Nordrhein-Westfalen',
        geo: { latitude: 50.7374, longitude: 7.0982 },
        address: {
          streetAddress: 'Bonngasse 789',
          addressLocality: 'Bonn',
          addressRegion: 'NRW',
          postalCode: '53111',
          addressCountry: 'DE'
        }
      }
    }
  },

  'koeln-ehrenfeld': {
    id: 'koeln-ehrenfeld',
    name: 'Köln Ehrenfeld',
    slug: 'koeln-ehrenfeld',
    city: 'Köln',
    state: 'Nordrhein-Westfalen',
    postalCodes: ['50823', '50825', '50827', '50829'],
    coordinates: { lat: 50.9530, lng: 6.9121 },
    description: 'Trendiger Stadtteil mit kreativen Unternehmen und jungen Familien. Flexibler Reinigungsservice für Start-ups und WGs.',
    landmarks: ['Ehrenstraße', 'Bahnhof Ehrenfeld', 'Venloer Straße', 'Neptunplatz', 'Subbelrather Straße'],
    serviceRadius: 10,
    coverageLevel: 'secondary',
    demographics: {
      population: 106000,
      businessCount: 1900,
      averageIncome: '48000€',
      primaryIndustries: ['Kreativwirtschaft', 'Start-ups', 'Gastronomie', 'Einzelhandel', 'Medien']
    },
    seo: {
      title: 'Reinigungsservice Köln Ehrenfeld | WG & Start-up Reinigung',
      description: 'Reinigung in Köln Ehrenfeld ✓ WG-Reinigung ✓ Start-up Büros ✓ Flexible Termine ✓ Jung & kreativ ☎ 0176 23152477',
      keywords: ['Reinigungsservice Ehrenfeld', 'WG Reinigung Köln', 'Start-up Büroreinigung', 'Hausreinigung Ehrenfeld'],
      h1: 'Reinigungsservice Köln Ehrenfeld - Kreativ sauber',
      localKeywords: ['Ehrenstraße', 'Venloer Straße', 'Neptunplatz', 'Bahnhof Ehrenfeld'],
      schema: {
        areaServed: 'Köln Ehrenfeld, Nordrhein-Westfalen',
        geo: { latitude: 50.9530, longitude: 6.9121 },
        address: {
          streetAddress: 'Ehrenstraße 321',
          addressLocality: 'Köln',
          addressRegion: 'NRW',
          postalCode: '50823',
          addressCountry: 'DE'
        }
      }
    }
  }
};

// Local Services Configuration
export const localServices: Record<string, Record<string, LocalService>> = {
  'koeln-innenstadt': {
    'bueroreinigung': {
      serviceType: 'Büroreinigung',
      localDemand: 'high',
      averagePrice: '25-35€/Stunde',
      competitionLevel: 'high',
      seasonality: {
        peak: ['Januar', 'September', 'Oktober'],
        low: ['Juli', 'August', 'Dezember']
      },
      targetCustomers: ['Bürogebäude', 'Einzelhandel', 'Banken', 'Anwaltskanzleien', 'Werbeagenturen']
    },
    'fensterreinigung': {
      serviceType: 'Fensterreinigung',
      localDemand: 'high',
      averagePrice: '3-5€/Fenster',
      competitionLevel: 'medium',
      seasonality: {
        peak: ['März', 'April', 'Oktober', 'November'],
        low: ['Dezember', 'Januar', 'Februar']
      },
      targetCustomers: ['Bürogebäude', 'Geschäfte', 'Restaurants', 'Hotels']
    }
  },
  'koeln-lindenthal': {
    'hausreinigung': {
      serviceType: 'Hausreinigung',
      localDemand: 'high',
      averagePrice: '20-28€/Stunde',
      competitionLevel: 'medium',
      seasonality: {
        peak: ['März', 'April', 'September', 'Oktober'],
        low: ['Juli', 'August']
      },
      targetCustomers: ['Familien', 'Senioren', 'Studenten', 'Berufstätige']
    }
  },
  'bonn-zentrum': {
    'bueroreinigung': {
      serviceType: 'Büroreinigung',
      localDemand: 'high',
      averagePrice: '28-38€/Stunde',
      competitionLevel: 'medium',
      seasonality: {
        peak: ['Januar', 'September', 'Oktober'],
        low: ['Juli', 'August']
      },
      targetCustomers: ['Behörden', 'Bundesministerien', 'Beratungsunternehmen', 'UN-Organisationen']
    }
  }
};

// Local Testimonials
export const localTestimonials: LocalTestimonial[] = [
  {
    id: 'koeln-innenstadt-1',
    customerName: 'Dr. Andreas Weber',
    businessName: 'Rechtsanwaltskanzlei Weber & Partner',
    location: 'Köln Innenstadt',
    service: 'Büroreinigung',
    rating: 5,
    content: 'Seit 3 Jahren reinigt SUZ unsere Kanzlei in der Nähe des Doms. Absolut zuverlässig und diskret - genau was wir als Anwaltskanzlei brauchen.',
    verified: true,
    date: '2024-01-10'
  },
  {
    id: 'koeln-lindenthal-1',
    customerName: 'Familie Müller',
    businessName: '',
    location: 'Köln Lindenthal',
    service: 'Hausreinigung',
    rating: 5,
    content: 'Perfekt für unser Leben in Lindenthal! Das Team kommt regelmäßig und wir haben endlich Zeit für die Familie und den Stadtwald.',
    verified: true,
    date: '2024-02-15'
  },
  {
    id: 'bonn-zentrum-1',
    customerName: 'Ministerialrat Schmidt',
    businessName: 'Bundesministerium',
    location: 'Bonn Zentrum',
    service: 'Büroreinigung',
    rating: 5,
    content: 'Höchste Sicherheitsstandards werden eingehalten. SUZ Reinigung versteht die besonderen Anforderungen im Regierungsviertel.',
    verified: true,
    date: '2024-01-20'
  },
  {
    id: 'koeln-ehrenfeld-1',
    customerName: 'StartUp CreativeHub',
    businessName: 'Creative Hub GmbH',
    location: 'Köln Ehrenfeld',
    service: 'Büroreinigung',
    rating: 5,
    content: 'Flexibel wie wir! SUZ passt sich unseren unregelmäßigen Arbeitszeiten an. Perfekt für unser Start-up in Ehrenfeld.',
    verified: true,
    date: '2024-02-01'
  }
];

// Helper Functions
export const getServiceAreaBySlug = (slug: string): ServiceArea | undefined => {
  return serviceAreas[slug];
};

export const getServiceAreasByCity = (city: string): ServiceArea[] => {
  return Object.values(serviceAreas).filter(area => area.city === city);
};

export const getLocalTestimonialsByLocation = (locationId: string): LocalTestimonial[] => {
  return localTestimonials.filter(testimonial => 
    testimonial.id.startsWith(locationId)
  );
};

export const getPrimaryServiceAreas = (): ServiceArea[] => {
  return Object.values(serviceAreas).filter(area => 
    area.coverageLevel === 'primary'
  );
};

export const getLocalServicesByArea = (areaId: string): Record<string, LocalService> => {
  return localServices[areaId] || {};
};