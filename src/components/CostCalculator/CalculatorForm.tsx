// SUZ Calculator Form Component
// Handles user input for cost calculation with SUZ design system

import React, { useState, useEffect } from 'react';
import { Calculator, MapPin, Clock, Zap } from 'lucide-react';
import { CalculatorFormProps, ValidationError } from './types';
import { 
  serviceOptions, 
  locationOptions, 
  frequencyOptions,
  additionalServices 
} from './ServicePricingData';
import { PricingEngine } from './PricingEngine';

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  data,
  onDataChange,
  onCalculate,
  isCalculating
}) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validate form when data changes
  useEffect(() => {
    const validation = PricingEngine.validateData(data);
    setErrors(validation.errors);
  }, [data]);

  const handleInputChange = (field: keyof typeof data, value: any) => {
    const newData = { ...data, [field]: value };
    onDataChange(newData);
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Auto-calculate when all required fields are filled
    if (newData.serviceType && newData.areaSize && newData.frequency && newData.location) {
      setTimeout(onCalculate, 300); // Debounced calculation
    }
  };

  const handleAdditionalServiceToggle = (serviceKey: string) => {
    const currentServices = data.additionalServices || [];
    const newServices = currentServices.includes(serviceKey)
      ? currentServices.filter(s => s !== serviceKey)
      : [...currentServices, serviceKey];
    
    handleInputChange('additionalServices', newServices);
  };

  const getFieldError = (field: string) => {
    return errors.find(error => error.field === field && touched[field])?.message;
  };

  const selectedService = serviceOptions.find(s => s.key === data.serviceType);
  const applicableAdditionalServices = additionalServices.filter(
    service => data.serviceType && service.applicableServices.includes(data.serviceType)
  );

  return (
    <div className="suz-card-glass rounded-2xl p-8 space-y-8">
      <div className="text-center mb-8">
        <div className="suz-icon-badge-premium mb-4 mx-auto">
          <Calculator size={32} className="text-blue-400" />
        </div>
        <h3 className="suz-text-heading-xl font-bold text-slate-100 mb-2">
          Kostenrechner
        </h3>
        <p className="suz-text-body-lg text-slate-300">
          Erhalten Sie sofort eine monatliche Preisschätzung für Ihre Reinigung
        </p>
      </div>

      {/* Service Selection */}
      <div className="space-y-4">
        <label className="block suz-text-heading-md font-semibold text-slate-200">
          Welche Dienstleistung benötigen Sie?
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {serviceOptions.map((service) => (
            <button
              key={service.key}
              type="button"
              onClick={() => handleInputChange('serviceType', service.key)}
              className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                data.serviceType === service.key
                  ? 'border-blue-400 bg-blue-400/10 shadow-lg'
                  : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{service.icon}</span>
                <div>
                  <h4 className="suz-text-body-lg font-semibold text-slate-100 mb-1">
                    {service.name}
                  </h4>
                  <p className="suz-text-body-sm text-slate-400">
                    {service.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
        {getFieldError('serviceType') && (
          <p className="text-red-400 text-sm mt-2">{getFieldError('serviceType')}</p>
        )}
      </div>

      {/* Area Size Input */}
      {selectedService && (
        <div className="space-y-4">
          <label className="block suz-text-heading-md font-semibold text-slate-200">
            {selectedService.placeholder}
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              max="10000"
              value={data.areaSize || ''}
              onChange={(e) => handleInputChange('areaSize', parseInt(e.target.value) || 0)}
              placeholder={`z.B. 100 ${selectedService.unit}`}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-slate-100 placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400">
              {selectedService.unit}
            </span>
          </div>
          {getFieldError('areaSize') && (
            <p className="text-red-400 text-sm mt-2">{getFieldError('areaSize')}</p>
          )}
        </div>
      )}

      {/* Location Selection */}
      <div className="space-y-4">
        <label className="block suz-text-heading-md font-semibold text-slate-200 flex items-center gap-2">
          <MapPin size={20} />
          Standort
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {locationOptions.map((location) => (
            <button
              key={location.key}
              type="button"
              onClick={() => handleInputChange('location', location.key)}
              className={`p-3 rounded-lg border text-left transition-all ${
                data.location === location.key
                  ? 'border-blue-400 bg-blue-400/10'
                  : 'border-white/20 bg-white/5 hover:border-white/40'
              }`}
            >
              <span className="suz-text-body-md text-slate-100 font-medium">
                {location.name}
              </span>
              {location.multiplier !== 1.0 && (
                <span className={`block text-xs mt-1 ${
                  location.multiplier > 1.0 ? 'text-orange-400' : 'text-green-400'
                }`}>
                  {location.multiplier > 1.0 ? '+' : ''}{((location.multiplier - 1) * 100).toFixed(0)}%
                </span>
              )}
            </button>
          ))}
        </div>
        {getFieldError('location') && (
          <p className="text-red-400 text-sm mt-2">{getFieldError('location')}</p>
        )}
      </div>

      {/* Frequency Selection */}
      <div className="space-y-4">
        <label className="block suz-text-heading-md font-semibold text-slate-200 flex items-center gap-2">
          <Clock size={20} />
          Häufigkeit
        </label>
        <div className="space-y-3">
          {frequencyOptions.map((frequency) => (
            <button
              key={frequency.key}
              type="button"
              onClick={() => handleInputChange('frequency', frequency.key)}
              className={`w-full p-4 rounded-lg border text-left transition-all ${
                data.frequency === frequency.key
                  ? 'border-blue-400 bg-blue-400/10'
                  : 'border-white/20 bg-white/5 hover:border-white/40'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="suz-text-body-lg text-slate-100 font-medium">
                    {frequency.name}
                  </span>
                  <p className="suz-text-body-sm text-slate-400 mt-1">
                    {frequency.description}
                  </p>
                </div>
                {frequency.discount !== 0 && (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    frequency.discount > 0 
                      ? 'bg-green-400/20 text-green-400' 
                      : 'bg-orange-400/20 text-orange-400'
                  }`}>
                    {frequency.discount > 0 ? '-' : '+'}{Math.abs(frequency.discount * 100).toFixed(0)}%
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
        {getFieldError('frequency') && (
          <p className="text-red-400 text-sm mt-2">{getFieldError('frequency')}</p>
        )}
      </div>

      {/* Additional Services */}
      {applicableAdditionalServices.length > 0 && (
        <div className="space-y-4">
          <label className="block suz-text-heading-md font-semibold text-slate-200">
            Zusatzleistungen (optional)
          </label>
          <div className="space-y-3">
            {applicableAdditionalServices.map((service) => (
              <label
                key={service.key}
                className="flex items-center gap-3 p-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 cursor-pointer transition-all"
              >
                <input
                  type="checkbox"
                  checked={data.additionalServices?.includes(service.key) || false}
                  onChange={() => handleAdditionalServiceToggle(service.key)}
                  className="w-4 h-4 text-blue-400 bg-transparent border-white/40 rounded focus:ring-blue-400 focus:ring-2"
                />
                <div className="flex-1">
                  <span className="suz-text-body-md text-slate-100 font-medium">
                    {service.name}
                  </span>
                  <p className="suz-text-body-sm text-slate-400">
                    {service.description}
                  </p>
                </div>
                <span className="suz-text-body-sm text-blue-400 font-medium">
                  {PricingEngine.formatPrice(service.price)}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Urgency Selection */}
      <div className="space-y-4">
        <label className="block suz-text-heading-md font-semibold text-slate-200 flex items-center gap-2">
          <Zap size={20} />
          Dringlichkeit
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { key: 'standard', name: 'Standard', description: 'Normale Bearbeitung' },
            { key: 'express', name: 'Express', description: '+30% Aufschlag' },
            { key: 'emergency', name: 'Notfall', description: '+50% Aufschlag' }
          ].map((urgency) => (
            <button
              key={urgency.key}
              type="button"
              onClick={() => handleInputChange('urgency', urgency.key)}
              className={`p-3 rounded-lg border text-center transition-all ${
                data.urgency === urgency.key
                  ? 'border-blue-400 bg-blue-400/10'
                  : 'border-white/20 bg-white/5 hover:border-white/40'
              }`}
            >
              <span className="block suz-text-body-md text-slate-100 font-medium">
                {urgency.name}
              </span>
              <span className="block suz-text-body-sm text-slate-400 mt-1">
                {urgency.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Calculate Button */}
      <button
        type="button"
        onClick={onCalculate}
        disabled={isCalculating || errors.length > 0}
        className="w-full suz-btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isCalculating ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Berechnung läuft...
          </div>
        ) : (
          'Preis berechnen'
        )}
      </button>
    </div>
  );
};

export default CalculatorForm;
