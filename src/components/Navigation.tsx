
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {
  scrollToSection: (id: string) => void;
}

const Navigation = ({ scrollToSection }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  // Service menu items
  const services = [
    { id: 'bueroreinigung', title: 'Büroreinigung', path: '/services/bueroreinigung' },
    { id: 'hausreinigung', title: 'Hausreinigung', path: '/services/hausreinigung' },
    { id: 'fensterreinigung', title: 'Fensterreinigung', path: '/services/fensterreinigung' },
    { id: 'grundreinigung', title: 'Grundreinigung', path: '/services/grundreinigung' },
  ];

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
              
              {/* Services Button */}
              <button
                type="button"
                onClick={toggleServicesDropdown}
                className="suz-nav-link suz-focus-ring whitespace-nowrap flex items-center gap-1"
                aria-label="Leistungen anzeigen"
                aria-expanded={isServicesOpen}
              >
                Leistungen
                <svg className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
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

      {/* Services Dropdown - Outside navigation container */}
      {!isMobile && isServicesOpen && (
        <div 
          className="fixed z-[70]" 
          style={{top: '5.5rem', left: '50%', transform: 'translateX(-50%)'}}
          data-dropdown="services"
        >
          <div className="suz-card-glass py-2 w-56 rounded-lg shadow-xl border border-white/20">
            <Link
              to="/#services"
              className="block px-4 py-2 text-sm text-white hover:bg-blue-500/20 hover:text-blue-300 transition-colors rounded-md mx-2"
              onClick={() => setIsServicesOpen(false)}
            >
              Alle Leistungen
            </Link>
            {services.map((service) => (
              <Link
                key={service.id}
                to={service.path}
                className="block px-4 py-2 text-sm text-gray-200 hover:bg-blue-500/20 hover:text-blue-300 transition-colors rounded-md mx-2"
                onClick={() => setIsServicesOpen(false)}
              >
                {service.title}
              </Link>
            ))}
          </div>
        </div>
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
                    to="/#services"
                    className="block py-2 text-sm text-white/80 hover:text-white hover:bg-blue-500/20 transition-colors rounded-md px-2"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsServicesOpen(false);
                    }}
                  >
                    Alle Leistungen
                  </Link>
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      to={service.path}
                      className="block py-2 text-sm text-white/80 hover:text-white hover:bg-blue-500/20 transition-colors rounded-md px-2"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsServicesOpen(false);
                      }}
                    >
                      {service.title}
                    </Link>
                  ))}
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
