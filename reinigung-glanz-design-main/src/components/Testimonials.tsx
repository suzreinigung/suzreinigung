import React, { useEffect, useRef } from 'react';
import { 
  Bed, 
  Building, 
  Stethoscope, 
  Home, 
  ShoppingBag, 
  Utensils, 
  GraduationCap,
  Star,
  Quote
} from 'lucide-react';

// Testimonial interface matching the company structure
interface Testimonial {
  id: string;
  companyName: string;
  companyType: 'hotel' | 'office' | 'medical' | 'residential' | 'retail' | 'restaurant' | 'school';
  contactPerson: string;
  position: string;
  testimonialText: string;
  rating: number;
}

// Authentic German testimonials from companies matching CompanyShowcase
const testimonials: Testimonial[] = [
  {
    id: '1',
    companyName: 'Hotel Excelsior Ernst Köln',
    companyType: 'hotel',
    contactPerson: 'Herr Schmidt',
    position: 'Hotelmanager',
    testimonialText: 'SUZ Reinigung überzeugt uns täglich mit höchster Professionalität und Zuverlässigkeit. Unsere Gäste schätzen die makellose Sauberkeit in allen Bereichen.',
    rating: 5
  },
  {
    id: '2',
    companyName: 'Büropark Rheinauhafen',
    companyType: 'office',
    contactPerson: 'Frau Weber',
    position: 'Facility Managerin',
    testimonialText: 'Seit Jahren vertrauen wir auf SUZ Reinigung. Die Qualität ist konstant hervorragend und das Team arbeitet äußerst diskret und effizient.',
    rating: 5
  },
  {
    id: '3',
    companyName: 'Universitätsklinikum Bonn',
    companyType: 'medical',
    contactPerson: 'Dr. Müller',
    position: 'Hygienebeauftragte',
    testimonialText: 'In unserem sensiblen Umfeld sind höchste Hygienestandards essentiell. SUZ Reinigung erfüllt alle Anforderungen mit absoluter Präzision.',
    rating: 5
  },
  {
    id: '4',
    companyName: 'Restaurant Hanse-Klause',
    companyType: 'restaurant',
    contactPerson: 'Herr Koch',
    position: 'Restaurantleiter',
    testimonialText: 'Pünktlichkeit und Gründlichkeit - SUZ Reinigung sorgt dafür, dass unser Restaurant jeden Tag in perfektem Zustand für unsere Gäste bereit ist.',
    rating: 5
  },
  {
    id: '5',
    companyName: 'Galeria Kaufhof Köln',
    companyType: 'retail',
    contactPerson: 'Frau Becker',
    position: 'Store Managerin',
    testimonialText: 'Ein sauberes Einkaufserlebnis ist für uns entscheidend. SUZ Reinigung gewährleistet dies mit ihrer professionellen und zuverlässigen Arbeit.',
    rating: 5
  },
  {
    id: '6',
    companyName: 'Universität zu Köln',
    companyType: 'school',
    contactPerson: 'Prof. Dr. Wagner',
    position: 'Verwaltungsdirektor',
    testimonialText: 'Für unsere Studierenden und Mitarbeiter ist eine saubere Lernumgebung wichtig. SUZ Reinigung liefert konstant exzellente Ergebnisse.',
    rating: 5
  }
];

// Helper function to get contextual icons for business types (matching CompanyShowcase)
const getCompanyIcon = (type: Testimonial['companyType']) => {
  const iconMap = {
    hotel: Bed,
    office: Building,
    medical: Stethoscope,
    residential: Home,
    retail: ShoppingBag,
    restaurant: Utensils,
    school: GraduationCap
  };
  return iconMap[type];
};

// Helper function to get company type label in German
const getCompanyTypeLabel = (type: Testimonial['companyType']) => {
  const labelMap = {
    hotel: 'Hotel',
    office: 'Büro',
    medical: 'Medizin',
    residential: 'Wohnen',
    retail: 'Einzelhandel',
    restaurant: 'Gastronomie',
    school: 'Bildung'
  };
  return labelMap[type];
};

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // If user prefers reduced motion, show all cards immediately
      const cards = section.querySelectorAll('.suz-testimonial-card');
      cards.forEach((card) => {
        card.classList.add('animate-fade-in');
      });
      return;
    }

    // Intersection Observer for fade-in animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const cards = section.querySelectorAll('.suz-testimonial-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="suz-testimonials-section bg-premium-gradient relative overflow-hidden suz-section-standard"
      aria-label="Kundenbewertungen und Testimonials"
      role="region"
    >
      {/* Background gradient overlay matching other sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent pointer-events-none z-0"></div>
      
      {/* Section content */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 px-4 animate-fade-in">
          <h2 className="suz-section-title text-slate-100 mb-8">
            Was unsere <span className="gradient-text">Kunden sagen</span>
          </h2>
          <p className="suz-text-heading-lg text-slate-300 max-w-3xl mx-auto font-light">
            Vertrauen Sie auf die Erfahrungen zufriedener Kunden aus der Region Köln-Bonn
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const IconComponent = getCompanyIcon(testimonial.companyType);
            return (
              <article
                key={testimonial.id}
                className="suz-testimonial-card suz-card-glass glass-morphism-premium rounded-3xl border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 group relative overflow-hidden"
                style={{
                  animationDelay: `${index * 0.15}s`,
                  padding: 'var(--component-padding-lg)'
                }}
                role="article"
                aria-label={`Testimonial von ${testimonial.contactPerson}, ${testimonial.companyName}`}
              >
                {/* Shimmer effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-500 pointer-events-none"></div>

                <div className="relative z-10">
                  {/* Quote Icon */}
                  <div className="mb-4 flex justify-between items-start">
                    <Quote 
                      size={24} 
                      className="text-blue-400 opacity-60" 
                      aria-hidden="true"
                    />
                    {/* Star Rating */}
                    <div className="flex gap-1" aria-label={`Bewertung: ${testimonial.rating} von 5 Sternen`}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className="text-yellow-400 fill-current" 
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="suz-text-body-lg text-slate-300 mb-6 suz-german-testimonial-text">
                    „{testimonial.testimonialText}"
                  </blockquote>

                  {/* Company Info */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/20">
                    {/* Company Icon */}
                    <div className="suz-icon-badge-testimonial group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <IconComponent
                        size={24}
                        className="text-blue-400 drop-shadow-lg transition-all duration-500 group-hover:text-blue-300"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Contact Info */}
                    <div className="flex-1">
                      <h3 className="suz-text-body-lg font-semibold text-slate-100 mb-1 group-hover:text-white transition-colors duration-300">
                        {testimonial.contactPerson}
                      </h3>
                      <p className="text-sm text-slate-400 mb-1">
                        {testimonial.position}
                      </p>
                      <p className="text-sm text-blue-400 font-medium suz-german-business-name">
                        {testimonial.companyName}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
