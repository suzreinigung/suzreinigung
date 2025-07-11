// SUZ Price Display Component
// Shows calculated price estimate with breakdown and CTA

import React, { useState } from 'react';
import { Euro, TrendingDown, Phone, Mail, CheckCircle, FileText, Download } from 'lucide-react';
import { PriceDisplayProps } from './types';
import { PricingEngine } from './PricingEngine';
import { frequencyOptions } from './ServicePricingData';
import QuoteManager from '../QuoteManager';
import { QuoteData } from '@/types/quote';

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  estimate,
  isCalculating,
  data
}) => {
  const [showQuoteManager, setShowQuoteManager] = useState(false);
  const [generatedQuote, setGeneratedQuote] = useState<QuoteData | null>(null);
  const frequencyOption = frequencyOptions.find(f => f.key === data.frequency);

  const handleQuoteGenerated = (quote: QuoteData) => {
    setGeneratedQuote(quote);
  };

  const handleEmailQuote = async (quote: QuoteData) => {
    // This would integrate with the existing EmailJS system
    console.log('Email quote:', quote);
  };

  if (isCalculating) {
    return (
      <div className="suz-card-glass rounded-2xl p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="suz-text-body-lg text-slate-300">
            Berechnung läuft...
          </p>
        </div>
      </div>
    );
  }

  if (!estimate) {
    return (
      <div className="suz-card-glass rounded-2xl p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="suz-icon-badge-premium mb-4 mx-auto opacity-50">
            <Euro size={32} className="text-slate-400" />
          </div>
          <h3 className="suz-text-heading-lg font-bold text-slate-100 mb-2">
            Preisschätzung
          </h3>
          <p className="suz-text-body-lg text-slate-400">
            Füllen Sie das Formular aus, um eine Preisschätzung zu erhalten
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="suz-card-glass rounded-2xl p-8 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="suz-icon-badge-premium mb-4 mx-auto">
          <Euro size={32} className="text-green-400" />
        </div>
        <h3 className="suz-text-heading-xl font-bold text-slate-100 mb-2">
          Ihre Preisschätzung
        </h3>
        <p className="suz-text-body-md text-slate-300">
          Monatliche Kostenschätzung für {frequencyOption?.name.toLowerCase()} Reinigung
        </p>
      </div>

      {/* Main Price */}
      <div className="text-center py-6 border-y border-white/20">
        <div className="mb-2">
          <span className="suz-text-display-sm font-bold text-slate-100">
            {PricingEngine.formatPrice(estimate.totalPrice)}
          </span>
          {estimate.pricePerUnit && (
            <span className="block suz-text-body-lg text-slate-400 mt-2">
              {PricingEngine.formatPrice(estimate.pricePerUnit, false)} {estimate.unit}
            </span>
          )}
        </div>
        
        {estimate.savings && estimate.savings > 0 && (
          <div className="flex items-center justify-center gap-2 mt-3">
            <TrendingDown size={20} className="text-green-400" />
            <span className="suz-text-body-md text-green-400 font-medium">
              Sie sparen {PricingEngine.formatPrice(estimate.savings, false)} monatlich
            </span>
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3">
        <h4 className="suz-text-heading-md font-semibold text-slate-200">
          Preisaufschlüsselung
        </h4>
        <div className="space-y-2">
          {estimate.breakdown.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2">
              <span className="suz-text-body-md text-slate-300">
                {item.label}
              </span>
              <span className={`suz-text-body-md font-medium ${
                item.type === 'discount' 
                  ? 'text-green-400' 
                  : item.type === 'surcharge' 
                  ? 'text-orange-400' 
                  : 'text-slate-100'
              }`}>
                {item.type === 'discount' ? '-' : ''}
                {PricingEngine.formatPrice(Math.abs(item.amount), false)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-white/5 rounded-xl p-4 space-y-3">
        <h4 className="suz-text-body-lg font-semibold text-slate-200 mb-3">
          Ihre Vorteile bei SUZ
        </h4>
        <div className="space-y-2">
          {[
            'Kostenlose Besichtigung vor Ort',
            'Festpreisgarantie ohne versteckte Kosten',
            'Professionelle Reinigungsmittel inklusive',
            'Versicherungsschutz für alle Arbeiten',
            'Flexible Terminvereinbarung'
          ].map((benefit, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
              <span className="suz-text-body-sm text-slate-300">
                {benefit}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quote Generation CTA */}
      <div className="space-y-4 pt-4">
        <div className="text-center mb-4">
          <p className="suz-text-body-md text-slate-300 mb-2">
            Professionelles Angebot erstellen
          </p>
          <p className="suz-text-body-sm text-slate-400">
            Erhalten Sie ein detailliertes PDF-Angebot mit allen Details
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowQuoteManager(true)}
          className="w-full suz-btn-primary bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 flex items-center justify-center gap-2 py-4 text-lg font-semibold"
        >
          <FileText size={20} />
          Angebot generieren
        </button>

        <div className="text-center">
          <p className="suz-text-body-sm text-slate-400 mb-3">
            Oder kontaktieren Sie uns direkt
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <a
            href="https://wa.me/4917623152477"
            target="_blank"
            rel="noopener noreferrer"
            className="suz-btn-secondary bg-gradient-to-r from-green-500/20 to-green-600/20 border-green-400/30 text-green-400 hover:bg-green-400/10 flex items-center justify-center gap-2 py-3"
          >
            <Phone size={18} />
            WhatsApp
          </a>
          <a
            href={`mailto:info@suzreinigung.de?subject=Kostenvoranschlag%20${data.serviceType}&body=Hallo%2C%0A%0Aich%20interessiere%20mich%20für%20eine%20Preisschätzung%20für%3A%0A%0AService%3A%20${data.serviceType}%0AFläche%2FAnzahl%3A%20${data.areaSize}%0AHäufigkeit%3A%20${data.frequency}%0AStandort%3A%20${data.location}%0A%0AGesamtpreis%3A%20${PricingEngine.formatPrice(estimate.totalPrice)}%0A%0ABitte%20kontaktieren%20Sie%20mich%20für%20ein%20detailliertes%20Angebot.%0A%0AVielen%20Dank%21`}
            className="suz-btn-secondary border-blue-400/30 text-blue-400 hover:bg-blue-400/10 flex items-center justify-center gap-2 py-3"
          >
            <Mail size={18} />
            E-Mail
          </a>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-center pt-4 border-t border-white/10">
        <p className="suz-text-body-xs text-slate-500">
          * Preise sind Richtwerte. Endgültiger Preis nach kostenloser Besichtigung.
          <br />
          Alle Preise inkl. MwSt. Mindestauftragswert kann abweichen.
        </p>
      </div>

      {/* Quote Manager Modal */}
      {showQuoteManager && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-slate-900 border-b border-white/20 p-6 flex items-center justify-between">
              <h2 className="suz-text-heading-xl font-bold text-slate-100">
                Angebot erstellen
              </h2>
              <button
                type="button"
                onClick={() => setShowQuoteManager(false)}
                className="text-slate-400 hover:text-slate-100 transition-colors"
                aria-label="Schließen"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <QuoteManager
                calculatorData={data}
                priceEstimate={estimate}
                onQuoteGenerated={handleQuoteGenerated}
                onEmailQuote={handleEmailQuote}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceDisplay;
