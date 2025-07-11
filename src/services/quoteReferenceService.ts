// Quote Reference and Tracking Service for SUZ Cleaning Services
// Handles quote numbering, validity tracking, and reference management

import { QuoteData } from '@/types/quote';

// Quote reference configuration
const QUOTE_CONFIG = {
  prefix: 'SUZ',
  yearFormat: 'YYYY',
  sequenceLength: 4,
  validityDays: 30,
  storageKey: 'suz_quote_references'
};

// Quote reference data structure
interface QuoteReference {
  id: string;
  quoteNumber: string;
  customerId: string;
  customerEmail: string;
  createdAt: Date;
  validUntil: Date;
  status: QuoteData['status'];
  totalAmount: number;
  serviceType: string;
  lastAccessed?: Date;
}

// Local storage manager for quote references
class QuoteReferenceStorage {
  private static getStorageKey(): string {
    return QUOTE_CONFIG.storageKey;
  }

  static getReferences(): QuoteReference[] {
    try {
      const stored = localStorage.getItem(this.getStorageKey());
      if (!stored) return [];
      
      const references = JSON.parse(stored);
      // Convert date strings back to Date objects
      return references.map((ref: any) => ({
        ...ref,
        createdAt: new Date(ref.createdAt),
        validUntil: new Date(ref.validUntil),
        lastAccessed: ref.lastAccessed ? new Date(ref.lastAccessed) : undefined
      }));
    } catch (error) {
      console.error('Error loading quote references:', error);
      return [];
    }
  }

  static saveReferences(references: QuoteReference[]): void {
    try {
      localStorage.setItem(this.getStorageKey(), JSON.stringify(references));
    } catch (error) {
      console.error('Error saving quote references:', error);
    }
  }

  static addReference(reference: QuoteReference): void {
    const references = this.getReferences();
    references.push(reference);
    this.saveReferences(references);
  }

  static updateReference(id: string, updates: Partial<QuoteReference>): void {
    const references = this.getReferences();
    const index = references.findIndex(ref => ref.id === id);
    
    if (index !== -1) {
      references[index] = { ...references[index], ...updates };
      this.saveReferences(references);
    }
  }

  static getReference(id: string): QuoteReference | null {
    const references = this.getReferences();
    const reference = references.find(ref => ref.id === id);
    
    if (reference) {
      // Update last accessed time
      this.updateReference(id, { lastAccessed: new Date() });
      return reference;
    }
    
    return null;
  }

  static deleteReference(id: string): void {
    const references = this.getReferences();
    const filtered = references.filter(ref => ref.id !== id);
    this.saveReferences(filtered);
  }

  static cleanupExpiredReferences(): number {
    const references = this.getReferences();
    const now = new Date();
    const active = references.filter(ref => ref.validUntil > now || ref.status === 'accepted');
    const deletedCount = references.length - active.length;
    
    if (deletedCount > 0) {
      this.saveReferences(active);
    }
    
    return deletedCount;
  }
}

export class QuoteReferenceService {
  /**
   * Generate a unique quote number with format: SUZ-YYYY-NNNN
   */
  static generateQuoteNumber(): string {
    const now = new Date();
    const year = now.getFullYear();
    
    // Get existing references for this year
    const references = QuoteReferenceStorage.getReferences();
    const yearPrefix = `${QUOTE_CONFIG.prefix}-${year}-`;
    const thisYearRefs = references.filter(ref => 
      ref.quoteNumber.startsWith(yearPrefix)
    );
    
    // Find the highest sequence number for this year
    let maxSequence = 0;
    thisYearRefs.forEach(ref => {
      const sequencePart = ref.quoteNumber.split('-')[2];
      const sequence = parseInt(sequencePart, 10);
      if (sequence > maxSequence) {
        maxSequence = sequence;
      }
    });
    
    // Generate next sequence number
    const nextSequence = maxSequence + 1;
    const paddedSequence = nextSequence.toString().padStart(QUOTE_CONFIG.sequenceLength, '0');
    
    return `${yearPrefix}${paddedSequence}`;
  }

  /**
   * Create a quote reference from quote data
   */
  static createReference(quote: QuoteData): QuoteReference {
    const reference: QuoteReference = {
      id: quote.id,
      quoteNumber: quote.quoteNumber,
      customerId: quote.customer.email, // Using email as customer ID
      customerEmail: quote.customer.email,
      createdAt: quote.createdAt,
      validUntil: quote.validUntil,
      status: quote.status,
      totalAmount: quote.totalAmount,
      serviceType: quote.serviceDetails.serviceType
    };

    QuoteReferenceStorage.addReference(reference);
    return reference;
  }

  /**
   * Update quote reference status
   */
  static updateStatus(quoteId: string, status: QuoteData['status']): void {
    QuoteReferenceStorage.updateReference(quoteId, { status });
  }

  /**
   * Get quote reference by ID
   */
  static getReference(quoteId: string): QuoteReference | null {
    return QuoteReferenceStorage.getReference(quoteId);
  }

  /**
   * Get all references for a customer
   */
  static getCustomerReferences(customerEmail: string): QuoteReference[] {
    const references = QuoteReferenceStorage.getReferences();
    return references.filter(ref => ref.customerEmail === customerEmail);
  }

  /**
   * Check if quote is still valid
   */
  static isQuoteValid(quote: QuoteData | QuoteReference): boolean {
    const now = new Date();
    return quote.validUntil > now && quote.status !== 'expired';
  }

  /**
   * Mark expired quotes
   */
  static markExpiredQuotes(): number {
    const references = QuoteReferenceStorage.getReferences();
    const now = new Date();
    let markedCount = 0;

    references.forEach(ref => {
      if (ref.validUntil <= now && ref.status !== 'expired' && ref.status !== 'accepted') {
        QuoteReferenceStorage.updateReference(ref.id, { status: 'expired' });
        markedCount++;
      }
    });

    return markedCount;
  }

  /**
   * Get quote statistics
   */
  static getStatistics(): {
    total: number;
    active: number;
    expired: number;
    accepted: number;
    rejected: number;
    totalValue: number;
    acceptedValue: number;
  } {
    const references = QuoteReferenceStorage.getReferences();
    
    const stats = {
      total: references.length,
      active: 0,
      expired: 0,
      accepted: 0,
      rejected: 0,
      totalValue: 0,
      acceptedValue: 0
    };

    references.forEach(ref => {
      stats.totalValue += ref.totalAmount;
      
      switch (ref.status) {
        case 'draft':
        case 'sent':
          if (this.isQuoteValid(ref)) {
            stats.active++;
          } else {
            stats.expired++;
          }
          break;
        case 'accepted':
          stats.accepted++;
          stats.acceptedValue += ref.totalAmount;
          break;
        case 'rejected':
          stats.rejected++;
          break;
        case 'expired':
          stats.expired++;
          break;
      }
    });

    return stats;
  }

  /**
   * Search quotes by criteria
   */
  static searchQuotes(criteria: {
    customerEmail?: string;
    status?: QuoteData['status'];
    serviceType?: string;
    dateFrom?: Date;
    dateTo?: Date;
    minAmount?: number;
    maxAmount?: number;
  }): QuoteReference[] {
    let references = QuoteReferenceStorage.getReferences();

    if (criteria.customerEmail) {
      references = references.filter(ref => 
        ref.customerEmail.toLowerCase().includes(criteria.customerEmail!.toLowerCase())
      );
    }

    if (criteria.status) {
      references = references.filter(ref => ref.status === criteria.status);
    }

    if (criteria.serviceType) {
      references = references.filter(ref => ref.serviceType === criteria.serviceType);
    }

    if (criteria.dateFrom) {
      references = references.filter(ref => ref.createdAt >= criteria.dateFrom!);
    }

    if (criteria.dateTo) {
      references = references.filter(ref => ref.createdAt <= criteria.dateTo!);
    }

    if (criteria.minAmount !== undefined) {
      references = references.filter(ref => ref.totalAmount >= criteria.minAmount!);
    }

    if (criteria.maxAmount !== undefined) {
      references = references.filter(ref => ref.totalAmount <= criteria.maxAmount!);
    }

    return references.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  /**
   * Cleanup old and expired references
   */
  static cleanup(): { expired: number; deleted: number } {
    const expired = this.markExpiredQuotes();
    const deleted = QuoteReferenceStorage.cleanupExpiredReferences();
    
    return { expired, deleted };
  }

  /**
   * Export references as JSON
   */
  static exportReferences(): string {
    const references = QuoteReferenceStorage.getReferences();
    return JSON.stringify(references, null, 2);
  }

  /**
   * Import references from JSON
   */
  static importReferences(jsonData: string): { imported: number; errors: string[] } {
    try {
      const references = JSON.parse(jsonData);
      const errors: string[] = [];
      let imported = 0;

      if (!Array.isArray(references)) {
        throw new Error('Invalid data format');
      }

      references.forEach((ref, index) => {
        try {
          // Validate reference structure
          if (!ref.id || !ref.quoteNumber || !ref.customerEmail) {
            errors.push(`Reference ${index + 1}: Missing required fields`);
            return;
          }

          // Convert date strings to Date objects
          const validRef: QuoteReference = {
            ...ref,
            createdAt: new Date(ref.createdAt),
            validUntil: new Date(ref.validUntil),
            lastAccessed: ref.lastAccessed ? new Date(ref.lastAccessed) : undefined
          };

          QuoteReferenceStorage.addReference(validRef);
          imported++;
        } catch (error) {
          errors.push(`Reference ${index + 1}: ${error}`);
        }
      });

      return { imported, errors };
    } catch (error) {
      return { imported: 0, errors: [`Import failed: ${error}`] };
    }
  }
}
