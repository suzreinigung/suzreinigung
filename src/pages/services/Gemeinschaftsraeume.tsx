import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, Check, Star, Phone, MessageCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { TrustIndicators } from '@/components/TrustIndicators';
import QuoteRequestForm from '@/components/QuoteRequestForm';
import { services } from '@/data/services';
import { trackBusinessEvents } from '@/lib/analytics';

const Gemeinschaftsraeume = () => {
  const serviceData = services.gemeinschaftsraeume;

  useEffect(() => {
    trackBusinessEvents.servicePageView('gemeinschaftsraeume');
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCTAClick = () => {
    trackBusinessEvents.serviceInquiry('gemeinschaftsraeume');
    window.open('https://wa.me/4917623152477', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{serviceData.seo.title}</title>
        <meta name="description" content={serviceData.seo.description} />
        <meta name="keywords" content={serviceData.seo.keywords.join(', ')} />
        <link rel="canonical" href="https://www.suzreinigung.de/services/gemeinschaftsraeume" />
      </Helmet>

      <Navigation scrollToSection={scrollToSection} />

      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-900 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-8 bg-orange-600 rounded-full">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {serviceData.title}
          </h1>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            {serviceData.longDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleCTAClick}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Kostenloses Angebot
            </button>
            <a 
              href="tel:+4917623152477"
              className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Jetzt anrufen
            </a>
          </div>
        </div>
      </section>

      {/* Service Image */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <img
              src={serviceData.image}
              alt={`${serviceData.title} - SUZ Reinigung`}
              className="w-full max-w-4xl mx-auto rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Features & Benefits */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Unsere Leistungen</h2>
              <div className="grid gap-4">
                {serviceData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Ihre Vorteile</h2>
              <div className="grid gap-4">
                {serviceData.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Unser Reinigungsprozess
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceData.process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-orange-100 rounded-full">
                  <span className="text-2xl font-bold text-orange-600">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {serviceData.pricing.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {serviceData.pricing.options.map((option, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.name}</h3>
                <div className="text-3xl font-bold text-orange-600 mb-4">{option.price}</div>
                <p className="text-gray-600 mb-6">{option.description}</p>
                <ul className="space-y-2">
                  {option.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-orange-600" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrustIndicators layout="compact" />

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Häufig gestellte Fragen
          </h2>
          <div className="space-y-6">
            {serviceData.faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Request */}
      <section id="quote" className="py-16 px-4 sm:px-6 lg:px-8 bg-orange-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Kostenloses Angebot anfordern
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Erhalten Sie ein unverbindliches Angebot für Ihre Gemeinschaftsräume. 
              Wir melden uns innerhalb von 24 Stunden bei Ihnen.
            </p>
          </div>
          <QuoteRequestForm />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gemeinschaftsraeume;