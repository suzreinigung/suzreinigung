// Enhanced SUZ Calculator Form Component with Progressive Disclosure
// Redesigned with categorized dropdown sections and improved UX

import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  MapPin, 
  Clock, 
  Zap, 
  ChevronDown, 
  ChevronRight,
  Building,
  Settings,
  AlertCircle
} from 'lucide-react';
import { CalculatorFormProps, ValidationError } from './types';
import { 
  serviceOptions, 
  locationOptions, 
  frequencyOptions,
  additionalServices 
} from './ServicePricingData';
import { PricingEngine } from './PricingEngine';
import Tooltip, { tooltipContent } from './Tooltip';

interface FormSection {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  isOpen: boolean;
  isCompleted: boolean;
  isRequired: boolean;
}

const EnhancedCalculatorForm: React.FC<CalculatorFormProps> = ({
  data,
  onDataChange,
  onCalculate,
  isCalculating
}) => {
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [sections, setSections] = useState<FormSection[]>([
    { id: 'service', title: 'Service-Art', icon: Building, isOpen: true, isCompleted: false, isRequired: true },
    { id: 'location', title: 'Standort', icon: MapPin, isOpen: false, isCompleted: false, isRequired: true },
    { id: 'frequency', title: 'Häufigkeit', icon: Clock, isOpen: false, isCompleted: false, isRequired: true },
    { id: 'building', title: 'Gebäude-Details', icon: Building, isOpen: false, isCompleted: false, isRequired: false },
    { id: 'additional', title: 'Zusatzleistungen', icon: Settings, isOpen: false, isCompleted: false, isRequired: false },
    { id: 'urgency', title: 'Dringlichkeit', icon: Zap, isOpen: false, isCompleted: false, isRequired: false },
    { id: 'preferences', title: 'Präferenzen', icon: Settings, isOpen: false, isCompleted: false, isRequired: false }
  ]);

  // Auto-progress through sections
  useEffect(() => {
    setSections(prev => prev.map(section => {
      let isCompleted = false;
      let shouldOpenNext = false;

      switch (section.id) {
        case 'service':
          isCompleted = !!(data.serviceType && data.areaSize);
          shouldOpenNext = isCompleted;
          break;
        case 'location':
          isCompleted = !!data.location;
          shouldOpenNext = isCompleted && sections.find(s => s.id === 'service')?.isCompleted;
          break;
        case 'frequency':
          isCompleted = !!data.frequency;
          shouldOpenNext = isCompleted && sections.find(s => s.id === 'location')?.isCompleted;
          break;
        case 'additional':
          // Only mark completed if user has actively selected additional services
          isCompleted = data.additionalServices && data.additionalServices.length > 0;
          shouldOpenNext = sections.find(s => s.id === 'frequency')?.isCompleted || false;
          break;
        case 'urgency':
          // Only mark completed if user has actively selected urgency (not empty default)
          isCompleted = !!data.urgency && data.urgency !== '';
          break;
      }

      return { ...section, isCompleted };
    }));

    // Auto-open next section
    const currentOpenSection = sections.find(s => s.isOpen);
    if (currentOpenSection?.isCompleted) {
      const currentIndex = sections.findIndex(s => s.id === currentOpenSection.id);
      const nextSection = sections[currentIndex + 1];
      
      if (nextSection && !nextSection.isOpen) {
        toggleSection(nextSection.id);
      }
    }
  }, [data]);

  const toggleSection = (sectionId: string) => {
    setSections(prev => prev.map(section => ({
      ...section,
      isOpen: section.id === sectionId ? !section.isOpen : section.isOpen
    })));
  };

  const handleInputChange = (field: keyof typeof data, value: any) => {
    const newData = { ...data, [field]: value };
    onDataChange(newData);
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Auto-calculate when all required fields are filled
    if (newData.serviceType && newData.areaSize && newData.frequency && newData.location) {
      setTimeout(onCalculate, 300);
    }
  };

  const handleAdditionalServiceToggle = (serviceKey: string) => {
    const currentServices = data.additionalServices || [];
    const newServices = currentServices.includes(serviceKey)
      ? currentServices.filter(s => s !== serviceKey)
      : [...currentServices, serviceKey];
    
    handleInputChange('additionalServices', newServices);
  };

  const getFieldError = (field: string): string | null => {
    if (!touched[field]) return null;
    const validation = PricingEngine.validateData(data);
    return validation.errors.find(error => error.field === field)?.message || null;
  };

  const selectedService = serviceOptions.find(s => s.key === data.serviceType);

  return (
    <div className="suz-card-glass rounded-2xl p-8 space-y-6">
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

      {/* Progressive Disclosure Sections */}
      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="border border-white/10 rounded-xl overflow-hidden">
            {/* Section Header */}
            <button
              type="button"
              onClick={() => toggleSection(section.id)}
              className={`w-full p-4 flex items-center justify-between transition-all ${
                section.isOpen 
                  ? 'bg-blue-500/10 border-b border-white/10' 
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  section.isCompleted 
                    ? 'bg-green-500/20 text-green-400' 
                    : section.isOpen 
                    ? 'bg-blue-500/20 text-blue-400' 
                    : 'bg-white/10 text-slate-400'
                }`}>
                  <section.icon size={20} />
                </div>
                <div className="text-left">
                  <h4 className="suz-text-body-lg font-semibold text-slate-100">
                    {section.title}
                    {section.isRequired && <span className="text-red-400 ml-1">*</span>}
                  </h4>
                  {section.isCompleted && (
                    <p className="suz-text-body-sm text-green-400">Abgeschlossen</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {section.isCompleted && (
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                {section.isOpen ? (
                  <ChevronDown size={20} className="text-slate-400" />
                ) : (
                  <ChevronRight size={20} className="text-slate-400" />
                )}
              </div>
            </button>

            {/* Section Content */}
            {section.isOpen && (
              <div className="p-6 bg-white/5">
                {section.id === 'service' && (
                  <ServiceSection 
                    data={data}
                    selectedService={selectedService}
                    onInputChange={handleInputChange}
                    getFieldError={getFieldError}
                  />
                )}
                
                {section.id === 'location' && (
                  <LocationSection 
                    data={data}
                    onInputChange={handleInputChange}
                    getFieldError={getFieldError}
                  />
                )}
                
                {section.id === 'frequency' && (
                  <FrequencySection
                    data={data}
                    onInputChange={handleInputChange}
                    getFieldError={getFieldError}
                  />
                )}

                {section.id === 'building' && (
                  <BuildingDetailsSection
                    data={data}
                    onInputChange={handleInputChange}
                  />
                )}

                {section.id === 'additional' && (
                  <AdditionalServicesSection
                    data={data}
                    onToggleService={handleAdditionalServiceToggle}
                  />
                )}

                {section.id === 'urgency' && (
                  <UrgencySection
                    data={data}
                    onInputChange={handleInputChange}
                  />
                )}

                {section.id === 'preferences' && (
                  <PreferencesSection
                    data={data}
                    onInputChange={handleInputChange}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Calculation Status */}
      {isCalculating && (
        <div className="text-center py-4">
          <div className="inline-flex items-center gap-2 text-blue-400">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
            <span className="suz-text-body-md">Berechnung läuft...</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Service Selection Section Component
const ServiceSection: React.FC<{
  data: any;
  selectedService: any;
  onInputChange: (field: string, value: any) => void;
  getFieldError: (field: string) => string | null;
}> = ({ data, selectedService, onInputChange, getFieldError }) => (
  <div className="space-y-6">
    {/* Service Type Dropdown */}
    <div className="space-y-3">
      <label className="block suz-text-heading-md font-semibold text-slate-200 flex items-center gap-2">
        Reinigungsart auswählen
        <Tooltip
          title={tooltipContent.serviceType.title}
          content={tooltipContent.serviceType.content}
        />
      </label>
      <select
        value={data.serviceType || ''}
        onChange={(e) => onInputChange('serviceType', e.target.value)}
        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-slate-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
        aria-label="Reinigungsart auswählen"
      >
        <option value="">Bitte wählen Sie eine Reinigungsart</option>
        {serviceOptions.map((service) => (
          <option key={service.key} value={service.key} className="bg-slate-800">
            {service.name}
          </option>
        ))}
      </select>
      {getFieldError('serviceType') && (
        <p className="text-red-400 text-sm flex items-center gap-1">
          <AlertCircle size={16} />
          {getFieldError('serviceType')}
        </p>
      )}
    </div>

    {/* Area Size Input */}
    {selectedService && (
      <div className="space-y-3">
        <label className="block suz-text-heading-md font-semibold text-slate-200 flex items-center gap-2">
          {selectedService.placeholder}
          <Tooltip
            title={tooltipContent.areaSize.title}
            content={tooltipContent.areaSize.content}
          />
        </label>
        <div className="relative">
          <input
            type="number"
            min="1"
            max="10000"
            value={data.areaSize || ''}
            onChange={(e) => onInputChange('areaSize', parseInt(e.target.value) || 0)}
            placeholder={`z.B. 100 ${selectedService.unit}`}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-slate-100 placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
          />
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400">
            {selectedService.unit}
          </span>
        </div>
        {getFieldError('areaSize') && (
          <p className="text-red-400 text-sm flex items-center gap-1">
            <AlertCircle size={16} />
            {getFieldError('areaSize')}
          </p>
        )}
      </div>
    )}
  </div>
);

// Location Selection Section Component
const LocationSection: React.FC<{
  data: any;
  onInputChange: (field: string, value: any) => void;
  getFieldError: (field: string) => string | null;
}> = ({ data, onInputChange, getFieldError }) => (
  <div className="space-y-4">
    <label className="block suz-text-heading-md font-semibold text-slate-200 flex items-center gap-2">
      <MapPin size={20} />
      Standort
    </label>
    <div className="grid gap-3">
      {locationOptions.map((location) => (
        <button
          key={location.key}
          type="button"
          onClick={() => onInputChange('location', location.key)}
          className={`w-full p-4 rounded-lg border text-left transition-all ${
            data.location === location.key
              ? 'border-blue-400 bg-blue-400/10'
              : 'border-white/20 bg-white/5 hover:border-white/40'
          }`}
        >
          <div className="flex justify-between items-center">
            <span className="suz-text-body-lg text-slate-100 font-medium">
              {location.name}
            </span>
            {location.multiplier !== 1 && (
              <span className="suz-text-body-sm text-slate-400">
                {location.multiplier > 1 ? '+' : ''}{((location.multiplier - 1) * 100).toFixed(0)}%
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
    {getFieldError('location') && (
      <p className="text-red-400 text-sm flex items-center gap-1">
        <AlertCircle size={16} />
        {getFieldError('location')}
      </p>
    )}
  </div>
);

// Frequency Selection Section Component
const FrequencySection: React.FC<{
  data: any;
  onInputChange: (field: string, value: any) => void;
  getFieldError: (field: string) => string | null;
}> = ({ data, onInputChange, getFieldError }) => (
  <div className="space-y-4">
    <label className="block suz-text-heading-md font-semibold text-slate-200 flex items-center gap-2">
      <Clock size={20} />
      Häufigkeit
    </label>
    <div className="grid gap-3">
      {frequencyOptions.map((frequency) => (
        <button
          key={frequency.key}
          type="button"
          onClick={() => onInputChange('frequency', frequency.key)}
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
              <span className={`suz-text-body-sm font-medium ${
                frequency.discount > 0 ? 'text-green-400' : 'text-orange-400'
              }`}>
                {frequency.discount > 0 ? '-' : '+'}{Math.abs(frequency.discount * 100).toFixed(0)}%
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
    {getFieldError('frequency') && (
      <p className="text-red-400 text-sm flex items-center gap-1">
        <AlertCircle size={16} />
        {getFieldError('frequency')}
      </p>
    )}
  </div>
);

// Additional Services Section Component
const AdditionalServicesSection: React.FC<{
  data: any;
  onToggleService: (serviceKey: string) => void;
}> = ({ data, onToggleService }) => {
  const applicableServices = additionalServices.filter(service =>
    !data.serviceType || service.applicableServices.includes(data.serviceType)
  );

  return (
    <div className="space-y-4">
      <label className="block suz-text-heading-md font-semibold text-slate-200 flex items-center gap-2">
        <Settings size={20} />
        Zusatzleistungen (optional)
      </label>

      {applicableServices.length === 0 ? (
        <p className="suz-text-body-md text-slate-400 italic">
          Wählen Sie zuerst eine Reinigungsart aus, um verfügbare Zusatzleistungen zu sehen.
        </p>
      ) : (
        <div className="grid gap-3">
          {applicableServices.map((service) => {
            const isSelected = data.additionalServices?.includes(service.key) || false;

            return (
              <button
                key={service.key}
                type="button"
                onClick={() => onToggleService(service.key)}
                className={`w-full p-4 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'border-blue-400 bg-blue-400/10'
                    : 'border-white/20 bg-white/5 hover:border-white/40'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="suz-text-body-lg text-slate-100 font-medium">
                        {service.name}
                      </span>
                      {isSelected && (
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="suz-text-body-sm text-slate-400">
                      {service.description}
                    </p>
                  </div>
                  <span className="suz-text-body-md text-blue-400 font-medium ml-4">
                    +{service.price}€
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Urgency Selection Section Component
const UrgencySection: React.FC<{
  data: any;
  onInputChange: (field: string, value: any) => void;
}> = ({ data, onInputChange }) => {
  const urgencyOptions = [
    { key: 'standard', name: 'Standard', description: 'Normale Bearbeitung', surcharge: 0 },
    { key: 'express', name: 'Express', description: 'Schnelle Bearbeitung (24-48h)', surcharge: 25 },
    { key: 'emergency', name: 'Notfall', description: 'Sofortige Bearbeitung (innerhalb 24h)', surcharge: 50 }
  ];

  return (
    <div className="space-y-4">
      <label className="block suz-text-heading-md font-semibold text-slate-200 flex items-center gap-2">
        <Zap size={20} />
        Dringlichkeit (optional)
      </label>
      <div className="grid gap-3">
        {/* Show current selection or placeholder */}
        {!data.urgency && (
          <div className="w-full p-4 rounded-lg border border-white/20 bg-white/5 text-left opacity-60">
            <span className="suz-text-body-lg text-slate-400 font-medium">
              Keine Auswahl (Standard-Bearbeitung)
            </span>
            <p className="suz-text-body-sm text-slate-500 mt-1">
              Klicken Sie unten, um eine Dringlichkeitsstufe zu wählen
            </p>
          </div>
        )}

        {urgencyOptions.map((urgency) => (
          <button
            key={urgency.key}
            type="button"
            onClick={() => onInputChange('urgency', urgency.key)}
            className={`w-full p-4 rounded-lg border text-left transition-all ${
              data.urgency === urgency.key
                ? 'border-blue-400 bg-blue-400/10'
                : 'border-white/20 bg-white/5 hover:border-white/40'
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <span className="suz-text-body-lg text-slate-100 font-medium">
                  {urgency.name}
                </span>
                <p className="suz-text-body-sm text-slate-400 mt-1">
                  {urgency.description}
                </p>
              </div>
              {urgency.surcharge > 0 && (
                <span className="suz-text-body-sm text-orange-400 font-medium">
                  +{urgency.surcharge}%
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Building Details Section Component
const BuildingDetailsSection: React.FC<{
  data: any;
  onInputChange: (field: string, value: any) => void;
}> = ({ data, onInputChange }) => (
  <div className="space-y-6">
    <label className="block suz-text-heading-md font-semibold text-slate-200 flex items-center gap-2">
      <Building size={20} />
      Gebäude-Details (optional)
    </label>

    {/* Building Type */}
    <div className="space-y-3">
      <label className="block suz-text-body-lg font-medium text-slate-300">
        Gebäudetyp
      </label>
      <div className="grid grid-cols-2 gap-3">
        {[
          { key: 'single_floor', name: 'Einstöckig', description: 'Erdgeschoss oder einzelne Etage' },
          { key: 'multi_floor', name: 'Mehrstöckig', description: '2-5 Etagen' },
          { key: 'high_rise', name: 'Hochhaus', description: '6+ Etagen' },
          { key: 'complex', name: 'Komplex', description: 'Mehrere Gebäude' }
        ].map((type) => (
          <button
            key={type.key}
            type="button"
            onClick={() => onInputChange('buildingType', type.key)}
            className={`p-3 rounded-lg border text-left transition-all ${
              data.buildingType === type.key
                ? 'border-blue-400 bg-blue-400/10'
                : 'border-white/20 bg-white/5 hover:border-white/40'
            }`}
          >
            <div className="suz-text-body-md text-slate-100 font-medium">
              {type.name}
            </div>
            <div className="suz-text-body-sm text-slate-400 mt-1">
              {type.description}
            </div>
          </button>
        ))}
      </div>
    </div>

    {/* Number of Floors */}
    {(data.buildingType === 'multi_floor' || data.buildingType === 'high_rise') && (
      <div className="space-y-3">
        <label className="block suz-text-body-lg font-medium text-slate-300">
          Anzahl Etagen
        </label>
        <input
          type="number"
          min="1"
          max="50"
          value={data.numberOfFloors || ''}
          onChange={(e) => onInputChange('numberOfFloors', parseInt(e.target.value) || 1)}
          placeholder="z.B. 3"
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-slate-100 placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
          aria-label="Anzahl Etagen"
        />
      </div>
    )}

    {/* Access Difficulty */}
    <div className="space-y-3">
      <label className="block suz-text-body-lg font-medium text-slate-300">
        Zugang zum Gebäude
      </label>
      <div className="grid gap-2">
        {[
          { key: 'easy', name: 'Einfach', description: 'Ebenerdig, gute Erreichbarkeit' },
          { key: 'moderate', name: 'Moderat', description: 'Wenige Stufen, normale Zugänglichkeit' },
          { key: 'difficult', name: 'Schwierig', description: 'Viele Stufen, enge Zugänge' },
          { key: 'very_difficult', name: 'Sehr schwierig', description: 'Komplizierte Anfahrt, schwer zugänglich' }
        ].map((access) => (
          <button
            key={access.key}
            type="button"
            onClick={() => onInputChange('accessDifficulty', access.key)}
            className={`p-3 rounded-lg border text-left transition-all ${
              data.accessDifficulty === access.key
                ? 'border-blue-400 bg-blue-400/10'
                : 'border-white/20 bg-white/5 hover:border-white/40'
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="suz-text-body-md text-slate-100 font-medium">
                  {access.name}
                </div>
                <div className="suz-text-body-sm text-slate-400 mt-1">
                  {access.description}
                </div>
              </div>
              {access.key !== 'easy' && (
                <span className="suz-text-body-sm text-orange-400">
                  +{access.key === 'moderate' ? '5' : access.key === 'difficult' ? '10' : '15'}%
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>

    {/* Parking and Elevator */}
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-3">
        <label className="block suz-text-body-lg font-medium text-slate-300">
          Parkplatz verfügbar
        </label>
        <div className="flex gap-3">
          {[
            { key: true, name: 'Ja' },
            { key: false, name: 'Nein' }
          ].map((option) => (
            <button
              key={option.key.toString()}
              type="button"
              onClick={() => onInputChange('parkingAvailable', option.key)}
              className={`flex-1 p-3 rounded-lg border transition-all ${
                data.parkingAvailable === option.key
                  ? 'border-blue-400 bg-blue-400/10 text-slate-100'
                  : 'border-white/20 bg-white/5 text-slate-300 hover:border-white/40'
              }`}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="block suz-text-body-lg font-medium text-slate-300">
          Aufzug vorhanden
        </label>
        <div className="flex gap-3">
          {[
            { key: true, name: 'Ja' },
            { key: false, name: 'Nein' }
          ].map((option) => (
            <button
              key={option.key.toString()}
              type="button"
              onClick={() => onInputChange('elevatorAccess', option.key)}
              className={`flex-1 p-3 rounded-lg border transition-all ${
                data.elevatorAccess === option.key
                  ? 'border-blue-400 bg-blue-400/10 text-slate-100'
                  : 'border-white/20 bg-white/5 text-slate-300 hover:border-white/40'
              }`}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Preferences Section Component
const PreferencesSection: React.FC<{
  data: any;
  onInputChange: (field: string, value: any) => void;
}> = ({ data, onInputChange }) => {
  const handleEnvironmentalToggle = (preference: string) => {
    const current = data.environmentalPreferences || [];
    const updated = current.includes(preference)
      ? current.filter((p: string) => p !== preference)
      : [...current, preference];
    onInputChange('environmentalPreferences', updated);
  };

  return (
    <div className="space-y-6">
      <label className="block suz-text-heading-md font-semibold text-slate-200 flex items-center gap-2">
        <Settings size={20} />
        Präferenzen & Anmerkungen (optional)
      </label>

      {/* Environmental Preferences */}
      <div className="space-y-3">
        <label className="block suz-text-body-lg font-medium text-slate-300">
          Umweltfreundliche Optionen
        </label>
        <div className="grid gap-3">
          {[
            { key: 'eco_products', name: 'Umweltfreundliche Reinigungsmittel', description: 'Biologisch abbaubare Produkte' },
            { key: 'minimal_packaging', name: 'Minimale Verpackung', description: 'Reduzierte Plastikverwendung' },
            { key: 'energy_efficient', name: 'Energieeffiziente Geräte', description: 'Stromsparende Reinigungsgeräte' },
            { key: 'waste_reduction', name: 'Abfallreduzierung', description: 'Wiederverwendbare Materialien' }
          ].map((pref) => {
            const isSelected = data.environmentalPreferences?.includes(pref.key) || false;

            return (
              <button
                key={pref.key}
                type="button"
                onClick={() => handleEnvironmentalToggle(pref.key)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'border-green-400 bg-green-400/10'
                    : 'border-white/20 bg-white/5 hover:border-white/40'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="suz-text-body-md text-slate-100 font-medium">
                        {pref.name}
                      </span>
                      {isSelected && (
                        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="suz-text-body-sm text-slate-400">
                      {pref.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Security Requirements */}
      <div className="space-y-3">
        <label className="block suz-text-body-lg font-medium text-slate-300">
          Sicherheitsanforderungen
        </label>
        <div className="grid gap-2">
          {[
            { key: 'none', name: 'Keine besonderen', description: 'Standard-Sicherheitsmaßnahmen' },
            { key: 'basic', name: 'Grundlegend', description: 'Ausweispflicht, Anmeldung' },
            { key: 'enhanced', name: 'Erweitert', description: 'Sicherheitsschulung, Hintergrundprüfung' },
            { key: 'maximum', name: 'Maximum', description: 'Vollständige Sicherheitsfreigabe erforderlich' }
          ].map((security) => (
            <button
              key={security.key}
              type="button"
              onClick={() => onInputChange('securityRequirements', security.key)}
              className={`p-3 rounded-lg border text-left transition-all ${
                data.securityRequirements === security.key
                  ? 'border-blue-400 bg-blue-400/10'
                  : 'border-white/20 bg-white/5 hover:border-white/40'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="suz-text-body-md text-slate-100 font-medium">
                    {security.name}
                  </div>
                  <div className="suz-text-body-sm text-slate-400 mt-1">
                    {security.description}
                  </div>
                </div>
                {security.key !== 'none' && (
                  <span className="suz-text-body-sm text-orange-400">
                    +{security.key === 'basic' ? '5' : security.key === 'enhanced' ? '10' : '20'}%
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Contact Preference */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <label className="block suz-text-body-lg font-medium text-slate-300">
            Bevorzugter Kontakt
          </label>
          <div className="space-y-2">
            {[
              { key: 'phone', name: 'Telefon' },
              { key: 'email', name: 'E-Mail' },
              { key: 'whatsapp', name: 'WhatsApp' }
            ].map((contact) => (
              <button
                key={contact.key}
                type="button"
                onClick={() => onInputChange('contactPreference', contact.key)}
                className={`w-full p-2 rounded-lg border transition-all ${
                  data.contactPreference === contact.key
                    ? 'border-blue-400 bg-blue-400/10 text-slate-100'
                    : 'border-white/20 bg-white/5 text-slate-300 hover:border-white/40'
                }`}
              >
                {contact.name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="block suz-text-body-lg font-medium text-slate-300">
            Bevorzugte Zeit
          </label>
          <div className="space-y-2">
            {[
              { key: 'morning', name: 'Morgens' },
              { key: 'afternoon', name: 'Nachmittags' },
              { key: 'evening', name: 'Abends' },
              { key: 'flexible', name: 'Flexibel' }
            ].map((time) => (
              <button
                key={time.key}
                type="button"
                onClick={() => onInputChange('preferredTimeSlot', time.key)}
                className={`w-full p-2 rounded-lg border transition-all ${
                  data.preferredTimeSlot === time.key
                    ? 'border-blue-400 bg-blue-400/10 text-slate-100'
                    : 'border-white/20 bg-white/5 text-slate-300 hover:border-white/40'
                }`}
              >
                {time.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Notes */}
      <div className="space-y-3">
        <label className="block suz-text-body-lg font-medium text-slate-300">
          Besondere Wünsche oder Anmerkungen
        </label>
        <textarea
          value={data.customNotes || ''}
          onChange={(e) => onInputChange('customNotes', e.target.value)}
          placeholder="z.B. Allergien, spezielle Anforderungen, Zugangszeiten..."
          rows={4}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-slate-100 placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all resize-none"
          aria-label="Besondere Wünsche oder Anmerkungen"
        />
        <p className="suz-text-body-sm text-slate-400">
          Teilen Sie uns alle wichtigen Details mit, die für die Reinigung relevant sind.
        </p>
      </div>
    </div>
  );
};

export default EnhancedCalculatorForm;
