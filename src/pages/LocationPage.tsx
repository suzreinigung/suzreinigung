import { useParams, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { TrustIndicators, TestimonialCarousel } from '@/components/TrustIndicators';
import QuoteCalculator from '@/components/QuoteCalculator';
import { 
  getServiceAreaBySlug, 
  getLocalTestimonialsByLocation,
  getLocalServicesByArea,
  serviceAreas 
} from '@/data/locations';
import { trackBusinessEvents } from '@/lib/analytics';
import { updateMetaTags, injectStructuredData } from '@/lib/seo';

const LocationPage = () => {
  const { location } = useParams<{ location: string }>();
  const serviceArea = location ? getServiceAreaBySlug(location) : undefined;
  const localTestimonials = location ? getLocalTestimonialsByLocation(location) : [];
  const localServices = location ? getLocalServicesByArea(location) : {};

  useEffect(() => {
    if (serviceArea) {
      // Track location page view
      trackBusinessEvents.servicePageView(`location_${serviceArea.id}`);

      // Update meta tags for local SEO
      updateMetaTags({
        title: serviceArea.seo.title,
        description: serviceArea.seo.description,
        keywords: serviceArea.seo.keywords.join(', '),
        url: `https://www.suzreinigung.de/standorte/${serviceArea.slug}`,
      });

      // Inject local business structured data
      const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "SUZ Reinigung",
        "description": serviceArea.description,
        "url": `https://www.suzreinigung.de/standorte/${serviceArea.slug}`,
        "telephone": "+49 176 23152477",
        "email": "info@suzreinigung.de",
        "areaServed": {
          "@type": "City",
          "name": serviceArea.seo.schema.areaServed
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": serviceArea.seo.schema.geo.latitude,
          "longitude": serviceArea.seo.schema.geo.longitude
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": serviceArea.seo.schema.address.streetAddress,
          "addressLocality": serviceArea.seo.schema.address.addressLocality,
          "addressRegion": serviceArea.seo.schema.address.addressRegion,
          "postalCode": serviceArea.seo.schema.address.postalCode,
          "addressCountry": serviceArea.seo.schema.address.addressCountry
        },
        "openingHours": "Mo-Fr 08:00-18:00, Sa 09:00-16:00",
        "priceRange": "€€",
        "paymentAccepted": ["Cash", "Credit Card", "Bank transfer"],
        "currenciesAccepted": "EUR",
        "serviceArea": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": serviceArea.coordinates.lat,
            "longitude": serviceArea.coordinates.lng
          },
          "geoRadius": `${serviceArea.serviceRadius}000`
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Reinigungsdienstleistungen",
          "itemListElement": Object.values(localServices).map(service => ({
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": service.serviceType,
              "description": `${service.serviceType} in ${serviceArea.name}`
            },
            "price": service.averagePrice,
            "priceCurrency": "EUR"
          }))
        }
      };

      injectStructuredData(localBusinessSchema);
    }
  }, [serviceArea, localServices]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCTAClick = () => {
    trackBusinessEvents.serviceInquiry(`location_${serviceArea?.id}`);
    window.open('https://wa.me/4917623152477', '_blank');
  };

  // If location not found, redirect to homepage
  if (!serviceArea) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{serviceArea.seo.title}</title>
        <meta name="description" content={serviceArea.seo.description} />
        <meta name="keywords" content={serviceArea.seo.keywords.join(', ')} />
        <link rel="canonical" href={`https://www.suzreinigung.de/standorte/${serviceArea.slug}`} />
        
        {/* Local SEO meta tags */}
        <meta name="geo.region" content="DE-NW" />
        <meta name="geo.placename" content={serviceArea.name} />
        <meta name="geo.position" content={`${serviceArea.coordinates.lat};${serviceArea.coordinates.lng}`} />
        <meta name="ICBM" content={`${serviceArea.coordinates.lat}, ${serviceArea.coordinates.lng}`} />
      </Helmet>

      <Navigation scrollToSection={scrollToSection} />

      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {serviceArea.seo.h1}
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {serviceArea.description}
          </p>
          
          {/* Local Keywords */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
              {serviceArea.seo.localKeywords.map((keyword) => (
                <span 
                  key={keyword}
                  className="px-3 py-1 bg-white/10 text-blue-100 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleCTAClick}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.486"/>
              </svg>
              Kostenloses Angebot
            </button>
            <a 
              href="tel:+4917623152477"
              className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Jetzt anrufen
            </a>
          </div>
        </div>
      </section>

      {/* Local Services Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Unsere Reinigungsdienstleistungen in {serviceArea.name}
          </h2>
          
          {Object.keys(localServices).length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(localServices).map(([serviceKey, service]) => (
                <div key={serviceKey} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {service.serviceType}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Durchschnittspreis:</span>
                      <span className="font-medium">{service.averagePrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nachfrage:</span>
                      <span className={`font-medium capitalize ${
                        service.localDemand === 'high' ? 'text-green-600' : 
                        service.localDemand === 'medium' ? 'text-yellow-600' : 'text-gray-600'
                      }`}>
                        {service.localDemand === 'high' ? 'Hoch' : 
                         service.localDemand === 'medium' ? 'Mittel' : 'Niedrig'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Beste Zeit:</span>
                      <span className="font-medium">{service.seasonality.peak.join(', ')}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Zielgruppen:</h4>
                    <div className="flex flex-wrap gap-1">
                      {service.targetCustomers.map((customer) => (
                        <span 
                          key={customer}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                        >
                          {customer}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">
                Vollumfängliche Reinigungsdienstleistungen für {serviceArea.name}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Area Demographics & Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Warum {serviceArea.name}?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {serviceArea.demographics.population.toLocaleString('de-DE')}
              </div>
              <div className="text-gray-600">Einwohner</div>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {serviceArea.demographics.businessCount.toLocaleString('de-DE')}+
              </div>
              <div className="text-gray-600">Unternehmen</div>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {serviceArea.serviceRadius}km
              </div>
              <div className="text-gray-600">Service-Radius</div>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {serviceArea.demographics.averageIncome}
              </div>
              <div className="text-gray-600">Ø Einkommen</div>
            </div>
          </div>

          {/* Landmarks */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
              Bekannte Standorte in {serviceArea.name}
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {serviceArea.landmarks.map((landmark) => (
                <span 
                  key={landmark}
                  className="px-4 py-2 bg-white text-gray-700 rounded-full shadow-sm"
                >
                  📍 {landmark}
                </span>
              ))}
            </div>
          </div>

          {/* Primary Industries */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
              Hauptbranchen
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {serviceArea.demographics.primaryIndustries.map((industry) => (
                <span 
                  key={industry}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full"
                >
                  🏢 {industry}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Calculator */}
      <section id="calculator" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Kostenvoranschlag für {serviceArea.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Erhalten Sie sofort eine Preisschätzung für Ihre Reinigung in {serviceArea.name} - 
              angepasst an lokale Gegebenheiten und Preise.
            </p>
          </div>
          <QuoteCalculator />
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Warum SUZ Reinigung in {serviceArea.name}?
          </h2>
          <TrustIndicators layout="grid" />
        </div>
      </section>

      {/* Local Testimonials */}
      {localTestimonials.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Kunden aus {serviceArea.name} sind begeistert
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {localTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                    {testimonial.verified && (
                      <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        ✓ Verifiziert
                      </span>
                    )}
                  </div>
                  <blockquote className="text-gray-700 mb-4 italic">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900">{testimonial.customerName}</div>
                    {testimonial.businessName && (
                      <div className="text-sm font-medium text-blue-600">{testimonial.businessName}</div>
                    )}
                    <div className="text-sm text-gray-600">{testimonial.location} • {testimonial.service}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Coverage Map Placeholder */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Unser Servicegebiet um {serviceArea.name}
          </h2>
          <div className="bg-white rounded-lg p-8 shadow-md">
            <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mb-6">
              <div className="text-center">
                <div className="text-4xl mb-4">🗺️</div>
                <p className="text-gray-600">
                  Serviceradius: {serviceArea.serviceRadius}km um {serviceArea.name}
                </p>
                <div className="mt-4 space-y-1 text-sm text-gray-500">
                  <p>Postleitzahlen: {serviceArea.postalCodes.join(', ')}</p>
                  <p>Koordinaten: {serviceArea.coordinates.lat}°N, {serviceArea.coordinates.lng}°E</p>
                </div>
              </div>
            </div>
            <p className="text-gray-600">
              Wir sind in {serviceArea.name} und Umgebung für Sie da. 
              Kontaktieren Sie uns für Informationen zu unserem Service in Ihrer Nähe.
            </p>
          </div>
        </div>
      </section>

      {/* Other Locations CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Weitere Standorte
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.values(serviceAreas)
              .filter(area => area.id !== serviceArea.id)
              .slice(0, 4)
              .map((area) => (
                <a
                  key={area.id}
                  href={`/standorte/${area.slug}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
                  onClick={() => trackBusinessEvents.serviceInquiry(`location_link_${area.id}`)}
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{area.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{area.description.slice(0, 80)}...</p>
                  <div className="text-blue-600 text-sm font-medium">
                    Mehr erfahren →
                  </div>
                </a>
              ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Bereit für professionelle Reinigung in {serviceArea.name}?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Kontaktieren Sie uns jetzt für ein kostenloses, unverbindliches Angebot 
            speziell für {serviceArea.name}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleCTAClick}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.486"/>
              </svg>
              WhatsApp Kontakt
            </button>
            <a 
              href="tel:+4917623152477"
              className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Telefon: +49 176 23152477
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LocationPage;