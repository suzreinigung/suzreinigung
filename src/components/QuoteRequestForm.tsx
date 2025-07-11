import { useState } from 'react';
import { trackBusinessEvents } from '@/lib/analytics';
import { sendQuoteRequestEmail, generateMailtoLink, QuoteEmailData } from '@/lib/emailService';

interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceType: string;
  area: string;
  frequency: string;
  size: string;
  urgency: string;
  message: string;
}

interface QuoteRequestFormProps {
  preselectedService?: string;
  onClose?: () => void;
}

const QuoteRequestForm = ({ preselectedService, onClose }: QuoteRequestFormProps) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceType: preselectedService || '',
    area: '',
    frequency: '',
    size: '',
    urgency: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<QuoteFormData>>({});
  const [submitMessage, setSubmitMessage] = useState<string>('');

  const services = [
    { value: 'bueroreinigung', label: 'Büroreinigung' },
    { value: 'hausreinigung', label: 'Hausreinigung' },
    { value: 'fensterreinigung', label: 'Fensterreinigung' },
    { value: 'grundreinigung', label: 'Grundreinigung' },
    { value: 'other', label: 'Andere Leistung' },
  ];

  const frequencies = [
    { value: 'einmalig', label: 'Einmalig' },
    { value: 'woechentlich', label: 'Wöchentlich' },
    { value: 'alle-2-wochen', label: 'Alle 2 Wochen' },
    { value: 'monatlich', label: 'Monatlich' },
    { value: 'quartalsweise', label: 'Quartalsweise' },
  ];

  const urgencies = [
    { value: 'flexibel', label: 'Flexibel' },
    { value: 'diese-woche', label: 'Diese Woche' },
    { value: 'naechste-woche', label: 'Nächste Woche' },
    { value: 'sofort', label: 'So schnell wie möglich' },
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<QuoteFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name ist erforderlich';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Ungültige E-Mail-Adresse';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefonnummer ist erforderlich';
    }

    if (!formData.serviceType) {
      newErrors.serviceType = 'Bitte wählen Sie eine Leistung aus';
    }

    if (!formData.area.trim()) {
      newErrors.area = 'Bereich/Ort ist erforderlich';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof QuoteFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Track form submission
      trackBusinessEvents.contactFormSubmit('quote_request');

      // Prepare email data
      const emailData: QuoteEmailData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        serviceType: formData.serviceType,
        area: formData.area,
        frequency: formData.frequency,
        size: formData.size,
        urgency: formData.urgency,
        message: formData.message,
      };

      // Send email using EmailJS
      const result = await sendQuoteRequestEmail(emailData);

      if (result.success) {
        setIsSubmitted(true);
        setSubmitMessage(result.message);
      } else {
        // Show error message and provide fallback
        setSubmitMessage(result.message);

        // Generate fallback mailto link
        const mailtoLink = generateMailtoLink('quote', emailData);

        // Show fallback option after a short delay
        setTimeout(() => {
          if (confirm('Möchten Sie stattdessen Ihr E-Mail-Programm öffnen?')) {
            window.location.href = mailtoLink;
          }
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to submit quote request:', error);
      setSubmitMessage('Es gab ein Problem beim Senden Ihrer Anfrage. Bitte verwenden Sie den direkten Kontakt.');

      // Generate fallback mailto link
      const emailData: QuoteEmailData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        serviceType: formData.serviceType,
        area: formData.area,
        frequency: formData.frequency,
        size: formData.size,
        urgency: formData.urgency,
        message: formData.message,
      };

      const mailtoLink = generateMailtoLink('quote', emailData);

      setTimeout(() => {
        if (confirm('Möchten Sie stattdessen Ihr E-Mail-Programm öffnen?')) {
          window.location.href = mailtoLink;
        }
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="suz-card-glass rounded-2xl p-8 max-w-md mx-auto text-center border border-white/20">
        <div className="suz-icon-badge-premium mb-6 mx-auto">
          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="suz-text-heading-lg font-bold text-slate-100 mb-4">
          Vielen Dank für Ihre Anfrage!
        </h3>
        <p className="suz-text-body-md text-slate-300 mb-8 leading-relaxed">
          {submitMessage || 'Wir werden uns innerhalb von 24 Stunden bei Ihnen melden, um Ihr kostenloses Angebot zu besprechen.'}
        </p>
        <div className="space-y-4">
          <a
            href="https://wa.me/4917623152477"
            target="_blank"
            rel="noopener noreferrer"
            className="suz-button-primary suz-button-enhanced w-full flex items-center justify-center gap-2"
            aria-label="Direkter WhatsApp Kontakt für weitere Beratung"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.486"/>
            </svg>
            Direkter WhatsApp Kontakt
          </a>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="suz-button-secondary suz-button-enhanced w-full"
              aria-label="Formular schließen"
            >
              Schließen
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="suz-card-glass rounded-2xl p-8 max-w-2xl mx-auto border border-white/20">
      <div className="mb-8">
        <h2 className="suz-text-display-sm font-bold text-slate-100 mb-4 text-center">
          Kostenloses Angebot anfordern
        </h2>
        <p className="suz-text-body-lg text-slate-300 text-center leading-relaxed">
          Füllen Sie das Formular aus und erhalten Sie innerhalb von 24 Stunden ein maßgeschneidertes Angebot.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Personal Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="suz-form-label">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`suz-form-input ${errors.name ? 'error' : ''}`}
              placeholder="Ihr vollständiger Name"
              aria-describedby={errors.name ? "name-error" : undefined}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && (
              <p id="name-error" className="suz-form-error" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="suz-form-label">
              E-Mail *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`suz-form-input ${errors.email ? 'error' : ''}`}
              placeholder="ihre.email@beispiel.de"
              aria-describedby={errors.email ? "email-error" : undefined}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p id="email-error" className="suz-form-error" role="alert">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="suz-form-label">
              Telefon *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`suz-form-input ${errors.phone ? 'error' : ''}`}
              placeholder="+49 123 456789"
              aria-describedby={errors.phone ? "phone-error" : undefined}
              aria-invalid={errors.phone ? "true" : "false"}
            />
            {errors.phone && (
              <p id="phone-error" className="suz-form-error" role="alert">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="company" className="suz-form-label">
              Unternehmen (optional)
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="suz-form-input"
              placeholder="Ihr Unternehmen"
            />
          </div>
        </div>

        {/* Service Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="serviceType" className="suz-form-label">
              Gewünschte Leistung *
            </label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleInputChange}
              className={`suz-form-select ${errors.serviceType ? 'error' : ''}`}
              aria-describedby={errors.serviceType ? "serviceType-error" : undefined}
              aria-invalid={errors.serviceType ? "true" : "false"}
            >
              <option value="">Bitte wählen...</option>
              {services.map((service) => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </select>
            {errors.serviceType && (
              <p id="serviceType-error" className="suz-form-error" role="alert">
                {errors.serviceType}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="area" className="suz-form-label">
              Bereich/Ort *
            </label>
            <input
              type="text"
              id="area"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              className={`suz-form-input ${errors.area ? 'error' : ''}`}
              placeholder="z.B. Köln, Bonn, oder Stadtbezirk"
              aria-describedby={errors.area ? "area-error" : undefined}
              aria-invalid={errors.area ? "true" : "false"}
            />
            {errors.area && (
              <p id="area-error" className="suz-form-error" role="alert">
                {errors.area}
              </p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="frequency" className="suz-form-label">
              Häufigkeit
            </label>
            <select
              id="frequency"
              name="frequency"
              value={formData.frequency}
              onChange={handleInputChange}
              className="suz-form-select"
            >
              <option value="">Bitte wählen...</option>
              {frequencies.map((freq) => (
                <option key={freq.value} value={freq.value}>
                  {freq.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="size" className="suz-form-label">
              Größe/Fläche
            </label>
            <input
              type="text"
              id="size"
              name="size"
              value={formData.size}
              onChange={handleInputChange}
              className="suz-form-input"
              placeholder="z.B. 100m², 5 Zimmer"
            />
          </div>

          <div>
            <label htmlFor="urgency" className="suz-form-label">
              Zeitrahmen
            </label>
            <select
              id="urgency"
              name="urgency"
              value={formData.urgency}
              onChange={handleInputChange}
              className="suz-form-select"
            >
              <option value="">Bitte wählen...</option>
              {urgencies.map((urgency) => (
                <option key={urgency.value} value={urgency.value}>
                  {urgency.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="suz-form-label">
            Zusätzliche Informationen
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className="suz-form-textarea"
            placeholder="Beschreiben Sie Ihre spezifischen Anforderungen oder stellen Sie Fragen..."
          />
        </div>

        {/* Show error message if any */}
        {submitMessage && !isSubmitted && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-red-400 text-sm">{submitMessage}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="suz-button-primary suz-button-enhanced flex-1 flex items-center justify-center gap-2"
            aria-label={isSubmitting ? "Angebot wird gesendet" : "Kostenloses Angebot anfordern"}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
                Wird gesendet...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Kostenloses Angebot anfordern
              </>
            )}
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="suz-button-secondary suz-button-enhanced px-6"
              aria-label="Formular abbrechen"
            >
              Abbrechen
            </button>
          )}
        </div>

        <p className="suz-text-body-xs text-slate-400 text-center leading-relaxed">
          * Pflichtfelder. Ihre Daten werden vertraulich behandelt und nicht an Dritte weitergegeben.
        </p>
      </form>
    </div>
  );
};

export default QuoteRequestForm;