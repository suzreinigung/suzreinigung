import emailjs from '@emailjs/browser';
import { QuoteData, EmailQuoteRequest, EmailQuoteResponse } from '@/types/quote';
import { QuoteService } from '@/services/quoteService';
import { PDFService } from '@/services/pdfService';

// EmailJS Configuration
const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
  templates: {
    quote: import.meta.env.VITE_EMAILJS_TEMPLATE_ID_QUOTE || '',
    booking: import.meta.env.VITE_EMAILJS_TEMPLATE_ID_BOOKING || '',
    quoteDelivery: import.meta.env.VITE_EMAILJS_TEMPLATE_ID_QUOTE_DELIVERY || '',
  }
};

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.publicKey);

// Rate limiting
const emailRateLimit = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_EMAILS_PER_WINDOW = 3;

// Check rate limit
const checkRateLimit = (email: string): boolean => {
  const now = Date.now();
  const userKey = email.toLowerCase();
  const lastSent = emailRateLimit.get(userKey) || 0;
  
  if (now - lastSent < RATE_LIMIT_WINDOW) {
    return false; // Rate limited
  }
  
  emailRateLimit.set(userKey, now);
  return true;
};

// Email templates
export interface QuoteEmailData {
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

export interface BookingEmailData {
  customer: {
    name: string;
    email: string;
    phone: string;
    company: string;
    address: {
      street: string;
      city: string;
      postalCode: string;
    };
  };
  selectedDate: string;
  selectedTimeSlot: string;
  serviceType: string;
  additionalServices: string[];
  specialRequests: string;
  totalPrice?: number;
}

// Send quote request email
export const sendQuoteRequestEmail = async (data: QuoteEmailData): Promise<{ success: boolean; message: string }> => {
  try {
    // Check rate limit
    if (!checkRateLimit(data.email)) {
      return {
        success: false,
        message: 'Zu viele Anfragen. Bitte warten Sie eine Minute bevor Sie erneut senden.'
      };
    }

    // Validate configuration
    if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templates.quote || !EMAILJS_CONFIG.publicKey) {
      console.error('EmailJS configuration missing');
      return {
        success: false,
        message: 'E-Mail-Konfiguration fehlt. Bitte verwenden Sie den direkten Kontakt.'
      };
    }

    // Prepare email data
    const emailData = {
      to_email: 'info@suzreinigung.de',
      from_name: data.name,
      from_email: data.email,
      phone: data.phone,
      company: data.company || 'Nicht angegeben',
      service_type: data.serviceType,
      area: data.area,
      frequency: data.frequency || 'Nicht angegeben',
      size: data.size || 'Nicht angegeben',
      urgency: data.urgency || 'Normal',
      message: data.message || 'Keine zusätzlichen Informationen',
      submission_date: new Date().toLocaleDateString('de-DE'),
      submission_time: new Date().toLocaleTimeString('de-DE'),
    };

    // Send email
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templates.quote,
      emailData
    );

    if (response.status === 200) {
      return {
        success: true,
        message: 'Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns innerhalb von 24 Stunden bei Ihnen.'
      };
    } else {
      throw new Error(`EmailJS error: ${response.status}`);
    }

  } catch (error) {
    console.error('Failed to send quote request email:', error);
    return {
      success: false,
      message: 'E-Mail konnte nicht gesendet werden. Bitte verwenden Sie den direkten Kontakt.'
    };
  }
};

// Send booking request email
export const sendBookingRequestEmail = async (data: BookingEmailData): Promise<{ success: boolean; message: string }> => {
  try {
    // Check rate limit
    if (!checkRateLimit(data.customer.email)) {
      return {
        success: false,
        message: 'Zu viele Anfragen. Bitte warten Sie eine Minute bevor Sie erneut senden.'
      };
    }

    // Validate configuration
    if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templates.booking || !EMAILJS_CONFIG.publicKey) {
      console.error('EmailJS configuration missing');
      return {
        success: false,
        message: 'E-Mail-Konfiguration fehlt. Bitte verwenden Sie den direkten Kontakt.'
      };
    }

    // Format additional services
    const additionalServicesText = data.additionalServices.length > 0 
      ? data.additionalServices.join(', ')
      : 'Keine zusätzlichen Leistungen';

    // Format address
    const fullAddress = `${data.customer.address.street}, ${data.customer.address.postalCode} ${data.customer.address.city}`;

    // Prepare email data
    const emailData = {
      to_email: 'info@suzreinigung.de',
      customer_name: data.customer.name,
      customer_email: data.customer.email,
      customer_phone: data.customer.phone,
      customer_company: data.customer.company || 'Nicht angegeben',
      customer_address: fullAddress,
      booking_date: data.selectedDate,
      booking_time: data.selectedTimeSlot,
      service_type: data.serviceType,
      additional_services: additionalServicesText,
      special_requests: data.specialRequests || 'Keine besonderen Wünsche',
      total_price: data.totalPrice ? `€${data.totalPrice.toFixed(2)}` : 'Wird berechnet',
      submission_date: new Date().toLocaleDateString('de-DE'),
      submission_time: new Date().toLocaleTimeString('de-DE'),
    };

    // Send email
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templates.booking,
      emailData
    );

    if (response.status === 200) {
      return {
        success: true,
        message: 'Ihre Buchung wurde erfolgreich gesendet. Wir bestätigen Ihren Termin innerhalb von 24 Stunden.'
      };
    } else {
      throw new Error(`EmailJS error: ${response.status}`);
    }

  } catch (error) {
    console.error('Failed to send booking request email:', error);
    return {
      success: false,
      message: 'Buchung konnte nicht gesendet werden. Bitte verwenden Sie den direkten Kontakt.'
    };
  }
};

// Send quote delivery email to customer
export const sendQuoteDeliveryEmail = async (request: EmailQuoteRequest): Promise<EmailQuoteResponse> => {
  try {
    const { quote, customMessage } = request;

    // Check rate limit
    if (!checkRateLimit(quote.customer.email)) {
      return {
        success: false,
        error: 'Zu viele E-Mails. Bitte warten Sie eine Minute bevor Sie erneut senden.'
      };
    }

    // Validate configuration
    if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templates.quoteDelivery || !EMAILJS_CONFIG.publicKey) {
      console.error('EmailJS configuration missing for quote delivery');
      return {
        success: false,
        error: 'E-Mail-Konfiguration fehlt. Bitte verwenden Sie den direkten Kontakt.'
      };
    }

    // Generate PDF for attachment (as base64)
    let pdfAttachment = '';
    try {
      const pdfResponse = await PDFService.generateQuotePDF({ quote });
      if (pdfResponse.success && pdfResponse.pdfDataUrl) {
        // Extract base64 data from data URL
        pdfAttachment = pdfResponse.pdfDataUrl.split(',')[1] || '';
      }
    } catch (error) {
      console.warn('Could not generate PDF attachment:', error);
    }

    // Prepare email data
    const emailData = {
      // Recipient
      to_email: quote.customer.email,
      to_name: quote.customer.name,

      // Quote details
      quote_number: quote.quoteNumber,
      quote_date: QuoteService.formatDate(quote.createdAt),
      valid_until: QuoteService.formatDate(quote.validUntil),
      total_amount: QuoteService.formatPrice(quote.totalAmount),
      subtotal: QuoteService.formatPrice(quote.subtotal),
      vat_amount: QuoteService.formatPrice(quote.vatAmount),

      // Service details
      service_type: quote.serviceDetails.serviceDescription,
      service_area: `${quote.serviceDetails.areaSize} m²`,
      service_location: quote.serviceDetails.location,
      service_frequency: quote.serviceDetails.frequency,

      // Customer details
      customer_name: quote.customer.name,
      customer_company: quote.customer.company || 'Nicht angegeben',

      // Company details
      company_name: quote.company.name,
      company_email: quote.company.contact.email,
      company_phone: quote.company.contact.phone,

      // Additional
      custom_message: customMessage || 'Vielen Dank für Ihr Interesse an unseren Dienstleistungen.',
      pdf_attachment: pdfAttachment,

      // Metadata
      submission_date: new Date().toLocaleDateString('de-DE'),
      submission_time: new Date().toLocaleTimeString('de-DE'),
    };

    // Send email
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templates.quoteDelivery,
      emailData
    );

    if (response.status === 200) {
      return {
        success: true,
        messageId: response.text
      };
    } else {
      throw new Error(`EmailJS error: ${response.status}`);
    }

  } catch (error) {
    console.error('Failed to send quote delivery email:', error);
    return {
      success: false,
      error: 'Angebot konnte nicht per E-Mail versendet werden. Bitte verwenden Sie den direkten Kontakt.'
    };
  }
};

// Send quote notification to company
export const sendQuoteNotificationEmail = async (quote: QuoteData): Promise<{ success: boolean; message: string }> => {
  try {
    // Check rate limit using company email
    if (!checkRateLimit(quote.company.contact.email)) {
      return {
        success: false,
        message: 'Rate limit erreicht für interne Benachrichtigungen.'
      };
    }

    // Validate configuration
    if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templates.quote || !EMAILJS_CONFIG.publicKey) {
      console.error('EmailJS configuration missing for quote notification');
      return {
        success: false,
        message: 'E-Mail-Konfiguration fehlt.'
      };
    }

    // Prepare notification email data
    const emailData = {
      to_email: quote.company.contact.email,
      from_name: 'SUZ Website System',
      from_email: 'noreply@suzreinigung.de',

      // Quote information
      quote_number: quote.quoteNumber,
      quote_date: QuoteService.formatDate(quote.createdAt),
      total_amount: QuoteService.formatPrice(quote.totalAmount),

      // Customer information
      customer_name: quote.customer.name,
      customer_email: quote.customer.email,
      customer_phone: quote.customer.phone || 'Nicht angegeben',
      customer_company: quote.customer.company || 'Nicht angegeben',

      // Service information
      service_type: quote.serviceDetails.serviceDescription,
      service_area: `${quote.serviceDetails.areaSize} m²`,
      service_location: quote.serviceDetails.location,
      service_frequency: quote.serviceDetails.frequency,

      // Additional services
      additional_services: quote.serviceDetails.additionalServices.join(', ') || 'Keine',
      special_requirements: quote.serviceDetails.specialRequirements || 'Keine',

      // Notes
      notes: quote.notes || 'Keine Anmerkungen',

      // Metadata
      submission_date: new Date().toLocaleDateString('de-DE'),
      submission_time: new Date().toLocaleTimeString('de-DE'),
    };

    // Send notification email
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templates.quote,
      emailData
    );

    if (response.status === 200) {
      return {
        success: true,
        message: 'Interne Benachrichtigung wurde gesendet.'
      };
    } else {
      throw new Error(`EmailJS error: ${response.status}`);
    }

  } catch (error) {
    console.error('Failed to send quote notification email:', error);
    return {
      success: false,
      message: 'Interne Benachrichtigung konnte nicht gesendet werden.'
    };
  }
};

// Fallback mailto link generator
export const generateMailtoLink = (type: 'quote' | 'booking', data: QuoteEmailData | BookingEmailData): string => {
  const subject = type === 'quote' 
    ? 'Angebot anfordern - SUZ Reinigung'
    : 'Terminbuchung - SUZ Reinigung';

  let body = '';
  
  if (type === 'quote') {
    const quoteData = data as QuoteEmailData;
    body = `
Sehr geehrte Damen und Herren,

hiermit möchte ich ein Angebot für folgende Reinigungsleistung anfordern:

Name: ${quoteData.name}
E-Mail: ${quoteData.email}
Telefon: ${quoteData.phone}
Unternehmen: ${quoteData.company || 'Nicht angegeben'}
Leistung: ${quoteData.serviceType}
Bereich/Ort: ${quoteData.area}
Häufigkeit: ${quoteData.frequency || 'Nicht angegeben'}
Größe: ${quoteData.size || 'Nicht angegeben'}
Dringlichkeit: ${quoteData.urgency || 'Normal'}

Zusätzliche Informationen:
${quoteData.message || 'Keine zusätzlichen Informationen'}

Mit freundlichen Grüßen
${quoteData.name}
    `.trim();
  } else {
    const bookingData = data as BookingEmailData;
    body = `
Sehr geehrte Damen und Herren,

hiermit möchte ich einen Termin für folgende Reinigungsleistung buchen:

Kundendaten:
Name: ${bookingData.customer.name}
E-Mail: ${bookingData.customer.email}
Telefon: ${bookingData.customer.phone}
Unternehmen: ${bookingData.customer.company || 'Nicht angegeben'}
Adresse: ${bookingData.customer.address.street}, ${bookingData.customer.address.postalCode} ${bookingData.customer.address.city}

Termindetails:
Datum: ${bookingData.selectedDate}
Uhrzeit: ${bookingData.selectedTimeSlot}
Leistung: ${bookingData.serviceType}
Zusätzliche Leistungen: ${bookingData.additionalServices.length > 0 ? bookingData.additionalServices.join(', ') : 'Keine'}

Besondere Wünsche:
${bookingData.specialRequests || 'Keine besonderen Wünsche'}

Mit freundlichen Grüßen
${bookingData.customer.name}
    `.trim();
  }

  return `mailto:info@suzreinigung.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
