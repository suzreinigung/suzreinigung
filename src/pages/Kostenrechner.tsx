import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { CostCalculator } from '../components/CostCalculator';

const Kostenrechner: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Track page view
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: 'Kostenrechner',
        page_location: window.location.href,
        event_category: 'calculator_page'
      });
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Kostenrechner - Sofortige Preisschätzung | SUZ Reinigung</title>
        <meta 
          name="description" 
          content="Berechnen Sie sofort die Kosten für Ihre Reinigungsdienstleistung. Transparente Preise für Büroreinigung, Hotelreinigung, Teppichreinigung und mehr in Köln & Bonn. Kostenlos und unverbindlich." 
        />
        <meta 
          name="keywords" 
          content="Reinigungsservice Preise, Kostenrechner Reinigung, Büroreinigung Kosten, Hotelreinigung Preise, Teppichreinigung Kosten, Köln Bonn Reinigungsservice, Preiskalkulation Gebäudereinigung" 
        />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Kostenrechner - Sofortige Preisschätzung | SUZ Reinigung" />
        <meta property="og:description" content="Berechnen Sie sofort die Kosten für Ihre Reinigungsdienstleistung. Transparente Preise für alle Reinigungsarten in Köln & Bonn." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.suzreinigung.de/kostenrechner" />
        <meta property="og:image" content="https://www.suzreinigung.de/og-calculator.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kostenrechner - SUZ Reinigung" />
        <meta name="twitter:description" content="Sofortige Preisschätzung für Reinigungsdienstleistungen in Köln & Bonn" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Kostenrechner - SUZ Reinigung",
            "description": "Berechnen Sie sofort die Kosten für Ihre Reinigungsdienstleistung",
            "url": "https://www.suzreinigung.de/kostenrechner",
            "mainEntity": {
              "@type": "Service",
              "name": "Reinigungsservice Kostenrechner",
              "provider": {
                "@type": "LocalBusiness",
                "name": "SUZ Reinigung",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Köln",
                  "addressRegion": "NRW",
                  "addressCountry": "DE"
                }
              },
              "areaServed": ["Köln", "Bonn", "Düsseldorf"],
              "serviceType": [
                "Büroreinigung",
                "Hotelzimmerreinigung", 
                "Teppichreinigung",
                "Bodenreinigung",
                "Krankenhausreinigung",
                "Gemeinschaftsräume"
              ]
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-premium-gradient overflow-x-hidden force-apple-design">
        <Navigation scrollToSection={scrollToSection} />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23334155%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-green-500/10 rounded-full blur-xl animate-pulse delay-2000"></div>

          <div className="relative z-10 max-w-6xl mx-auto">
            {/* Main Hero Content */}
            <div className="text-center mb-16">
              {/* Icon Badge */}
              <div className="suz-icon-badge-premium mb-8 mx-auto">
                <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>

              <h1 className="suz-text-display-xl font-bold text-slate-100 mb-8 leading-tight">
                Kostenrechner für<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-green-400">
                  Reinigungsdienstleistungen
                </span>
              </h1>

              <div className="suz-card-glass rounded-2xl p-8 max-w-4xl mx-auto mb-12">
                <p className="suz-text-body-xl text-slate-300 leading-relaxed mb-8">
                  Erhalten Sie sofort eine transparente und faire Preisschätzung für Ihre Reinigungsdienstleistung.
                  Unser Kostenrechner berücksichtigt alle wichtigen Faktoren und bietet Ihnen realistische Preise
                  basierend auf aktuellen Marktdaten aus der Region Köln/Bonn.
                </p>

                {/* Trust Indicators */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-slate-300 font-medium">Kostenlos & unverbindlich</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                    <span className="text-slate-300 font-medium">Sofortige Berechnung</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-700"></div>
                    <span className="text-slate-300 font-medium">Marktgerechte Preise</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="flex flex-wrap justify-center gap-8 text-center">
                  <div>
                    <div className="suz-text-heading-lg font-bold text-blue-400 mb-1">15+</div>
                    <div className="text-slate-400 text-sm">Service-Kategorien</div>
                  </div>
                  <div>
                    <div className="suz-text-heading-lg font-bold text-green-400 mb-1">2 Min</div>
                    <div className="text-slate-400 text-sm">Berechnungszeit</div>
                  </div>
                  <div>
                    <div className="suz-text-heading-lg font-bold text-purple-400 mb-1">100%</div>
                    <div className="text-slate-400 text-sm">Transparent</div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => scrollToSection('calculator')}
                  className="suz-button-primary-lg group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Jetzt Preis berechnen
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <div id="calculator">
          <CostCalculator />
        </div>

        {/* SEO Content Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="suz-card-glass rounded-2xl p-8">
              <h2 className="suz-text-heading-xl font-bold text-slate-100 mb-6 text-center">
                Warum unseren Kostenrechner verwenden?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="suz-text-heading-lg font-semibold text-slate-100 mb-4">
                    Transparente Preisgestaltung
                  </h3>
                  <p className="suz-text-body-md text-slate-300 mb-4">
                    Unser Kostenrechner basiert auf aktuellen Marktdaten und berücksichtigt alle relevanten 
                    Faktoren wie Serviceart, Fläche, Häufigkeit und Standort für eine realistische Preisschätzung.
                  </p>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                      Marktgerechte Preise für Köln/Bonn
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                      Berücksichtigung aller Kostenfaktoren
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                      Keine versteckten Gebühren
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="suz-text-heading-lg font-semibold text-slate-100 mb-4">
                    Alle Reinigungsarten abgedeckt
                  </h3>
                  <p className="suz-text-body-md text-slate-300 mb-4">
                    Von der Büroreinigung bis zur spezialisierten Krankenhausreinigung - 
                    unser Rechner deckt alle Bereiche der professionellen Gebäudereinigung ab.
                  </p>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                      Büro- und Praxisreinigung
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                      Hotel- und Gastronomiereinigung
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                      Spezialreinigungen (Teppich, Boden)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Kostenrechner;
