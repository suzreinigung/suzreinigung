export interface ServiceArea {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  postalCodes: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
  landmarks: string[];
  serviceRadius: number; // in kilometers
  coverageLevel: 'primary' | 'secondary' | 'extended';
  demographics: {
    population: number;
    businessCount: number;
    averageIncome: string;
    primaryIndustries: string[];
  };
  seo: LocationSEO;
}

export interface LocationSEO {
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  localKeywords: string[];
  competitorAnalysis?: {
    mainCompetitors: string[];
    opportunityKeywords: string[];
  };
  schema: {
    areaServed: string;
    geo: {
      latitude: number;
      longitude: number;
    };
    address: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
  };
}

export interface LocalService {
  serviceType: string;
  localDemand: 'high' | 'medium' | 'low';
  averagePrice: string;
  competitionLevel: 'high' | 'medium' | 'low';
  seasonality: {
    peak: string[];
    low: string[];
  };
  targetCustomers: string[];
}

export interface LocalTestimonial {
  id: string;
  customerName: string;
  businessName?: string;
  location: string;
  service: string;
  rating: number;
  content: string;
  verified: boolean;
  date: string;
}

export const COLOGNE_DISTRICTS = {
  INNENSTADT: 'innenstadt',
  DEUTZ: 'deutz',
  LINDENTHAL: 'lindenthal',
  EHRENFELD: 'ehrenfeld',
  NIPPES: 'nippes',
  CHORWEILER: 'chorweiler',
  PORZ: 'porz',
  RODENKIRCHEN: 'rodenkirchen',
  KALK: 'kalk'
} as const;

export const BONN_DISTRICTS = {
  STADTBEZIRK_BONN: 'stadtbezirk-bonn',
  BAD_GODESBERG: 'bad-godesberg',
  BEUEL: 'beuel',
  HARDTBERG: 'hardtberg'
} as const;

export type CologneDistrict = typeof COLOGNE_DISTRICTS[keyof typeof COLOGNE_DISTRICTS];
export type BonnDistrict = typeof BONN_DISTRICTS[keyof typeof BONN_DISTRICTS];