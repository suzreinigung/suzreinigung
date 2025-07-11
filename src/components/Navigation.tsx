import { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Building2, Home, Sparkles, Users, Briefcase, Heart, Menu, X } from 'lucide-react';

interface NavigationProps {
  scrollToSection: (id: string) => void;
}

const Navigation = ({ scrollToSection }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);



  // Close mobile menu when navigating
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [location.pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
        setIsServicesOpen(false);
      }
    };

    if (isMobileMenuOpen || isServicesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen, isServicesOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsServicesOpen(false);
      }
    };

    if (isMobileMenuOpen || isServicesOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen, isServicesOpen]);

  const handleNavClick = (sectionId: string) => {
    if (location.pathname !== '/' && ['home', 'services', 'testimonials', 'contact'].includes(sectionId)) {
      window.location.href = `/#${sectionId}`;
      return;
    }
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsServicesOpen(false);
  };

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  const navLinks = [
    { name: 'Startseite', path: '/', sectionId: 'home' },
    { name: 'Über Uns', path: '/', sectionId: 'uber-uns' },
    { name: 'Kostenrechner', path: '/kostenrechner' },
    { name: 'Blog', path: '/blog' },
    { name: 'Referenzen', path: '/', sectionId: 'testimonials' },
    { name: 'Kontakt', path: '/', sectionId: 'contact' },
    { name: 'Termin buchen', path: '/booking', isButton: true },
  ];

  const serviceLinks = [
    { name: 'Hotelzimmerreinigung', path: '/services/hotelzimmerreinigung', icon: Building2 },
    { name: 'Teppichreinigung', path: '/services/teppichreinigung', icon: Home },
    { name: 'Bodenreinigung', path: '/services/bodenreinigung', icon: Sparkles },
    { name: 'Gemeinschaftsräume', path: '/services/gemeinschaftsraeume', icon: Users },
    { name: 'Büroreinigung', path: '/services/bueroreinigung', icon: Briefcase },
    { name: 'Krankenhausreinigung', path: '/services/krankenhausreinigung', icon: Heart },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      {!isMobile && (
        <nav
          ref={navRef}
          className="suz-nav-desktop"
          role="navigation"
          aria-label="Hauptnavigation"
        >
          <div className="suz-nav-container">
            <div className="suz-nav-content">
              {navLinks.map((link) => (
                link.name === 'Startseite' && location.pathname === '/' ? (
                  <button
                    key={link.name}
                    type="button"
                    onClick={() => handleNavClick(link.sectionId!)}
                    className="suz-nav-link"
                    aria-label={`Zur ${link.name} navigieren`}
                  >
                    {link.name}
                  </button>
                ) : link.name === 'Startseite' ? (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="suz-nav-link"
                    aria-label={`Zur ${link.name} navigieren`}
                  >
                    {link.name}
                  </Link>
                ) : link.name === 'Termin buchen' ? (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="suz-nav-link-cta"
                    aria-label={link.name}
                  >
                    {link.name}
                  </Link>
                ) : link.sectionId ? (
                  <button
                    key={link.name}
                    type="button"
                    onClick={() => handleNavClick(link.sectionId)}
                    className="suz-nav-link"
                    aria-label={`Zu ${link.name} navigieren`}
                  >
                    {link.name}
                  </button>
                ) : link.path ? (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="suz-nav-link"
                    aria-label={`Zur ${link.name} navigieren`}
                  >
                    {link.name}
                  </Link>
                ) : null
              ))}

              {/* Services Dropdown */}
              <div className="suz-services-container">
                <button
                  type="button"
                  className="suz-services-button"
                  onClick={toggleServices}
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                  aria-expanded={isServicesOpen.toString()}
                  aria-haspopup="menu"
                  aria-label="Leistungen anzeigen"
                >
                  Leistungen
                  <ChevronDown className={`suz-chevron ${isServicesOpen ? 'suz-chevron-open' : ''}`} />
                </button>

                <div
                  className={`suz-services-dropdown ${isServicesOpen ? 'suz-dropdown-open' : ''}`}
                  role="menu"
                  aria-label="Leistungen Dropdown"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  {serviceLinks.map((service) => {
                    const Icon = service.icon;
                    return (
                      <Link
                        key={service.name}
                        to={service.path}
                        className="suz-service-item"
                        role="menuitem"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        <Icon className="suz-service-icon" />
                        <span className="suz-service-name">{service.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Mobile Navigation */}
      {isMobile && (
        <>
          {/* Mobile Menu Button */}
          <div className="suz-mobile-button-container">
            <div className="suz-mobile-button-wrapper">
              <button
                type="button"
                onClick={toggleMobileMenu}
                className="suz-mobile-button"
                aria-label={isMobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
                aria-expanded={isMobileMenuOpen.toString()}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-slate-100" />
                ) : (
                  <Menu className="w-6 h-6 text-slate-100" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div className="suz-mobile-overlay" onClick={toggleMobileMenu} />
          )}

          {/* Mobile Menu */}
          <div
            id="mobile-menu"
            className={`suz-mobile-menu ${isMobileMenuOpen ? 'suz-mobile-open' : 'suz-mobile-closed'}`}
            aria-hidden={(!isMobileMenuOpen).toString()}
          >
            <div className="suz-mobile-content">
              {navLinks.map((link) => (
                link.name === 'Startseite' && location.pathname === '/' ? (
                  <button
                    key={link.name}
                    type="button"
                    onClick={() => handleNavClick(link.sectionId!)}
                    className="suz-mobile-link"
                    aria-label={`Zur ${link.name} navigieren`}
                  >
                    {link.name}
                  </button>
                ) : link.name === 'Startseite' ? (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="suz-mobile-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label={`Zur ${link.name} navigieren`}
                  >
                    {link.name}
                  </Link>
                ) : link.name === 'Termin buchen' ? (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="suz-mobile-link-cta"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label={link.name}
                  >
                    🗓️ {link.name}
                  </Link>
                ) : link.sectionId ? (
                  <button
                    key={link.name}
                    type="button"
                    onClick={() => handleNavClick(link.sectionId)}
                    className="suz-mobile-link"
                    aria-label={`Zu ${link.name} navigieren`}
                  >
                    {link.name}
                  </button>
                ) : link.path ? (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="suz-mobile-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label={`Zur ${link.name} navigieren`}
                  >
                    {link.name}
                  </Link>
                ) : null
              ))}

              {/* Mobile Services Section */}
              <button
                type="button"
                onClick={toggleServices}
                className="suz-mobile-services-button"
                aria-label="Leistungen anzeigen"
                aria-expanded={isServicesOpen.toString()}
              >
                Leistungen
                <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`suz-mobile-services ${isServicesOpen ? 'suz-mobile-services-open' : ''}`}>
                {serviceLinks.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Link
                      key={service.name}
                      to={service.path}
                      className="suz-mobile-service-item"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsServicesOpen(false);
                      }}
                    >
                      <Icon className="suz-mobile-service-icon" />
                      <span className="suz-mobile-service-name">{service.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navigation;
