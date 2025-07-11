// Quote Generation Service for SUZ Cleaning Services
// Handles quote creation, validation, and management

import { 
  QuoteData, 
  QuoteItem, 
  QuoteGenerationRequest, 
  QuoteGenerationResponse,
  CustomerInfo,
  CompanyInfo,
  QuoteConfig,
  QuoteValidationResult
} from '@/types/quote';
import { PricingEngine } from '@/components/CostCalculator/PricingEngine';
import { servicePricingData, frequencyOptions, locationOptions } from '@/components/CostCalculator/ServicePricingData';

// Default company information for SUZ Cleaning Services
const DEFAULT_COMPANY_INFO: CompanyInfo = {
  name: 'SUZ Reinigung GmbH',
  address: {
    street: 'Paul-Langen-Straße 39',
    city: 'Bonn',
    postalCode: '53229',
    country: 'Deutschland'
  },
  contact: {
    phone: '+49 228 50461294',
    email: 'info@suzreinigung.de',
    website: 'www.suzreinigung.de'
  },
  business: {
    taxId: '206/5948/1829 NAST 1',
    registrationNumber: 'HRB 119388',
    vatNumber: '206/5948/1829 NAST 1'
  }
};

// Default quote configuration
const DEFAULT_QUOTE_CONFIG: QuoteConfig = {
  validityDays: 30,
  vatRate: 0.19, // 19% German VAT
  currency: 'EUR',
  locale: 'de-DE',
  terms: [
    'Alle Preise verstehen sich zzgl. der gesetzlichen Mehrwertsteuer.',
    'Die Preise gelten für die angegebenen Leistungen und Räumlichkeiten.',
    'Zusätzliche Leistungen werden nach Aufwand berechnet.',
    'Zahlungsziel: 14 Tage netto nach Rechnungsstellung.',
    'Bei Stornierung weniger als 24h vor Termin wird eine Ausfallgebühr von 50% berechnet.'
  ],
  paymentTerms: '14 Tage netto',
  deliveryTerms: 'Nach Vereinbarung'
};

export class QuoteService {
  /**
   * Generate a unique quote number
   */
  static generateQuoteNumber(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const time = String(now.getHours()).padStart(2, '0') + String(now.getMinutes()).padStart(2, '0');
    const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    
    return `SUZ-${year}${month}${day}-${time}${random}`;
  }

  /**
   * Generate a unique quote ID
   */
  static generateQuoteId(): string {
    return `quote_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Convert calculator data to quote items
   */
  static convertToQuoteItems(calculatorData: any, priceEstimate: any): QuoteItem[] {
    const items: QuoteItem[] = [];
    let itemCounter = 1;

    // Main service item
    const serviceData = servicePricingData[calculatorData.serviceType];
    if (serviceData) {
      const basePrice = priceEstimate.breakdown.find((item: any) => item.type === 'base')?.amount || 0;
      
      items.push({
        id: `item_${itemCounter++}`,
        label: serviceData.name,
        description: `${serviceData.description} (${calculatorData.areaSize} ${serviceData.unit === 'per_room' ? 'Zimmer' : 'm²'})`,
        quantity: calculatorData.areaSize,
        unit: serviceData.unit === 'per_room' ? 'Zimmer' : 'm²',
        unitPrice: basePrice / calculatorData.areaSize,
        amount: basePrice,
        totalPrice: basePrice,
        vatRate: DEFAULT_QUOTE_CONFIG.vatRate,
        type: 'base',
        category: 'service'
      });
    }

    // Frequency discounts/surcharges
    const frequencyItem = priceEstimate.breakdown.find((item: any) => 
      item.type === 'discount' && item.label.includes('Rabatt')
    );
    if (frequencyItem) {
      const frequencyOption = frequencyOptions.find(f => f.key === calculatorData.frequency);
      items.push({
        id: `item_${itemCounter++}`,
        label: frequencyItem.label,
        description: `Rabatt für ${frequencyOption?.name.toLowerCase()} Reinigung`,
        quantity: 1,
        unit: 'Pauschal',
        unitPrice: -frequencyItem.amount,
        amount: -frequencyItem.amount,
        totalPrice: -frequencyItem.amount,
        vatRate: DEFAULT_QUOTE_CONFIG.vatRate,
        type: 'discount',
        category: 'discount'
      });
    }

    // Location adjustments
    const locationItem = priceEstimate.breakdown.find((item: any) => 
      item.label.includes('zuschlag') || item.label.includes('rabatt')
    );
    if (locationItem && !locationItem.label.includes('Rabatt')) {
      items.push({
        id: `item_${itemCounter++}`,
        label: locationItem.label,
        description: 'Standortabhängiger Preisaufschlag',
        quantity: 1,
        unit: 'Pauschal',
        unitPrice: locationItem.amount,
        amount: locationItem.amount,
        totalPrice: locationItem.amount,
        vatRate: DEFAULT_QUOTE_CONFIG.vatRate,
        type: 'surcharge',
        category: 'surcharge'
      });
    }

    // Additional services
    calculatorData.additionalServices?.forEach((serviceKey: string) => {
      const additionalItem = priceEstimate.breakdown.find((item: any) => 
        item.type === 'additional' && item.label.toLowerCase().includes(serviceKey)
      );
      if (additionalItem) {
        items.push({
          id: `item_${itemCounter++}`,
          label: additionalItem.label,
          description: `Zusätzliche Leistung: ${additionalItem.label}`,
          quantity: 1,
          unit: 'Pauschal',
          unitPrice: additionalItem.amount,
          amount: additionalItem.amount,
          totalPrice: additionalItem.amount,
          vatRate: DEFAULT_QUOTE_CONFIG.vatRate,
          type: 'additional',
          category: 'additional'
        });
      }
    });

    // Urgency surcharge
    if (calculatorData.urgency === 'urgent') {
      const urgencyItem = priceEstimate.breakdown.find((item: any) => 
        item.label.includes('Express')
      );
      if (urgencyItem) {
        items.push({
          id: `item_${itemCounter++}`,
          label: urgencyItem.label,
          description: 'Aufpreis für Express-Service (innerhalb 24h)',
          quantity: 1,
          unit: 'Pauschal',
          unitPrice: urgencyItem.amount,
          amount: urgencyItem.amount,
          totalPrice: urgencyItem.amount,
          vatRate: DEFAULT_QUOTE_CONFIG.vatRate,
          type: 'surcharge',
          category: 'surcharge'
        });
      }
    }

    return items;
  }

  /**
   * Calculate quote totals
   */
  static calculateTotals(items: QuoteItem[], vatRate: number = DEFAULT_QUOTE_CONFIG.vatRate) {
    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const vatAmount = subtotal * vatRate;
    const totalAmount = subtotal + vatAmount;

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      vatAmount: Math.round(vatAmount * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100
    };
  }

  /**
   * Validate quote data
   */
  static validateQuote(quote: Partial<QuoteData>): QuoteValidationResult {
    const errors: Array<{ field: string; message: string; code: string }> = [];
    const warnings: Array<{ field: string; message: string; code: string }> = [];

    // Required fields validation
    if (!quote.customer?.name) {
      errors.push({
        field: 'customer.name',
        message: 'Kundenname ist erforderlich',
        code: 'REQUIRED_FIELD'
      });
    }

    if (!quote.customer?.email) {
      errors.push({
        field: 'customer.email',
        message: 'Kunden-E-Mail ist erforderlich',
        code: 'REQUIRED_FIELD'
      });
    }

    if (!quote.items || quote.items.length === 0) {
      errors.push({
        field: 'items',
        message: 'Mindestens eine Leistung muss angegeben werden',
        code: 'REQUIRED_FIELD'
      });
    }

    // Email validation
    if (quote.customer?.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(quote.customer.email)) {
      errors.push({
        field: 'customer.email',
        message: 'Ungültige E-Mail-Adresse',
        code: 'INVALID_EMAIL'
      });
    }

    // Amount validation
    if (quote.totalAmount && quote.totalAmount <= 0) {
      errors.push({
        field: 'totalAmount',
        message: 'Gesamtbetrag muss größer als 0 sein',
        code: 'INVALID_AMOUNT'
      });
    }

    // Warnings
    if (!quote.customer?.phone) {
      warnings.push({
        field: 'customer.phone',
        message: 'Telefonnummer nicht angegeben',
        code: 'MISSING_PHONE'
      });
    }

    if (quote.totalAmount && quote.totalAmount > 10000) {
      warnings.push({
        field: 'totalAmount',
        message: 'Sehr hoher Auftragswert - Prüfung empfohlen',
        code: 'HIGH_VALUE'
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Generate a complete quote from calculator data
   */
  static async generateQuote(request: QuoteGenerationRequest): Promise<QuoteGenerationResponse> {
    try {
      const { calculatorData, priceEstimate, customer, notes, config } = request;

      // Generate quote items
      const items = this.convertToQuoteItems(calculatorData, priceEstimate);
      
      // Calculate totals
      const quoteConfig = { ...DEFAULT_QUOTE_CONFIG, ...config };
      const { subtotal, vatAmount, totalAmount } = this.calculateTotals(items, quoteConfig.vatRate);

      // Create quote data
      const now = new Date();
      const validUntil = new Date(now.getTime() + quoteConfig.validityDays * 24 * 60 * 60 * 1000);

      const quote: QuoteData = {
        id: this.generateQuoteId(),
        quoteNumber: this.generateQuoteNumber(),
        createdAt: now,
        validUntil,
        status: 'draft',
        customer,
        company: DEFAULT_COMPANY_INFO,
        serviceDetails: {
          serviceType: calculatorData.serviceType,
          serviceDescription: servicePricingData[calculatorData.serviceType]?.description || '',
          propertyType: calculatorData.propertyType,
          areaSize: calculatorData.areaSize,
          location: calculatorData.location,
          frequency: calculatorData.frequency,
          urgency: calculatorData.urgency,
          additionalServices: calculatorData.additionalServices || [],
          specialRequirements: calculatorData.specialRequirements
        },
        items,
        subtotal,
        vatAmount,
        totalAmount,
        notes
      };

      // Validate quote
      const validation = this.validateQuote(quote);
      if (!validation.isValid) {
        return {
          success: false,
          error: `Validierungsfehler: ${validation.errors.map(e => e.message).join(', ')}`,
          warnings: validation.warnings.map(w => w.message)
        };
      }

      return {
        success: true,
        quote,
        warnings: validation.warnings.map(w => w.message)
      };

    } catch (error) {
      console.error('Quote generation error:', error);
      return {
        success: false,
        error: 'Fehler bei der Angebotserstellung. Bitte versuchen Sie es erneut.'
      };
    }
  }

  /**
   * Format price for display
   */
  static formatPrice(amount: number, currency: string = 'EUR', locale: string = 'de-DE'): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }

  /**
   * Format date for display
   */
  static formatDate(date: Date, locale: string = 'de-DE'): string {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  }
}
