import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { Calendar, Clock, CheckCircle, ArrowRight, Phone, Mail } from 'lucide-react';
import AdvancedBookingCalendar from '@/components/AdvancedBookingCalendar';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { BookingFormData } from '@/types/booking';
import { trackBusinessEvents } from '@/lib/analytics';

const Booking = () => {
  const location = useLocation();
  const [isBookingComplete, setIsBookingComplete] = useState(false);
  const [completedBooking, setCompletedBooking] = useState<BookingFormData | null>(null);

  // Extract preselected service from URL params
  const searchParams = new URLSearchParams(location.search);
  const preselectedService = searchParams.get('service') || undefined;

  const handleBookingComplete = (bookingData: BookingFormData) => {
    setCompletedBooking(bookingData);
    setIsBookingComplete(true);
    
    // Track successful booking
    trackBusinessEvents.contactFormSubmit('advanced_booking_complete');
  };

  const renderBookingSuccess = () => (
    <div className="max-w-2xl mx-auto text-center py-16">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>
      
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Buchung erfolgreich eingereicht!
      </h2>
      
      <p className="text-xl text-gray-600 mb-8">
        Vielen Dank für Ihre Buchungsanfrage. Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.
      </p>

      {completedBooking && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
          <h3 className="font-semibold text-blue-900 mb-4">Ihre Buchungsdetails:</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Datum:</span>
              <span className="font-medium">
                {new Date(completedBooking.selectedDate).toLocaleDateString('de-DE', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">{completedBooking.customer.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">E-Mail:</span>
              <span className="font-medium">{completedBooking.customer.email}</span>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/4917623152477"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5" />
            WhatsApp Kontakt
          </a>
          
          <a
            href="mailto:info@suzreinigung.de"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Mail className="w-5 h-5" />
            E-Mail senden
          </a>
        </div>

        <button
          onClick={() => {
            setIsBookingComplete(false);
            setCompletedBooking(null);
          }}
          className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-2 mx-auto"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Weitere Buchung erstellen
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Online Termin buchen - SUZ Reinigung | Köln & Bonn</title>
        <meta 
          name="description" 
          content="Buchen Sie Ihren Reinigungstermin online. Einfach, schnell und flexibel. Verfügbare Termine in Köln, Bonn und Umgebung. Sofortige Bestätigung." 
        />
        <meta 
          name="keywords" 
          content="online termin buchen, reinigung köln, reinigung bonn, terminbuchung, cleaning appointment" 
        />
        <link rel="canonical" href="https://suzreinigung.de/booking" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Online Termin buchen - SUZ Reinigung" />
        <meta property="og:description" content="Buchen Sie Ihren Reinigungstermin online. Einfach, schnell und flexibel." />
        <meta property="og:url" content="https://suzreinigung.de/booking" />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Online Terminbuchung",
            "description": "Buchen Sie Ihren Reinigungstermin online bei SUZ Reinigung",
            "provider": {
              "@type": "LocalBusiness",
              "name": "SUZ Reinigung",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Paul-Langen-Straße 39",
                "addressLocality": "Bonn",
                "postalCode": "53229",
                "addressCountry": "DE"
              },
              "telephone": "+49 176 23152477"
            },
            "areaServed": ["Köln", "Bonn", "NRW"],
            "availableChannel": {
              "@type": "ServiceChannel",
              "serviceUrl": "https://suzreinigung.de/booking",
              "serviceType": "Online Booking"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navigation scrollToSection={() => {}} />
        
        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Hero Section */}
            {!isBookingComplete && (
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Online <span className="text-blue-600">Termin buchen</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                  Buchen Sie Ihren Reinigungstermin schnell und unkompliziert online. 
                  Wählen Sie Datum, Uhrzeit und Service - wir kümmern uns um den Rest.
                </p>

                {/* Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">Flexible Termine</h3>
                    <p className="text-sm text-gray-600">
                      Verfügbare Termine für die nächsten 30 Tage
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">Sofort verfügbar</h3>
                    <p className="text-sm text-gray-600">
                      Echtzeitanzeige freier Terminslots
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">Sofortige Bestätigung</h3>
                    <p className="text-sm text-gray-600">
                      Buchungsbestätigung innerhalb von 24h
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Main Content */}
            {isBookingComplete ? (
              renderBookingSuccess()
            ) : (
              <AdvancedBookingCalendar 
                preselectedService={preselectedService}
                onBookingComplete={handleBookingComplete}
              />
            )}

            {/* Additional Info */}
            {!isBookingComplete && (
              <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Warum online buchen?
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Ihre Vorteile:</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>24/7 verfügbar - buchen Sie wann Sie möchten</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Sofortige Übersicht aller verfügbaren Termine</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Direkte Preisschätzung für Ihre Anfrage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Zusatzleistungen einfach hinzubuchbar</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Kostenlose Stornierung bis 24h vor Termin</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">So einfach geht's:</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                        <div>
                          <p className="font-medium text-gray-900">Service auswählen</p>
                          <p className="text-sm text-gray-600">Wählen Sie die gewünschte Reinigungsleistung</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                        <div>
                          <p className="font-medium text-gray-900">Termin festlegen</p>
                          <p className="text-sm text-gray-600">Datum und Uhrzeit nach Ihren Wünschen</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                        <div>
                          <p className="font-medium text-gray-900">Daten eingeben</p>
                          <p className="text-sm text-gray-600">Ihre Kontaktdaten und Wünsche mitteilen</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">4</div>
                        <div>
                          <p className="font-medium text-gray-900">Bestätigung erhalten</p>
                          <p className="text-sm text-gray-600">Wir melden uns innerhalb von 24 Stunden</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Alternative */}
                <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                  <p className="text-gray-600 mb-4">
                    Lieber persönlich sprechen? Kein Problem!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://wa.me/4917623152477"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <Phone className="w-5 h-5" />
                      WhatsApp: +49 176 23152477
                    </a>
                    
                    <a
                      href="mailto:info@suzreinigung.de"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <Mail className="w-5 h-5" />
                      info@suzreinigung.de
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Booking;