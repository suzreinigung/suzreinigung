// Quote Display Component for SUZ Cleaning Services
// Professional quote presentation with SUZ design system

import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Mail, 
  Eye, 
  Calendar, 
  MapPin, 
  Building, 
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { QuoteData } from '@/types/quote';
import { QuoteService } from '@/services/quoteService';
import { PDFService } from '@/services/pdfService';
import { PDFOptimizationService } from '@/services/pdfOptimizationService';
import { QuoteAnalyticsService } from '@/services/quoteAnalytics';
import { toast } from 'sonner';

interface QuoteDisplayProps {
  quote: QuoteData;
  onEmailQuote?: (quote: QuoteData) => void;
  onQuoteUpdate?: (quote: QuoteData) => void;
  showActions?: boolean;
  compact?: boolean;
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({
  quote,
  onEmailQuote,
  onQuoteUpdate,
  showActions = true,
  compact = false
}) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isEmailingQuote, setIsEmailingQuote] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      // Track PDF generation
      QuoteAnalyticsService.trackPDF.generated(quote.id, quote.quoteNumber);

      const response = await PDFOptimizationService.generateOptimizedPDF({ quote });

      if (response.success && response.pdfBlob && response.filename) {
        PDFService.downloadPDF(response.pdfBlob, response.filename);

        // Track successful PDF download
        QuoteAnalyticsService.trackPDF.downloaded(quote.id, quote.quoteNumber);

        toast.success('PDF wurde erfolgreich heruntergeladen');
      } else {
        throw new Error(response.error || 'PDF-Generierung fehlgeschlagen');
      }
    } catch (error) {
      console.error('PDF download error:', error);
      toast.error('Fehler beim Herunterladen der PDF');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handlePreviewPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      // Track PDF generation
      QuoteAnalyticsService.trackPDF.generated(quote.id, quote.quoteNumber);

      const response = await PDFOptimizationService.generateOptimizedPDF({ quote });

      if (response.success && response.pdfDataUrl) {
        PDFService.openPDFInNewTab(response.pdfDataUrl);

        // Track PDF preview
        QuoteAnalyticsService.trackPDF.previewed(quote.id, quote.quoteNumber);

        toast.success('PDF-Vorschau geöffnet');
      } else {
        throw new Error(response.error || 'PDF-Generierung fehlgeschlagen');
      }
    } catch (error) {
      console.error('PDF preview error:', error);
      toast.error('Fehler beim Öffnen der PDF-Vorschau');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleEmailQuote = async () => {
    if (!onEmailQuote) return;
    
    setIsEmailingQuote(true);
    try {
      await onEmailQuote(quote);
      toast.success('Angebot wurde erfolgreich per E-Mail versendet');
    } catch (error) {
      console.error('Email quote error:', error);
      toast.error('Fehler beim Versenden des Angebots');
    } finally {
      setIsEmailingQuote(false);
    }
  };

  const getStatusColor = (status: QuoteData['status']) => {
    switch (status) {
      case 'draft': return 'text-slate-400';
      case 'sent': return 'text-blue-400';
      case 'accepted': return 'text-green-400';
      case 'rejected': return 'text-red-400';
      case 'expired': return 'text-orange-400';
      default: return 'text-slate-400';
    }
  };

  const getStatusIcon = (status: QuoteData['status']) => {
    switch (status) {
      case 'accepted': return <CheckCircle size={16} className="text-green-400" />;
      case 'rejected': return <AlertCircle size={16} className="text-red-400" />;
      case 'expired': return <AlertCircle size={16} className="text-orange-400" />;
      default: return <FileText size={16} className="text-blue-400" />;
    }
  };

  if (compact) {
    return (
      <div className="suz-card-glass rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {getStatusIcon(quote.status)}
            <div>
              <h3 className="suz-text-heading-md font-semibold text-slate-100">
                {quote.quoteNumber}
              </h3>
              <p className="suz-text-body-sm text-slate-400">
                {quote.customer.name}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="suz-text-heading-md font-bold text-slate-100">
              {QuoteService.formatPrice(quote.totalAmount)}
            </p>
            <p className={`suz-text-body-sm ${getStatusColor(quote.status)}`}>
              {quote.status}
            </p>
          </div>
        </div>
        
        {showActions && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="suz-btn-secondary flex-1 py-2 text-sm"
            >
              <Download size={16} className="mr-2" />
              PDF
            </button>
            <button
              type="button"
              onClick={handlePreviewPDF}
              disabled={isGeneratingPDF}
              className="suz-btn-secondary flex-1 py-2 text-sm"
            >
              <Eye size={16} className="mr-2" />
              Vorschau
            </button>
          </div>
        )}
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
        <h2 className="suz-text-heading-xl font-bold text-slate-100 mb-2">
          Angebot {quote.quoteNumber}
        </h2>
        <div className="flex items-center justify-center gap-2 mb-4">
          {getStatusIcon(quote.status)}
          <span className={`suz-text-body-md font-medium ${getStatusColor(quote.status)}`}>
            Status: {quote.status}
          </span>
        </div>
      </div>

      {/* Quote Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="suz-text-heading-md font-semibold text-slate-100 mb-3">
            Kundendaten
          </h3>
          <div className="space-y-2">
            <p className="suz-text-body-md text-slate-300">
              <strong>Name:</strong> {quote.customer.name}
            </p>
            {quote.customer.company && (
              <p className="suz-text-body-md text-slate-300">
                <strong>Unternehmen:</strong> {quote.customer.company}
              </p>
            )}
            <p className="suz-text-body-md text-slate-300">
              <strong>E-Mail:</strong> {quote.customer.email}
            </p>
            {quote.customer.phone && (
              <p className="suz-text-body-md text-slate-300">
                <strong>Telefon:</strong> {quote.customer.phone}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="suz-text-heading-md font-semibold text-slate-100 mb-3">
            Angebotsdaten
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-300">
              <Calendar size={16} />
              <span className="suz-text-body-md">
                Erstellt: {QuoteService.formatDate(quote.createdAt)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Clock size={16} />
              <span className="suz-text-body-md">
                Gültig bis: {QuoteService.formatDate(quote.validUntil)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Service Details */}
      <div className="space-y-4">
        <h3 className="suz-text-heading-md font-semibold text-slate-100">
          Leistungsdetails
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-slate-300">
            <Building size={16} />
            <span className="suz-text-body-md">
              {quote.serviceDetails.serviceDescription}
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin size={16} />
            <span className="suz-text-body-md">
              {quote.serviceDetails.areaSize} m² in {quote.serviceDetails.location}
            </span>
          </div>
        </div>
        <p className="suz-text-body-md text-slate-300">
          <strong>Häufigkeit:</strong> {quote.serviceDetails.frequency}
        </p>
        {quote.serviceDetails.additionalServices.length > 0 && (
          <p className="suz-text-body-md text-slate-300">
            <strong>Zusatzleistungen:</strong> {quote.serviceDetails.additionalServices.join(', ')}
          </p>
        )}
      </div>

      {/* Items Table */}
      <div className="space-y-4">
        <h3 className="suz-text-heading-md font-semibold text-slate-100">
          Leistungsübersicht
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-3 suz-text-body-md font-semibold text-slate-200">
                  Beschreibung
                </th>
                <th className="text-right py-3 suz-text-body-md font-semibold text-slate-200">
                  Menge
                </th>
                <th className="text-right py-3 suz-text-body-md font-semibold text-slate-200">
                  Einzelpreis
                </th>
                <th className="text-right py-3 suz-text-body-md font-semibold text-slate-200">
                  Gesamtpreis
                </th>
              </tr>
            </thead>
            <tbody>
              {quote.items.map((item) => (
                <tr key={item.id} className="border-b border-white/10">
                  <td className="py-3 suz-text-body-md text-slate-300">
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-slate-400">{item.description}</p>
                    </div>
                  </td>
                  <td className="text-right py-3 suz-text-body-md text-slate-300">
                    {item.quantity} {item.unit}
                  </td>
                  <td className="text-right py-3 suz-text-body-md text-slate-300">
                    {QuoteService.formatPrice(item.unitPrice)}
                  </td>
                  <td className={`text-right py-3 suz-text-body-md font-medium ${
                    item.type === 'discount' ? 'text-green-400' : 'text-slate-100'
                  }`}>
                    {item.type === 'discount' ? '-' : ''}
                    {QuoteService.formatPrice(Math.abs(item.totalPrice))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Totals */}
      <div className="border-t border-white/20 pt-6">
        <div className="max-w-md ml-auto space-y-3">
          <div className="flex justify-between items-center">
            <span className="suz-text-body-md text-slate-300">Zwischensumme:</span>
            <span className="suz-text-body-md font-medium text-slate-100">
              {QuoteService.formatPrice(quote.subtotal)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="suz-text-body-md text-slate-300">MwSt. (19%):</span>
            <span className="suz-text-body-md font-medium text-slate-100">
              {QuoteService.formatPrice(quote.vatAmount)}
            </span>
          </div>
          <div className="flex justify-between items-center border-t border-white/20 pt-3">
            <span className="suz-text-heading-md font-bold text-slate-100">Gesamtbetrag:</span>
            <span className="suz-text-heading-md font-bold text-blue-400">
              {QuoteService.formatPrice(quote.totalAmount)}
            </span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {quote.notes && (
        <div className="space-y-2">
          <h3 className="suz-text-heading-md font-semibold text-slate-100">
            Anmerkungen
          </h3>
          <p className="suz-text-body-md text-slate-300">
            {quote.notes}
          </p>
        </div>
      )}

      {/* Actions */}
      {showActions && (
        <div className="flex flex-wrap gap-4 pt-6 border-t border-white/20">
          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className="suz-btn-primary flex items-center gap-2"
          >
            <Download size={20} />
            {isGeneratingPDF ? 'Generiere PDF...' : 'PDF herunterladen'}
          </button>

          <button
            type="button"
            onClick={handlePreviewPDF}
            disabled={isGeneratingPDF}
            className="suz-btn-secondary flex items-center gap-2"
          >
            <Eye size={20} />
            PDF Vorschau
          </button>

          {onEmailQuote && (
            <button
              type="button"
              onClick={handleEmailQuote}
              disabled={isEmailingQuote}
              className="suz-btn-secondary flex items-center gap-2"
            >
              <Mail size={20} />
              {isEmailingQuote ? 'Sende...' : 'Per E-Mail senden'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default QuoteDisplay;
