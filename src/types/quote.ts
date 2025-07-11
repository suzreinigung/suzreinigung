// Quote System Types and Interfaces for SUZ Cleaning Services
// Comprehensive type definitions for quote generation and PDF export

import { CalculatorData, PriceEstimate, PriceBreakdownItem } from '@/components/CostCalculator/types';

// Company Information
export interface CompanyInfo {
  name: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  business: {
    taxId: string;
    registrationNumber: string;
    vatNumber: string;
  };
  logo?: string; // Base64 or URL
}

// Customer Information
export interface CustomerInfo {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  address?: {
    street?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  };
}

// Quote Configuration
export interface QuoteConfig {
  validityDays: number;
  vatRate: number; // German VAT rate (19%)
  currency: string;
  locale: string;
  terms: string[];
  paymentTerms: string;
  deliveryTerms: string;
}

// Quote Item (extends PriceBreakdownItem with additional details)
export interface QuoteItem extends PriceBreakdownItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  vatRate: number;
  category: 'service' | 'additional' | 'discount' | 'surcharge';
}

// Quote Data Structure
export interface QuoteData {
  id: string;
  quoteNumber: string;
  createdAt: Date;
  validUntil: Date;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  
  // Customer and Company
  customer: CustomerInfo;
  company: CompanyInfo;
  
  // Service Details
  serviceDetails: {
    serviceType: string;
    serviceDescription: string;
    propertyType: string;
    areaSize: number;
    location: string;
    frequency: string;
    urgency: string;
    additionalServices: string[];
    specialRequirements?: string;
  };
  
  // Pricing
  items: QuoteItem[];
  subtotal: number;
  vatAmount: number;
  totalAmount: number;
  
  // Additional Information
  notes?: string;
  internalNotes?: string;
  attachments?: string[];
}

// PDF Configuration
export interface PDFConfig {
  format: 'a4' | 'letter';
  orientation: 'portrait' | 'landscape';
  margins: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  fonts: {
    primary: string;
    secondary: string;
  };
  colors: {
    primary: string;
    secondary: string;
    text: string;
    background: string;
    accent: string;
  };
  branding: {
    showLogo: boolean;
    showWatermark: boolean;
    headerHeight: number;
    footerHeight: number;
  };
}

// Quote Generation Request
export interface QuoteGenerationRequest {
  calculatorData: CalculatorData;
  priceEstimate: PriceEstimate;
  customer: CustomerInfo;
  notes?: string;
  config?: Partial<QuoteConfig>;
}

// Quote Generation Response
export interface QuoteGenerationResponse {
  success: boolean;
  quote?: QuoteData;
  error?: string;
  warnings?: string[];
}

// PDF Generation Request
export interface PDFGenerationRequest {
  quote: QuoteData;
  config?: Partial<PDFConfig>;
  includeAttachments?: boolean;
}

// PDF Generation Response
export interface PDFGenerationResponse {
  success: boolean;
  pdfBlob?: Blob;
  pdfDataUrl?: string;
  filename?: string;
  error?: string;
}

// Email Quote Request
export interface EmailQuoteRequest {
  quote: QuoteData;
  pdfBlob?: Blob;
  emailTemplate?: 'standard' | 'followup' | 'reminder';
  customMessage?: string;
  sendCopy?: boolean;
}

// Email Quote Response
export interface EmailQuoteResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Quote Statistics
export interface QuoteStatistics {
  totalQuotes: number;
  quotesThisMonth: number;
  acceptanceRate: number;
  averageQuoteValue: number;
  topServices: Array<{
    service: string;
    count: number;
    value: number;
  }>;
}

// Quote Search/Filter Options
export interface QuoteSearchOptions {
  status?: QuoteData['status'][];
  dateRange?: {
    from: Date;
    to: Date;
  };
  customer?: string;
  serviceType?: string;
  minAmount?: number;
  maxAmount?: number;
  sortBy?: 'date' | 'amount' | 'customer' | 'status';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

// Quote Template
export interface QuoteTemplate {
  id: string;
  name: string;
  description: string;
  serviceType: string;
  defaultItems: Omit<QuoteItem, 'id' | 'totalPrice'>[];
  defaultConfig: Partial<QuoteConfig>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Validation Results
export interface QuoteValidationResult {
  isValid: boolean;
  errors: Array<{
    field: string;
    message: string;
    code: string;
  }>;
  warnings: Array<{
    field: string;
    message: string;
    code: string;
  }>;
}

// Export types for external use
export type {
  CalculatorData,
  PriceEstimate,
  PriceBreakdownItem
} from '@/components/CostCalculator/types';
