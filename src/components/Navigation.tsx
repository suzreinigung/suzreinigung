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
              <div className="relative group" data-dropdown="services">
                <button
                  className="suz-services-button"
                  onClick={toggleServicesDropdown}
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setTimeout(() => {
                    if (!document.querySelector('[data-dropdown="services"]:hover')) {
                      setIsServicesOpen(false);
                    }
                  }, 100)}
                  aria-expanded={isServicesOpen}
                  aria-haspopup="true"
                  aria-label="Leistungen anzeigen"
                >
                  Leistungen
                  <ChevronDown className={`chevron ${isServicesOpen ? 'open' : ''}`} />
                </button>
                
                <div 
                  className={`suz-services-dropdown ${isServicesOpen ? 'show' : ''}`}
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                  role="menu"
                  aria-label="Leistungen Dropdown"
                >
                  <Link
                    to="/services/hotelzimmerreinigung"
                    className="suz-services-dropdown-item"
                    role="menuitem"
                    onClick={() => setIsServicesOpen(false)}
                  >
                    <Building2 className="suz-services-dropdown-icon text-blue-600" />
                    <div className="suz-services-dropdown-content">
                      <div className="suz-services-dropdown-title">Hotelzimmerreinigung</div>
                      <div className="suz-services-dropdown-description">Höchste Hygienestandards</div>
                    </div>
                  </Link>
                  <Link
                    to="/services/teppichreinigung"
                    className="suz-services-dropdown-item"
                    role="menuitem"
                    onClick={() => setIsServicesOpen(false)}
                  >
                    <Home className="suz-services-dropdown-icon text-green-600" />
                    <div className="suz-services-dropdown-content">
                      <div className="suz-services-dropdown-title">Teppichreinigung</div>
                      <div className="suz-services-dropdown-description">Tiefenreinigung & Fleckenentfernung</div>
                    </div>
                  </Link>
                  <Link
                    to="/services/bodenreinigung"
                    className="suz-services-dropdown-item"
                    role="menuitem"
                    onClick={() => setIsServicesOpen(false)}
                  >
                    <Sparkles className="suz-services-dropdown-icon text-purple-600" />
                    <div className="suz-services-dropdown-content">
                      <div className="suz-services-dropdown-title">Bodenreinigung</div>
                      <div className="suz-services-dropdown-description">Hartböden, Fliesen, Laminat</div>
                    </div>
                  </Link>
                  <Link
                    to="/services/gemeinschaftsraeume"
                    className="suz-services-dropdown-item"
                    role="menuitem"
                    onClick={() => setIsServicesOpen(false)}
                  >
                    <Users className="suz-services-dropdown-icon text-orange-600" />
                    <div className="suz-services-dropdown-content">
                      <div className="suz-services-dropdown-title">Gemeinschaftsräume</div>
                      <div className="suz-services-dropdown-description">Treppenhäuser & Flure</div>
                    </div>
                  </Link>
                  <Link
                    to="/services/bueroreinigung"
                    className="suz-services-dropdown-item"
                    role="menuitem"
                    onClick={() => setIsServicesOpen(false)}
                  >
                    <Briefcase className="suz-services-dropdown-icon text-blue-600" />
                    <div className="suz-services-dropdown-content">
                      <div className="suz-services-dropdown-title">Büroreinigung</div>
                      <div className="suz-services-dropdown-description">Arbeitsplätze & Büroflächen</div>
                    </div>
                  </Link>
                  <Link
                    to="/services/krankenhausreinigung"
                    className="suz-services-dropdown-item"
                    role="menuitem"
                    onClick={() => setIsServicesOpen(false)}
                  >
                    <Heart className="suz-services-dropdown-icon text-red-600" />
                    <div className="suz-services-dropdown-content">
                      <div className="suz-services-dropdown-title">Krankenhausreinigung</div>
                      <div className="suz-services-dropdown-description">Medizinische Einrichtungen</div>
                    </div>
                  </Link>
                </div>
              </div>
              
              <Link
                to="/booking"
                className="suz-nav-link suz-focus-ring whitespace-nowrap bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
                aria-label="Online Termin buchen"
              >
                Termin buchen
              </Link>
              
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
              
              <div className={`suz-services-dropdown ${isServicesOpen ? 'show' : ''}`}>
                <Link
                  to="/services/hotelzimmerreinigung"
                  className="suz-services-dropdown-item"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsServicesOpen(false);
                  }}
                >
                  <Building2 className="suz-services-dropdown-icon text-blue-600" />
                  <div className="suz-services-dropdown-content">
                    <div className="suz-services-dropdown-title">Hotelzimmerreinigung</div>
                    <div className="suz-services-dropdown-description">Höchste Hygienestandards</div>
                  </div>
                </Link>
                <Link
                  to="/services/teppichreinigung"
                  className="suz-services-dropdown-item"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsServicesOpen(false);
                  }}
                >
                  <Home className="suz-services-dropdown-icon text-green-600" />
                  <div className="suz-services-dropdown-content">
                    <div className="suz-services-dropdown-title">Teppichreinigung</div>
                    <div className="suz-services-dropdown-description">Tiefenreinigung & Fleckenentfernung</div>
                  </div>
                </Link>
                <Link
                  to="/services/bodenreinigung"
                  className="suz-services-dropdown-item"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsServicesOpen(false);
                  }}
                >
                  <Sparkles className="suz-services-dropdown-icon text-purple-600" />
                  <div className="suz-services-dropdown-content">
                    <div className="suz-services-dropdown-title">Bodenreinigung</div>
                    <div className="suz-services-dropdown-description">Hartböden, Fliesen, Laminat</div>
                  </div>
                </Link>
                <Link
                  to="/services/gemeinschaftsraeume"
                  className="suz-services-dropdown-item"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsServicesOpen(false);
                  }}
                >
                  <Users className="suz-services-dropdown-icon text-orange-600" />
                  <div className="suz-services-dropdown-content">
                    <div className="suz-services-dropdown-title">Gemeinschaftsräume</div>
                    <div className="suz-services-dropdown-description">Treppenhäuser & Flure</div>
                  </div>
                </Link>
                <Link
                  to="/services/bueroreinigung"
                  className="suz-services-dropdown-item"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsServicesOpen(false);
                  }}
                >
                  <Briefcase className="suz-services-dropdown-icon text-blue-600" />
                  <div className="suz-services-dropdown-content">
                    <div className="suz-services-dropdown-title">Büroreinigung</div>
                    <div className="suz-services-dropdown-description">Arbeitsplätze & Büroflächen</div>
                  </div>
                </Link>
                <Link
                  to="/services/krankenhausreinigung"
                  className="suz-services-dropdown-item"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsServicesOpen(false);
                  }}
                >
                  <Heart className="suz-services-dropdown-icon text-red-600" />
                  <div className="suz-services-dropdown-content">
                    <div className="suz-services-dropdown-title">Krankenhausreinigung</div>
                    <div className="suz-services-dropdown-description">Medizinische Einrichtungen</div>
                  </div>
                </Link>
              </div>
              
              <Link
                to="/booking"
                className="suz-mobile-nav-link suz-focus-ring bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Online Termin buchen"
              >
                🗓️ Termin buchen
              </Link>
              
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
