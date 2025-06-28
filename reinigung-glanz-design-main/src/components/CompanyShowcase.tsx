import { useEffect, useRef } from 'react';
import { logAnimationTestResults } from '../utils/animationTest';
import { logMobileTestResults } from '../utils/mobileTestUtils';
import { logCrossBrowserReport } from '../utils/crossBrowserTestUtils';
import { logAccessibilityReport } from '../utils/accessibilityTestUtils';
import {
  Building2,
  Briefcase,
  Cross,
  Home,
  Utensils,
  ShoppingBag,
  GraduationCap,
  Bed,
  Building,
  Stethoscope
} from 'lucide-react';

// TypeScript interface for company data
interface Company {
  id: string;
  name: string;
  type: 'hotel' | 'office' | 'medical' | 'residential' | 'retail' | 'restaurant' | 'school';
}

// Expanded company data with authentic German business names, especially from Cologne/Bonn regions
const companies: Company[] = [
  { id: '1', name: 'Hotel Excelsior Ernst Köln', type: 'hotel' },
  { id: '2', name: 'Büropark Rheinauhafen', type: 'office' },
  { id: '3', name: 'Universitätsklinikum Bonn', type: 'medical' },
  { id: '4', name: 'Wohnpark Deutzer Freiheit', type: 'residential' },
  { id: '5', name: 'Restaurant Hanse-Klause', type: 'restaurant' },
  { id: '6', name: 'Galeria Kaufhof Köln', type: 'retail' },
  { id: '7', name: 'Hotel Königshof Bonn', type: 'hotel' },
  { id: '8', name: 'Bürohaus MediaPark', type: 'office' },
  { id: '9', name: 'Praxis Dr. Müller-Weber', type: 'medical' },
  { id: '10', name: 'Residenz Rheinblick', type: 'residential' },
  { id: '11', name: 'Brauhaus Sion', type: 'restaurant' },
  { id: '12', name: 'Rhein-Center Köln', type: 'retail' },
  { id: '13', name: 'Steigenberger Grandhotel', type: 'hotel' },
  { id: '14', name: 'Krankenhaus Porz', type: 'medical' },
  { id: '15', name: 'Universität zu Köln', type: 'school' },
  { id: '16', name: 'Wohnquartier Ehrenfeld', type: 'residential' },
  { id: '17', name: 'Restaurant Himmel un Ääd', type: 'restaurant' },
  { id: '18', name: 'Büroturm KölnTriangle', type: 'office' },
  { id: '19', name: 'Shopping Arkaden Bonn', type: 'retail' },
  { id: '20', name: 'Rheinische Fachhochschule', type: 'school' },
];

// Helper function to get contextual icons for business types
const getCompanyIcon = (type: Company['type']) => {
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

const CompanyShowcase = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  // Duplicate companies array for seamless infinite scroll
  const duplicatedCompanies = [...companies, ...companies];

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect mobile devices for optimized settings
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const isSmallMobile = window.matchMedia('(max-width: 480px)').matches;

    if (prefersReducedMotion) {
      // If user prefers reduced motion, disable animation
      scrollElement.style.animationPlayState = 'paused';
      return;
    }

    // Force initial animation state for mobile devices
    if (isMobile) {
      scrollElement.style.animationPlayState = 'running';
      scrollElement.style.willChange = 'transform';
      // Ensure webkit prefixes for iOS Safari
      scrollElement.style.webkitAnimationPlayState = 'running';
      // CRITICAL: Don't set transform here - let CSS animation handle it
      // Only set hardware acceleration properties that don't conflict
      scrollElement.style.backfaceVisibility = 'hidden';
      scrollElement.style.webkitBackfaceVisibility = 'hidden';
      scrollElement.style.perspective = '1000px';
    }

    // Performance optimization: Use IntersectionObserver with mobile-optimized settings
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start animation when component is visible
            if (!prefersReducedMotion) {
              scrollElement.style.animationPlayState = 'running';
              scrollElement.style.webkitAnimationPlayState = 'running';
              // Force hardware acceleration on mobile without overriding animation
              if (isMobile) {
                scrollElement.style.backfaceVisibility = 'hidden';
                scrollElement.style.webkitBackfaceVisibility = 'hidden';
                scrollElement.style.perspective = '1000px';
                // Ensure proper touch handling
                scrollElement.style.touchAction = 'pan-y pinch-zoom';
              }
            }
          } else {
            // Only pause animation on desktop to save resources
            // Keep running on mobile for better UX
            if (!isMobile) {
              scrollElement.style.animationPlayState = 'paused';
            }
          }
        });
      },
      {
        threshold: isSmallMobile ? 0.05 : isMobile ? 0.1 : 0.1,
        rootMargin: isMobile ? '50px' : '0px'
      }
    );

    observer.observe(scrollElement);

    // Handle viewport changes for responsive behavior
    const handleResize = () => {
      const newIsMobile = window.matchMedia('(max-width: 768px)').matches;
      if (newIsMobile && !prefersReducedMotion) {
        scrollElement.style.animationPlayState = 'running';
        scrollElement.style.webkitAnimationPlayState = 'running';
        // Don't override animation transform - use hardware acceleration properties
        scrollElement.style.backfaceVisibility = 'hidden';
        scrollElement.style.webkitBackfaceVisibility = 'hidden';
        scrollElement.style.perspective = '1000px';
        scrollElement.style.touchAction = 'pan-y pinch-zoom';
      }
    };

    window.addEventListener('resize', handleResize);

    // Debug: Log animation test results in development
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        logAnimationTestResults();

        // Enhanced mobile testing
        if (isMobile) {
          logMobileTestResults().then(() => {
            console.log('📱 Mobile CompanyShowcase testing completed');
          }).catch(error => {
            console.error('❌ Mobile testing failed:', error);
          });

          // Cross-browser compatibility testing
          logCrossBrowserReport().then(() => {
            console.log('🌐 Cross-browser compatibility testing completed');
          }).catch(error => {
            console.error('❌ Cross-browser testing failed:', error);
          });

          // Accessibility testing
          logAccessibilityReport().then(() => {
            console.log('♿ Accessibility testing completed');
          }).catch(error => {
            console.error('❌ Accessibility testing failed:', error);
          });
        }

        // Additional mobile debugging
        console.log('🔍 Mobile Animation Debug:', {
          isMobile,
          isSmallMobile,
          animationPlayState: scrollElement.style.animationPlayState,
          webkitAnimationPlayState: scrollElement.style.webkitAnimationPlayState,
          computedStyle: {
            animationPlayState: window.getComputedStyle(scrollElement).animationPlayState,
            animationName: window.getComputedStyle(scrollElement).animationName,
            transform: window.getComputedStyle(scrollElement).transform,
            touchAction: (window.getComputedStyle(scrollElement) as any).touchAction,
            backfaceVisibility: window.getComputedStyle(scrollElement).backfaceVisibility
          }
        });
      }, 1000);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      className="suz-company-showcase overflow-hidden relative suz-section-standard"
      aria-label="Unsere Kunden und Partner"
      role="region"
    >
      {/* Section Header */}
      <div className="text-center mb-16 px-4 animate-fade-in">
        <h2 className="suz-section-title text-slate-100 mb-8">
          Vertrauen von <span className="gradient-text">führenden Unternehmen</span>
        </h2>
        <p className="suz-text-heading-lg text-slate-300 max-w-3xl mx-auto font-light">
          Über 500 zufriedene Kunden vertrauen auf unsere professionellen Reinigungsdienstleistungen
        </p>
      </div>

      {/* Animated Company Strip */}
      <div className="relative">
        {/* Enhanced gradient fade effects on edges for better dark theme integration */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/90 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/90 to-transparent z-10 pointer-events-none"></div>
        
        {/* Scrolling container */}
        <div
          ref={scrollRef}
          className="suz-company-scroll flex gap-10 animate-scroll-right"
          role="list"
          aria-label="Kontinuierlich scrollende Liste unserer Kunden"
          aria-live="polite"
          aria-atomic="false"
          onTouchStart={(e) => {
            // Record touch start position and time
            const touch = e.touches[0];
            touchStartRef.current = {
              x: touch.clientX,
              y: touch.clientY,
              time: Date.now()
            };

            // Prevent default only for horizontal swipes to avoid interfering with vertical scrolling
            const target = e.currentTarget;

            // Add temporary touch handling
            const handleTouchMove = (moveEvent: TouchEvent) => {
              if (!touchStartRef.current) return;

              const moveTouch = moveEvent.touches[0];
              const deltaX = Math.abs(moveTouch.clientX - touchStartRef.current.x);
              const deltaY = Math.abs(moveTouch.clientY - touchStartRef.current.y);

              // If horizontal movement is greater than vertical, prevent default
              if (deltaX > deltaY && deltaX > 10) {
                moveEvent.preventDefault();
              }
            };

            const handleTouchEnd = () => {
              touchStartRef.current = null;
              target.removeEventListener('touchmove', handleTouchMove);
              target.removeEventListener('touchend', handleTouchEnd);
            };

            target.addEventListener('touchmove', handleTouchMove, { passive: false });
            target.addEventListener('touchend', handleTouchEnd);
          }}
        >
          {duplicatedCompanies.map((company, index) => {
            const IconComponent = getCompanyIcon(company.type);
            return (
              <div
                key={`${company.id}-${index}`}
                className="suz-company-card flex-shrink-0"
                role="listitem"
                tabIndex={0}
                aria-label={`Kunde: ${company.name}, Kategorie: ${getCompanyTypeLabel(company.type)}`}
              >
                <div className="suz-card-glass glass-morphism-premium rounded-3xl border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 group relative overflow-hidden">
                  {/* Shimmer effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-500 pointer-events-none"></div>

                  <div className="suz-company-card-content text-center relative z-10">
                    {/* Company Icon */}
                    <div className="mb-4 flex justify-center">
                      <div className="icon-badge-enhanced group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <IconComponent
                          size={32}
                          className="text-blue-400 drop-shadow-lg transition-all duration-500 group-hover:text-blue-300 group-hover:scale-110"
                          strokeWidth={2}
                        />
                      </div>
                    </div>

                    {/* Company Name */}
                    <h3 className="suz-text-body-lg font-semibold text-slate-100 mb-3 group-hover:text-white transition-colors duration-300 suz-german-business-name">
                      {company.name}
                    </h3>

                    {/* Company Type Badge */}
                    <div className="mt-3">
                      <span
                        className="inline-block px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-blue-900/40 to-blue-800/40 text-blue-300 border border-blue-600/50 backdrop-blur-sm group-hover:from-blue-800/50 group-hover:to-blue-700/50 group-hover:text-blue-200 transition-all duration-300"
                        aria-label={`Unternehmenstyp: ${getCompanyTypeLabel(company.type)}`}
                      >
                        {getCompanyTypeLabel(company.type)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Helper function to get localized company type labels
const getCompanyTypeLabel = (type: Company['type']): string => {
  const labels = {
    hotel: 'Hotel',
    office: 'Büro',
    medical: 'Medizin',
    residential: 'Wohnanlage',
    retail: 'Einzelhandel',
    restaurant: 'Gastronomie',
    school: 'Bildung'
  };
  return labels[type];
};

export default CompanyShowcase;
