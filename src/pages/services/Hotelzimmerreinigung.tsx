import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Building2, Check, Clock, Users, Star, Phone, MessageCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { TrustIndicators } from '@/components/TrustIndicators';
import QuoteRequestForm from '@/components/QuoteRequestForm';
import { services } from '@/data/services';
import { trackBusinessEvents } from '@/lib/analytics';

const Hotelzimmerreinigung = () => {
  const serviceData = services.hotelzimmerreinigung;

  useEffect(() => {
    trackBusinessEvents.servicePageView('hotelzimmerreinigung');
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCTAClick = () => {
    trackBusinessEvents.serviceInquiry('hotelzimmerreinigung');
    window.open('https://wa.me/4917623152477', '_blank');
  };

  return (
    <div
      className="min-h-screen bg-premium-gradient overflow-x-hidden force-apple-design"
      itemScope
      itemType="https://schema.org/Service"
    >
      <Helmet>
        <title>{serviceData.seo.title}</title>
        <meta name="description" content={serviceData.seo.description} />
        <meta name="keywords" content={serviceData.seo.keywords.join(', ')} />
        <link rel="canonical" href="https://www.suzreinigung.de/services/hotelzimmerreinigung" />

        {/* Enhanced Open Graph Tags */}
        <meta property="og:title" content={serviceData.seo.title} />
        <meta property="og:description" content={serviceData.seo.description} />
        <meta property="og:url" content="https://www.suzreinigung.de/services/hotelzimmerreinigung" />
        <meta property="og:type" content="service" />
        <meta property="og:image" content={`https://www.suzreinigung.de${serviceData.image}`} />
        <meta property="og:locale" content="de_DE" />
        <meta property="og:site_name" content="SUZ Reinigung" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={serviceData.seo.title} />
        <meta name="twitter:description" content={serviceData.seo.description} />
        <meta name="twitter:image" content={`https://www.suzreinigung.de${serviceData.image}`} />

        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="SUZ Reinigung" />
        <meta name="geo.region" content="DE-NW" />
        <meta name="geo.placename" content="Köln, Bonn" />
        <meta name="geo.position" content="50.9375;6.9603" />
        <meta name="ICBM" content="50.9375, 6.9603" />

        {/* Schema.org Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": serviceData.title,
            "description": serviceData.longDescription,
            "image": `https://www.suzreinigung.de${serviceData.image}`,
            "url": "https://www.suzreinigung.de/services/hotelzimmerreinigung",
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
            "serviceType": "Hotelzimmerreinigung",
            "category": "Reinigungsdienstleistung",
            "offers": {
              "@type": "Offer",
              "priceRange": "€25-€80",
              "priceCurrency": "EUR",
              "availability": "https://schema.org/InStock"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "127",
              "bestRating": "5",
              "worstRating": "1"
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
          href="#quote"
          className="suz-focus-ring absolute top-4 left-40 z-50 bg-white text-black px-4 py-2 rounded focus:not-sr-only"
        >
          Zum Angebot springen
        </a>
      </nav>

      <Navigation scrollToSection={scrollToSection} />

      {/* Enhanced Hero Section with Logo Integration */}
      <section
        id="home"
        className="relative suz-section-hero suz-hero-enhanced"
        role="banner"
        aria-label="Hotelzimmerreinigung Service Hero"
      >
        {/* Hero Logo Integration */}
        <div className="absolute top-6 left-6 z-50 animate-fade-in suz-logo-container suz-hero-logo">
          <div className="suz-card-glass suz-logo-wrapper rounded-3xl border border-white/30 shadow-xl logo-glow group">
            <img
              src="/assets/logos/logo.png"
              alt="SUZ Reinigung Logo - Professionelle Hotelzimmerreinigung"
              title="SUZ Reinigung - Premium Hotelzimmerreinigung"
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
              aria-label="Hotelzimmerreinigung Service Icon"
              tabIndex={0}
            >
              <Building2
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
              <span
                className="suz-hero-accent gradient-text-animated pulse-glow"
                aria-label={`${serviceData.title} - Premium Reinigungsservice`}
              >
                {serviceData.title}
              </span>
            </h1>
          </header>

          <div className="suz-hero-subtitle-container mb-8">
            <p
              className="suz-text-display-sm text-slate-300 font-light tracking-wide max-w-4xl mx-auto"
              data-ai-content="service-description"
              itemProp="description"
            >
              {serviceData.longDescription}
            </p>
          </div>

          <div className="suz-hero-cta-container flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={handleCTAClick}
              className="suz-button-primary suz-button-enhanced group"
              aria-label="Kostenloses Angebot für Hotelzimmerreinigung anfordern"
            >
              <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
              Kostenloses Angebot
            </button>
            <a
              href="tel:+4917623152477"
              className="suz-button-secondary suz-button-enhanced group"
              aria-label="SUZ Reinigung anrufen für Hotelzimmerreinigung"
            >
              <Phone className="w-5 h-5 transition-transform group-hover:scale-110" />
              Jetzt anrufen
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Wrapper */}
      <main id="main-content" role="main" aria-label="Hotelzimmerreinigung Service Inhalt">

        {/* Enhanced Service Image Section */}
        <section
          className="suz-section-standard bg-slate-800/30"
          role="region"
          aria-label="Hotelzimmerreinigung Service Bild"
        >
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="suz-service-image-container mx-auto">
              <img
                src={serviceData.image}
                alt={`${serviceData.title} - SUZ Reinigung Premium Service`}
                className="suz-service-image"
                loading="lazy"
                decoding="async"
                itemProp="image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features & Benefits Section */}
      <section
        className="suz-section-standard bg-slate-900/30"
        role="region"
        aria-label="Leistungen und Vorteile"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Features Card */}
            <div className="suz-card-glass rounded-2xl border border-white/20">
              <header className="mb-8">
                <h2
                  className="suz-text-display-sm font-bold text-slate-100 text-center"
                  data-ai-content="features-heading"
                >
                  Unsere Leistungen
                </h2>
              </header>
              <div className="grid gap-4" role="list" aria-label="Service Features">
                {serviceData.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 group"
                    role="listitem"
                  >
                    <div className="suz-icon-badge-small bg-green-500/20 border border-green-400/30">
                      <Check className="w-4 h-4 text-green-400 transition-transform group-hover:scale-110" />
                    </div>
                    <span className="suz-text-body-lg text-slate-300 group-hover:text-slate-200 transition-colors">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits Card */}
            <div className="suz-card-glass rounded-2xl border border-white/20">
              <header className="mb-8">
                <h2
                  className="suz-text-display-sm font-bold text-slate-100 text-center"
                  data-ai-content="benefits-heading"
                >
                  Ihre Vorteile
                </h2>
              </header>
              <div className="grid gap-4" role="list" aria-label="Service Benefits">
                {serviceData.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 group"
                    role="listitem"
                  >
                    <div className="suz-icon-badge-small bg-blue-500/20 border border-blue-400/30">
                      <Star className="w-4 h-4 text-blue-400 transition-transform group-hover:scale-110" />
                    </div>
                    <span className="suz-text-body-lg text-slate-300 group-hover:text-slate-200 transition-colors">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Process Section */}
      <section
        className="suz-section-standard bg-slate-800/20"
        role="region"
        aria-label="Reinigungsprozess"
      >
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <h2
              className="suz-text-display-md font-bold text-slate-100 mb-4"
              data-ai-content="process-heading"
            >
              Unser Reinigungsprozess
            </h2>
            <p className="suz-text-body-lg text-slate-400 max-w-2xl mx-auto">
              Systematische Hotelzimmerreinigung in vier professionellen Schritten
            </p>
          </header>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceData.process.map((step, index) => (
              <div
                key={index}
                className="suz-card-glass rounded-xl border border-white/10 text-center group hover:border-blue-400/30 transition-all duration-300"
                role="article"
                aria-label={`Schritt ${step.step}: ${step.title}`}
              >
                <div className="suz-icon-badge-premium mb-6 mx-auto group-hover:scale-110 transition-transform">
                  <span className="suz-text-heading-lg font-bold text-blue-400">{step.step}</span>
                </div>
                <h3 className="suz-text-heading-md font-semibold text-slate-100 mb-3">
                  {step.title}
                </h3>
                <p className="suz-text-body-md text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Pricing Section */}
      <section
        className="suz-section-standard bg-slate-900/30"
        role="region"
        aria-label="Preise und Pakete"
      >
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <h2
              className="suz-text-display-md font-bold text-slate-100 mb-4"
              data-ai-content="pricing-heading"
            >
              {serviceData.pricing.title}
            </h2>
            <p className="suz-text-body-lg text-slate-400 max-w-2xl mx-auto">
              Transparente Preise für professionelle Hotelzimmerreinigung
            </p>
          </header>
          <div className="grid md:grid-cols-3 gap-8">
            {serviceData.pricing.options.map((option, index) => (
              <div
                key={index}
                className={`suz-card-glass rounded-2xl border transition-all duration-300 group hover:border-blue-400/40 hover:shadow-2xl ${
                  index === 1 ? 'border-blue-400/30 shadow-xl scale-105' : 'border-white/20'
                }`}
                role="article"
                aria-label={`Preispaket: ${option.name}`}
              >
                <header className="text-center mb-6">
                  <h3 className="suz-text-heading-lg font-semibold text-slate-100 mb-3">
                    {option.name}
                  </h3>
                  <div className="suz-text-display-sm font-bold text-blue-400 mb-2">
                    {option.price}
                  </div>
                  <p className="suz-text-body-md text-slate-300">
                    {option.description}
                  </p>
                </header>
                <ul className="space-y-3" role="list" aria-label="Paket Features">
                  {option.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center gap-3 group-hover:text-slate-200 transition-colors"
                      role="listitem"
                    >
                      <div className="suz-icon-badge-small bg-green-500/20 border border-green-400/30">
                        <Check className="w-3 h-3 text-green-400" />
                      </div>
                      <span className="suz-text-body-sm text-slate-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Trust Indicators */}
      <section
        className="suz-section-standard bg-slate-800/20"
        role="region"
        aria-label="Vertrauensindikatoren"
      >
        <div className="max-w-6xl mx-auto">
          <TrustIndicators layout="compact" />
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section
        className="suz-section-standard bg-slate-900/30"
        role="region"
        aria-label="Häufig gestellte Fragen"
      >
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h2
              className="suz-text-display-md font-bold text-slate-100 mb-4"
              data-ai-content="faq-heading"
            >
              Häufig gestellte Fragen
            </h2>
            <p className="suz-text-body-lg text-slate-400 max-w-2xl mx-auto">
              Antworten auf die wichtigsten Fragen zur Hotelzimmerreinigung
            </p>
          </header>
          <div className="space-y-6" role="list" aria-label="FAQ Liste">
            {serviceData.faqs.map((faq, index) => (
              <article
                key={index}
                className="suz-card-glass rounded-xl border border-white/20 group hover:border-blue-400/30 transition-all duration-300"
                role="listitem"
              >
                <h3 className="suz-text-heading-md font-semibold text-slate-100 mb-4 group-hover:text-blue-300 transition-colors">
                  {faq.question}
                </h3>
                <p className="suz-text-body-md text-slate-300 leading-relaxed">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Quote Request Section */}
      <section
        id="quote"
        className="suz-section-standard bg-slate-800/20"
        role="region"
        aria-label="Angebot anfordern"
      >
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h2
              className="suz-text-display-md font-bold text-slate-100 mb-4"
              data-ai-content="quote-heading"
            >
              Kostenloses Angebot anfordern
            </h2>
            <p className="suz-text-body-lg text-slate-300 max-w-2xl mx-auto">
              Erhalten Sie ein unverbindliches Angebot für Ihre Hotelzimmerreinigung.
              Wir melden uns innerhalb von 24 Stunden bei Ihnen.
            </p>
          </header>
          <div className="suz-card-glass rounded-2xl border border-white/20">
            <QuoteRequestForm />
          </div>
        </div>
      </section>



      </main>

      <Footer />
    </div>
  );
};

export default Hotelzimmerreinigung;