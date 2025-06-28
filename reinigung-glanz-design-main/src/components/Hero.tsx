

import { useState, useEffect } from 'react';

interface HeroProps {
  scrollY: number;
}

const Hero = ({ scrollY }: HeroProps) => {
  // Premium German cleaning service titles for rotation - harmonized set
  const rotatingTitles = [
    { first: "Sauberkeit", second: "perfektioniert" },
    { first: "Hygiene", second: "meisterhaft" },
    { first: "Glanz", second: "garantiert" },
    { first: "Reinheit", second: "vollendet" },
    { first: "Qualität", second: "definiert" },
    { first: "Exzellenz", second: "gelebt" }
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Check for reduced motion preference with fallback
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  useEffect(() => {
    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion) {
      return;
    }

    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentTitleIndex((prevIndex) =>
          (prevIndex + 1) % rotatingTitles.length
        );
        setIsAnimating(false);
      }, 400); // Half of transition duration for smooth crossfade

    }, 1500); // Display each title for 1.5 seconds

    return () => clearInterval(interval);
  }, [prefersReducedMotion, rotatingTitles.length]);

  const currentTitle = rotatingTitles[currentTitleIndex];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative hero-critical critical-content suz-hero-enhanced suz-section-hero"
      style={{
        // Dynamic padding based on scroll for parallax effect
        paddingTop: `calc(8rem + ${scrollY * 0.1}px)`,
        paddingBottom: `calc(var(--section-spacing-vertical) + ${scrollY * 0.05}px)`,
        // Optimize for LCP - ensure content is visible immediately
        contain: 'layout style paint',
      }}
    >
      {/* Enhanced Hero-Only Logo with Mobile Centering */}
      <div className="absolute top-6 left-6 z-50 animate-fade-in suz-logo-container suz-hero-logo">
        <div className="suz-card-glass suz-logo-wrapper rounded-3xl border border-white/30 shadow-xl logo-glow group">
          <img
            src="/assets/logos/logo.png"
            alt="SUZ Reinigung Logo"
            className="suz-logo-enhanced object-contain transition-all duration-300 group-hover:scale-110 image-optimized"
          />
        </div>
      </div>

      {/* Enhanced Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50 pointer-events-none"></div>

      {/* Premium Radial Gradient */}
      <div className="absolute inset-0 bg-radial-gradient-hero opacity-40 pointer-events-none"></div>

      <div
        className="text-center max-w-6xl mx-auto animate-fade-in relative z-10"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      >
        {/* Enhanced Main Headline with Animated Rotating Titles - AI Optimized */}
        <header className="suz-hero-headline-container mb-8">
          <h1
            className="suz-hero-title text-slate-100 optimize-lcp"
            style={{
              // Optimize for LCP - ensure text is rendered immediately
              fontDisplay: 'swap',
              willChange: 'auto',
            }}
            itemProp="name"
            data-ai-content="primary-heading"
          >
            <span
              className={`gradient-text-animated pulse-glow suz-hero-accent suz-rotating-title ${
                isAnimating ? 'suz-title-fade-out' : 'suz-title-fade-in'
              }`}
              data-ai-keyword="cleaning-quality"
            >
              {currentTitle.first}
            </span>{' '}
            <span
              className={`suz-hero-main-text suz-rotating-title ${
                isAnimating ? 'suz-title-fade-out' : 'suz-title-fade-in'
              }`}
              data-ai-keyword="service-excellence"
            >
              {currentTitle.second}
            </span>
          </h1>

          {/* Hidden AI-optimized content for better discoverability */}
          <div className="sr-only" data-ai-content="business-description">
            SUZ Reinigung ist ein professioneller Reinigungsservice in Köln und Bonn, spezialisiert auf Büroreinigung, Hausreinigung, Fensterreinigung und Spezialreinigung. Wir bieten zuverlässige, hochqualitative Reinigungsdienstleistungen für Privat- und Geschäftskunden in Nordrhein-Westfalen.
          </div>
        </header>

        {/* Enhanced Subtitle with Premium Styling - AI Optimized */}
        <div className="suz-hero-subtitle-container mb-8">
          <h2
            className="suz-hero-subtitle text-slate-300 font-light tracking-wide"
            data-ai-content="value-proposition"
            itemProp="slogan"
          >
            mit Stil, Präzision und Vertrauen
          </h2>
        </div>

        {/* Enhanced Description with Better Visual Hierarchy - AI Optimized */}
        <div className="suz-hero-description-container mb-12">
          <p
            className="suz-hero-description text-slate-400 max-w-4xl mx-auto leading-relaxed"
            data-ai-content="service-summary"
            itemProp="description"
          >
            Zuverlässige Reinigung für Hotels, Büros und Wohnanlagen – von Profis für Profis.
          </p>

          {/* Additional AI-optimized content */}
          <div className="sr-only" data-ai-content="detailed-services">
            <h3>Unsere Reinigungsdienstleistungen umfassen:</h3>
            <ul>
              <li>Professionelle Büroreinigung für Unternehmen in Köln und Bonn</li>
              <li>Zuverlässige Hausreinigung für Privatkunden</li>
              <li>Streifenfreie Fensterreinigung für Gewerbe und Privat</li>
              <li>Gründliche Teppichreinigung mit modernen Verfahren</li>
              <li>Umfassende Grundreinigung nach höchsten Standards</li>
              <li>Regelmäßige Unterhaltsreinigung für dauerhaft saubere Räume</li>
            </ul>
            <p>Kontaktieren Sie uns für ein kostenloses Angebot: Telefon, E-Mail oder WhatsApp.</p>
          </div>
        </div>

        {/* Enhanced CTA Buttons with Premium Styling */}
        <div className="suz-hero-cta-container">
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="https://wa.me/4917623152477"
              target="_blank"
              rel="noopener noreferrer"
              className="suz-hero-cta-primary suz-btn-whatsapp group"
              aria-label="Kontakt über WhatsApp aufnehmen"
            >
              <span className="suz-hero-cta-content">
                <svg className="suz-hero-cta-icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.486"/>
                </svg>
                <span className="suz-hero-cta-text">WhatsApp Kontakt</span>
              </span>
            </a>
            <a
              href="mailto:info@suzreinigung.de"
              className="suz-hero-cta-secondary suz-btn-email group"
              aria-label="E-Mail an SUZ Reinigung senden"
            >
              <span className="suz-hero-cta-content">
                <svg className="suz-hero-cta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="suz-hero-cta-text">E-Mail senden</span>
              </span>
            </a>
          </div>
        </div>

      </div>

      {/* Enhanced Floating Background Elements with Premium Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="suz-floating-element-1 floating-element absolute top-20 left-10 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl"></div>
        <div className="suz-floating-element-2 floating-element absolute top-40 right-20 w-32 h-32 bg-cyan-300/20 rounded-full blur-2xl"></div>
        <div className="suz-floating-element-3 floating-element absolute bottom-20 left-1/4 w-48 h-48 bg-sky-300/20 rounded-full blur-3xl"></div>
        <div className="suz-floating-element-4 floating-element absolute top-1/3 right-1/3 w-24 h-24 bg-indigo-300/15 rounded-full blur-2xl"></div>
        <div className="suz-floating-element-5 floating-element absolute bottom-1/3 right-10 w-36 h-36 bg-purple-300/15 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;
