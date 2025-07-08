import { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle, User, Mail, Phone, MapPin } from 'lucide-react';
import { trackBusinessEvents } from '@/lib/analytics';
import { 
  BookingFormData, 
  BookingSlot, 
  ServiceBooking, 
  BookingValidation,
  CustomerInfo 
} from '@/types/booking';
import {
  bookingServices,
  additionalBookingServices,
  generateTimeSlots,
  getServiceById,
  formatTimeForDisplay,
  formatDateForDisplay,
  validateBookingTime
} from '@/data/booking';

interface AdvancedBookingCalendarProps {
  preselectedService?: string;
  onBookingComplete?: (bookingData: BookingFormData) => void;
}

const AdvancedBookingCalendar = ({ preselectedService, onBookingComplete }: AdvancedBookingCalendarProps) => {
  const [currentStep, setCurrentStep] = useState<'service' | 'date' | 'time' | 'details' | 'confirmation'>('service');
  const [bookingData, setBookingData] = useState<BookingFormData>({
    selectedDate: '',
    selectedTimeSlot: '',
    serviceType: preselectedService || '',
    additionalServices: [],
    customer: {
      name: '',
      email: '',
      phone: '',
      company: '',
      address: {
        street: '',
        city: '',
        postalCode: ''
      }
    },
    specialRequests: ''
  });

  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<BookingSlot[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceBooking | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [validation, setValidation] = useState<BookingValidation>({ isValid: true, errors: {} });

  // Generate available dates for the next 30 days
  useEffect(() => {
    const dates: string[] = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    setAvailableDates(dates);
  }, []);

  // Update time slots when date or service changes
  useEffect(() => {
    if (bookingData.selectedDate && selectedService) {
      const timeSlots = generateTimeSlots(bookingData.selectedDate, selectedService.duration);
      const allSlots = [...timeSlots.morning, ...timeSlots.afternoon, ...timeSlots.evening];
      setAvailableTimeSlots(allSlots);
    }
  }, [bookingData.selectedDate, selectedService]);

  // Set selected service when service type changes
  useEffect(() => {
    if (bookingData.serviceType) {
      const service = getServiceById(bookingData.serviceType);
      setSelectedService(service || null);
    }
  }, [bookingData.serviceType]);

  const updateBookingData = (updates: Partial<BookingFormData>) => {
    setBookingData(prev => ({ ...prev, ...updates }));
  };

  const updateCustomerData = (updates: Partial<CustomerInfo>) => {
    setBookingData(prev => ({
      ...prev,
      customer: { ...prev.customer, ...updates }
    }));
  };

  const validateCurrentStep = (): boolean => {
    const errors: BookingValidation['errors'] = {};

    switch (currentStep) {
      case 'service':
        if (!bookingData.serviceType) {
          errors.service = 'Bitte wählen Sie eine Leistung aus';
        }
        break;
      
      case 'date':
        if (!bookingData.selectedDate) {
          errors.date = 'Bitte wählen Sie ein Datum aus';
        }
        break;
      
      case 'time':
        if (!bookingData.selectedTimeSlot) {
          errors.timeSlot = 'Bitte wählen Sie eine Uhrzeit aus';
        }
        break;
      
      case 'details':
        if (!bookingData.customer.name.trim()) {
          errors.customer = { ...errors.customer, name: 'Name ist erforderlich' };
        }
        if (!bookingData.customer.email.trim()) {
          errors.customer = { ...errors.customer, email: 'E-Mail ist erforderlich' };
        } else if (!/\S+@\S+\.\S+/.test(bookingData.customer.email)) {
          errors.customer = { ...errors.customer, email: 'Ungültige E-Mail-Adresse' };
        }
        if (!bookingData.customer.phone.trim()) {
          errors.customer = { ...errors.customer, phone: 'Telefonnummer ist erforderlich' };
        }
        break;
    }

    const isValid = Object.keys(errors).length === 0;
    setValidation({ isValid, errors });
    return isValid;
  };

  const handleNextStep = () => {
    if (!validateCurrentStep()) return;

    const steps: typeof currentStep[] = ['service', 'date', 'time', 'details', 'confirmation'];
    const currentIndex = steps.indexOf(currentStep);
    
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handlePreviousStep = () => {
    const steps: typeof currentStep[] = ['service', 'date', 'time', 'details', 'confirmation'];
    const currentIndex = steps.indexOf(currentStep);
    
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleBookingSubmit = async () => {
    if (!validateCurrentStep()) return;

    setIsLoading(true);

    try {
      // Track booking submission
      trackBusinessEvents.serviceInquiry(`booking_${bookingData.serviceType}`);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Call completion handler
      if (onBookingComplete) {
        onBookingComplete(bookingData);
      }

      console.log('Booking submitted:', bookingData);
    } catch (error) {
      console.error('Booking submission failed:', error);
      alert('Es gab ein Problem bei der Buchung. Bitte versuchen Sie es erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotalPrice = (): number => {
    if (!selectedService) return 0;
    
    const additionalPrice = bookingData.additionalServices.reduce((total, serviceId) => {
      const service = additionalBookingServices.find(s => s.id === serviceId);
      return total + (service?.price || 0);
    }, 0);

    return selectedService.basePrice + additionalPrice;
  };

  const renderProgressBar = () => {
    const steps = ['service', 'date', 'time', 'details', 'confirmation'];
    const currentIndex = steps.indexOf(currentStep);
    
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index <= currentIndex 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {index < currentIndex ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-full h-1 mx-2 ${
                  index < currentIndex ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold text-gray-900">
            {currentStep === 'service' && 'Leistung wählen'}
            {currentStep === 'date' && 'Datum wählen'}
            {currentStep === 'time' && 'Uhrzeit wählen'}
            {currentStep === 'details' && 'Ihre Daten'}
            {currentStep === 'confirmation' && 'Bestätigung'}
          </h3>
        </div>
      </div>
    );
  };

  const renderServiceSelection = () => (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">Welche Leistung benötigen Sie?</h4>
      <div className="grid gap-4">
        {bookingServices.map(service => (
          <button
            key={service.id}
            onClick={() => updateBookingData({ serviceType: service.id })}
            className={`p-4 border-2 rounded-lg text-left transition-all ${
              bookingData.serviceType === service.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h5 className="font-semibold text-gray-900">{service.serviceName}</h5>
                <p className="text-sm text-gray-600">
                  ca. {service.duration / 60} Stunden • ab €{service.basePrice}
                </p>
                {service.requiresAssessment && (
                  <span className="inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                    Besichtigung erforderlich
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
      {validation.errors.service && (
        <p className="text-red-500 text-sm">{validation.errors.service}</p>
      )}
    </div>
  );

  const renderDateSelection = () => (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">Wann soll der Termin stattfinden?</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {availableDates.slice(0, 14).map(date => {
          const dateObj = new Date(date);
          const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;
          
          return (
            <button
              key={date}
              onClick={() => updateBookingData({ selectedDate: date, selectedTimeSlot: '' })}
              className={`p-3 border-2 rounded-lg text-center transition-all ${
                bookingData.selectedDate === date
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              } ${isWeekend ? 'bg-gray-50' : ''}`}
            >
              <div className="text-sm text-gray-600">
                {dateObj.toLocaleDateString('de-DE', { weekday: 'short' })}
              </div>
              <div className="font-semibold">
                {dateObj.toLocaleDateString('de-DE', { day: 'numeric', month: 'short' })}
              </div>
              {isWeekend && (
                <div className="text-xs text-yellow-600 mt-1">Wochenende</div>
              )}
            </button>
          );
        })}
      </div>
      {validation.errors.date && (
        <p className="text-red-500 text-sm">{validation.errors.date}</p>
      )}
    </div>
  );

  const renderTimeSelection = () => {
    if (!bookingData.selectedDate) return null;

    const timeSlots = generateTimeSlots(bookingData.selectedDate, selectedService?.duration || 120);

    return (
      <div className="space-y-6">
        <h4 className="text-lg font-semibold text-gray-900">
          Uhrzeit für {formatDateForDisplay(bookingData.selectedDate)}
        </h4>

        {/* Morning Slots */}
        {timeSlots.morning.length > 0 && (
          <div>
            <h5 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Vormittag (8:00 - 12:00)
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {timeSlots.morning.map(slot => (
                <button
                  key={slot.id}
                  onClick={() => updateBookingData({ selectedTimeSlot: slot.id })}
                  className={`p-3 border rounded-lg text-center transition-all ${
                    bookingData.selectedTimeSlot === slot.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${slot.isPreferred ? 'ring-2 ring-green-200' : ''}`}
                >
                  <div className="font-medium">{formatTimeForDisplay(slot.startTime)}</div>
                  {slot.isPreferred && (
                    <div className="text-xs text-green-600 mt-1">Empfohlen</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Afternoon Slots */}
        {timeSlots.afternoon.length > 0 && (
          <div>
            <h5 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Nachmittag (12:00 - 17:00)
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {timeSlots.afternoon.map(slot => (
                <button
                  key={slot.id}
                  onClick={() => updateBookingData({ selectedTimeSlot: slot.id })}
                  className={`p-3 border rounded-lg text-center transition-all ${
                    bookingData.selectedTimeSlot === slot.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${slot.isPreferred ? 'ring-2 ring-green-200' : ''}`}
                >
                  <div className="font-medium">{formatTimeForDisplay(slot.startTime)}</div>
                  {slot.isPreferred && (
                    <div className="text-xs text-green-600 mt-1">Empfohlen</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Evening Slots */}
        {timeSlots.evening.length > 0 && (
          <div>
            <h5 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Abend (17:00 - 20:00)
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {timeSlots.evening.map(slot => (
                <button
                  key={slot.id}
                  onClick={() => updateBookingData({ selectedTimeSlot: slot.id })}
                  className={`p-3 border rounded-lg text-center transition-all ${
                    bookingData.selectedTimeSlot === slot.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${slot.isPreferred ? 'ring-2 ring-green-200' : ''}`}
                >
                  <div className="font-medium">{formatTimeForDisplay(slot.startTime)}</div>
                  {slot.isPreferred && (
                    <div className="text-xs text-green-600 mt-1">Empfohlen</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {validation.errors.timeSlot && (
          <p className="text-red-500 text-sm">{validation.errors.timeSlot}</p>
        )}
      </div>
    );
  };

  const renderCustomerDetails = () => (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-900">Ihre Kontaktdaten</h4>
      
      {/* Personal Information */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={bookingData.customer.name}
              onChange={(e) => updateCustomerData({ name: e.target.value })}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                validation.errors.customer?.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ihr vollständiger Name"
            />
          </div>
          {validation.errors.customer?.name && (
            <p className="text-red-500 text-sm mt-1">{validation.errors.customer.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            E-Mail *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={bookingData.customer.email}
              onChange={(e) => updateCustomerData({ email: e.target.value })}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                validation.errors.customer?.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="ihre.email@beispiel.de"
            />
          </div>
          {validation.errors.customer?.email && (
            <p className="text-red-500 text-sm mt-1">{validation.errors.customer.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Telefon *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              value={bookingData.customer.phone}
              onChange={(e) => updateCustomerData({ phone: e.target.value })}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                validation.errors.customer?.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="+49 123 456789"
            />
          </div>
          {validation.errors.customer?.phone && (
            <p className="text-red-500 text-sm mt-1">{validation.errors.customer.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Unternehmen (optional)
          </label>
          <input
            type="text"
            value={bookingData.customer.company || ''}
            onChange={(e) => updateCustomerData({ company: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Ihr Unternehmen"
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <h5 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Adresse des Reinigungsortes
        </h5>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              value={bookingData.customer.address.street}
              onChange={(e) => updateCustomerData({ 
                address: { ...bookingData.customer.address, street: e.target.value }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Straße und Hausnummer"
            />
          </div>
          <div>
            <input
              type="text"
              value={bookingData.customer.address.postalCode}
              onChange={(e) => updateCustomerData({ 
                address: { ...bookingData.customer.address, postalCode: e.target.value }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="PLZ"
            />
          </div>
          <div className="md:col-span-3">
            <input
              type="text"
              value={bookingData.customer.address.city}
              onChange={(e) => updateCustomerData({ 
                address: { ...bookingData.customer.address, city: e.target.value }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Stadt"
            />
          </div>
        </div>
      </div>

      {/* Additional Services */}
      <div>
        <h5 className="font-medium text-gray-700 mb-3">Zusätzliche Leistungen (optional)</h5>
        <div className="grid sm:grid-cols-2 gap-3">
          {additionalBookingServices.map(service => (
            <button
              key={service.id}
              onClick={() => {
                const isSelected = bookingData.additionalServices.includes(service.id);
                const newServices = isSelected
                  ? bookingData.additionalServices.filter(id => id !== service.id)
                  : [...bookingData.additionalServices, service.id];
                updateBookingData({ additionalServices: newServices });
              }}
              className={`p-3 border rounded-lg text-left transition-all ${
                bookingData.additionalServices.includes(service.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium">{service.name}</div>
              <div className="text-sm text-gray-600">+€{service.price}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Special Requests */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Besondere Wünsche oder Anmerkungen
        </label>
        <textarea
          value={bookingData.specialRequests}
          onChange={(e) => updateBookingData({ specialRequests: e.target.value })}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Beschreiben Sie spezielle Anforderungen oder geben Sie Zugangshinweise..."
        />
      </div>
    </div>
  );

  const renderConfirmation = () => {
    const selectedSlot = availableTimeSlots.find(slot => slot.id === bookingData.selectedTimeSlot);
    const totalPrice = calculateTotalPrice();

    return (
      <div className="space-y-6">
        <h4 className="text-lg font-semibold text-gray-900">Buchung bestätigen</h4>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h5 className="font-semibold text-blue-900 mb-4">Ihre Buchungsdetails</h5>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Leistung:</span>
              <span className="font-medium">{selectedService?.serviceName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Datum:</span>
              <span className="font-medium">{formatDateForDisplay(bookingData.selectedDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Uhrzeit:</span>
              <span className="font-medium">
                {selectedSlot && `${formatTimeForDisplay(selectedSlot.startTime)} - ${formatTimeForDisplay(selectedSlot.endTime)}`}
              </span>
            </div>
            {bookingData.additionalServices.length > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Zusatzleistungen:</span>
                <span className="font-medium">
                  {bookingData.additionalServices.map(id => {
                    const service = additionalBookingServices.find(s => s.id === id);
                    return service?.name;
                  }).join(', ')}
                </span>
              </div>
            )}
            <div className="flex justify-between pt-3 border-t border-blue-200">
              <span className="text-gray-600">Geschätzter Preis:</span>
              <span className="font-bold text-lg">€{totalPrice}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h5 className="font-semibold text-gray-900 mb-4">Ihre Kontaktdaten</h5>
          <div className="space-y-2 text-sm">
            <div><strong>Name:</strong> {bookingData.customer.name}</div>
            <div><strong>E-Mail:</strong> {bookingData.customer.email}</div>
            <div><strong>Telefon:</strong> {bookingData.customer.phone}</div>
            {bookingData.customer.company && (
              <div><strong>Unternehmen:</strong> {bookingData.customer.company}</div>
            )}
            <div>
              <strong>Adresse:</strong> {bookingData.customer.address.street}, {bookingData.customer.address.postalCode} {bookingData.customer.address.city}
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">Wichtige Hinweise:</p>
              <ul className="space-y-1 text-xs">
                <li>• Dies ist eine unverbindliche Buchungsanfrage</li>
                <li>• Wir kontaktieren Sie zur Bestätigung</li>
                <li>• Der finale Preis wird nach Besichtigung festgelegt</li>
                <li>• Kostenlose Stornierung bis 24h vor Termin</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'service':
        return renderServiceSelection();
      case 'date':
        return renderDateSelection();
      case 'time':
        return renderTimeSelection();
      case 'details':
        return renderCustomerDetails();
      case 'confirmation':
        return renderConfirmation();
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Online Termin buchen
        </h2>
        <p className="text-gray-600">
          Buchen Sie Ihren Reinigungstermin schnell und einfach online
        </p>
      </div>

      {renderProgressBar()}

      <div className="min-h-[400px]">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-8 border-t border-gray-200">
        <button
          onClick={handlePreviousStep}
          disabled={currentStep === 'service'}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Zurück
        </button>

        {currentStep === 'confirmation' ? (
          <button
            onClick={handleBookingSubmit}
            disabled={isLoading}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Wird gebucht...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Termin buchen
              </>
            )}
          </button>
        ) : (
          <button
            onClick={handleNextStep}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            Weiter
          </button>
        )}
      </div>

      {/* Trust Indicators */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Kostenlose Besichtigung</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Flexible Terminzeiten</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>24h Stornierung möglich</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedBookingCalendar;