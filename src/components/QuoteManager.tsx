// Quote Management UI Component for SUZ Cleaning Services
// Handles quote generation, customer info collection, and quote actions

import React, { useState } from 'react';
import { 
  FileText, 
  User, 
  Mail, 
  Phone, 
  Building, 
  MessageSquare,
  Calculator,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { CalculatorData, PriceEstimate } from '@/components/CostCalculator/types';
import { QuoteData, CustomerInfo, QuoteGenerationRequest } from '@/types/quote';
import { QuoteService } from '@/services/quoteService';
import { QuoteReferenceService } from '@/services/quoteReferenceService';
import { QuoteAnalyticsService } from '@/services/quoteAnalytics';
import { sendQuoteDeliveryEmail, sendQuoteNotificationEmail } from '@/lib/emailService';
import QuoteDisplay from './QuoteDisplay';
import { toast } from 'sonner';

interface QuoteManagerProps {
  calculatorData: CalculatorData;
  priceEstimate: PriceEstimate;
  onQuoteGenerated?: (quote: QuoteData) => void;
  onEmailQuote?: (quote: QuoteData) => void;
}

interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
}

const QuoteManager: React.FC<QuoteManagerProps> = ({
  calculatorData,
  priceEstimate,
  onQuoteGenerated,
  onEmailQuote
}) => {
  const [step, setStep] = useState<'form' | 'quote'>('form');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuote, setGeneratedQuote] = useState<QuoteData | null>(null);
  const [customerData, setCustomerData] = useState<CustomerFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!customerData.name.trim()) {
      errors.name = 'Name ist erforderlich';
    }

    if (!customerData.email.trim()) {
      errors.email = 'E-Mail ist erforderlich';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerData.email)) {
      errors.email = 'Ungültige E-Mail-Adresse';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: keyof CustomerFormData, value: string) => {
    setCustomerData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleGenerateQuote = async () => {
    if (!validateForm()) {
      toast.error('Bitte füllen Sie alle erforderlichen Felder aus');
      QuoteAnalyticsService.trackForm.abandoned(
        Object.keys(customerData).filter(key => customerData[key as keyof CustomerFormData]).length / Object.keys(customerData).length * 100,
        'validation_failed'
      );
      return;
    }

    // Track quote generation start
    QuoteAnalyticsService.trackQuoteGeneration.started(
      calculatorData.serviceType,
      priceEstimate.totalPrice
    );

    setIsGenerating(true);
    try {
      const customer: CustomerInfo = {
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone || undefined,
        company: customerData.company || undefined
      };

      const request: QuoteGenerationRequest = {
        calculatorData,
        priceEstimate,
        customer,
        notes: customerData.notes || undefined
      };

      const response = await QuoteService.generateQuote(request);

      if (response.success && response.quote) {
        // Create quote reference for tracking
        QuoteReferenceService.createReference(response.quote);

        // Track successful quote generation
        QuoteAnalyticsService.trackQuoteGeneration.completed(response.quote);

        setGeneratedQuote(response.quote);
        setStep('quote');
        onQuoteGenerated?.(response.quote);
        toast.success('Angebot wurde erfolgreich erstellt');

        if (response.warnings && response.warnings.length > 0) {
          response.warnings.forEach(warning => {
            toast.warning(warning);
          });
        }
      } else {
        const errorMessage = response.error || 'Fehler bei der Angebotserstellung';
        QuoteAnalyticsService.trackQuoteGeneration.failed(errorMessage, calculatorData.serviceType);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Quote generation error:', error);
      QuoteAnalyticsService.trackQuoteGeneration.failed(
        error instanceof Error ? error.message : 'Unknown error',
        calculatorData.serviceType
      );
      toast.error('Fehler bei der Angebotserstellung. Bitte versuchen Sie es erneut.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBackToForm = () => {
    setStep('form');
    setGeneratedQuote(null);
  };

  const handleEmailQuote = async (quote: QuoteData) => {
    try {
      // Send quote to customer
      const customerEmailResponse = await sendQuoteDeliveryEmail({
        quote,
        emailTemplate: 'standard',
        customMessage: 'Vielen Dank für Ihr Interesse an unseren Reinigungsdienstleistungen. Anbei finden Sie Ihr persönliches Angebot.'
      });

      // Send notification to company
      const notificationResponse = await sendQuoteNotificationEmail(quote);

      if (customerEmailResponse.success) {
        // Update quote status
        QuoteReferenceService.updateStatus(quote.id, 'sent');

        // Track successful email
        QuoteAnalyticsService.trackEmail.sent(quote.id, quote.quoteNumber, quote.customer.email);

        toast.success('Angebot wurde erfolgreich per E-Mail versendet');

        if (!notificationResponse.success) {
          console.warn('Company notification failed:', notificationResponse.message);
        }

        // Call parent callback if provided
        if (onEmailQuote) {
          await onEmailQuote(quote);
        }
      } else {
        QuoteAnalyticsService.trackEmail.failed(quote.id, customerEmailResponse.error || 'E-Mail-Versand fehlgeschlagen');
        throw new Error(customerEmailResponse.error || 'E-Mail-Versand fehlgeschlagen');
      }
    } catch (error) {
      console.error('Email quote error:', error);
      toast.error('Fehler beim Versenden des Angebots per E-Mail');
      throw error;
    }
  };

  if (step === 'quote' && generatedQuote) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleBackToForm}
            className="suz-btn-secondary"
          >
            ← Zurück zum Formular
          </button>
        </div>
        
        <QuoteDisplay
          quote={generatedQuote}
          onEmailQuote={handleEmailQuote}
          showActions={true}
        />
      </div>
    );
  }

  return (
    <div className="suz-card-glass rounded-2xl p-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="suz-icon-badge-premium mb-4 mx-auto">
          <FileText size={32} className="text-blue-400" />
        </div>
        <h3 className="suz-text-heading-xl font-bold text-slate-100 mb-2">
          Angebot generieren
        </h3>
        <p className="suz-text-body-lg text-slate-300">
          Geben Sie Ihre Kontaktdaten ein, um ein professionelles Angebot zu erhalten
        </p>
      </div>

      {/* Price Summary */}
      <div className="suz-card-glass rounded-xl p-6 bg-slate-800/30">
        <div className="flex items-center gap-3 mb-4">
          <Calculator size={24} className="text-blue-400" />
          <h4 className="suz-text-heading-md font-semibold text-slate-100">
            Berechnete Kosten
          </h4>
        </div>
        <div className="text-center">
          <p className="suz-text-display-sm font-bold text-slate-100 mb-2">
            {QuoteService.formatPrice(priceEstimate.totalPrice)}
          </p>
          <p className="suz-text-body-md text-slate-400">
            Geschätzter Gesamtpreis inkl. MwSt.
          </p>
        </div>
      </div>

      {/* Customer Information Form */}
      <div className="space-y-6">
        <h4 className="suz-text-heading-md font-semibold text-slate-100">
          Ihre Kontaktdaten
        </h4>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <label className="block suz-text-body-md font-medium text-slate-200">
              <User size={16} className="inline mr-2" />
              Name *
            </label>
            <input
              type="text"
              value={customerData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg bg-slate-800/50 border ${
                formErrors.name ? 'border-red-400' : 'border-white/20'
              } text-slate-100 placeholder-slate-400 focus:border-blue-400 focus:outline-none transition-colors`}
              placeholder="Ihr vollständiger Name"
            />
            {formErrors.name && (
              <p className="text-red-400 text-sm flex items-center gap-1">
                <AlertCircle size={14} />
                {formErrors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block suz-text-body-md font-medium text-slate-200">
              <Mail size={16} className="inline mr-2" />
              E-Mail *
            </label>
            <input
              type="email"
              value={customerData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg bg-slate-800/50 border ${
                formErrors.email ? 'border-red-400' : 'border-white/20'
              } text-slate-100 placeholder-slate-400 focus:border-blue-400 focus:outline-none transition-colors`}
              placeholder="ihre.email@beispiel.de"
            />
            {formErrors.email && (
              <p className="text-red-400 text-sm flex items-center gap-1">
                <AlertCircle size={14} />
                {formErrors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="block suz-text-body-md font-medium text-slate-200">
              <Phone size={16} className="inline mr-2" />
              Telefon
            </label>
            <input
              type="tel"
              value={customerData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-white/20 text-slate-100 placeholder-slate-400 focus:border-blue-400 focus:outline-none transition-colors"
              placeholder="+49 123 456789"
            />
          </div>

          {/* Company */}
          <div className="space-y-2">
            <label className="block suz-text-body-md font-medium text-slate-200">
              <Building size={16} className="inline mr-2" />
              Unternehmen
            </label>
            <input
              type="text"
              value={customerData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-white/20 text-slate-100 placeholder-slate-400 focus:border-blue-400 focus:outline-none transition-colors"
              placeholder="Ihr Unternehmen (optional)"
            />
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label className="block suz-text-body-md font-medium text-slate-200">
            <MessageSquare size={16} className="inline mr-2" />
            Zusätzliche Anmerkungen
          </label>
          <textarea
            value={customerData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-white/20 text-slate-100 placeholder-slate-400 focus:border-blue-400 focus:outline-none transition-colors resize-none"
            placeholder="Besondere Wünsche oder Anforderungen..."
          />
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="suz-card-glass rounded-lg p-4 bg-blue-900/20 border border-blue-400/30">
        <div className="flex items-start gap-3">
          <CheckCircle size={20} className="text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="space-y-2">
            <p className="suz-text-body-sm font-medium text-slate-200">
              Datenschutz & Sicherheit
            </p>
            <p className="suz-text-body-sm text-slate-300">
              Ihre Daten werden vertraulich behandelt und nur für die Angebotserstellung verwendet. 
              Sie erhalten eine professionelle PDF-Datei mit allen Details.
            </p>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <button
        type="button"
        onClick={handleGenerateQuote}
        disabled={isGenerating}
        className="w-full suz-btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Angebot wird erstellt...
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <FileText size={20} />
            Professionelles Angebot generieren
          </div>
        )}
      </button>

      {/* Features List */}
      <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-white/20">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <FileText size={20} className="text-blue-400" />
          </div>
          <p className="suz-text-body-sm font-medium text-slate-200">PDF-Export</p>
          <p className="suz-text-body-xs text-slate-400">Professionelle Formatierung</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <Mail size={20} className="text-green-400" />
          </div>
          <p className="suz-text-body-sm font-medium text-slate-200">E-Mail Versand</p>
          <p className="suz-text-body-xs text-slate-400">Direkter Versand möglich</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <CheckCircle size={20} className="text-purple-400" />
          </div>
          <p className="suz-text-body-sm font-medium text-slate-200">30 Tage gültig</p>
          <p className="suz-text-body-xs text-slate-400">Ausreichend Bedenkzeit</p>
        </div>
      </div>
    </div>
  );
};

export default QuoteManager;
