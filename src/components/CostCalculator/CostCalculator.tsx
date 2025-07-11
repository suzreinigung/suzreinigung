// SUZ Cost Calculator Main Component
// Integrates form and display components with SUZ design system

import React, { useState, useCallback, useEffect } from 'react';
import { Calculator } from 'lucide-react';
import { CalculatorData, PriceEstimate } from './types';
import { PricingEngine } from './PricingEngine';
import EnhancedCalculatorForm from './EnhancedCalculatorForm';
import PriceDisplay from './PriceDisplay';

// Analytics tracking (if available)
const trackCalculatorEvent = (action: string, data?: any) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: 'cost_calculator',
      event_label: data?.serviceType || 'unknown',
      value: data?.totalPrice || 0
    });
  }
};

const CostCalculator: React.FC = () => {
  const [calculatorData, setCalculatorData] = useState<CalculatorData>({
    serviceType: '' as any,
    propertyType: 'office',
    areaSize: 0,
    location: '' as any,
    frequency: '' as any,
    additionalServices: [],
    urgency: '' as any, // Changed from 'standard' to empty - user must actively select
    specialRequirements: '',
    // Enhanced customization fields
    buildingType: undefined,
    numberOfFloors: undefined,
    accessDifficulty: 'easy',
    parkingAvailable: true,
    elevatorAccess: false,
    securityRequirements: 'none',
    environmentalPreferences: [],
    customNotes: '',
    contactPreference: 'phone',
    preferredTimeSlot: 'flexible'
  });

  const [estimate, setEstimate] = useState<PriceEstimate | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Debounced calculation function
  const calculatePrice = useCallback(async () => {
    const validation = PricingEngine.validateData(calculatorData);
    if (!validation.isValid) {
      setEstimate(null);
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation delay for better UX
    setTimeout(() => {
      try {
        const newEstimate = PricingEngine.calculateEstimate(calculatorData);
        setEstimate(newEstimate);
        
        // Track calculation event
        if (newEstimate) {
          trackCalculatorEvent('price_calculated', {
            serviceType: calculatorData.serviceType,
            totalPrice: newEstimate.totalPrice,
            frequency: calculatorData.frequency,
            location: calculatorData.location
          });
        }
      } catch (error) {
        console.error('Calculation error:', error);
        setEstimate(null);
      } finally {
        setIsCalculating(false);
      }
    }, 500);
  }, [calculatorData]);

  // Handle data changes
  const handleDataChange = useCallback((newData: CalculatorData) => {
    setCalculatorData(newData);
    
    // Track service selection
    if (newData.serviceType !== calculatorData.serviceType && newData.serviceType) {
      trackCalculatorEvent('service_selected', {
        serviceType: newData.serviceType
      });
    }
  }, [calculatorData.serviceType]);

  // Auto-calculate when required fields are complete
  useEffect(() => {
    const { serviceType, areaSize, frequency, location } = calculatorData;
    if (serviceType && areaSize > 0 && frequency && location) {
      calculatePrice();
    } else {
      setEstimate(null);
    }
  }, [calculatorData, calculatePrice]);

  // Track component mount
  useEffect(() => {
    trackCalculatorEvent('calculator_viewed');
  }, []);

  return (
    <section 
      id="cost-calculator" 
      className="suz-section-standard bg-slate-800/20 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <header className="text-center mb-16">
          <div className="suz-icon-badge-premium mb-6 mx-auto">
            <Calculator size={40} className="text-blue-400" />
          </div>
          <h2 className="suz-text-display-md font-bold text-slate-100 mb-6">
            Kostenrechner
          </h2>
          <p className="suz-text-body-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Erhalten Sie sofort eine transparente monatliche Preisschätzung für Ihre Reinigungsdienstleistung.
            Unverbindlich und kostenlos.
          </p>
        </header>

        {/* Calculator Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Calculator Form */}
          <div className="order-2 lg:order-1">
            <EnhancedCalculatorForm
              data={calculatorData}
              onDataChange={handleDataChange}
              onCalculate={calculatePrice}
              isCalculating={isCalculating}
            />
          </div>

          {/* Price Display */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-8">
            <PriceDisplay
              estimate={estimate}
              isCalculating={isCalculating}
              data={calculatorData}
            />
          </div>
        </div>

        {/* Trust Indicators Section */}
        <div className="mt-20 text-center">
          <h3 className="suz-text-heading-xl font-bold text-slate-100 mb-8">
            Warum SUZ Reinigung?
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🏆',
                title: 'Über 20 Jahre Erfahrung',
                description: 'Professionelle Reinigungsdienstleistungen seit 2000'
              },
              {
                icon: '💎',
                title: 'Premium Qualität',
                description: 'Höchste Standards mit modernster Ausrüstung'
              },
              {
                icon: '🛡️',
                title: 'Vollversichert',
                description: 'Umfassender Versicherungsschutz für alle Arbeiten'
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="suz-card-glass rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h4 className="suz-text-heading-md font-semibold text-slate-100 mb-3">
                  {item.title}
                </h4>
                <p className="suz-text-body-md text-slate-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="suz-card-glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="suz-text-heading-xl font-bold text-slate-100 mb-4">
              Bereit für Ihr kostenloses Angebot?
            </h3>
            <p className="suz-text-body-lg text-slate-300 mb-8">
              Kontaktieren Sie uns für eine unverbindliche Beratung und detaillierte Kostenaufstellung.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/4917623152477"
                target="_blank"
                rel="noopener noreferrer"
                className="suz-btn-primary bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-8 py-4 text-lg"
                onClick={() => trackCalculatorEvent('contact_whatsapp')}
              >
                📱 WhatsApp Kontakt
              </a>
              <a
                href="mailto:info@suzreinigung.de?subject=Kostenvoranschlag%20Anfrage"
                className="suz-btn-secondary border-blue-400 text-blue-400 hover:bg-blue-400/10 px-8 py-4 text-lg"
                onClick={() => trackCalculatorEvent('contact_email')}
              >
                ✉️ E-Mail senden
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostCalculator;
