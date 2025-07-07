import { LucideIcon } from 'lucide-react';

export interface ServiceFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface ServiceProcess {
  step: number;
  title: string;
  description: string;
}

export interface ServicePricingOption {
  name: string;
  price: string;
  description: string;
  features: string[];
}

export interface ServicePricing {
  title: string;
  options: ServicePricingOption[];
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceSEO {
  title: string;
  description: string;
  keywords: string[];
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  image: string;
  category: string;
  color: string;
  features: string[];
  benefits: string[];
  process: ServiceProcess[];
  pricing: ServicePricing;
  faqs: ServiceFAQ[];
  seo: ServiceSEO;
}

export const SERVICE_SLUGS = {
  HOTELZIMMERREINIGUNG: 'hotelzimmerreinigung',
  TEPPICHREINIGUNG: 'teppichreinigung', 
  BODENREINIGUNG: 'bodenreinigung',
  GEMEINSCHAFTSRAEUME: 'gemeinschaftsraeume',
  BUEROREINIGUNG: 'bueroreinigung',
  KRANKENHAUSREINIGUNG: 'krankenhausreinigung'
} as const;

export type ServiceSlug = typeof SERVICE_SLUGS[keyof typeof SERVICE_SLUGS];