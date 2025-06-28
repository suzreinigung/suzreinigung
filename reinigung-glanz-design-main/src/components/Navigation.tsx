
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavigationProps {
  scrollToSection: (id: string) => void;
}

const Navigation = ({ scrollToSection }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  // Close menu when clicking outside or on navigation
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.querySelector('[data-nav="main"]');
      if (nav && !nav.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false); // Close mobile menu after navigation
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
              <button
                type="button"
                onClick={() => handleNavClick('home')}
                className="suz-nav-link suz-focus-ring whitespace-nowrap"
                aria-label="Zur Startseite navigieren"
              >
                Startseite
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('services')}
                className="suz-nav-link suz-focus-ring whitespace-nowrap"
                aria-label="Zu unseren Leistungen navigieren"
              >
                Leistungen
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('team')}
                className="suz-nav-link suz-focus-ring whitespace-nowrap"
                aria-label="Zu unserem Team navigieren"
              >
                Unser Team
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
              <button
                type="button"
                onClick={() => handleNavClick('home')}
                className="suz-mobile-nav-link suz-focus-ring"
                aria-label="Zur Startseite navigieren"
              >
                Startseite
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('services')}
                className="suz-mobile-nav-link suz-focus-ring"
                aria-label="Zu unseren Leistungen navigieren"
              >
                Leistungen
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('team')}
                className="suz-mobile-nav-link suz-focus-ring"
                aria-label="Zu unserem Team navigieren"
              >
                Unser Team
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
