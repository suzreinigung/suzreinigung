// SUZ Pricing Engine
// Handles all price calculations based on German market rates and business logic

import { 
  CalculatorData, 
  PriceEstimate, 
  PriceBreakdownItem,
  ValidationResult,
  ValidationError
} from './types';
import { 
  servicePricingData, 
  locationOptions, 
  frequencyOptions,
  additionalServices,
  urgencyMultipliers
} from './ServicePricingData';

export class PricingEngine {
  
  /**
   * Validates calculator input data
   */
  static validateData(data: CalculatorData): ValidationResult {
    const errors: ValidationError[] = [];

    // Service type validation
    if (!data.serviceType) {
      errors.push({ field: 'serviceType', message: 'Bitte wählen Sie eine Dienstleistung aus' });
    }

    // Area size validation
    if (!data.areaSize || data.areaSize <= 0) {
      errors.push({ field: 'areaSize', message: 'Bitte geben Sie eine gültige Fläche/Anzahl ein' });
    } else if (data.areaSize > 10000) {
      errors.push({ field: 'areaSize', message: 'Für große Projekte kontaktieren Sie uns bitte direkt' });
    }

    // Frequency validation
    if (!data.frequency) {
      errors.push({ field: 'frequency', message: 'Bitte wählen Sie eine Häufigkeit aus' });
    }

    // Location validation
    if (!data.location) {
      errors.push({ field: 'location', message: 'Bitte wählen Sie einen Standort aus' });
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Calculates base price for the selected service
   */
  static calculateBasePrice(serviceType: string, areaSize: number): number {
    const service = servicePricingData[serviceType as keyof typeof servicePricingData];
    if (!service) return 0;

    let basePrice = 0;

    switch (service.unit) {
      case 'per_room':
        // For hotel rooms
        basePrice = areaSize * service.baseRate;
        break;
      case 'per_m2':
        // For area-based services
        basePrice = areaSize * service.baseRate;
        break;
      case 'per_window':
        // For window cleaning (future use)
        basePrice = areaSize * service.baseRate;
        break;
      default:
        basePrice = areaSize * service.baseRate;
    }

    // Apply minimum charge
    return Math.max(basePrice, service.minimumCharge);
  }

  /**
   * Applies frequency discount or surcharge
   */
  static applyFrequencyDiscount(basePrice: number, frequency: string): { 
    adjustedPrice: number; 
    discount: number; 
    isDiscount: boolean 
  } {
    const frequencyOption = frequencyOptions.find(f => f.key === frequency);
    if (!frequencyOption) return { adjustedPrice: basePrice, discount: 0, isDiscount: true };

    const discountAmount = basePrice * frequencyOption.discount;
    const adjustedPrice = basePrice - discountAmount;
    
    return {
      adjustedPrice,
      discount: Math.abs(discountAmount),
      isDiscount: frequencyOption.discount > 0
    };
  }

  /**
   * Applies location-based multiplier
   */
  static applyLocationMultiplier(price: number, location: string): {
    adjustedPrice: number;
    multiplier: number;
  } {
    const locationOption = locationOptions.find(l => l.key === location);
    if (!locationOption) return { adjustedPrice: price, multiplier: 1.0 };

    return {
      adjustedPrice: price * locationOption.multiplier,
      multiplier: locationOption.multiplier
    };
  }

  /**
   * Calculates additional services cost
   */
  static calculateAdditionalServices(
    selectedServices: string[], 
    serviceType: string,
    areaSize: number
  ): number {
    return selectedServices.reduce((total, serviceKey) => {
      const service = additionalServices.find(s => s.key === serviceKey);
      if (!service || !service.applicableServices.includes(serviceType as any)) {
        return total;
      }

      // Some services are per unit, others are per area
      if (service.key === 'disinfection' || service.key === 'carpet_deep_clean') {
        return total + (service.price * areaSize);
      } else {
        return total + service.price;
      }
    }, 0);
  }

  /**
   * Applies urgency multiplier
   */
  static applyUrgencyMultiplier(price: number, urgency: string): {
    adjustedPrice: number;
    surcharge: number;
  } {
    const multiplier = urgencyMultipliers[urgency as keyof typeof urgencyMultipliers] || 1.0;
    const surcharge = price * (multiplier - 1);
    
    return {
      adjustedPrice: price * multiplier,
      surcharge
    };
  }

  /**
   * Converts per-service pricing to monthly pricing based on frequency
   */
  static calculateMonthlyPricing(basePricePerService: number, frequency: string): {
    baseMonthlyPrice: number;
    servicesPerMonth: number;
    pricePerService: number
  } {
    // Define how many services occur per month for each frequency (updated to match Medical Clean options)
    const servicesPerMonth = {
      'one-time': 0.25, // Treat one-time as quarterly (3 months = 0.33, but we'll use 0.25 for conservative estimate)
      'daily': 30, // 30 services per month (7x weekly)
      '6x-weekly': 26, // ~26 services per month (6x weekly)
      '5x-weekly': 22, // ~22 services per month (5x weekly, weekdays)
      '4x-weekly': 17.3, // ~17.3 services per month (4x weekly)
      '3x-weekly': 13, // ~13 services per month (3x weekly)
      '2x-weekly': 8.7, // ~8.7 services per month (2x weekly)
      'weekly': 4.33, // ~4.33 weeks per month (1x weekly)
      'bi-weekly': 2.17, // ~2.17 bi-weekly periods per month
      'monthly': 1, // 1 service per month
      'quarterly': 0.33 // 1 service every 3 months
    };

    const monthlyFrequency = servicesPerMonth[frequency as keyof typeof servicesPerMonth] || 1;
    const baseMonthlyPrice = basePricePerService * monthlyFrequency;

    return {
      baseMonthlyPrice: Math.round(baseMonthlyPrice * 100) / 100,
      servicesPerMonth: monthlyFrequency,
      pricePerService: basePricePerService
    };
  }

  /**
   * Main calculation method that generates complete price estimate
   * Now calculates monthly pricing for ongoing cleaning services
   */
  static calculateEstimate(data: CalculatorData): PriceEstimate | null {
    // Validate input data
    const validation = this.validateData(data);
    if (!validation.isValid) {
      return null;
    }

    const breakdown: PriceBreakdownItem[] = [];
    const service = servicePricingData[data.serviceType];

    // 1. Calculate base price per service
    const basePricePerService = this.calculateBasePrice(data.serviceType, data.areaSize);

    // 2. Convert to monthly pricing based on frequency
    const monthlyPricing = this.calculateMonthlyPricing(basePricePerService, data.frequency);

    // Enhanced breakdown for hotel rooms to show per-room, daily, and monthly costs
    if (service.unit === 'per_room') {
      // Show per-room cost
      breakdown.push({
        label: `Preis pro Zimmer`,
        amount: service.baseRate,
        type: 'base'
      });

      // Show daily total for all rooms
      const dailyTotal = data.areaSize * service.baseRate;
      breakdown.push({
        label: `Tägliche Kosten (${data.areaSize} Zimmer)`,
        amount: dailyTotal,
        type: 'base'
      });

      // Show monthly total
      breakdown.push({
        label: `${service.name} (${data.areaSize} Zimmer) - Monatlich`,
        amount: monthlyPricing.baseMonthlyPrice,
        type: 'base'
      });
    } else {
      // Standard breakdown for other services
      breakdown.push({
        label: `${service.name} (${data.areaSize} ${service.unit === 'per_room' ? 'Zimmer' : 'm²'}) - Monatlich`,
        amount: monthlyPricing.baseMonthlyPrice,
        type: 'base'
      });
    }

    let currentPrice = monthlyPricing.baseMonthlyPrice;

    // 3. Apply frequency discount/surcharge to monthly price
    const frequencyAdjustment = this.applyFrequencyDiscount(currentPrice, data.frequency);
    currentPrice = frequencyAdjustment.adjustedPrice;

    if (frequencyAdjustment.discount > 0) {
      const frequencyOption = frequencyOptions.find(f => f.key === data.frequency);
      breakdown.push({
        label: `${frequencyOption?.name} ${frequencyAdjustment.isDiscount ? 'Rabatt' : 'Aufschlag'}`,
        amount: frequencyAdjustment.isDiscount ? -frequencyAdjustment.discount : frequencyAdjustment.discount,
        type: frequencyAdjustment.isDiscount ? 'discount' : 'surcharge'
      });
    }

    // 3. Apply location multiplier
    const locationAdjustment = this.applyLocationMultiplier(currentPrice, data.location);
    const locationSurcharge = locationAdjustment.adjustedPrice - currentPrice;
    currentPrice = locationAdjustment.adjustedPrice;

    if (Math.abs(locationSurcharge) > 0.01) {
      const locationOption = locationOptions.find(l => l.key === data.location);
      breakdown.push({
        label: `Standort ${locationOption?.name}`,
        amount: locationSurcharge,
        type: locationSurcharge > 0 ? 'surcharge' : 'discount'
      });
    }

    // 4. Add additional services
    const additionalCost = this.calculateAdditionalServices(
      data.additionalServices, 
      data.serviceType, 
      data.areaSize
    );
    
    if (additionalCost > 0) {
      breakdown.push({
        label: 'Zusatzleistungen',
        amount: additionalCost,
        type: 'additional'
      });
      currentPrice += additionalCost;
    }

    // 5. Apply urgency multiplier
    const urgencyAdjustment = this.applyUrgencyMultiplier(currentPrice, data.urgency);
    if (urgencyAdjustment.surcharge > 0) {
      breakdown.push({
        label: data.urgency === 'express' ? 'Express-Service' : 'Notfall-Service',
        amount: urgencyAdjustment.surcharge,
        type: 'surcharge'
      });
    }
    currentPrice = urgencyAdjustment.adjustedPrice;

    // 6. Apply building complexity adjustments
    const buildingAdjustment = this.applyBuildingComplexity(currentPrice, data);
    if (buildingAdjustment.surcharge > 0) {
      breakdown.push({
        label: 'Gebäude-Komplexität',
        amount: buildingAdjustment.surcharge,
        type: 'surcharge'
      });
    }
    currentPrice = buildingAdjustment.adjustedPrice;

    // 7. Apply access difficulty adjustments
    const accessAdjustment = this.applyAccessDifficulty(currentPrice, data.accessDifficulty);
    if (accessAdjustment.surcharge > 0) {
      breakdown.push({
        label: 'Zugangs-Schwierigkeit',
        amount: accessAdjustment.surcharge,
        type: 'surcharge'
      });
    }
    currentPrice = accessAdjustment.adjustedPrice;

    // 8. Apply security requirements adjustments
    const securityAdjustment = this.applySecurityRequirements(currentPrice, data.securityRequirements);
    if (securityAdjustment.surcharge > 0) {
      breakdown.push({
        label: 'Sicherheitsanforderungen',
        amount: securityAdjustment.surcharge,
        type: 'surcharge'
      });
    }
    currentPrice = securityAdjustment.adjustedPrice;

    // Calculate savings (if any discount was applied)
    const totalDiscounts = breakdown
      .filter(item => item.type === 'discount')
      .reduce((sum, item) => sum + Math.abs(item.amount), 0);

    // Determine the correct unit display based on service type
    const unitDisplay = service.unit === 'per_room'
      ? `pro Zimmer (monatlich)`
      : `pro m² (monatlich)`;

    return {
      basePrice: monthlyPricing.baseMonthlyPrice,
      totalPrice: Math.round(currentPrice * 100) / 100, // Round to 2 decimal places
      frequency: data.frequency,
      savings: totalDiscounts > 0 ? totalDiscounts : undefined,
      breakdown,
      pricePerUnit: Math.round((currentPrice / data.areaSize) * 100) / 100,
      unit: unitDisplay,
      isMonthlyPricing: true, // Flag to indicate this is monthly pricing
      servicesPerMonth: monthlyPricing.servicesPerMonth
    };
  }

  /**
   * Formats price for display with monthly indicator
   */
  static formatPrice(amount: number, isMonthly: boolean = true): string {
    const formattedPrice = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);

    return isMonthly ? `${formattedPrice}/Monat` : formattedPrice;
  }

  /**
   * Gets service unit display text
   */
  static getServiceUnit(serviceType: string): string {
    const service = servicePricingData[serviceType as keyof typeof servicePricingData];
    if (!service) return '';

    switch (service.unit) {
      case 'per_room':
        return 'Zimmer';
      case 'per_m2':
        return 'm²';
      case 'per_window':
        return 'Fenster';
      default:
        return 'Einheit';
    }
  }

  /**
   * Apply building complexity adjustments
   */
  static applyBuildingComplexity(price: number, data: any): { adjustedPrice: number; surcharge: number } {
    let multiplier = 1.0;

    // Building type multipliers
    if (data.buildingType === 'multi_floor') {
      multiplier += 0.05; // 5% for multi-floor
    } else if (data.buildingType === 'high_rise') {
      multiplier += 0.15; // 15% for high-rise
    } else if (data.buildingType === 'complex') {
      multiplier += 0.10; // 10% for complex
    }

    // Additional floor charges
    if (data.numberOfFloors && data.numberOfFloors > 3) {
      multiplier += (data.numberOfFloors - 3) * 0.02; // 2% per additional floor above 3
    }

    // Elevator access discount
    if (!data.elevatorAccess && data.numberOfFloors && data.numberOfFloors > 2) {
      multiplier += 0.05; // 5% surcharge for no elevator access in multi-floor buildings
    }

    // Parking availability
    if (!data.parkingAvailable) {
      multiplier += 0.03; // 3% surcharge for no parking
    }

    const adjustedPrice = price * multiplier;
    const surcharge = adjustedPrice - price;

    return { adjustedPrice, surcharge };
  }

  /**
   * Apply access difficulty adjustments
   */
  static applyAccessDifficulty(price: number, accessDifficulty?: string): { adjustedPrice: number; surcharge: number } {
    const multipliers = {
      easy: 1.0,
      moderate: 1.05, // 5% surcharge
      difficult: 1.10, // 10% surcharge
      very_difficult: 1.15 // 15% surcharge
    };

    const multiplier = multipliers[accessDifficulty as keyof typeof multipliers] || 1.0;
    const adjustedPrice = price * multiplier;
    const surcharge = adjustedPrice - price;

    return { adjustedPrice, surcharge };
  }

  /**
   * Apply security requirements adjustments
   */
  static applySecurityRequirements(price: number, securityRequirements?: string): { adjustedPrice: number; surcharge: number } {
    const multipliers = {
      none: 1.0,
      basic: 1.05, // 5% surcharge for basic security
      enhanced: 1.10, // 10% surcharge for enhanced security
      maximum: 1.20 // 20% surcharge for maximum security
    };

    const multiplier = multipliers[securityRequirements as keyof typeof multipliers] || 1.0;
    const adjustedPrice = price * multiplier;
    const surcharge = adjustedPrice - price;

    return { adjustedPrice, surcharge };
  }
}
