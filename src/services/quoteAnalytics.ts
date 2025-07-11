// Quote Analytics Service for SUZ Cleaning Services
// Comprehensive tracking for quote generation, conversions, and user behavior

import { QuoteData } from '@/types/quote';

// Analytics event types
export type QuoteAnalyticsEvent = 
  | 'quote_generation_started'
  | 'quote_generation_completed'
  | 'quote_generation_failed'
  | 'quote_pdf_generated'
  | 'quote_pdf_downloaded'
  | 'quote_pdf_preview'
  | 'quote_email_sent'
  | 'quote_email_failed'
  | 'quote_form_abandoned'
  | 'quote_customer_info_completed'
  | 'quote_shared'
  | 'quote_accepted'
  | 'quote_rejected'
  | 'quote_expired'
  | 'quote_viewed'
  | 'quote_comparison_started'
  | 'calculator_to_quote_conversion';

// Analytics data structure
export interface QuoteAnalyticsData {
  event: QuoteAnalyticsEvent;
  timestamp: Date;
  sessionId: string;
  userId?: string;
  quoteId?: string;
  quoteNumber?: string;
  
  // Quote details
  serviceType?: string;
  totalAmount?: number;
  frequency?: string;
  location?: string;
  
  // User behavior
  timeSpent?: number;
  formCompletionRate?: number;
  errorEncountered?: string;
  
  // Technical details
  userAgent?: string;
  screenResolution?: string;
  deviceType?: 'desktop' | 'mobile' | 'tablet';
  
  // Conversion tracking
  conversionSource?: 'calculator' | 'direct' | 'email' | 'social';
  referrer?: string;
  
  // Additional metadata
  metadata?: Record<string, any>;
}

// Local storage for analytics (before sending to external service)
const ANALYTICS_STORAGE_KEY = 'suz_quote_analytics';
const MAX_STORED_EVENTS = 100;

class QuoteAnalyticsStorage {
  static getEvents(): QuoteAnalyticsData[] {
    try {
      const stored = localStorage.getItem(ANALYTICS_STORAGE_KEY);
      if (!stored) return [];
      
      const events = JSON.parse(stored);
      return events.map((event: any) => ({
        ...event,
        timestamp: new Date(event.timestamp)
      }));
    } catch (error) {
      console.error('Error loading analytics events:', error);
      return [];
    }
  }

  static saveEvent(event: QuoteAnalyticsData): void {
    try {
      const events = this.getEvents();
      events.push(event);
      
      // Keep only the most recent events
      if (events.length > MAX_STORED_EVENTS) {
        events.splice(0, events.length - MAX_STORED_EVENTS);
      }
      
      localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(events));
    } catch (error) {
      console.error('Error saving analytics event:', error);
    }
  }

  static clearEvents(): void {
    try {
      localStorage.removeItem(ANALYTICS_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing analytics events:', error);
    }
  }
}

export class QuoteAnalyticsService {
  private static sessionId: string = QuoteAnalyticsService.generateSessionId();
  private static userId?: string;

  /**
   * Generate a unique session ID
   */
  private static generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get device type based on screen size
   */
  private static getDeviceType(): 'desktop' | 'mobile' | 'tablet' {
    if (typeof window === 'undefined') return 'desktop';
    
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  /**
   * Get basic browser and device information
   */
  private static getBrowserInfo() {
    if (typeof window === 'undefined') return {};
    
    return {
      userAgent: navigator.userAgent,
      screenResolution: `${screen.width}x${screen.height}`,
      deviceType: this.getDeviceType(),
      referrer: document.referrer || 'direct'
    };
  }

  /**
   * Set user ID for tracking
   */
  static setUserId(userId: string): void {
    this.userId = userId;
  }

  /**
   * Track a quote analytics event
   */
  static trackEvent(
    event: QuoteAnalyticsEvent,
    data: Partial<QuoteAnalyticsData> = {}
  ): void {
    try {
      const analyticsData: QuoteAnalyticsData = {
        event,
        timestamp: new Date(),
        sessionId: this.sessionId,
        userId: this.userId,
        ...this.getBrowserInfo(),
        ...data
      };

      // Store locally
      QuoteAnalyticsStorage.saveEvent(analyticsData);

      // Send to Google Analytics if available
      this.sendToGoogleAnalytics(analyticsData);

      // Send to custom analytics endpoint if configured
      this.sendToCustomAnalytics(analyticsData);

      console.log('Quote Analytics Event:', analyticsData);
    } catch (error) {
      console.error('Error tracking analytics event:', error);
    }
  }

  /**
   * Send event to Google Analytics 4
   */
  private static sendToGoogleAnalytics(data: QuoteAnalyticsData): void {
    try {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        const gtag = (window as any).gtag;
        
        gtag('event', data.event, {
          event_category: 'Quote System',
          event_label: data.quoteNumber || data.quoteId,
          value: data.totalAmount,
          custom_parameters: {
            session_id: data.sessionId,
            service_type: data.serviceType,
            device_type: data.deviceType,
            quote_id: data.quoteId,
            conversion_source: data.conversionSource
          }
        });
      }
    } catch (error) {
      console.error('Error sending to Google Analytics:', error);
    }
  }

  /**
   * Send event to custom analytics endpoint
   */
  private static sendToCustomAnalytics(data: QuoteAnalyticsData): void {
    try {
      // This would send to a custom analytics service
      // For now, we'll just log it
      if (process.env.NODE_ENV === 'development') {
        console.log('Custom Analytics:', data);
      }
    } catch (error) {
      console.error('Error sending to custom analytics:', error);
    }
  }

  /**
   * Track quote generation flow
   */
  static trackQuoteGeneration = {
    started: (serviceType: string, totalAmount: number) => {
      QuoteAnalyticsService.trackEvent('quote_generation_started', {
        serviceType,
        totalAmount,
        conversionSource: 'calculator'
      });
    },

    completed: (quote: QuoteData) => {
      QuoteAnalyticsService.trackEvent('quote_generation_completed', {
        quoteId: quote.id,
        quoteNumber: quote.quoteNumber,
        serviceType: quote.serviceDetails.serviceType,
        totalAmount: quote.totalAmount,
        frequency: quote.serviceDetails.frequency,
        location: quote.serviceDetails.location
      });
    },

    failed: (error: string, serviceType?: string) => {
      QuoteAnalyticsService.trackEvent('quote_generation_failed', {
        errorEncountered: error,
        serviceType
      });
    }
  };

  /**
   * Track PDF operations
   */
  static trackPDF = {
    generated: (quoteId: string, quoteNumber: string) => {
      QuoteAnalyticsService.trackEvent('quote_pdf_generated', {
        quoteId,
        quoteNumber
      });
    },

    downloaded: (quoteId: string, quoteNumber: string) => {
      QuoteAnalyticsService.trackEvent('quote_pdf_downloaded', {
        quoteId,
        quoteNumber
      });
    },

    previewed: (quoteId: string, quoteNumber: string) => {
      QuoteAnalyticsService.trackEvent('quote_pdf_preview', {
        quoteId,
        quoteNumber
      });
    }
  };

  /**
   * Track email operations
   */
  static trackEmail = {
    sent: (quoteId: string, quoteNumber: string, customerEmail: string) => {
      QuoteAnalyticsService.trackEvent('quote_email_sent', {
        quoteId,
        quoteNumber,
        metadata: { customerEmail }
      });
    },

    failed: (quoteId: string, error: string) => {
      QuoteAnalyticsService.trackEvent('quote_email_failed', {
        quoteId,
        errorEncountered: error
      });
    }
  };

  /**
   * Track form interactions
   */
  static trackForm = {
    abandoned: (completionRate: number, lastField: string) => {
      QuoteAnalyticsService.trackEvent('quote_form_abandoned', {
        formCompletionRate: completionRate,
        metadata: { lastField }
      });
    },

    completed: (timeSpent: number) => {
      QuoteAnalyticsService.trackEvent('quote_customer_info_completed', {
        timeSpent
      });
    }
  };

  /**
   * Track quote status changes
   */
  static trackQuoteStatus = {
    accepted: (quoteId: string, quoteNumber: string, totalAmount: number) => {
      QuoteAnalyticsService.trackEvent('quote_accepted', {
        quoteId,
        quoteNumber,
        totalAmount
      });
    },

    rejected: (quoteId: string, quoteNumber: string) => {
      QuoteAnalyticsService.trackEvent('quote_rejected', {
        quoteId,
        quoteNumber
      });
    },

    expired: (quoteId: string, quoteNumber: string) => {
      QuoteAnalyticsService.trackEvent('quote_expired', {
        quoteId,
        quoteNumber
      });
    }
  };

  /**
   * Get analytics summary
   */
  static getAnalyticsSummary(): {
    totalEvents: number;
    quotesGenerated: number;
    pdfDownloads: number;
    emailsSent: number;
    conversionRate: number;
    averageQuoteValue: number;
    topServices: Array<{ service: string; count: number }>;
  } {
    const events = QuoteAnalyticsStorage.getEvents();
    
    const quotesGenerated = events.filter(e => e.event === 'quote_generation_completed').length;
    const pdfDownloads = events.filter(e => e.event === 'quote_pdf_downloaded').length;
    const emailsSent = events.filter(e => e.event === 'quote_email_sent').length;
    const quotesAccepted = events.filter(e => e.event === 'quote_accepted').length;
    
    const conversionRate = quotesGenerated > 0 ? (quotesAccepted / quotesGenerated) * 100 : 0;
    
    const quoteValues = events
      .filter(e => e.event === 'quote_generation_completed' && e.totalAmount)
      .map(e => e.totalAmount!);
    
    const averageQuoteValue = quoteValues.length > 0 
      ? quoteValues.reduce((sum, val) => sum + val, 0) / quoteValues.length 
      : 0;

    // Count services
    const serviceCount: Record<string, number> = {};
    events
      .filter(e => e.event === 'quote_generation_completed' && e.serviceType)
      .forEach(e => {
        serviceCount[e.serviceType!] = (serviceCount[e.serviceType!] || 0) + 1;
      });

    const topServices = Object.entries(serviceCount)
      .map(([service, count]) => ({ service, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      totalEvents: events.length,
      quotesGenerated,
      pdfDownloads,
      emailsSent,
      conversionRate,
      averageQuoteValue,
      topServices
    };
  }

  /**
   * Export analytics data
   */
  static exportAnalytics(): string {
    const events = QuoteAnalyticsStorage.getEvents();
    return JSON.stringify(events, null, 2);
  }

  /**
   * Clear all analytics data
   */
  static clearAnalytics(): void {
    QuoteAnalyticsStorage.clearEvents();
  }
}
