// TypeScript interfaces for SUZ Cost Calculator
// Based on COST_CALCULATOR_PLANNING.md specifications

export type ServiceType =
  | 'hotelzimmerreinigung'
  | 'teppichreinigung'
  | 'bodenreinigung'
  | 'gemeinschaftsraeume'
  | 'bueroreinigung'
  | 'krankenhausreinigung'
  | 'zahnarztpraxis'
  | 'kindergartenreinigung'
  | 'industrieanlagen'
  | 'baustellenreinigung'
  | 'ladenflaechenreinigung'
  | 'gastronomiereinigung'
  | 'fensterreinigung'
  | 'grundreinigung'
  | 'tiefgaragenreinigung'
  | 'lebensmittelproduktion';

export type PropertyType = 
  | 'office'
  | 'hotel'
  | 'medical'
  | 'residential'
  | 'industrial';

export type LocationType = 
  | 'koeln-center'
  | 'koeln-suburbs'
  | 'bonn'
  | 'surrounding';

export type FrequencyType =
  | 'one-time'
  | 'daily'
  | '6x-weekly'
  | '5x-weekly'
  | '4x-weekly'
  | '3x-weekly'
  | '2x-weekly'
  | 'weekly'
  | 'bi-weekly'
  | 'monthly'
  | 'quarterly';

export type UrgencyType = 
  | 'standard'
  | 'express'
  | 'emergency';

export interface CalculatorData {
  serviceType: ServiceType;
  propertyType: PropertyType;
  areaSize: number;
  location: LocationType;
  frequency: FrequencyType;
  additionalServices: string[];
  urgency: UrgencyType;
  specialRequirements: string;
  // Enhanced customization fields
  buildingType?: 'single_floor' | 'multi_floor' | 'high_rise' | 'complex';
  numberOfFloors?: number;
  accessDifficulty?: 'easy' | 'moderate' | 'difficult' | 'very_difficult';
  parkingAvailable?: boolean;
  elevatorAccess?: boolean;
  securityRequirements?: 'none' | 'basic' | 'enhanced' | 'maximum';
  environmentalPreferences?: string[];
  customNotes?: string;
  contactPreference?: 'phone' | 'email' | 'whatsapp';
  preferredTimeSlot?: 'morning' | 'afternoon' | 'evening' | 'flexible';
  // New granular service options (inspired by Medical Clean)
  floorCleaningFrequency?: FrequencyType;
  disinfectionFrequency?: FrequencyType;
  refrigeratorCount?: number;
  windowCount?: number;
  furnitureCount?: number;
}

export interface PriceBreakdownItem {
  label: string;
  amount: number;
  type: 'base' | 'discount' | 'surcharge' | 'additional';
}

export interface PriceEstimate {
  basePrice: number;
  totalPrice: number;
  frequency: FrequencyType;
  savings?: number;
  breakdown: PriceBreakdownItem[];
  pricePerUnit?: number;
  unit?: string;
  isMonthlyPricing?: boolean;
  servicesPerMonth?: number;
}

export interface ServicePricingData {
  name: string;
  baseRate: number;
  unit: 'per_room' | 'per_m2' | 'per_window';
  minimumCharge: number;
  deepCleanMultiplier: number;
  description: string;
}

export interface ServiceOption {
  key: ServiceType;
  name: string;
  description: string;
  icon: string;
  unit: string;
  placeholder: string;
}

export interface LocationOption {
  key: LocationType;
  name: string;
  multiplier: number;
}

export interface FrequencyOption {
  key: FrequencyType;
  name: string;
  discount: number; // Positive for discount, negative for surcharge
  description: string;
}

export interface AdditionalService {
  key: string;
  name: string;
  price: number;
  description: string;
  applicableServices: ServiceType[];
}

export interface CalculatorFormProps {
  data: CalculatorData;
  onDataChange: (data: CalculatorData) => void;
  onCalculate: () => void;
  isCalculating: boolean;
}

export interface PriceDisplayProps {
  estimate: PriceEstimate | null;
  isCalculating: boolean;
  data: CalculatorData;
}

export interface TrustIndicatorsProps {
  className?: string;
}

// Validation interfaces
export interface ValidationError {
  field: keyof CalculatorData;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Analytics tracking interfaces
export interface CalculatorAnalyticsEvent {
  action: 'service_selected' | 'price_calculated' | 'quote_requested' | 'form_completed';
  serviceType?: ServiceType;
  estimatedPrice?: number;
  frequency?: FrequencyType;
  location?: LocationType;
}
