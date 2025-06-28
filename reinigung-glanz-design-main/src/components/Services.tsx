
import { Building2, Home, Sparkles, Users, Briefcase, Shield } from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: "Hotelzimmerreinigung",
      description: "Tiefenreinigung und tägliche Pflege für höchste Hygienestandards in Hotelzimmern.",
      icon: Building2,
      keywords: "Hotelreinigung, Zimmerreinigung, Hotelhygiene, Gastgewerbe",
      category: "Gewerbereinigung"
    },
    {
      title: "Teppichreinigung",
      description: "Tiefenreinigung für Teppiche und Polster. Wir entfernen Flecken, Gerüche und Allergene für ein frisches und hygienisches Raumklima.",
      icon: Home,
      keywords: "Teppichreinigung, Polsterreinigung, Fleckenentfernung, Allergene",
      category: "Spezialreinigung"
    },
    {
      title: "Bodenreinigung",
      description: "Professionelle Pflege für Hartböden, Fliesen, Laminat und mehr. Wir sorgen für glänzende, hygienisch saubere Oberflächen.",
      icon: Sparkles,
      keywords: "Bodenreinigung, Hartböden, Fliesenreinigung, Laminatpflege",
      category: "Grundreinigung"
    },
    {
      title: "Gemeinschaftsräume",
      description: "Zuverlässige Reinigung von Treppenhäusern, Fluren und Gemeinschaftsbereichen für Mehrfamilienhäuser und Wohnanlagen.",
      icon: Users,
      keywords: "Treppenhausreinigung, Gemeinschaftsräume, Mehrfamilienhaus, Wohnanlage",
      category: "Hausreinigung"
    },
    {
      title: "Büroreinigung",
      description: "Professionelle Reinigung von Büroflächen und Arbeitsplätzen für ein sauberes und produktives Arbeitsumfeld.",
      icon: Briefcase,
      keywords: "Büroreinigung, Arbeitsplatzreinigung, Gewerbliche Reinigung, Unternehmen",
      category: "Gewerbereinigung"
    },
    {
      title: "Desinfektion",
      description: "Gründliche Desinfektion von Räumen und Oberflächen zur Bekämpfung von Keimen, Bakterien und Viren für maximale Hygiene und Sicherheit.",
      icon: Shield,
      keywords: "Desinfektion, Hygiene, Keimbekämpfung, Virenschutz",
      category: "Spezialreinigung"
    }
  ];

  return (
    <section
      id="services"
      className="suz-services-section suz-section-standard"
    >
      <div className="max-w-7xl mx-auto">
        <header className="text-center animate-fade-in" style={{ marginBottom: 'var(--space-20)' }}>
          <h2
            className="suz-section-title text-slate-100 mb-8"
            data-ai-content="services-heading"
            itemProp="serviceType"
          >
            Unsere <span className="gradient-text">Leistungen</span>
          </h2>
          <p
            className="suz-text-heading-lg text-slate-300 max-w-3xl mx-auto"
            data-ai-content="services-description"
          >
            Professionelle Reinigungslösungen für jeden Bedarf
          </p>

          {/* Hidden AI-optimized content for better discoverability */}
          <div className="sr-only" data-ai-content="services-overview">
            <h3>SUZ Reinigung Dienstleistungen in Köln und Bonn:</h3>
            <p>Wir bieten umfassende Reinigungsdienstleistungen für Privat- und Geschäftskunden in Nordrhein-Westfalen. Unsere Spezialgebiete umfassen Büroreinigung, Hausreinigung, Hotelreinigung, Teppichreinigung, Bodenreinigung und professionelle Desinfektion.</p>
          </div>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <article
              key={index}
              className="suz-card-glass service-card-premium card-hover-enhanced rounded-3xl border border-white/30 group shadow-2xl animate-fade-in relative overflow-hidden"
              style={{
                animationDelay: `${index * 0.15}s`,
                padding: 'var(--component-padding-lg)'
              }}
              data-ai-content="service-item"
              data-service-category={service.category}
              itemScope
              itemType="https://schema.org/Service"
            >
              {/* Shimmer effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-500 pointer-events-none"></div>

              <div
                className="suz-icon-badge-premium mb-6 group-hover:scale-110 group-hover:rotate-3 relative z-10"
                role="img"
                aria-label={`Icon für ${service.title}`}
                tabIndex={0}
              >
                <service.icon
                  size={36}
                  className="transition-all duration-500 group-hover:scale-105"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </div>
              <h3
                className="suz-text-heading-lg font-semibold text-slate-100 mb-6 text-reveal relative z-10 suz-german-business-name"
                itemProp="name"
                data-ai-keyword={service.keywords}
              >
                {service.title}
              </h3>
              <p
                className="suz-text-body-lg text-slate-300 text-reveal relative z-10 suz-german-service-text"
                itemProp="description"
                data-ai-content="service-description"
              >
                {service.description}
              </p>

              {/* Hidden AI-optimized content */}
              <div className="sr-only" data-ai-content="service-keywords">
                <span itemProp="keywords">{service.keywords}</span>
                <span itemProp="serviceType">{service.category}</span>
                <span itemProp="provider" itemScope itemType="https://schema.org/LocalBusiness">
                  <span itemProp="name">SUZ Reinigung</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
