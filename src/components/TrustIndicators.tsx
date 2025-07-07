import { trackBusinessEvents } from '@/lib/analytics';

interface TrustIndicatorsProps {
  layout?: 'horizontal' | 'grid' | 'compact';
  showIcons?: boolean;
  variant?: 'default' | 'dark' | 'minimal';
}

const TrustIndicators = ({ 
  layout = 'horizontal', 
  showIcons = true, 
  variant = 'default' 
}: TrustIndicatorsProps) => {
  
  const trustElements = [
    {
      id: 'experience',
      icon: '🏆',
      title: 'Über 20 Jahre Erfahrung',
      description: 'Seit 2000 professionelle Reinigungsdienstleistungen',
      color: 'blue'
    },
    {
      id: 'insurance',
      icon: '🛡️',
      title: 'Vollversichert',
      description: 'Betriebshaftpflicht & Unfallversicherung für alle Mitarbeiter',
      color: 'green'
    },
    {
      id: 'guarantee',
      icon: '✅',
      title: '100% Zufriedenheitsgarantie',
      description: 'Nicht zufrieden? Wir kommen kostenlos zurück',
      color: 'emerald'
    },
    {
      id: 'certified',
      icon: '📜',
      title: 'Zertifizierte Qualität',
      description: 'ISO-zertifizierte Reinigungsverfahren',
      color: 'purple'
    },
    {
      id: 'bonded',
      icon: '🔒',
      title: 'Bonded & Geprüft',
      description: 'Alle Mitarbeiter sind geprüft und vertrauenswürdig',
      color: 'indigo'
    },
    {
      id: 'response',
      icon: '⚡',
      title: '24h Antwortzeit',
      description: 'Garantierte Rückmeldung innerhalb von 24 Stunden',
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string, variant: string) => {
    const colorMap: Record<string, Record<string, string>> = {
      blue: {
        default: 'bg-blue-50 border-blue-200 text-blue-900',
        dark: 'bg-blue-900 border-blue-700 text-blue-100',
        minimal: 'bg-transparent border-blue-300 text-blue-800'
      },
      green: {
        default: 'bg-green-50 border-green-200 text-green-900',
        dark: 'bg-green-900 border-green-700 text-green-100',
        minimal: 'bg-transparent border-green-300 text-green-800'
      },
      emerald: {
        default: 'bg-emerald-50 border-emerald-200 text-emerald-900',
        dark: 'bg-emerald-900 border-emerald-700 text-emerald-100',
        minimal: 'bg-transparent border-emerald-300 text-emerald-800'
      },
      purple: {
        default: 'bg-purple-50 border-purple-200 text-purple-900',
        dark: 'bg-purple-900 border-purple-700 text-purple-100',
        minimal: 'bg-transparent border-purple-300 text-purple-800'
      },
      indigo: {
        default: 'bg-indigo-50 border-indigo-200 text-indigo-900',
        dark: 'bg-indigo-900 border-indigo-700 text-indigo-100',
        minimal: 'bg-transparent border-indigo-300 text-indigo-800'
      },
      orange: {
        default: 'bg-orange-50 border-orange-200 text-orange-900',
        dark: 'bg-orange-900 border-orange-700 text-orange-100',
        minimal: 'bg-transparent border-orange-300 text-orange-800'
      }
    };
    
    return colorMap[color]?.[variant] || colorMap.blue.default;
  };

  const handleTrustClick = (trustId: string) => {
    trackBusinessEvents.serviceInquiry(`trust_${trustId}`);
  };

  const containerClasses = {
    horizontal: 'flex flex-wrap justify-center gap-4',
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    compact: 'flex flex-wrap justify-center gap-3'
  };

  const itemClasses = {
    horizontal: 'flex-1 min-w-[200px] max-w-[300px]',
    grid: '',
    compact: 'flex-shrink-0'
  };

  if (layout === 'compact') {
    return (
      <div className={containerClasses[layout]}>
        {trustElements.map((element) => (
          <button
            key={element.id}
            onClick={() => handleTrustClick(element.id)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-medium transition-all hover:shadow-md ${getColorClasses(element.color, variant)}`}
          >
            {showIcons && <span className="text-base">{element.icon}</span>}
            <span>{element.title}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={containerClasses[layout]}>
      {trustElements.map((element) => (
        <div
          key={element.id}
          className={`border rounded-xl p-6 text-center transition-all hover:shadow-lg cursor-pointer ${getColorClasses(element.color, variant)} ${itemClasses[layout]}`}
          onClick={() => handleTrustClick(element.id)}
        >
          {showIcons && (
            <div className="text-4xl mb-4">
              {element.icon}
            </div>
          )}
          <h3 className="font-bold text-lg mb-2">
            {element.title}
          </h3>
          <p className="text-sm opacity-80">
            {element.description}
          </p>
        </div>
      ))}
    </div>
  );
};

// Testimonial Carousel Component
interface TestimonialCarouselProps {
  autoPlay?: boolean;
  showDots?: boolean;
}

interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
  verified: boolean;
}

const TestimonialCarousel = ({ autoPlay = true, showDots = true }: TestimonialCarouselProps) => {
  const testimonials: Testimonial[] = [
    {
      id: 'hotel-rheinblick',
      name: 'Marcus Weber',
      company: 'Hotel Rheinblick Köln',
      role: 'Geschäftsführer',
      content: 'Außergewöhnlich professioneller Service. SUZ Reinigung übertrifft stets unsere Erwartungen. Die Qualität ist konstant hoch und das Team äußerst zuverlässig.',
      rating: 5,
      verified: true
    },
    {
      id: 'praxis-muller',
      name: 'Dr. Sarah Müller',
      company: 'Zahnarztpraxis Dr. Müller',
      role: 'Praxisinhaberin',
      content: 'Die hygienischen Standards in unserer Praxis sind extrem wichtig. SUZ Reinigung erfüllt alle Anforderungen perfekt und arbeitet sehr diskret.',
      rating: 5,
      verified: true
    },
    {
      id: 'familie-schmidt',
      name: 'Familie Schmidt',
      company: 'Privatkunde',
      role: 'Köln-Lindenthal',
      content: 'Endlich haben wir mehr Zeit für die Familie! Das Team ist sehr vertrauenswürdig und macht unsere Wohnung immer perfekt sauber.',
      rating: 5,
      verified: true
    },
    {
      id: 'tech-startup',
      name: 'Jennifer Klein',
      company: 'TechFlow GmbH',
      role: 'Office Managerin',
      content: 'Flexibel, professionell und immer pünktlich. Die Zusammenarbeit mit SUZ Reinigung läuft reibungslos und unsere Mitarbeiter sind sehr zufrieden.',
      rating: 5,
      verified: true
    },
    {
      id: 'restaurant-bella',
      name: 'Giuseppe Rossi',
      company: 'Restaurant Bella Vista',
      role: 'Inhaber',
      content: 'In der Gastronomie ist Sauberkeit das A und O. SUZ Reinigung versteht unsere hohen Ansprüche und liefert jeden Tag perfekte Ergebnisse.',
      rating: 5,
      verified: true
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Was unsere Kunden sagen
        </h2>
        <p className="text-gray-600">
          Überzeugen Sie sich von der Qualität unserer Arbeit
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.slice(0, 3).map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
              {testimonial.verified && (
                <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Verifiziert
                </span>
              )}
            </div>

            <blockquote className="text-gray-700 mb-4 italic">
              "{testimonial.content}"
            </blockquote>

            <div className="border-t pt-4">
              <div className="font-semibold text-gray-900">{testimonial.name}</div>
              <div className="text-sm text-gray-600">{testimonial.role}</div>
              <div className="text-sm font-medium text-blue-600">{testimonial.company}</div>
            </div>
          </div>
        ))}
      </div>

      {/* See More Reviews CTA */}
      <div className="text-center mt-8">
        <button
          onClick={() => trackBusinessEvents.serviceInquiry('testimonials_view_more')}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-2 mx-auto"
        >
          Alle Bewertungen ansehen
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Certifications Component
const Certifications = () => {
  const certifications = [
    {
      id: 'iso-9001',
      name: 'ISO 9001:2015',
      description: 'Qualitätsmanagementsystem',
      image: '/assets/certifications/iso-9001.png',
      issuer: 'TÜV Rheinland'
    },
    {
      id: 'eco-cert',
      name: 'Öko-Zertifikat',
      description: 'Umweltfreundliche Reinigungsmittel',
      image: '/assets/certifications/eco-cert.png',
      issuer: 'ECOCERT'
    },
    {
      id: 'chamber-commerce',
      name: 'Handwerkskammer',
      description: 'Zertifizierter Reinigungsbetrieb',
      image: '/assets/certifications/hwk.png',
      issuer: 'HWK Köln'
    },
    {
      id: 'insurance',
      name: 'Versicherungsnachweis',
      description: 'Vollständiger Versicherungsschutz',
      image: '/assets/certifications/insurance.png',
      issuer: 'Allianz Versicherung'
    }
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Zertifizierungen & Qualifikationen
          </h2>
          <p className="text-gray-600">
            Unsere Qualität ist offiziell bestätigt
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="font-semibold text-sm mb-1">{cert.name}</h3>
              <p className="text-xs text-gray-600 mb-2">{cert.description}</p>
              <p className="text-xs text-gray-500">{cert.issuer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { TrustIndicators, TestimonialCarousel, Certifications };