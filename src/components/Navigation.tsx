import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Building2, Home, Sparkles, Users, Briefcase, Heart } from 'lucide-react';

interface NavigationProps {
  scrollToSection: (id: string) => void;
}

const Navigation = ({ scrollToSection }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  // Close menu when clicking outside or on navigation
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.querySelector('[data-nav="main"]');
      const dropdown = document.querySelector('[data-dropdown="services"]');
      if (nav && !nav.contains(event.target as Node) && 
          dropdown && !dropdown.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setIsServicesOpen(false);
      }
    };

    if (isMenuOpen || isServicesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      if (isMenuOpen) {
        document.body.style.overflow = 'hidden'; // Prevent background scroll
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, isServicesOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        setIsServicesOpen(false);
      }
    };

    if (isMenuOpen || isServicesOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen, isServicesOpen]);

  const handleNavClick = (sectionId: string) => {
    // If we're on a service page and trying to navigate to homepage sections
    if (location.pathname !== '/' && ['home', 'services', 'testimonials', 'contact'].includes(sectionId)) {
      window.location.href = `/#${sectionId}`;
      return;
    }
    scrollToSection(sectionId);
    setIsMenuOpen(false); // Close mobile menu after navigation
    setIsServicesOpen(false); // Close services dropdown
  };

  const toggleServicesDropdown = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Desktop Navigation - Only visible on screens larger than 768px */}
      {!isMobile && (
        <nav
          className="fixed top-6 z-50 animate-fade-in suz-navigation-enhanced"
          role="navigation"
          aria-label="Hauptnavigation"
          data-nav="main"
          style={{
            // Perfect centering with consistent positioning
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'auto',
            maxWidth: 'calc(100vw - 2rem)', // Prevent overflow on small screens
            minWidth: 'fit-content', // Ensure content fits properly
            display: 'block', // Ensure proper block-level behavior
          }}
        >
          <div className="suz-card-glass px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-full border border-white/30 shadow-xl">
            <div className="flex items-center justify-center space-x-1 sm:space-x-2 md:space-x-4 lg:space-x-6 xl:space-x-8">
              {location.pathname === '/' ? (
                <button
                  type="button"
                  onClick={() => handleNavClick('home')}
                  className="suz-nav-link suz-focus-ring whitespace-nowrap"
                  aria-label="Zur Startseite navigieren"
                >
                  Startseite
                </button>
              ) : (
                <Link
                  to="/"
                  className="suz-nav-link suz-focus-ring whitespace-nowrap"
                  aria-label="Zur Startseite navigieren"
                >
                  Startseite
                </Link>
              )}
              
              {/* Services Dropdown */}
              <div className="relative group">
                <button
                  className="flex items-center gap-1 px-4 py-2 text-white hover:text-blue-300 transition-colors"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                >
                  Leistungen
                  <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isServicesOpen && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-80 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <Link
                      to="/services/hotelzimmerreinigung"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <Building2 className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium">Hotelzimmerreinigung</div>
                        <div className="text-sm text-gray-500">Höchste Hygienestandards</div>
                      </div>
                    </Link>
                    <Link
                      to="/services/teppichreinigung"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                    >
                      <Home className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-medium">Teppichreinigung</div>
                        <div className="text-sm text-gray-500">Tiefenreinigung & Fleckenentfernung</div>
                      </div>
                    </Link>
                    <Link
                      to="/services/bodenreinigung"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                    >
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      <div>
                        <div className="font-medium">Bodenreinigung</div>
                        <div className="text-sm text-gray-500">Hartböden, Fliesen, Laminat</div>
                      </div>
                    </Link>
                    <Link
                      to="/services/gemeinschaftsraeume"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    >
                      <Users className="w-5 h-5 text-orange-600" />
                      <div>
                        <div className="font-medium">Gemeinschaftsräume</div>
                        <div className="text-sm text-gray-500">Treppenhäuser & Flure</div>
                      </div>
                    </Link>
                    <Link
                      to="/services/bueroreinigung"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <Briefcase className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium">Büroreinigung</div>
                        <div className="text-sm text-gray-500">Arbeitsplätze & Büroflächen</div>
                      </div>
                    </Link>
                    <Link
                      to="/services/krankenhausreinigung"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <Heart className="w-5 h-5 text-red-600" />
                      <div>
                        <div className="font-medium">Krankenhausreinigung</div>
                        <div className="text-sm text-gray-500">Medizinische Einrichtungen</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
              
              <button
                type="button"
                onClick={() => handleNavClick('testimonials')}
                className="suz-nav-link suz-focus-ring whitespace-nowrap"
                aria-label="Zu unseren Referenzen navigieren"
              >
                Referenzen
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('contact')}
                className="suz-nav-link suz-focus-ring whitespace-nowrap"
                aria-label="Zum Kontakt navigieren"
              >
                Kontakt
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Mobile Navigation - Only visible on screens 768px and below */}
      {isMobile && (
        <>
          {/* Mobile Menu Button - Positioned in top-right corner */}
          <div
            className="fixed top-6 right-6 z-50 animate-fade-in"
            role="navigation"
            aria-label="Mobile Navigation"
          >
            <div className="suz-card-glass px-4 py-3 rounded-full border border-white/30 shadow-xl">
              <button
                type="button"
                onClick={toggleMenu}
                className="suz-mobile-menu-button suz-focus-ring"
                aria-label={isMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
                aria-expanded={isMenuOpen ? 'true' : 'false'}
                aria-controls="mobile-menu"
              >
                <div className="suz-hamburger-icon">
                  <span className={`suz-hamburger-line ${isMenuOpen ? 'suz-hamburger-line-1-open' : ''}`}></span>
                  <span className={`suz-hamburger-line ${isMenuOpen ? 'suz-hamburger-line-2-open' : ''}`}></span>
                  <span className={`suz-hamburger-line ${isMenuOpen ? 'suz-hamburger-line-3-open' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <div className="suz-mobile-menu-overlay" aria-hidden="true">
              <div className="suz-mobile-menu-backdrop" onClick={() => setIsMenuOpen(false)}></div>
            </div>
          )}

          {/* Mobile Menu */}
          <div
            id="mobile-menu"
            className={`suz-mobile-menu ${isMenuOpen ? 'suz-mobile-menu-open' : 'suz-mobile-menu-closed'}`}
            aria-hidden={!isMenuOpen ? 'true' : 'false'}
          >
            <div className="suz-mobile-menu-content">
              {location.pathname === '/' ? (
                <button
                  type="button"
                  onClick={() => handleNavClick('home')}
                  className="suz-mobile-nav-link suz-focus-ring"
                  aria-label="Zur Startseite navigieren"
                >
                  Startseite
                </button>
              ) : (
                <Link
                  to="/"
                  className="suz-mobile-nav-link suz-focus-ring"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Zur Startseite navigieren"
                >
                  Startseite
                </Link>
              )}
              
              {/* Mobile Services Section */}
              <button
                type="button"
                onClick={toggleServicesDropdown}
                className="suz-mobile-nav-link suz-focus-ring flex items-center justify-between w-full"
                aria-label="Leistungen anzeigen"
              >
                Leistungen
                <svg className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isServicesOpen && (
                <div className="pl-4 space-y-2 bg-black/20 rounded-lg p-2 ml-2 mt-2">
                  <Link
                    to="/services/hotelzimmerreinigung"
                    className="block py-2 text-sm text-white/80 hover:text-white hover:bg-blue-500/20 transition-colors rounded-md px-2"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsServicesOpen(false);
                    }}
                  >
                    Hotelzimmerreinigung
                  </Link>
                  <Link
                    to="/services/teppichreinigung"
                    className="block py-2 text-sm text-white/80 hover:text-white hover:bg-blue-500/20 transition-colors rounded-md px-2"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsServicesOpen(false);
                    }}
                  >
                    Teppichreinigung
                  </Link>
                  <Link
                    to="/services/bodenreinigung"
                    className="block py-2 text-sm text-white/80 hover:text-white hover:bg-blue-500/20 transition-colors rounded-md px-2"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsServicesOpen(false);
                    }}
                  >
                    Bodenreinigung
                  </Link>
                  <Link
                    to="/services/gemeinschaftsraeume"
                    className="block py-2 text-sm text-white/80 hover:text-white hover:bg-blue-500/20 transition-colors rounded-md px-2"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsServicesOpen(false);
                    }}
                  >
                    Gemeinschaftsräume
                  </Link>
                  <Link
                    to="/services/bueroreinigung"
                    className="block py-2 text-sm text-white/80 hover:text-white hover:bg-blue-500/20 transition-colors rounded-md px-2"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsServicesOpen(false);
                    }}
                  >
                    Büroreinigung
                  </Link>
                  <Link
                    to="/services/krankenhausreinigung"
                    className="block py-2 text-sm text-white/80 hover:text-white hover:bg-blue-500/20 transition-colors rounded-md px-2"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsServicesOpen(false);
                    }}
                  >
                    Krankenhausreinigung
                  </Link>
                </div>
              )}
              
              <button
                type="button"
                onClick={() => handleNavClick('testimonials')}
                className="suz-mobile-nav-link suz-focus-ring"
                aria-label="Zu unseren Referenzen navigieren"
              >
                Referenzen
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('contact')}
                className="suz-mobile-nav-link suz-focus-ring"
                aria-label="Zum Kontakt navigieren"
              >
                Kontakt
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navigation;
