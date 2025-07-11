// SUZ Service Pricing Data
// Based on German market analysis (Köln/Bonn region) - Updated with 2024 market research
// Pricing verified against RPR Gebäudereinigung Köln and industry standards

import {
  ServicePricingData,
  ServiceOption,
  LocationOption,
  FrequencyOption,
  AdditionalService,
  ServiceType
} from './types';

// Base pricing structure for each service (2024 German market rates - verified)
// Rates based on market research from Köln cleaning companies and industry standards
export const servicePricingData: Record<ServiceType, ServicePricingData> = {
  hotelzimmerreinigung: {
    name: 'Hotelzimmerreinigung',
    baseRate: 18, // €18 per room - competitive rate for hotel cleaning (15-25€ range)
    unit: 'per_room',
    minimumCharge: 80,
    deepCleanMultiplier: 1.67, // €30 per room for deep clean
    description: 'Professionelle Hotelzimmerreinigung mit höchsten Hygienestandards'
  },
  bueroreinigung: {
    name: 'Büroreinigung',
    baseRate: 1.10, // €1.10 per m² - based on €22.50/hour ÷ 20m²/hour productivity
    unit: 'per_m2',
    minimumCharge: 120,
    deepCleanMultiplier: 1.45, // €1.60 per m² for deep clean
    description: 'Umfassende Büroreinigung für produktive Arbeitsumgebung'
  },
  krankenhausreinigung: {
    name: 'Krankenhaus-/Medizinische Reinigung',
    baseRate: 1.50, // €1.50 per m² - based on €25/hour ÷ 16m²/hour (higher standards)
    unit: 'per_m2',
    minimumCharge: 200,
    deepCleanMultiplier: 2.0, // €3.00 per m² for specialized cleaning
    description: 'Spezialisierte medizinische Reinigung nach Hygienevorschriften'
  },
  teppichreinigung: {
    name: 'Teppichreinigung',
    baseRate: 4.5, // €4.50 per m² - competitive with market rate of €2.50-6.00
    unit: 'per_m2',
    minimumCharge: 80,
    deepCleanMultiplier: 1.33, // €6 per m² for intensive cleaning
    description: 'Professionelle Teppichreinigung für alle Materialien'
  },
  bodenreinigung: {
    name: 'Bodenreinigung',
    baseRate: 3.75, // €3.75 per m² - aligned with market rate of €3.75-4.46
    unit: 'per_m2',
    minimumCharge: 100,
    deepCleanMultiplier: 1.20, // €4.50 per m² for intensive cleaning
    description: 'Spezialisierte Bodenreinigung für alle Oberflächen'
  },
  gemeinschaftsraeume: {
    name: 'Gemeinschaftsräume',
    baseRate: 0.95, // €0.95 per m² - slightly higher than office due to public use
    unit: 'per_m2',
    minimumCharge: 100,
    deepCleanMultiplier: 1.58, // €1.50 per m² for deep clean
    description: 'Reinigung von Gemeinschaftsbereichen und öffentlichen Räumen'
  },
  zahnarztpraxis: {
    name: 'Zahnarztpraxis',
    baseRate: 1.80, // €1.80 per m² - higher than general medical due to specialized requirements
    unit: 'per_m2',
    minimumCharge: 150,
    deepCleanMultiplier: 2.2, // €4.00 per m² for deep clean with gypsum room
    description: 'Spezialisierte Zahnarztpraxis-Reinigung inkl. Behandlungsräume'
  },
  kindergartenreinigung: {
    name: 'Kindergarten-/Kita-Reinigung',
    baseRate: 1.20, // €1.20 per m² - child-safe products and higher hygiene standards
    unit: 'per_m2',
    minimumCharge: 120,
    deepCleanMultiplier: 1.75, // €2.10 per m² for deep clean
    description: 'Kindergarten- und Kita-Reinigung mit kindersicheren Produkten'
  },
  industrieanlagen: {
    name: 'Industrieanlagen',
    baseRate: 1.40, // €1.40 per m² - industrial cleaning with specialized equipment
    unit: 'per_m2',
    minimumCharge: 300,
    deepCleanMultiplier: 2.0, // €2.80 per m² for deep industrial clean
    description: 'Industrielle Reinigung von Produktions- und Lagerhallen'
  },
  baustellenreinigung: {
    name: 'Baustellenreinigung',
    baseRate: 2.20, // €2.20 per m² - construction cleanup requires specialized approach
    unit: 'per_m2',
    minimumCharge: 200,
    deepCleanMultiplier: 1.36, // €3.00 per m² for final construction cleanup
    description: 'Baustellenreinigung und Endreinigung nach Bauarbeiten'
  },
  ladenflaechenreinigung: {
    name: 'Ladenflächen-/Einzelhandel',
    baseRate: 1.00, // €1.00 per m² - retail cleaning during off-hours
    unit: 'per_m2',
    minimumCharge: 100,
    deepCleanMultiplier: 1.60, // €1.60 per m² for deep retail clean
    description: 'Einzelhandel- und Ladenflächen-Reinigung'
  },
  gastronomiereinigung: {
    name: 'Gastronomie-Reinigung',
    baseRate: 1.60, // €1.60 per m² - restaurant/kitchen cleaning with grease removal
    unit: 'per_m2',
    minimumCharge: 150,
    deepCleanMultiplier: 1.88, // €3.00 per m² for deep kitchen clean
    description: 'Restaurant- und Küchen-Reinigung inkl. Fettentfernung'
  },
  fensterreinigung: {
    name: 'Fensterreinigung',
    baseRate: 3.50, // €3.50 per window (both sides) - standard market rate
    unit: 'per_window',
    minimumCharge: 80,
    deepCleanMultiplier: 1.43, // €5.00 per window for frame cleaning
    description: 'Professionelle Fensterreinigung innen und außen'
  },
  grundreinigung: {
    name: 'Grundreinigung/Ersteinrichtung',
    baseRate: 2.80, // €2.80 per m² - comprehensive initial cleaning
    unit: 'per_m2',
    minimumCharge: 250,
    deepCleanMultiplier: 1.25, // €3.50 per m² for intensive initial clean
    description: 'Umfassende Grundreinigung für neue oder renovierte Räume'
  },
  tiefgaragenreinigung: {
    name: 'Tiefgaragen-Reinigung',
    baseRate: 0.80, // €0.80 per m² - parking garage cleaning
    unit: 'per_m2',
    minimumCharge: 200,
    deepCleanMultiplier: 1.88, // €1.50 per m² for deep garage clean
    description: 'Tiefgaragen- und Parkhaus-Reinigung'
  },
  lebensmittelproduktion: {
    name: 'Lebensmittelproduktion',
    baseRate: 2.00, // €2.00 per m² - food production facility cleaning
    unit: 'per_m2',
    minimumCharge: 300,
    deepCleanMultiplier: 1.75, // €3.50 per m² for HACCP-compliant deep clean
    description: 'HACCP-konforme Reinigung von Lebensmittelproduktionsstätten'
  }
};

// Service selection options for the form
export const serviceOptions: ServiceOption[] = [
  {
    key: 'hotelzimmerreinigung',
    name: 'Hotelzimmerreinigung',
    description: 'Zimmer, Suiten, Apartments',
    icon: '🏨',
    unit: 'Zimmer',
    placeholder: 'Anzahl Zimmer'
  },
  {
    key: 'bueroreinigung',
    name: 'Büroreinigung',
    description: 'Büros, Coworking, Praxen',
    icon: '🏢',
    unit: 'm²',
    placeholder: 'Fläche in m²'
  },
  {
    key: 'krankenhausreinigung',
    name: 'Medizinische Reinigung',
    description: 'Kliniken, Praxen, Labore',
    icon: '🏥',
    unit: 'm²',
    placeholder: 'Fläche in m²'
  },
  {
    key: 'teppichreinigung',
    name: 'Teppichreinigung',
    description: 'Teppiche, Läufer, Matten',
    icon: '🧽',
    unit: 'm²',
    placeholder: 'Teppichfläche in m²'
  },
  {
    key: 'bodenreinigung',
    name: 'Bodenreinigung',
    description: 'Parkett, Fliesen, Laminat',
    icon: '✨',
    unit: 'm²',
    placeholder: 'Bodenfläche in m²'
  },
  {
    key: 'gemeinschaftsraeume',
    name: 'Gemeinschaftsräume',
    description: 'Lobbys, Flure, Aufenthaltsräume',
    icon: '🏛️',
    unit: 'm²',
    placeholder: 'Fläche in m²'
  },
  {
    key: 'zahnarztpraxis',
    name: 'Zahnarztpraxis',
    description: 'Behandlungsräume, Wartebereiche',
    icon: '🦷',
    unit: 'm²',
    placeholder: 'Praxisfläche in m²'
  },
  {
    key: 'kindergartenreinigung',
    name: 'Kindergarten/Kita',
    description: 'Gruppenräume, Spielbereiche',
    icon: '🧸',
    unit: 'm²',
    placeholder: 'Kita-Fläche in m²'
  },
  {
    key: 'industrieanlagen',
    name: 'Industrieanlagen',
    description: 'Produktionshallen, Lager',
    icon: '🏭',
    unit: 'm²',
    placeholder: 'Industriefläche in m²'
  },
  {
    key: 'baustellenreinigung',
    name: 'Baustellenreinigung',
    description: 'Endreinigung, Bauschutt',
    icon: '🚧',
    unit: 'm²',
    placeholder: 'Baustellen-Fläche in m²'
  },
  {
    key: 'ladenflaechenreinigung',
    name: 'Ladenflächen',
    description: 'Einzelhandel, Verkaufsräume',
    icon: '🛍️',
    unit: 'm²',
    placeholder: 'Ladenfläche in m²'
  },
  {
    key: 'gastronomiereinigung',
    name: 'Gastronomie',
    description: 'Restaurants, Küchen, Bars',
    icon: '🍽️',
    unit: 'm²',
    placeholder: 'Gastronomie-Fläche in m²'
  },
  {
    key: 'fensterreinigung',
    name: 'Fensterreinigung',
    description: 'Innen- und Außenreinigung',
    icon: '🪟',
    unit: 'Fenster',
    placeholder: 'Anzahl Fenster'
  },
  {
    key: 'grundreinigung',
    name: 'Grundreinigung',
    description: 'Ersteinrichtung, Renovierung',
    icon: '🧹',
    unit: 'm²',
    placeholder: 'Zu reinigende Fläche in m²'
  },
  {
    key: 'tiefgaragenreinigung',
    name: 'Tiefgaragen',
    description: 'Parkhäuser, Garagen',
    icon: '🚗',
    unit: 'm²',
    placeholder: 'Garagenfläche in m²'
  },
  {
    key: 'lebensmittelproduktion',
    name: 'Lebensmittelproduktion',
    description: 'HACCP-konforme Reinigung',
    icon: '🏭',
    unit: 'm²',
    placeholder: 'Produktionsfläche in m²'
  }
];

// Location options with regional multipliers (justified by market analysis)
export const locationOptions: LocationOption[] = [
  {
    key: 'koeln-center',
    name: 'Köln Innenstadt',
    multiplier: 1.08 // 8% premium - higher parking costs, traffic, premium location
  },
  {
    key: 'koeln-suburbs',
    name: 'Köln Umgebung',
    multiplier: 1.00 // Standard rate - baseline for regional pricing
  },
  {
    key: 'bonn',
    name: 'Bonn',
    multiplier: 1.03 // 3% premium - government district, higher cost of living
  },
  {
    key: 'surrounding',
    name: 'Umgebung (bis 30km)',
    multiplier: 0.97 // 3% discount - travel time offset by lower operational costs
  }
];

// Frequency options with discounts/surcharges (expanded to match Medical Clean options)
export const frequencyOptions: FrequencyOption[] = [
  {
    key: 'one-time',
    name: 'Einmalig',
    discount: 0,
    description: 'Einzelreinigung ohne Vertrag'
  },
  {
    key: 'daily',
    name: '7x wöchentlich',
    discount: 0.25, // 25% discount for highest frequency
    description: 'Tägliche Reinigung (Mo-So)'
  },
  {
    key: '6x-weekly',
    name: '6x wöchentlich',
    discount: 0.22, // 22% discount for 6x weekly
    description: 'Reinigung 6x pro Woche'
  },
  {
    key: '5x-weekly',
    name: '5x wöchentlich',
    discount: 0.20, // 20% discount for weekday service
    description: 'Reinigung an Werktagen (Mo-Fr)'
  },
  {
    key: '4x-weekly',
    name: '4x wöchentlich',
    discount: 0.18, // 18% discount for 4x weekly
    description: 'Reinigung 4x pro Woche'
  },
  {
    key: '3x-weekly',
    name: '3x wöchentlich',
    discount: 0.15, // 15% discount for 3x weekly
    description: 'Reinigung 3x pro Woche'
  },
  {
    key: '2x-weekly',
    name: '2x wöchentlich',
    discount: 0.12, // 12% discount for 2x weekly
    description: 'Reinigung 2x pro Woche'
  },
  {
    key: 'weekly',
    name: '1x wöchentlich',
    discount: 0.10, // 10% discount for weekly
    description: 'Regelmäßige wöchentliche Reinigung'
  },
  {
    key: 'bi-weekly',
    name: 'Alle 2 Wochen',
    discount: 0.10, // 10% discount
    description: 'Reinigung alle zwei Wochen'
  },
  {
    key: 'monthly',
    name: 'Monatlich',
    discount: 0.05, // 5% discount
    description: 'Monatliche Reinigung'
  },
  {
    key: 'quarterly',
    name: 'Quartalsweise',
    discount: -0.10, // 10% surcharge for setup costs
    description: 'Vierteljährliche Grundreinigung'
  }
];

// Additional services with pricing
export const additionalServices: AdditionalService[] = [
  {
    key: 'window_cleaning',
    name: 'Fensterreinigung',
    price: 3,
    description: 'Pro Fenster (innen/außen)',
    applicableServices: ['bueroreinigung', 'gemeinschaftsraeume', 'krankenhausreinigung']
  },
  {
    key: 'deep_bathroom',
    name: 'Badezimmer Tiefenreinigung',
    price: 8,
    description: 'Pro Badezimmer',
    applicableServices: ['hotelzimmerreinigung']
  },
  {
    key: 'minibar_service',
    name: 'Minibar Service',
    price: 5,
    description: 'Pro Zimmer',
    applicableServices: ['hotelzimmerreinigung']
  },
  {
    key: 'carpet_deep_clean',
    name: 'Teppich Tiefenreinigung',
    price: 5,
    description: 'Pro m² (zusätzlich)',
    applicableServices: ['bueroreinigung', 'gemeinschaftsraeume']
  },
  {
    key: 'furniture_cleaning',
    name: 'Möbelreinigung',
    price: 10,
    description: 'Pro Möbelstück',
    applicableServices: ['bueroreinigung', 'gemeinschaftsraeume']
  },
  {
    key: 'disinfection',
    name: 'Desinfektion',
    price: 0.50,
    description: 'Pro m² (zusätzlich)',
    applicableServices: ['krankenhausreinigung', 'bueroreinigung']
  },
  // New Medical Clean-inspired services
  {
    key: 'handle_disinfection',
    name: 'Griffbereich-Desinfektion',
    price: 0.30,
    description: 'Pro m² (zusätzlich)',
    applicableServices: ['bueroreinigung', 'krankenhausreinigung', 'zahnarztpraxis', 'kindergartenreinigung']
  },
  {
    key: 'refrigerator_cleaning',
    name: 'Kühlschrank-Reinigung',
    price: 15,
    description: 'Pro Kühlschrank (monatlich)',
    applicableServices: ['bueroreinigung', 'gastronomiereinigung', 'kindergartenreinigung']
  },
  {
    key: 'floor_deep_clean',
    name: 'Boden-Tiefenreinigung',
    price: 1.20,
    description: 'Pro m² (zusätzlich zur normalen Reinigung)',
    applicableServices: ['bueroreinigung', 'krankenhausreinigung', 'zahnarztpraxis', 'gastronomiereinigung']
  },
  {
    key: 'kitchen_deep_clean',
    name: 'Küchen-Tiefenreinigung',
    price: 25,
    description: 'Pro Küche (inkl. Geräte)',
    applicableServices: ['bueroreinigung', 'gastronomiereinigung', 'kindergartenreinigung']
  },
  {
    key: 'gypsum_room_cleaning',
    name: 'Gipsraum-Reinigung',
    price: 35,
    description: 'Pro Gipsraum (spezialisiert)',
    applicableServices: ['zahnarztpraxis']
  },
  {
    key: 'playground_cleaning',
    name: 'Spielplatz-/Außenbereich',
    price: 0.80,
    description: 'Pro m² Außenfläche',
    applicableServices: ['kindergartenreinigung']
  },
  {
    key: 'industrial_equipment',
    name: 'Maschinen-/Anlagenreinigung',
    price: 45,
    description: 'Pro Maschine/Anlage',
    applicableServices: ['industrieanlagen', 'lebensmittelproduktion']
  },
  {
    key: 'construction_debris',
    name: 'Bauschutt-Entsorgung',
    price: 2.50,
    description: 'Pro m³ Bauschutt',
    applicableServices: ['baustellenreinigung']
  }
];

// Property type multipliers (for future use)
export const propertyTypeMultipliers = {
  office: 1.0,
  hotel: 1.0,
  medical: 1.2, // Higher standards required
  residential: 0.9, // Simpler requirements
  industrial: 1.1 // More intensive cleaning
};

// Urgency multipliers
export const urgencyMultipliers = {
  standard: 1.0,
  express: 1.3, // 30% surcharge for express service
  emergency: 1.5 // 50% surcharge for emergency service
};
