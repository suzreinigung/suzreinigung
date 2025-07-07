export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  benefits: string[];
  process: ProcessStep[];
  pricing: PricingInfo;
  gallery: string[];
  faqs: FAQ[];
  cta: {
    primary: string;
    secondary: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface PricingInfo {
  startingPrice: string;
  priceRange: string;
  factors: string[];
  includes: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface QuoteRequest {
  serviceType: string;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    company?: string;
  };
  serviceDetails: {
    area: string;
    frequency: string;
    size: string;
    urgency: string;
    additionalServices: string[];
  };
  message?: string;
}

export const SERVICE_TYPES = {
  BUEROREINIGUNG: 'bueroreinigung',
  HAUSREINIGUNG: 'hausreinigung', 
  FENSTERREINIGUNG: 'fensterreinigung',
  GRUNDREINIGUNG: 'grundreinigung',
} as const;

export type ServiceType = typeof SERVICE_TYPES[keyof typeof SERVICE_TYPES];