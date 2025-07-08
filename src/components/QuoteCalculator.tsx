import { useState, useEffect } from 'react';
import { trackBusinessEvents } from '@/lib/analytics';

interface QuoteCalculatorProps {
  preselectedService?: string;
  onRequestQuote?: (data: any) => void;
}

interface CalculatorData {
  serviceType: string;
  areaSize: string;
  frequency: string;
  location: string;
  additionalServices: string[];
  urgency: string;
}

interface PriceEstimate {
  basePrice: number;
  totalPrice: number;
  frequency: string;
  savings?: number;
  breakdown: {
    label: string;
    amount: number;
  }[];
}

const QuoteCalculator = ({ preselectedService, onRequestQuote }: QuoteCalculatorProps) => {
  const [data, setData] = useState<CalculatorData>({
    serviceType: preselectedService || '',
    areaSize: '',
    frequency: '',
    location: '',
    additionalServices: [],
    urgency: 'normal',
  });

  const [estimate, setEstimate] = useState<PriceEstimate | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Service pricing data
  const servicePricing = {
    bueroreinigung: { base: 15, perM2: 0.8, min: 120 },
    hausreinigung: { base: 18, perM2: 1.2, min: 80 },
    fensterreinigung: { base: 2.5, perWindow: 3, min: 40 },
    grundreinigung: { base: 25, perM2: 2.0, min: 200 },
  };

  const frequencyMultipliers = {
    einmalig: 1.0,
    woechentlich: 0.85,
    'alle-2-wochen': 0.9,
    monatlich: 0.95,
    quartalsweise: 1.1,
  };

  const locationMultipliers = {
    koeln: 1.0,
    bonn: 1.05,
    duesseldorf: 1.1,
    umgebung: 0.95,
    other: 1.0,
  };

  const additionalServicePrices = {
    fenster: 25,
    teppich: 35,
    polster: 40,
    balkon: 20,
    keller: 30,
    garage: 25,
  };

  const calculateEstimate = () => {
    if (!data.serviceType || !data.areaSize || !data.frequency) return;

    setIsCalculating(true);

    // Simulate calculation delay for better UX
    setTimeout(() => {
      const service = servicePricing[data.serviceType as keyof typeof servicePricing];
      if (!service) return;

      let basePrice = 0;
      const breakdown: { label: string; amount: number }[] = [];

      // Calculate base price based on service type
      if (data.serviceType === 'fensterreinigung') {
        const windowCount = parseInt(data.areaSize) || 10;
        basePrice = Math.max(windowCount * service.perWindow, service.min);
        breakdown.push({ label: `${windowCount} Fenster`, amount: basePrice });
      } else {
        const areaM2 = parseInt(data.areaSize) || 100;
        basePrice = Math.max(service.base * 2 + areaM2 * service.perM2, service.min);
        breakdown.push({ label: `${areaM2}m² Grundreinigung`, amount: basePrice });
      }

      // Apply frequency multiplier
      const freqMultiplier = frequencyMultipliers[data.frequency as keyof typeof frequencyMultipliers] || 1;
      const frequencyAdjustedPrice = basePrice * freqMultiplier;
      
      if (freqMultiplier < 1) {
        const savings = basePrice - frequencyAdjustedPrice;
        breakdown.push({ label: `${data.frequency} Rabatt`, amount: -savings });
      }

      // Apply location multiplier
      const locMultiplier = locationMultipliers[data.location as keyof typeof locationMultipliers] || 1;
      let totalPrice = frequencyAdjustedPrice * locMultiplier;

      if (locMultiplier !== 1) {
        const locationAdjustment = frequencyAdjustedPrice * (locMultiplier - 1);
        breakdown.push({ 
          label: locMultiplier > 1 ? 'Entfernungszuschlag' : 'Regionalrabatt', 
          amount: locationAdjustment 
        });
      }

      // Add additional services
      data.additionalServices.forEach(service => {
        const price = additionalServicePrices[service as keyof typeof additionalServicePrices];
        if (price) {
          totalPrice += price;
          breakdown.push({ label: getServiceLabel(service), amount: price });
        }
      });

      // Urgency surcharge
      if (data.urgency === 'urgent') {
        const urgencyCharge = totalPrice * 0.15;
        totalPrice += urgencyCharge;
        breakdown.push({ label: 'Express-Zuschlag', amount: urgencyCharge });
      }

      setEstimate({
        basePrice,
        totalPrice: Math.round(totalPrice),
        frequency: data.frequency,
        savings: freqMultiplier < 1 ? Math.round(basePrice - frequencyAdjustedPrice) : undefined,
        breakdown,
      });

      setIsCalculating(false);

      // Track calculator usage
      trackBusinessEvents.serviceInquiry(`calculator_${data.serviceType}`);
    }, 800);
  };

  const getServiceLabel = (key: string): string => {
    const labels: Record<string, string> = {
      fenster: 'Fensterreinigung',
      teppich: 'Teppichreinigung', 
      polster: 'Polsterreinigung',
      balkon: 'Balkon/Terrasse',
      keller: 'Keller',
      garage: 'Garage',
    };
    return labels[key] || key;
  };

  const handleInputChange = (field: keyof CalculatorData, value: string | string[]) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const toggleAdditionalService = (service: string) => {
    setData(prev => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(service)
        ? prev.additionalServices.filter(s => s !== service)
        : [...prev.additionalServices, service]
    }));
  };

  const handleRequestQuote = () => {
    if (onRequestQuote) {
      onRequestQuote({ ...data, estimate });
    }
    trackBusinessEvents.contactFormSubmit('calculator_quote_request');
  };

  useEffect(() => {
    if (data.serviceType && data.areaSize && data.frequency) {
      calculateEstimate();
    }
  }, [data]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Kostenvoranschlag Rechner
        </h2>
        <p className="text-gray-600">
          Erhalten Sie sofort eine Preisschätzung für Ihre Reinigungsdienstleistung
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Calculator Form */}
        <div className="space-y-6">
          {/* Service Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Welche Leistung benötigen Sie?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'bueroreinigung', label: 'Büroreinigung', icon: '🏢' },
                { key: 'hausreinigung', label: 'Hausreinigung', icon: '🏠' },
                { key: 'fensterreinigung', label: 'Fensterreinigung', icon: '🪟' },
                { key: 'grundreinigung', label: 'Grundreinigung', icon: '✨' },
              ].map(service => (
                <button
                  key={service.key}
                  onClick={() => handleInputChange('serviceType', service.key)}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    data.serviceType === service.key
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{service.icon}</div>
                  <div className="font-medium text-sm">{service.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Area Size */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              {data.serviceType === 'fensterreinigung' ? 'Anzahl Fenster' : 'Fläche in m²'}
            </label>
            <div className="grid grid-cols-4 gap-2">
              {data.serviceType === 'fensterreinigung' 
                ? ['5', '10', '15', '20+'].map(size => (
                    <button
                      key={size}
                      onClick={() => handleInputChange('areaSize', size.replace('+', ''))}
                      className={`py-3 px-2 border rounded-lg text-sm font-medium transition-colors ${
                        data.areaSize === size.replace('+', '')
                          ? 'border-blue-500 bg-blue-50 text-blue-900'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))
                : ['50', '100', '200', '300+'].map(size => (
                    <button
                      key={size}
                      onClick={() => handleInputChange('areaSize', size.replace('+', ''))}
                      className={`py-3 px-2 border rounded-lg text-sm font-medium transition-colors ${
                        data.areaSize === size.replace('+', '')
                          ? 'border-blue-500 bg-blue-50 text-blue-900'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {size}m²
                    </button>
                  ))
              }
            </div>
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Wie oft soll gereinigt werden?
            </label>
            <div className="space-y-2">
              {[
                { key: 'einmalig', label: 'Einmalig', badge: '' },
                { key: 'monatlich', label: 'Monatlich', badge: '5% Rabatt' },
                { key: 'alle-2-wochen', label: 'Alle 2 Wochen', badge: '10% Rabatt' },
                { key: 'woechentlich', label: 'Wöchentlich', badge: '15% Rabatt' },
              ].map(freq => (
                <button
                  key={freq.key}
                  onClick={() => handleInputChange('frequency', freq.key)}
                  className={`w-full p-3 border rounded-lg text-left transition-colors flex justify-between items-center ${
                    data.frequency === freq.key
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-medium">{freq.label}</span>
                  {freq.badge && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      {freq.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Standort
            </label>
            <select
              value={data.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Bitte wählen...</option>
              <option value="koeln">Köln</option>
              <option value="bonn">Bonn (+5%)</option>
              <option value="duesseldorf">Düsseldorf (+10%)</option>
              <option value="umgebung">Umgebung (-5%)</option>
              <option value="other">Andere Stadt</option>
            </select>
          </div>

          {/* Additional Services */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Zusätzliche Leistungen (optional)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: 'fenster', label: 'Fenster (+25€)' },
                { key: 'teppich', label: 'Teppich (+35€)' },
                { key: 'polster', label: 'Polster (+40€)' },
                { key: 'balkon', label: 'Balkon (+20€)' },
              ].map(service => (
                <button
                  key={service.key}
                  onClick={() => toggleAdditionalService(service.key)}
                  className={`p-2 border rounded text-sm transition-colors ${
                    data.additionalServices.includes(service.key)
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {service.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Estimate Display */}
        <div className="lg:pl-8">
          <div className="sticky top-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Ihre Preisschätzung
              </h3>

              {isCalculating ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Berechnet Ihr Angebot...</p>
                </div>
              ) : estimate ? (
                <div className="space-y-4">
                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    {estimate.breakdown.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.label}</span>
                        <span className={item.amount < 0 ? 'text-green-600' : 'text-gray-900'}>
                          {item.amount < 0 ? '-' : ''}€{Math.abs(item.amount)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <hr className="border-gray-200" />

                  {/* Total Price */}
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Geschätzter Preis:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      €{estimate.totalPrice}
                    </span>
                  </div>

                  {estimate.savings && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="text-sm text-green-800">
                        💰 Sie sparen €{estimate.savings} durch regelmäßige Reinigung!
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-gray-500 mt-4">
                    * Dies ist eine Schätzung. Der finale Preis wird nach einer kostenlosen Besichtigung festgelegt.
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3 mt-6">
                    <a
                      href={`/booking?service=${data.serviceType}`}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v6m6-6v6m-6-4v8m6-8v8" />
                      </svg>
                      Jetzt online buchen
                    </a>
                    
                    <button
                      onClick={handleRequestQuote}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Oder Angebot anfordern
                    </button>
                    
                    <a
                      href="https://wa.me/4917623152477"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.486"/>
                      </svg>
                      WhatsApp Beratung
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <p>Füllen Sie die Felder aus, um eine Preisschätzung zu erhalten</p>
                </div>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Kostenlose Besichtigung
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Keine versteckten Kosten
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                24h Antwortzeit garantiert
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCalculator;