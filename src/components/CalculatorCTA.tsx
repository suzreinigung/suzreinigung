import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowRight, CheckCircle, Clock, Euro } from 'lucide-react';

const CalculatorCTA: React.FC = () => {
  // Track CTA clicks
  const handleCTAClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click', {
        event_category: 'calculator_cta',
        event_label: 'homepage_to_calculator',
        event_action: 'navigate_to_calculator'
      });
    }
  };

  return (
    <section
      id="calculator-cta"
      className="suz-section-standard bg-premium-gradient"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <header className="text-center mb-12">
          <div className="suz-icon-badge-premium mb-6 mx-auto">
            <Calculator size={40} className="text-blue-400" />
          </div>
          <h2 className="suz-text-heading-xl font-bold text-slate-100 mb-6">
            Jetzt Sofort kostenlos Preis kalkulieren
          </h2>
          <p className="suz-text-body-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Erhalten Sie in wenigen Sekunden eine transparente und faire Preisschätzung für Ihre
            Reinigungsdienstleistung. Unser intelligenter Kostenrechner berücksichtigt alle wichtigen
            Faktoren und bietet Ihnen realistische Preise basierend auf aktuellen Marktdaten aus der
            Region Köln, Bonn und Umgebung.
          </p>
          
          {/* SEO Keywords Integration */}
          <div className="text-slate-400 text-sm mb-12">
            <p className="mb-2">
              <strong className="text-slate-300">Reinigungsarbeiten Preise</strong> • 
              <strong className="text-slate-300"> Büroreinigung Kosten</strong> • 
              <strong className="text-slate-300"> Hotelreinigung Preise</strong>
            </p>
            <p>
              <strong className="text-slate-300">Teppichreinigung Kosten</strong> • 
              <strong className="text-slate-300"> Gebäudereinigung Preisliste</strong> • 
              <strong className="text-slate-300"> Reinigungsservice Kalkulation</strong>
            </p>
          </div>
        </header>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: Clock,
              title: 'Sofortige Berechnung',
              description: 'Erhalten Sie Ihr Angebot in unter 60 Sekunden - ohne Wartezeit oder Rückruf',
              color: 'text-green-400'
            },
            {
              icon: Euro,
              title: 'Transparente Preise',
              description: 'Faire Marktpreise ohne versteckte Kosten - basierend auf aktuellen Branchendaten',
              color: 'text-blue-400'
            },
            {
              icon: CheckCircle,
              title: 'Unverbindlich & Kostenlos',
              description: 'Keine Verpflichtungen - nutzen Sie unseren Rechner völlig kostenfrei',
              color: 'text-purple-400'
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="suz-card-glass rounded-xl p-6 text-center hover:scale-105 transition-all duration-300 group"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center group-hover:bg-slate-600/50 transition-colors`}>
                <feature.icon size={32} className={feature.color} />
              </div>
              <h3 className="suz-text-heading-md font-semibold text-slate-100 mb-3">
                {feature.title}
              </h3>
              <p className="suz-text-body-md text-slate-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Main CTA */}
        <div className="text-center mb-12">
          <Link
            to="/kostenrechner"
            onClick={handleCTAClick}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group"
          >
            <Calculator size={24} />
            Kostenrechner starten
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <p className="text-slate-400 text-sm mt-4">
            ✓ Kostenlos ✓ Unverbindlich ✓ Sofortige Berechnung
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-12">
          {[
            { number: '20+', label: 'Jahre Erfahrung' },
            { number: '1000+', label: 'Zufriedene Kunden' },
            { number: '6', label: 'Reinigungsarten' },
            { number: '24/7', label: 'Service verfügbar' }
          ].map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="suz-text-heading-lg font-bold text-blue-400">
                {stat.number}
              </div>
              <div className="suz-text-body-sm text-slate-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Additional SEO Content */}
        <div className="max-w-4xl mx-auto">
          <div className="suz-card-glass rounded-xl p-8 text-center">
            <h3 className="suz-text-heading-xl font-bold text-slate-100 mb-4">
              Warum SUZ Reinigung für Ihre Preiskalkulation?
            </h3>
            <p className="suz-text-body-md text-slate-300 leading-relaxed mb-6">
              Als etablierter Reinigungsservice in der Region Köln/Bonn bieten wir Ihnen nicht nur 
              transparente Preise, sondern auch die Gewissheit, dass unsere Kalkulationen auf echter 
              Markterfahrung basieren. Unsere Preise sind fair für Sie als Kunde und ermöglichen uns 
              gleichzeitig, höchste Qualitätsstandards zu gewährleisten.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              <span>🏆 Zertifizierte Qualität</span>
              <span>🛡️ Vollversichert</span>
              <span>⚡ Express-Service verfügbar</span>
              <span>🌱 Umweltfreundliche Reinigung</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorCTA;
