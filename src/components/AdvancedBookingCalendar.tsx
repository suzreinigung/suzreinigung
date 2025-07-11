import { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle, User, Mail, Phone, MapPin } from 'lucide-react';
import { trackBusinessEvents } from '@/lib/analytics';
import { sendBookingRequestEmail, generateMailtoLink, BookingEmailData } from '@/lib/emailService';
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
  const [submitMessage, setSubmitMessage] = useState<string>('');

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
    setSubmitMessage('');

    try {
      // Track booking submission
      trackBusinessEvents.serviceInquiry(`booking_${bookingData.serviceType}`);

      // Calculate total price
      const totalPrice = calculateTotalPrice();

      // Prepare email data
      const emailData: BookingEmailData = {
        customer: bookingData.customer,
        selectedDate: bookingData.selectedDate,
        selectedTimeSlot: bookingData.selectedTimeSlot,
        serviceType: bookingData.serviceType,
        additionalServices: bookingData.additionalServices,
        specialRequests: bookingData.specialRequests,
        totalPrice: totalPrice,
      };

      // Send email using EmailJS
      const result = await sendBookingRequestEmail(emailData);

      if (result.success) {
        setCurrentStep('confirmation');
        setSubmitMessage(result.message);

        // Call completion handler
        if (onBookingComplete) {
          onBookingComplete(bookingData);
        }
      } else {
        // Show error message and provide fallback
        setSubmitMessage(result.message);

        // Generate fallback mailto link
        const mailtoLink = generateMailtoLink('booking', emailData);

        // Show fallback option after a short delay
        setTimeout(() => {
          if (confirm('Möchten Sie stattdessen Ihr E-Mail-Programm öffnen?')) {
            window.location.href = mailtoLink;
          }
        }, 2000);
      }
    } catch (error) {
      console.error('Booking submission failed:', error);
      setSubmitMessage('Es gab ein Problem bei der Buchung. Bitte verwenden Sie den direkten Kontakt.');

      // Generate fallback mailto link
      const totalPrice = calculateTotalPrice();
      const emailData: BookingEmailData = {
        customer: bookingData.customer,
        selectedDate: bookingData.selectedDate,
        selectedTimeSlot: bookingData.selectedTimeSlot,
        serviceType: bookingData.serviceType,
        additionalServices: bookingData.additionalServices,
        specialRequests: bookingData.specialRequests,
        totalPrice: totalPrice,
      };

      const mailtoLink = generateMailtoLink('booking', emailData);

      setTimeout(() => {
        if (confirm('Möchten Sie stattdessen Ihr E-Mail-Programm öffnen?')) {
          window.location.href = mailtoLink;
        }
      }, 2000);
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
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                index <= currentIndex
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-slate-700 text-slate-400 border border-slate-600'
              }`}>
                {index < currentIndex ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-full h-1 mx-2 transition-all duration-300 ${
                  index < currentIndex ? 'bg-blue-500' : 'bg-slate-700'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <h3 className="suz-text-heading-md font-semibold text-slate-100">
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
      <h4 className="suz-text-heading-md font-semibold text-slate-100 mb-6">Welche Leistung benötigen Sie?</h4>
      <div className="grid gap-4">
        {bookingServices.map(service => (
          <button
            type="button"
            key={service.id}
            onClick={() => updateBookingData({ serviceType: service.id })}
            className={`p-6 border-2 rounded-xl text-left transition-all duration-300 hover:scale-[1.02] ${
              bookingData.serviceType === service.id
                ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/25'
                : 'border-slate-600 hover:border-slate-500 bg-slate-800/50'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h5 className="suz-text-body-lg font-semibold text-slate-100 mb-2">{service.serviceName}</h5>
                <p className="suz-text-body-sm text-slate-300">
                  ca. {service.duration / 60} Stunden • ab €{service.basePrice}
                </p>
                {service.requiresAssessment && (
                  <span className="inline-block mt-3 px-3 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full border border-yellow-500/30">
                    Besichtigung erforderlich
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
      {validation.errors.service && (
        <p className="text-red-400 suz-text-body-sm">{validation.errors.service}</p>
      )}
    </div>
  );

  const renderDateSelection = () => (
    <div className="space-y-6">
      <h4 className="suz-text-heading-md font-semibold text-slate-100 mb-6">Wann soll der Termin stattfinden?</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableDates.slice(0, 14).map(date => {
          const dateObj = new Date(date);
          const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;

          return (
            <button
              type="button"
              key={date}
              onClick={() => updateBookingData({ selectedDate: date, selectedTimeSlot: '' })}
              className={`p-4 border-2 rounded-xl text-center transition-all duration-300 hover:scale-[1.02] ${
                bookingData.selectedDate === date
                  ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/25'
                  : 'border-slate-600 hover:border-slate-500 bg-slate-800/50'
              } ${isWeekend ? 'border-yellow-500/50 bg-yellow-500/5' : ''}`}
            >
              <div className="suz-text-body-sm text-slate-300 mb-1">
                {dateObj.toLocaleDateString('de-DE', { weekday: 'short' })}
              </div>
              <div className="suz-text-body-lg font-semibold text-slate-100">
                {dateObj.toLocaleDateString('de-DE', { day: 'numeric', month: 'short' })}
              </div>
              {isWeekend && (
                <div className="text-xs text-yellow-400 mt-2 px-2 py-1 bg-yellow-500/20 rounded-full">Wochenende</div>
              )}
            </button>
          );
        })}
      </div>
      {validation.errors.date && (
        <p className="text-red-400 suz-text-body-sm">{validation.errors.date}</p>
      )}
    </div>
  );

  const renderTimeSelection = () => {
    if (!bookingData.selectedDate) return null;

    const timeSlots = generateTimeSlots(bookingData.selectedDate, selectedService?.duration || 120);

    return (
      <div className="space-y-8">
        <h4 className="suz-text-heading-md font-semibold text-slate-100">
          Uhrzeit für {formatDateForDisplay(bookingData.selectedDate)}
        </h4>

        {/* Morning Slots */}
        {timeSlots.morning.length > 0 && (
          <div>
            <h5 className="suz-text-body-lg font-medium text-slate-200 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              Vormittag (8:00 - 12:00)
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {timeSlots.morning.map(slot => (
                <button
                  type="button"
                  key={slot.id}
                  onClick={() => updateBookingData({ selectedTimeSlot: slot.id })}
                  className={`p-4 border-2 rounded-xl text-center transition-all duration-300 hover:scale-[1.02] ${
                    bookingData.selectedTimeSlot === slot.id
                      ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/25'
                      : 'border-slate-600 hover:border-slate-500 bg-slate-800/50'
                  } ${slot.isPreferred ? 'ring-2 ring-green-500/50' : ''}`}
                >
                  <div className="suz-text-body-md font-medium text-slate-100">{formatTimeForDisplay(slot.startTime)}</div>
                  {slot.isPreferred && (
                    <div className="text-xs text-green-400 mt-2 px-2 py-1 bg-green-500/20 rounded-full">Empfohlen</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Afternoon Slots */}
        {timeSlots.afternoon.length > 0 && (
          <div>
            <h5 className="suz-text-body-lg font-medium text-slate-200 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              Nachmittag (12:00 - 17:00)
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {timeSlots.afternoon.map(slot => (
                <button
                  type="button"
                  key={slot.id}
                  onClick={() => updateBookingData({ selectedTimeSlot: slot.id })}
                  className={`p-4 border-2 rounded-xl text-center transition-all duration-300 hover:scale-[1.02] ${
                    bookingData.selectedTimeSlot === slot.id
                      ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/25'
                      : 'border-slate-600 hover:border-slate-500 bg-slate-800/50'
                  } ${slot.isPreferred ? 'ring-2 ring-green-500/50' : ''}`}
                >
                  <div className="suz-text-body-md font-medium text-slate-100">{formatTimeForDisplay(slot.startTime)}</div>
                  {slot.isPreferred && (
                    <div className="text-xs text-green-400 mt-2 px-2 py-1 bg-green-500/20 rounded-full">Empfohlen</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Evening Slots */}
        {timeSlots.evening.length > 0 && (
          <div>
            <h5 className="suz-text-body-lg font-medium text-slate-200 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              Abend (17:00 - 20:00)
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {timeSlots.evening.map(slot => (
                <button
                  type="button"
                  key={slot.id}
                  onClick={() => updateBookingData({ selectedTimeSlot: slot.id })}
                  className={`p-4 border-2 rounded-xl text-center transition-all duration-300 hover:scale-[1.02] ${
                    bookingData.selectedTimeSlot === slot.id
                      ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/25'
                      : 'border-slate-600 hover:border-slate-500 bg-slate-800/50'
                  } ${slot.isPreferred ? 'ring-2 ring-green-500/50' : ''}`}
                >
                  <div className="suz-text-body-md font-medium text-slate-100">{formatTimeForDisplay(slot.startTime)}</div>
                  {slot.isPreferred && (
                    <div className="text-xs text-green-400 mt-2 px-2 py-1 bg-green-500/20 rounded-full">Empfohlen</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {validation.errors.timeSlot && (
          <p className="text-red-400 suz-text-body-sm">{validation.errors.timeSlot}</p>
        )}
      </div>
    );
  };

  const renderCustomerDetails = () => (
    <div className="space-y-8">
      <h4 className="suz-text-heading-md font-semibold text-slate-100">Ihre Kontaktdaten</h4>

      {/* Personal Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block suz-text-body-sm font-medium text-slate-200 mb-3">
            Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={bookingData.customer.name}
              onChange={(e) => updateCustomerData({ name: e.target.value })}
              className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl bg-slate-800/50 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                validation.errors.customer?.name ? 'border-red-500' : 'border-slate-600'
              }`}
              placeholder="Ihr vollständiger Name"
            />
          </div>
          {validation.errors.customer?.name && (
            <p className="text-red-400 suz-text-body-sm mt-2">{validation.errors.customer.name}</p>
          )}
        </div>

        <div>
          <label className="block suz-text-body-sm font-medium text-slate-200 mb-3">
            E-Mail *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input
              type="email"
              value={bookingData.customer.email}
              onChange={(e) => updateCustomerData({ email: e.target.value })}
              className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl bg-slate-800/50 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                validation.errors.customer?.email ? 'border-red-500' : 'border-slate-600'
              }`}
              placeholder="ihre.email@beispiel.de"
            />
          </div>
          {validation.errors.customer?.email && (
            <p className="text-red-400 suz-text-body-sm mt-2">{validation.errors.customer.email}</p>
          )}
        </div>

        <div>
          <label className="block suz-text-body-sm font-medium text-slate-200 mb-3">
            Telefon *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input
              type="tel"
              value={bookingData.customer.phone}
              onChange={(e) => updateCustomerData({ phone: e.target.value })}
              className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl bg-slate-800/50 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                validation.errors.customer?.phone ? 'border-red-500' : 'border-slate-600'
              }`}
              placeholder="+49 123 456789"
            />
          </div>
          {validation.errors.customer?.phone && (
            <p className="text-red-400 suz-text-body-sm mt-2">{validation.errors.customer.phone}</p>
          )}
        </div>

        <div>
          <label className="block suz-text-body-sm font-medium text-slate-200 mb-3">
            Unternehmen (optional)
          </label>
          <input
            type="text"
            value={bookingData.customer.company || ''}
            onChange={(e) => updateCustomerData({ company: e.target.value })}
            className="w-full px-4 py-3 border-2 border-slate-600 rounded-xl bg-slate-800/50 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            placeholder="Ihr Unternehmen"
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <h5 className="suz-text-body-lg font-medium text-slate-200 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-400" />
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
              className="w-full px-4 py-3 border-2 border-slate-600 rounded-xl bg-slate-800/50 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
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
              className="w-full px-4 py-3 border-2 border-slate-600 rounded-xl bg-slate-800/50 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
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
              className="w-full px-4 py-3 border-2 border-slate-600 rounded-xl bg-slate-800/50 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              placeholder="Stadt"
            />
          </div>
        </div>
      </div>

      {/* Additional Services */}
      <div>
        <h5 className="suz-text-body-lg font-medium text-slate-200 mb-4">Zusätzliche Leistungen (optional)</h5>
        <div className="grid sm:grid-cols-2 gap-4">
          {additionalBookingServices.map(service => (
            <button
              type="button"
              key={service.id}
              onClick={() => {
                const isSelected = bookingData.additionalServices.includes(service.id);
                const newServices = isSelected
                  ? bookingData.additionalServices.filter(id => id !== service.id)
                  : [...bookingData.additionalServices, service.id];
                updateBookingData({ additionalServices: newServices });
              }}
              className={`p-4 border-2 rounded-xl text-left transition-all duration-300 hover:scale-[1.02] ${
                bookingData.additionalServices.includes(service.id)
                  ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/25'
                  : 'border-slate-600 hover:border-slate-500 bg-slate-800/50'
              }`}
            >
              <div className="suz-text-body-md font-medium text-slate-100">{service.name}</div>
              <div className="suz-text-body-sm text-slate-300">+€{service.price}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Special Requests */}
      <div>
        <label className="block suz-text-body-sm font-medium text-slate-200 mb-3">
          Besondere Wünsche oder Anmerkungen
        </label>
        <textarea
          value={bookingData.specialRequests}
          onChange={(e) => updateBookingData({ specialRequests: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 border-2 border-slate-600 rounded-xl bg-slate-800/50 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none"
          placeholder="Beschreiben Sie spezielle Anforderungen oder geben Sie Zugangshinweise..."
        />
      </div>
    </div>
  );

  const renderConfirmation = () => {
    const selectedSlot = availableTimeSlots.find(slot => slot.id === bookingData.selectedTimeSlot);
    const totalPrice = calculateTotalPrice();

    return (
      <div className="space-y-8">
        <h4 className="suz-text-heading-md font-semibold text-slate-100">Buchung bestätigen</h4>

        {/* Show submit message if any */}
        {submitMessage && (
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <p className="text-green-400 text-sm">{submitMessage}</p>
          </div>
        )}

        <div className="suz-card-glass border border-blue-500/30 rounded-2xl p-8 bg-blue-500/5">
          <h5 className="suz-text-body-lg font-semibold text-blue-300 mb-6">Ihre Buchungsdetails</h5>

          <div className="space-y-4 suz-text-body-sm">
            <div className="flex justify-between items-center py-2 border-b border-slate-700">
              <span className="text-slate-300">Leistung:</span>
              <span className="font-medium text-slate-100">{selectedService?.serviceName}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-700">
              <span className="text-slate-300">Datum:</span>
              <span className="font-medium text-slate-100">{formatDateForDisplay(bookingData.selectedDate)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-700">
              <span className="text-slate-300">Uhrzeit:</span>
              <span className="font-medium text-slate-100">
                {selectedSlot && `${formatTimeForDisplay(selectedSlot.startTime)} - ${formatTimeForDisplay(selectedSlot.endTime)}`}
              </span>
            </div>
            {bookingData.additionalServices.length > 0 && (
              <div className="flex justify-between items-start py-2 border-b border-slate-700">
                <span className="text-slate-300">Zusatzleistungen:</span>
                <span className="font-medium text-slate-100 text-right">
                  {bookingData.additionalServices.map(id => {
                    const service = additionalBookingServices.find(s => s.id === id);
                    return service?.name;
                  }).join(', ')}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center pt-4 border-t border-blue-500/30">
              <span className="text-slate-300 suz-text-body-md">Geschätzter Preis:</span>
              <span className="font-bold suz-text-heading-sm text-blue-300">€{totalPrice}</span>
            </div>
          </div>
        </div>

        <div className="suz-card-glass border border-slate-600 rounded-2xl p-6">
          <h5 className="suz-text-body-lg font-semibold text-slate-100 mb-4">Ihre Kontaktdaten</h5>
          <div className="space-y-3 suz-text-body-sm">
            <div className="flex justify-between py-1">
              <span className="text-slate-300 font-medium">Name:</span>
              <span className="text-slate-100">{bookingData.customer.name}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-300 font-medium">E-Mail:</span>
              <span className="text-slate-100">{bookingData.customer.email}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-300 font-medium">Telefon:</span>
              <span className="text-slate-100">{bookingData.customer.phone}</span>
            </div>
            {bookingData.customer.company && (
              <div className="flex justify-between py-1">
                <span className="text-slate-300 font-medium">Unternehmen:</span>
                <span className="text-slate-100">{bookingData.customer.company}</span>
              </div>
            )}
            <div className="flex justify-between py-1">
              <span className="text-slate-300 font-medium">Adresse:</span>
              <span className="text-slate-100 text-right">{bookingData.customer.address.street}, {bookingData.customer.address.postalCode} {bookingData.customer.address.city}</span>
            </div>
          </div>
        </div>

        <div className="suz-card-glass border border-yellow-500/30 rounded-2xl p-6 bg-yellow-500/5">
          <div className="flex gap-4">
            <AlertCircle className="w-6 h-6 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="suz-text-body-sm text-yellow-200">
              <p className="font-medium mb-3 text-yellow-300">Wichtige Hinweise:</p>
              <ul className="space-y-2 text-yellow-200">
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
    <div className="suz-card-glass rounded-2xl border border-white/20 p-8 max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="suz-text-display-sm font-bold text-slate-100 mb-3">
          Online Termin buchen
        </h2>
        <p className="suz-text-body-lg text-slate-300">
          Buchen Sie Ihren Reinigungstermin schnell und einfach online
        </p>
      </div>

      {renderProgressBar()}

      <div className="min-h-[400px]">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-8 border-t border-slate-700">
        <button
          type="button"
          onClick={handlePreviousStep}
          disabled={currentStep === 'service'}
          className="px-6 py-3 border-2 border-slate-600 text-slate-200 rounded-xl hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 suz-text-body-md font-medium"
        >
          Zurück
        </button>

        {currentStep === 'confirmation' ? (
          <button
            type="button"
            onClick={handleBookingSubmit}
            disabled={isLoading}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-600/25 suz-text-body-md"
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
            type="button"
            onClick={handleNextStep}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-blue-600/25 suz-text-body-md"
          >
            Weiter
          </button>
        )}
      </div>

      {/* Trust Indicators */}
      <div className="mt-8 pt-6 border-t border-slate-700">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 suz-text-body-sm text-slate-300">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>Kostenlose Besichtigung</span>
          </div>
          <div className="flex items-center justify-center gap-2 suz-text-body-sm text-slate-300">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>Flexible Terminzeiten</span>
          </div>
          <div className="flex items-center justify-center gap-2 suz-text-body-sm text-slate-300">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>24h Stornierung möglich</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedBookingCalendar;