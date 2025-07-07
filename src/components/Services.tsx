import { Building2, Home, Sparkles, Users, Briefcase, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      title: "Hotelzimmerreinigung",
      description: "Tiefenreinigung und tägliche Pflege für höchste Hygienestandards in Hotelzimmern.",
      icon: Building2,
      image: "/assets/images/services/Hotelzimmerreinigung-min.png",
      keywords: "Hotelreinigung, Zimmerreinigung, Hotelhygiene, Gastgewerbe",
      category: "Gewerbereinigung",
      slug: "hotelzimmerreinigung"
    },
    {
      title: "Teppichreinigung",
      description: "Tiefenreinigung für Teppiche und Polster. Wir entfernen Flecken, Gerüche und Allergene für ein frisches und hygienisches Raumklima.",
      icon: Home,
      image: "/assets/images/services/Teppichreinigung-min.png",
      keywords: "Teppichreinigung, Polsterreinigung, Fleckenentfernung, Allergene",
      category: "Spezialreinigung",
      slug: "teppichreinigung"
    },
    {
      title: "Bodenreinigung",
      description: "Professionelle Pflege für Hartböden, Fliesen, Laminat und mehr. Wir sorgen für glänzende, hygienisch saubere Oberflächen.",
      icon: Sparkles,
      image: "/assets/images/services/Bodenreinigung-min.png",
      keywords: "Bodenreinigung, Hartböden, Fliesenreinigung, Laminatpflege",
      category: "Grundreinigung",
      slug: "bodenreinigung"
    },
    {
      title: "Gemeinschaftsräume",
      description: "Zuverlässige Reinigung von Treppenhäusern, Fluren und Gemeinschaftsbereichen für Mehrfamilienhäuser und Wohnanlagen.",
      icon: Users,
      image: "/assets/images/services/Gemeinschaftsräume-min.png",
      keywords: "Treppenhausreinigung, Gemeinschaftsräume, Mehrfamilienhaus, Wohnanlage",
      category: "Hausreinigung",
      slug: "gemeinschaftsraeume"
    },
    {
      title: "Büroreinigung",
      description: "Professionelle Reinigung von Büroflächen und Arbeitsplätzen für ein sauberes und produktives Arbeitsumfeld.",
      icon: Briefcase,
      image: "/assets/images/services/Büroreinigung-min.png",
      keywords: "Büroreinigung, Arbeitsplatzreinigung, Gewerbliche Reinigung, Unternehmen",
      category: "Gewerbereinigung",
      slug: "bueroreinigung"
    },
    {
      title: "Krankenhausreinigung",
      description: "Spezialisierte Reinigung für medizinische Einrichtungen mit höchsten Hygienestandards und Desinfektionsprotokollen für Patientensicherheit.",
      icon: Heart,
      image: "/assets/images/services/Krankenhausreinigung-min.png",
      keywords: "Krankenhausreinigung, Medizinische Reinigung, Hygiene, Desinfektion, Gesundheitswesen",
      category: "Medizinische Reinigung",
      slug: "krankenhausreinigung"
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
            <Link
              key={index}
              to={`/services/${service.slug}`}
              className="block"
            >
              <article
                className="suz-card-glass service-card-premium card-hover-enhanced rounded-3xl border border-white/30 group shadow-2xl animate-fade-in relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-3xl"
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

                {/* Service Image */}
                <div
                  className="suz-service-image-container mb-6 relative z-10 group-hover:scale-105 transition-transform duration-500"
                  role="img"
                  aria-label={`Bild für ${service.title}`}
                >
                  <img
                    src={service.image}
                    alt={`${service.title} - Professionelle Reinigungsdienstleistung von SUZ Reinigung Deutschland. Zuverlässige ${service.title.toLowerCase()} in Köln, Bonn und NRW seit 2000.`}
                    title={`SUZ Reinigung ${service.title} - Premium Reinigungsservice Deutschland`}
                    className="suz-service-image w-full rounded-2xl shadow-lg"
                    loading={index < 3 ? "eager" : "lazy"}
                    decoding="async"
                    data-optimize="true"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    onError={(e) => {
                      console.error(`Failed to load service image: ${service.image}`, e);
                    }}
                  />
                  <div className="suz-service-image-overlay absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

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

                {/* Call to Action */}
                <div className="mt-6 relative z-10">
                  <div className="inline-flex items-center text-blue-400 group-hover:text-blue-300 font-semibold">
                    Mehr erfahren
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Hidden AI-optimized content */}
                <div className="sr-only" data-ai-content="service-keywords">
                  <span itemProp="keywords">{service.keywords}</span>
                  <span itemProp="serviceType">{service.category}</span>
                  <span itemProp="provider" itemScope itemType="https://schema.org/LocalBusiness">
                    <span itemProp="name">SUZ Reinigung</span>
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
