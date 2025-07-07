import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Briefcase, Check, Star, Phone, MessageCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { TrustIndicators } from '@/components/TrustIndicators';
import QuoteRequestForm from '@/components/QuoteRequestForm';
import { services } from '@/data/services';
import { trackBusinessEvents } from '@/lib/analytics';

const Bueroreinigung = () => {
  const serviceData = services.bueroreinigung;

  useEffect(() => {
    trackBusinessEvents.servicePageView('bueroreinigung');
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCTAClick = () => {
    trackBusinessEvents.serviceInquiry('bueroreinigung');
    window.open('https://wa.me/4917623152477', '_blank');
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{serviceData.seo.title}</title>
        <meta name="description" content={serviceData.seo.description} />
        <meta name="keywords" content={serviceData.seo.keywords.join(', ')} />
        <link rel="canonical" href="https://www.suzreinigung.de/services/bueroreinigung" />
      </Helmet>

=======
    <div className="min-h-screen bg-premium-gradient force-apple-design">
>>>>>>> 61de0c349bd2a9ede848ac9c4851692d9df59c6a
      <Navigation scrollToSection={scrollToSection} />

      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-8 bg-blue-600 rounded-full">
            <Briefcase className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {serviceData.title}
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
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
<<<<<<< HEAD
          <div className="text-center mb-12">
            <img
              src={serviceData.image}
              alt={`${serviceData.title} - SUZ Reinigung`}
              className="w-full max-w-4xl mx-auto rounded-2xl shadow-xl"
            />
=======
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Was wir für Sie tun
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, index) => (
              <div key={index} className="suz-card-glass p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3">
                  <svg className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-200">{feature}</p>
                </div>
              </div>
            ))}
>>>>>>> 61de0c349bd2a9ede848ac9c4851692d9df59c6a
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* Features & Benefits */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Unsere Leistungen</h2>
              <div className="grid gap-4">
                {serviceData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
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
                    <Star className="w-5 h-5 text-blue-600 flex-shrink-0" />
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
=======
      {/* Process Steps */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            So läuft es ab
>>>>>>> 61de0c349bd2a9ede848ac9c4851692d9df59c6a
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceData.process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-blue-100 rounded-full">
                  <span className="text-2xl font-bold text-blue-600">{step.step}</span>
                </div>
<<<<<<< HEAD
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
=======
                <h3 className="text-lg font-semibold mb-2 text-white">{step.title}</h3>
                <p className="text-gray-300 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Ihre Vorteile
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {service.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-lg suz-card-glass">
                <svg className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <p className="text-gray-200 font-medium">{benefit}</p>
>>>>>>> 61de0c349bd2a9ede848ac9c4851692d9df59c6a
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
<<<<<<< HEAD
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {serviceData.pricing.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {serviceData.pricing.options.map((option, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.name}</h3>
                <div className="text-3xl font-bold text-blue-600 mb-4">{option.price}</div>
                <p className="text-gray-600 mb-6">{option.description}</p>
                <ul className="space-y-2">
                  {option.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
=======
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-800 to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">
            Transparente Preisgestaltung
          </h2>
          
                      <div className="suz-card-glass rounded-lg p-8 max-w-2xl mx-auto">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {service.pricing.startingPrice} pro Stunde
                </h3>
                <p className="text-lg text-gray-300">
                  Preisspanne: {service.pricing.priceRange}
                </p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 text-white">Preisfaktoren:</h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {service.pricing.factors.map((factor, index) => (
                      <span key={index} className="bg-blue-600/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full text-sm">
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-white">Im Preis enthalten:</h4>
                  <ul className="text-left space-y-2">
                    {service.pricing.includes.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-200">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              
              <button 
                onClick={handleCTAClick}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                Kostenloses Angebot anfordern
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Häufige Fragen
          </h2>
          <div className="space-y-4">
            {service.faqs.map((faq, index) => (
              <details key={index} className="border border-gray-600/30 rounded-lg p-6 suz-card-glass">
                <summary className="font-semibold cursor-pointer text-white hover:text-blue-400">
                  {faq.question}
                </summary>
                <p className="text-gray-300 mt-3 leading-relaxed">{faq.answer}</p>
              </details>
>>>>>>> 61de0c349bd2a9ede848ac9c4851692d9df59c6a
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
<<<<<<< HEAD
          <div className="space-y-6">
            {serviceData.faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
=======
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Kontaktieren Sie uns jetzt für ein kostenloses, unverbindliches Angebot.
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
              className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Telefon: +49 176 23152477
            </a>
>>>>>>> 61de0c349bd2a9ede848ac9c4851692d9df59c6a
          </div>
        </div>
      </section>

      {/* Quote Request */}
      <section id="quote" className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Kostenloses Angebot anfordern
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Erhalten Sie ein unverbindliches Angebot für Ihre Büroreinigung. 
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

export default Bueroreinigung;