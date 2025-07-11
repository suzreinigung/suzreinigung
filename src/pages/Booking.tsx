import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { Calendar, Clock, CheckCircle, ArrowRight, Phone, Mail, CalendarDays } from 'lucide-react';
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

  useEffect(() => {
    trackBusinessEvents.servicePageView('booking');
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookingComplete = (bookingData: BookingFormData) => {
    setCompletedBooking(bookingData);
    setIsBookingComplete(true);
    
    // Track successful booking
    trackBusinessEvents.contactFormSubmit('advanced_booking_complete');
  };

  const renderBookingSuccess = () => (
    <div className="max-w-2xl mx-auto text-center py-16">
      <div className="w-20 h-20 suz-card-glass rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
        <CheckCircle className="w-10 h-10 text-green-400" />
      </div>

      <h2 className="suz-text-display-sm font-bold text-slate-100 mb-4">
        Buchung erfolgreich eingereicht!
      </h2>

      <p className="suz-text-body-lg text-slate-300 mb-8">
        Vielen Dank für Ihre Buchungsanfrage. Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.
      </p>

      {completedBooking && (
        <div className="suz-card-glass rounded-2xl border border-white/20 p-6 mb-8 text-left">
          <h3 className="suz-text-heading-md font-semibold text-slate-100 mb-4">Ihre Buchungsdetails:</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Datum:</span>
              <span className="font-medium text-slate-200">
                {new Date(completedBooking.selectedDate).toLocaleDateString('de-DE', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Name:</span>
              <span className="font-medium text-slate-200">{completedBooking.customer.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">E-Mail:</span>
              <span className="font-medium text-slate-200">{completedBooking.customer.email}</span>
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
            className="suz-btn-primary bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 suz-card-glass border border-white/20"
          >
            <Phone className="w-5 h-5" />
            WhatsApp Kontakt
          </a>

          <a
            href="mailto:info@suzreinigung.de"
            className="suz-btn-primary bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 suz-card-glass border border-white/20"
          >
            <Mail className="w-5 h-5" />
            E-Mail senden
          </a>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsBookingComplete(false);
            setCompletedBooking(null);
          }}
          className="text-blue-400 hover:text-blue-300 font-medium flex items-center justify-center gap-2 mx-auto transition-colors duration-300"
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
          content="online termin buchen, reinigung köln, reinigung bonn, terminbuchung, cleaning appointment, professionelle reinigung deutschland"
        />
        <link rel="canonical" href="https://www.suzreinigung.de/booking" />

        {/* Enhanced Open Graph Tags */}
        <meta property="og:title" content="Online Termin buchen - SUZ Reinigung | Premium Reinigungsservice" />
        <meta property="og:description" content="Buchen Sie Ihren Reinigungstermin online. Einfach, schnell und flexibel. Verfügbare Termine in Köln, Bonn und Umgebung." />
        <meta property="og:url" content="https://www.suzreinigung.de/booking" />
        <meta property="og:type" content="service" />
        <meta property="og:image" content="https://www.suzreinigung.de/assets/images/booking-og.jpg" />
        <meta property="og:locale" content="de_DE" />
        <meta property="og:site_name" content="SUZ Reinigung" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Online Termin buchen - SUZ Reinigung" />
        <meta name="twitter:description" content="Buchen Sie Ihren Reinigungstermin online. Einfach, schnell und flexibel." />
        <meta name="twitter:image" content="https://www.suzreinigung.de/assets/images/booking-og.jpg" />

        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="SUZ Reinigung" />
        <meta name="geo.region" content="DE-NW" />
        <meta name="geo.placename" content="Köln, Bonn" />
        <meta name="geo.position" content="50.9375;6.9603" />
        <meta name="ICBM" content="50.9375, 6.9603" />
        
        {/* Enhanced Schema.org Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Online Terminbuchung - SUZ Reinigung",
            "description": "Buchen Sie Ihren professionellen Reinigungstermin online bei SUZ Reinigung. Verfügbare Termine in Köln, Bonn und Umgebung.",
            "image": "https://www.suzreinigung.de/assets/images/booking-service.jpg",
            "url": "https://www.suzreinigung.de/booking",
            "provider": {
              "@type": "LocalBusiness",
              "name": "SUZ Reinigung",
              "url": "https://www.suzreinigung.de",
              "telephone": "+4917623152477",
              "email": "info@suzreinigung.de",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Paul-Langen-Straße 39",
                "addressLocality": "Bonn",
                "postalCode": "53229",
                "addressCountry": "DE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "50.9375",
                "longitude": "6.9603"
              },
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Köln"
                },
                {
                  "@type": "City",
                  "name": "Bonn"
                },
                {
                  "@type": "State",
                  "name": "Nordrhein-Westfalen"
                }
              ]
            },
            "availableChannel": {
              "@type": "ServiceChannel",
              "serviceUrl": "https://www.suzreinigung.de/booking",
              "serviceType": "Online Booking",
              "availableLanguage": "de"
            },
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "EUR",
              "description": "Professionelle Reinigungsdienstleistungen mit Online-Terminbuchung"
            }
          })}
        </script>
      </Helmet>

      {/* Skip Navigation Links for Accessibility */}
      <nav className="sr-only" aria-label="Skip Navigation">
        <a
          href="#main-content"
          className="suz-focus-ring absolute top-4 left-4 z-50 bg-white text-black px-4 py-2 rounded focus:not-sr-only"
        >
          Zum Hauptinhalt springen
        </a>
        <a
          href="#booking-form"
          className="suz-focus-ring absolute top-4 left-40 z-50 bg-white text-black px-4 py-2 rounded focus:not-sr-only"
        >
          Zur Terminbuchung springen
        </a>
      </nav>

      <div
        className="min-h-screen bg-premium-gradient overflow-x-hidden force-apple-design"
        itemScope
        itemType="https://schema.org/Service"
      >
        <Navigation scrollToSection={scrollToSection} />

        {/* Enhanced Hero Section with Logo Integration */}
        <section
          id="home"
          className="relative suz-section-hero suz-hero-enhanced"
          role="banner"
          aria-label="Online Terminbuchung Hero"
        >
          {/* Hero Logo Integration */}
          <div className="absolute top-6 left-6 z-50 animate-fade-in suz-logo-container suz-hero-logo">
            <div className="suz-card-glass suz-logo-wrapper rounded-3xl border border-white/30 shadow-xl logo-glow group">
              <img
                src="/assets/logos/logo.png"
                alt="SUZ Reinigung Logo - Online Terminbuchung"
                title="SUZ Reinigung - Premium Online Terminbuchung"
                className="suz-logo-enhanced object-contain transition-all duration-300 group-hover:scale-110 image-optimized"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          {/* Enhanced Background Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50 pointer-events-none"></div>

          {/* Premium Radial Gradient */}
          <div className="absolute inset-0 bg-radial-gradient-hero opacity-40 pointer-events-none"></div>

          <div className="max-w-6xl mx-auto text-center animate-fade-in relative z-10">
            <header className="suz-hero-headline-container mb-8">
              <div
                className="suz-icon-badge-premium mb-8 mx-auto"
                role="img"
                aria-label="Online Terminbuchung Service Icon"
                tabIndex={0}
              >
                <CalendarDays
                  className="w-12 h-12 transition-all duration-500"
                  strokeWidth={2}
                  aria-hidden="true"
                  focusable="false"
                />
              </div>
              <h1
                className="suz-hero-title text-slate-100 optimize-lcp"
                itemProp="name"
                data-ai-content="service-heading"
                role="heading"
                aria-level="1"
              >
                Online{' '}
                <span
                  className="suz-hero-accent gradient-text-animated pulse-glow"
                  aria-label="Termin buchen - Premium Online Terminbuchung"
                >
                  Termin buchen
                </span>
              </h1>
            </header>

            <div className="suz-hero-subtitle-container mb-8">
              <p
                className="suz-hero-subtitle text-slate-300 max-w-3xl mx-auto text-center"
                itemProp="description"
                data-ai-content="service-description"
              >
                Buchen Sie Ihren Reinigungstermin schnell und unkompliziert online.{' '}
                <span className="text-slate-200 font-medium">
                  Wählen Sie Datum, Uhrzeit und Service - wir kümmern uns um den Rest.
                </span>
              </p>
            </div>
          </div>
        </section>

        <main
          id="main-content"
          className="suz-page-container"
          role="main"
          aria-label="Hauptinhalt"
        >

            {/* Benefits Section */}
            {!isBookingComplete && (
              <section
                className="suz-section-standard bg-slate-800/20"
                role="region"
                aria-label="Terminbuchung Vorteile"
              >
                <div className="max-w-4xl mx-auto">
                  <header className="text-center mb-12">
                    <h2
                      className="suz-text-display-md font-bold text-slate-100 mb-4"
                      data-ai-content="benefits-heading"
                    >
                      Ihre Vorteile bei der Online-Buchung
                    </h2>
                    <p className="suz-text-body-lg text-slate-300 max-w-2xl mx-auto">
                      Erleben Sie die Zukunft der Terminbuchung - einfach, schnell und zuverlässig.
                    </p>
                  </header>

                  {/* Benefits Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="suz-card-glass rounded-2xl border border-white/20 p-6 text-center group hover:scale-105 transition-all duration-300">
                      <div className="suz-icon-badge-premium mb-4 mx-auto">
                        <Calendar
                          className="w-8 h-8 text-blue-400 transition-all duration-500 group-hover:scale-110"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="suz-text-heading-md font-semibold text-slate-100 mb-2">
                        Flexible Termine
                      </h3>
                      <p className="suz-text-body-sm text-slate-300">
                        Verfügbare Termine für die nächsten 30 Tage - wählen Sie nach Ihren Wünschen
                      </p>
                    </div>

                    <div className="suz-card-glass rounded-2xl border border-white/20 p-6 text-center group hover:scale-105 transition-all duration-300">
                      <div className="suz-icon-badge-premium mb-4 mx-auto">
                        <Clock
                          className="w-8 h-8 text-green-400 transition-all duration-500 group-hover:scale-110"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="suz-text-heading-md font-semibold text-slate-100 mb-2">
                        Sofort verfügbar
                      </h3>
                      <p className="suz-text-body-sm text-slate-300">
                        Echtzeitanzeige freier Terminslots - keine Wartezeiten am Telefon
                      </p>
                    </div>

                    <div className="suz-card-glass rounded-2xl border border-white/20 p-6 text-center group hover:scale-105 transition-all duration-300">
                      <div className="suz-icon-badge-premium mb-4 mx-auto">
                        <CheckCircle
                          className="w-8 h-8 text-purple-400 transition-all duration-500 group-hover:scale-110"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="suz-text-heading-md font-semibold text-slate-100 mb-2">
                        Sofortige Bestätigung
                      </h3>
                      <p className="suz-text-body-sm text-slate-300">
                        Buchungsbestätigung innerhalb von 24 Stunden - garantiert zuverlässig
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Main Booking Content */}
            {isBookingComplete ? (
              <section
                className="suz-section-standard"
                role="region"
                aria-label="Buchungsbestätigung"
              >
                {renderBookingSuccess()}
              </section>
            ) : (
              <section
                id="booking-form"
                className="suz-section-standard"
                role="region"
                aria-label="Terminbuchung Formular"
              >
                <div className="max-w-6xl mx-auto">
                  <div className="suz-card-glass rounded-2xl border border-white/20 p-8">
                    <AdvancedBookingCalendar
                      preselectedService={preselectedService}
                      onBookingComplete={handleBookingComplete}
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Additional Information Section */}
            {!isBookingComplete && (
              <section
                className="suz-section-standard bg-slate-800/20"
                role="region"
                aria-label="Warum online buchen"
              >
                <div className="max-w-6xl mx-auto">
                  <div className="suz-card-glass rounded-2xl border border-white/20 p-8">
                    <header className="text-center mb-12">
                      <h2 className="suz-text-display-md font-bold text-slate-100 mb-4">
                        Warum online buchen?
                      </h2>
                      <p className="suz-text-body-lg text-slate-300 max-w-2xl mx-auto">
                        Entdecken Sie die Vorteile unserer modernen Online-Terminbuchung
                      </p>
                    </header>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <h3 className="suz-text-heading-lg font-semibold text-slate-100 mb-4">
                          Ihre Vorteile:
                        </h3>
                        <ul className="space-y-4 text-slate-300">
                          <li className="flex items-start gap-3">
                            <div className="suz-card-glass rounded-full p-1 border border-white/20 mt-1">
                              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                            </div>
                            <span className="suz-text-body-md">
                              <strong className="text-slate-200">24/7 verfügbar</strong> - buchen Sie wann Sie möchten
                            </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="suz-card-glass rounded-full p-1 border border-white/20 mt-1">
                              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                            </div>
                            <span className="suz-text-body-md">
                              <strong className="text-slate-200">Sofortige Übersicht</strong> aller verfügbaren Termine
                            </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="suz-card-glass rounded-full p-1 border border-white/20 mt-1">
                              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                            </div>
                            <span className="suz-text-body-md">
                              <strong className="text-slate-200">Direkte Preisschätzung</strong> für Ihre Anfrage
                            </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="suz-card-glass rounded-full p-1 border border-white/20 mt-1">
                              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                            </div>
                            <span className="suz-text-body-md">
                              <strong className="text-slate-200">Zusatzleistungen</strong> einfach hinzubuchbar
                            </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="suz-card-glass rounded-full p-1 border border-white/20 mt-1">
                              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                            </div>
                            <span className="suz-text-body-md">
                              <strong className="text-slate-200">Kostenlose Stornierung</strong> bis 24h vor Termin
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-6">
                        <h3 className="suz-text-heading-lg font-semibold text-slate-100 mb-4">
                          So einfach geht's:
                        </h3>
                        <div className="space-y-6">
                          <div className="flex items-start gap-4">
                            <div className="suz-card-glass w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border border-white/20 bg-blue-600/20">
                              <span className="text-blue-400">1</span>
                            </div>
                            <div className="flex-1">
                              <p className="suz-text-body-md font-medium text-slate-100 mb-1">
                                Service auswählen
                              </p>
                              <p className="suz-text-body-sm text-slate-300">
                                Wählen Sie die gewünschte Reinigungsleistung aus unserem Angebot
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="suz-card-glass w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border border-white/20 bg-green-600/20">
                              <span className="text-green-400">2</span>
                            </div>
                            <div className="flex-1">
                              <p className="suz-text-body-md font-medium text-slate-100 mb-1">
                                Termin festlegen
                              </p>
                              <p className="suz-text-body-sm text-slate-300">
                                Datum und Uhrzeit nach Ihren Wünschen und Verfügbarkeit
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="suz-card-glass w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border border-white/20 bg-purple-600/20">
                              <span className="text-purple-400">3</span>
                            </div>
                            <div className="flex-1">
                              <p className="suz-text-body-md font-medium text-slate-100 mb-1">
                                Daten eingeben
                              </p>
                              <p className="suz-text-body-sm text-slate-300">
                                Ihre Kontaktdaten und spezielle Wünsche mitteilen
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="suz-card-glass w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border border-white/20 bg-orange-600/20">
                              <span className="text-orange-400">4</span>
                            </div>
                            <div className="flex-1">
                              <p className="suz-text-body-md font-medium text-slate-100 mb-1">
                                Bestätigung erhalten
                              </p>
                              <p className="suz-text-body-sm text-slate-300">
                                Wir melden uns innerhalb von 24 Stunden mit der Terminbestätigung
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contact Alternative */}
                    <div className="mt-12 pt-8 border-t border-white/20 text-center">
                      <p className="suz-text-body-lg text-slate-300 mb-6">
                        Lieber persönlich sprechen? Kein Problem!
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                          href="https://wa.me/4917623152477"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="suz-btn-primary bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 suz-card-glass border border-white/20"
                        >
                          <Phone className="w-5 h-5" />
                          WhatsApp: +49 176 23152477
                        </a>

                        <a
                          href="mailto:info@suzreinigung.de"
                          className="suz-btn-primary bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 suz-card-glass border border-white/20"
                        >
                          <Mail className="w-5 h-5" />
                          info@suzreinigung.de
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Booking;