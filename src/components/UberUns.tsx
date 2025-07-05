import React, { useEffect, useRef } from 'react';

const UberUns = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Performance optimization: Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    const section = sectionRef.current;
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="uber-uns"
      ref={sectionRef}
      className="suz-section suz-uber-uns py-16 px-4 md:px-8 lg:px-16 bg-premium-gradient text-white relative overflow-hidden"
      aria-label="Über Uns - Informationen über SUZ Reinigung"
      role="region"
    >
      <div className="suz-glass-morphism-overlay absolute inset-0" aria-hidden="true"></div>
      <div className="suz-content-container relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="suz-image-wrapper lg:w-1/2 flex justify-center lg:justify-start">
          <img
            ref={imageRef}
            src="/assets/images/uber_uns.png"
            alt="SUZ Reinigung Team bei der Arbeit - Professionelle Reinigungskräfte in Aktion. Deutschlands führender Reinigungsservice seit 2000 mit höchsten Qualitätsstandards für Büroreinigung, Hausreinigung und Spezialreinigung in Köln, Bonn und ganz NRW."
            title="SUZ Reinigung Team - Premium Reinigungsdienstleistungen Deutschland seit 2000"
            className="suz-uber-uns-image rounded-lg shadow-2xl transform transition-transform duration-500 hover:scale-105"
            loading="lazy"
            decoding="async"
            width="500"
            height="400"
            tabIndex={0}
            onError={(e) => {
              console.warn('Über Uns image failed to load:', e);
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        <div className="suz-text-content lg:w-1/2 text-center lg:text-left">
          <h2 className="suz-section-title text-4xl md:text-5xl font-bold mb-6 gradient-text-animated">
            Über Uns: SUZ Reinigung
          </h2>
          <div className="suz-content-text space-y-6">
            <p className="suz-paragraph text-lg md:text-xl leading-relaxed">
              Seit dem Jahr <strong>2000</strong> steht SUZ Reinigung für herausragende Sauberkeit und Verlässlichkeit in der Reinigungsbranche. Mit über zwei Jahrzehnten Erfahrung haben wir uns als vertrauenswürdiger Partner für private und gewerbliche Kunden etabliert.
            </p>
            <p className="suz-paragraph text-lg md:text-xl leading-relaxed">
              Unser Engagement für Qualität und Kundenzufriedenheit ist der Kern unserer Philosophie. Wir setzen auf modernste Reinigungstechniken, umweltfreundliche Produkte und ein hochqualifiziertes Team, das mit Leidenschaft und Präzision arbeitet. Jedes Mitglied unseres Teams ist sorgfältig geschult, um die höchsten Standards zu erfüllen und eine makellose Umgebung zu gewährleisten.
            </p>
            <p className="suz-paragraph text-lg md:text-xl leading-relaxed">
              Wir verstehen, dass Sauberkeit nicht nur Ästhetik, sondern auch Wohlbefinden und Gesundheit bedeutet. Deshalb bieten wir maßgeschneiderte Reinigungslösungen, die exakt auf Ihre Bedürfnisse zugeschnitten sind. Vertrauen Sie auf SUZ Reinigung – Ihr Partner für eine glänzende Zukunft.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UberUns;
