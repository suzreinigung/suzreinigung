import React, { useEffect, useRef } from 'react';

const UberUns = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Performance optimization: Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');

            // Add staggered animation for content elements
            if (entry.target === contentRef.current) {
              const elements = entry.target.querySelectorAll('.suz-animate-stagger');
              elements.forEach((el, index) => {
                setTimeout(() => {
                  el.classList.add('animate-slide-up');
                }, index * 150);
              });
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    const section = sectionRef.current;
    const content = contentRef.current;

    if (section) observer.observe(section);
    if (content) observer.observe(content);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="uber-uns"
      ref={sectionRef}
      className="suz-section-standard bg-premium-gradient relative overflow-hidden"
      aria-label="Über Uns - Informationen über SUZ Reinigung"
      role="region"
    >
      {/* Glass morphism overlay matching other sections */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" aria-hidden="true"></div>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

          {/* Enhanced Image Section with Glass Morphism */}
          <div className="lg:w-1/2 flex justify-center lg:justify-start">
            <div className="suz-card-glass rounded-3xl p-2 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
              <img
                ref={imageRef}
                src="/assets/images/uber_uns.png"
                alt="SUZ Reinigung Team bei der Arbeit - Professionelle Reinigungskräfte in Aktion. Deutschlands führender Reinigungsservice seit 2000 mit höchsten Qualitätsstandards für Büroreinigung, Hausreinigung und Spezialreinigung in Köln, Bonn und ganz NRW."
                title="SUZ Reinigung Team - Premium Reinigungsdienstleistungen Deutschland seit 2000"
                className="w-full h-auto rounded-2xl object-contain transform transition-transform duration-500 group-hover:scale-[1.02]"
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
          </div>

          {/* Enhanced Content Section */}
          <div ref={contentRef} className="lg:w-1/2 text-center lg:text-left">
            <header className="mb-12">
              <h2 className="suz-text-heading-xl font-bold text-slate-100 mb-6 suz-animate-stagger">
                Über Uns: <span className="gradient-text">SUZ Reinigung</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto lg:mx-0 rounded-full suz-animate-stagger"></div>
            </header>

            <div className="space-y-8">
              <div className="suz-card-glass rounded-2xl p-8 suz-animate-stagger">
                <p className="suz-text-body-lg text-slate-300 leading-relaxed">
                  Seit dem Jahr <span className="text-blue-400 font-semibold">2000</span> steht SUZ Reinigung für herausragende Sauberkeit und Verlässlichkeit in der Reinigungsbranche. Mit über zwei Jahrzehnten Erfahrung haben wir uns als vertrauenswürdiger Partner für private und gewerbliche Kunden etabliert.
                </p>
              </div>

              <div className="suz-card-glass rounded-2xl p-8 suz-animate-stagger">
                <p className="suz-text-body-lg text-slate-300 leading-relaxed">
                  Unser Engagement für Qualität und Kundenzufriedenheit ist der Kern unserer Philosophie. Wir setzen auf modernste Reinigungstechniken, umweltfreundliche Produkte und ein hochqualifiziertes Team, das mit Leidenschaft und Präzision arbeitet.
                </p>
              </div>

              <div className="suz-card-glass rounded-2xl p-8 suz-animate-stagger">
                <p className="suz-text-body-lg text-slate-300 leading-relaxed">
                  Wir verstehen, dass Sauberkeit nicht nur Ästhetik, sondern auch Wohlbefinden und Gesundheit bedeutet. Deshalb bieten wir maßgeschneiderte Reinigungslösungen, die exakt auf Ihre Bedürfnisse zugeschnitten sind. <span className="text-blue-400 font-semibold">Vertrauen Sie auf SUZ Reinigung</span> – Ihr Partner für eine glänzende Zukunft.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UberUns;
