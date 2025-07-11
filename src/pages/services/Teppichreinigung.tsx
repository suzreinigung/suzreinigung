import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Home, Check, Star, Phone, MessageCircle, Clock, Users } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { TrustIndicators } from '@/components/TrustIndicators';
import QuoteRequestForm from '@/components/QuoteRequestForm';
import { services } from '@/data/services';
import { trackBusinessEvents } from '@/lib/analytics';

const Teppichreinigung = () => {
  const serviceData = services.teppichreinigung;

  useEffect(() => {
    trackBusinessEvents.servicePageView('teppichreinigung');
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCTAClick = () => {
    trackBusinessEvents.serviceInquiry('teppichreinigung');
    window.open('https://wa.me/4917623152477', '_blank');
  };

  return (
    <div className="min-h-screen suz-page-container bg-premium-gradient">
      <Helmet>
        <title>{serviceData.seo.title}</title>
        <meta name="description" content={serviceData.seo.description} />
        <meta name="keywords" content={serviceData.seo.keywords.join(', ')} />
        <link rel="canonical" href="https://www.suzreinigung.de/services/teppichreinigung" />
        <meta property="og:title" content={serviceData.seo.title} />
        <meta property="og:description" content={serviceData.seo.description} />
        <meta property="og:url" content="https://www.suzreinigung.de/services/teppichreinigung" />
        <meta property="og:type" content="service" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={serviceData.seo.title} />
        <meta name="twitter:description" content={serviceData.seo.description} />
      </Helmet>

      <Navigation scrollToSection={scrollToSection} />

      {/* Enhanced Hero Section with Logo Integration */}
      <section
        id="home"
        className="relative suz-section-hero suz-hero-enhanced"
        role="banner"
        aria-label="Teppichreinigung Service Hero"
      >
        {/* Hero Logo Integration */}
        <div className="absolute top-6 left-6 z-50 animate-fade-in suz-logo-container suz-hero-logo">
          <div className="suz-card-glass suz-logo-wrapper rounded-3xl border border-white/30 shadow-xl logo-glow group">
            <img
              src="/assets/logos/logo.png"
              alt="SUZ Reinigung Logo - Professionelle Teppichreinigung"
              title="SUZ Reinigung - Premium Teppichreinigung"
              className="suz-logo-enhanced object-contain transition-all duration-300 group-hover:scale-110 image-optimized"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>

        {/* Enhanced Background Effects with Teppichreinigung Theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-green-900/90 to-slate-900/95 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent_50%)]"></div>

        <div className="max-w-6xl mx-auto text-center animate-fade-in relative z-10 pt-8">
          <header className="suz-hero-headline-container mb-12">
            <div
              className="suz-icon-badge-premium mb-10 mx-auto"
              role="img"
              aria-label="Teppichreinigung Service Icon"
              tabIndex={0}
            >
              <Home
                className="w-12 h-12 transition-all duration-500"
                strokeWidth={2}
                aria-hidden="true"
                focusable="false"
              />
            </div>
            <h1
              className="suz-hero-title text-slate-100 optimize-lcp mb-6"
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

          <div className="suz-hero-content-container mb-16">
            <p
              className="suz-text-heading-xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed"
              data-ai-content="service-description"
              itemProp="description"
            >
              {serviceData.longDescription}
            </p>
          </div>

          <div className="suz-hero-cta-container flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              type="button"
              onClick={handleCTAClick}
              className="suz-btn-primary suz-btn-cta group"
              aria-label="Kostenloses Angebot für Teppichreinigung anfordern"
            >
              <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span>Kostenloses Angebot</span>
            </button>
            <a
              href="tel:+4917623152477"
              className="suz-btn-secondary suz-btn-cta group"
              aria-label="SUZ Reinigung anrufen für Teppichreinigung"
            >
              <Phone className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span>Jetzt anrufen</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Wrapper */}
      <main id="main-content" role="main" aria-label="Teppichreinigung Service Inhalt">

        {/* Enhanced Service Image Section */}
        <section
          className="suz-section-standard bg-slate-800/30"
          role="region"
          aria-label="Teppichreinigung Service Bild"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <div className="suz-service-image-container mx-auto max-w-4xl">
                <div className="suz-card-glass rounded-2xl border border-white/20 p-4 group hover:border-green-400/30 transition-all duration-300">
                  <img
                    src={serviceData.image}
                    alt={`${serviceData.title} - SUZ Reinigung Premium Service`}
                    className="w-full h-auto object-contain rounded-xl transition-transform duration-300 group-hover:scale-[1.02] max-h-96"
                    loading="lazy"
                    decoding="async"
                    itemProp="image"
                  />
                </div>
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
              <div className="animate-fade-in">
                <header className="mb-8">
                  <h2
                    className="suz-text-display-md font-bold text-slate-100 mb-4"
                    data-ai-content="features-heading"
                  >
                    Unsere Leistungen
                  </h2>
                  <p className="suz-text-body-lg text-slate-400">
                    Professionelle Teppichreinigung für alle Teppicharten
                  </p>
                </header>
                <div className="grid gap-4" role="list">
                  {serviceData.features.map((feature, index) => (
                    <div
                      key={index}
                      className="suz-card-glass rounded-xl border border-white/10 p-5 group hover:border-green-400/30 hover:shadow-xl hover:shadow-green-400/10 transition-all duration-300"
                      role="listitem"
                    >
                      <div className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 transition-transform group-hover:scale-110" />
                        <span className="suz-text-body-md text-slate-300 group-hover:text-slate-200 transition-colors">{feature}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="animate-fade-in">
                <header className="mb-8">
                  <h2
                    className="suz-text-display-md font-bold text-slate-100 mb-4"
                    data-ai-content="benefits-heading"
                  >
                    Ihre Vorteile
                  </h2>
                  <p className="suz-text-body-lg text-slate-400">
                    Warum Kunden SUZ Teppichreinigung wählen
                  </p>
                </header>
                <div className="grid gap-4" role="list">
                  {serviceData.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="suz-card-glass rounded-xl border border-white/10 p-5 group hover:border-green-400/30 hover:shadow-xl hover:shadow-green-400/10 transition-all duration-300"
                      role="listitem"
                    >
                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-green-400 flex-shrink-0 transition-transform group-hover:scale-110" />
                        <span className="suz-text-body-md text-slate-300 group-hover:text-slate-200 transition-colors">{benefit}</span>
                      </div>
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
                Systematische Teppichreinigung in vier professionellen Schritten
              </p>
            </header>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {serviceData.process.map((step, index) => (
                <div
                  key={index}
                  className="suz-card-glass rounded-2xl border border-white/10 text-center group hover:border-green-400/30 hover:shadow-xl hover:shadow-green-400/10 transition-all duration-300"
                  role="article"
                  aria-label={`Schritt ${step.step}: ${step.title}`}
                >
                  <div className="p-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-green-600/20 rounded-full group-hover:bg-green-600/30 group-hover:scale-110 transition-all duration-300">
                      <span className="text-2xl font-bold text-green-400">{step.step}</span>
                    </div>
                    <h3 className="suz-text-heading-md font-semibold text-slate-100 mb-3 group-hover:text-white transition-colors">{step.title}</h3>
                    <p className="suz-text-body-sm text-slate-400 group-hover:text-slate-300 transition-colors">{step.description}</p>
                  </div>
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
                Transparente Preise für professionelle Teppichreinigung
              </p>
            </header>
            <div className="grid md:grid-cols-3 gap-8">
              {serviceData.pricing.options.map((option, index) => (
                <div
                  key={index}
                  className={`suz-card-glass rounded-2xl border transition-all duration-300 group hover:border-green-400/40 hover:shadow-2xl ${
                    index === 1 ? 'border-green-400/30 scale-105' : 'border-white/20'
                  }`}
                  role="article"
                  aria-label={`Preispaket: ${option.name}`}
                >
                  <div className="p-8">
                    <header className="text-center mb-6">
                      <h3 className="suz-text-heading-lg font-semibold text-slate-100 mb-2">{option.name}</h3>
                      <div className="suz-text-display-sm font-bold text-green-400 mb-4">{option.price}</div>
                      <p className="suz-text-body-md text-slate-400">{option.description}</p>
                    </header>
                    <ul className="space-y-3" role="list">
                      {option.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3" role="listitem">
                          <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="suz-text-body-sm text-slate-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <TrustIndicators layout="compact" />

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
              <p className="suz-text-body-lg text-slate-400">
                Antworten auf die wichtigsten Fragen zur Teppichreinigung
              </p>
            </header>
            <div className="space-y-6">
              {serviceData.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="suz-card-glass rounded-2xl border border-white/20 group hover:border-green-400/30 hover:shadow-xl hover:shadow-green-400/10 transition-all duration-300"
                  role="article"
                  aria-label={`FAQ: ${faq.question}`}
                >
                  <div className="p-8">
                    <h3 className="suz-text-heading-md font-semibold text-slate-100 mb-4 group-hover:text-white transition-colors">{faq.question}</h3>
                    <p className="suz-text-body-md text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{faq.answer}</p>
                  </div>
                </div>
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
                Erhalten Sie ein unverbindliches Angebot für Ihre Teppichreinigung.
                Wir melden uns innerhalb von 24 Stunden bei Ihnen.
              </p>
            </header>
            <div className="suz-card-glass rounded-2xl border border-white/20 hover:border-green-400/30 hover:shadow-xl hover:shadow-green-400/10 transition-all duration-300">
              <QuoteRequestForm />
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Teppichreinigung;