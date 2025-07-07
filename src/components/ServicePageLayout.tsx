import { useEffect } from 'react';
import { Service } from '@/types/services';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { updateMetaTags, injectStructuredData } from '@/lib/seo';
import { trackBusinessEvents } from '@/lib/analytics';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface ServicePageLayoutProps {
  service: Service;
}

const ServicePageLayout = ({ service }: ServicePageLayoutProps) => {
  // Update SEO meta tags
  useEffect(() => {
    updateMetaTags({
      title: service.seo.title,
      description: service.seo.description,
      keywords: service.seo.keywords.join(', '),
      url: `https://www.suzreinigung.de/services/${service.id}`,
    });

    // Inject service-specific structured data
    const serviceStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': service.title,
      'description': service.description,
      'provider': {
        '@type': 'LocalBusiness',
        'name': 'SUZ Reinigung',
        'url': 'https://www.suzreinigung.de'
      },
      'areaServed': ['Köln', 'Bonn', 'Nordrhein-Westfalen'],
      'offers': {
        '@type': 'Offer',
        'priceRange': service.pricing.priceRange,
        'priceCurrency': 'EUR'
      }
    };

    injectStructuredData(serviceStructuredData);

    // Track service page view
    trackBusinessEvents.servicePageView(service.id);
  }, [service]);

  // Get icon component
  const getIcon = (iconName: string): LucideIcon => {
    return (Icons as any)[iconName] || Icons.Sparkles;
  };

  const handleCTAClick = (type: 'primary' | 'secondary') => {
    trackBusinessEvents.serviceInquiry(service.id);
    // For now, scroll to contact or redirect to WhatsApp
    if (type === 'primary') {
      window.open('https://wa.me/4917623152477', '_blank');
    } else {
      const contactSection = document.getElementById('contact');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {service.title}
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {service.subtitle}
          </p>
          <p className="text-lg text-slate-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            {service.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
              onClick={() => handleCTAClick('primary')}
            >
              <Icons.MessageCircle className="mr-2 h-5 w-5" />
              {service.cta.primary}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg"
              onClick={() => handleCTAClick('secondary')}
            >
              <Icons.Phone className="mr-2 h-5 w-5" />
              {service.cta.secondary}
            </Button>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
            Was wir für Sie tun
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Icons.CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-slate-700">{feature}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
            So läuft es ab
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process.map((step, index) => {
              const IconComponent = getIcon(step.icon);
              return (
                <div key={step.step} className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 -mt-2">
                    <span className="text-blue-600 font-bold">{step.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900">{step.title}</h3>
                  <p className="text-slate-600 text-sm">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
            Ihre Vorteile
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {service.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-blue-50">
                <Icons.Star className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
                <p className="text-slate-700 font-medium">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">
            Transparente Preisgestaltung
          </h2>
          
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">
                {service.pricing.startingPrice} pro Stunde
              </CardTitle>
              <CardDescription className="text-lg">
                Preisspanne: {service.pricing.priceRange}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Preisfaktoren:</h3>
                <div className="flex flex-wrap gap-2">
                  {service.pricing.factors.map((factor, index) => (
                    <Badge key={index} variant="secondary">{factor}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Im Preis enthalten:</h3>
                <ul className="text-left space-y-2">
                  {service.pricing.includes.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Icons.Check className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button 
                size="lg" 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => handleCTAClick('primary')}
              >
                Kostenloses Angebot anfordern
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
            Häufige Fragen
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {service.faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-slate-700 pt-2">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Bereit für professionelle Reinigung?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Kontaktieren Sie uns jetzt für ein kostenloses, unverbindliches Angebot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
              onClick={() => handleCTAClick('primary')}
            >
              <Icons.MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp Kontakt
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg"
              onClick={() => handleCTAClick('secondary')}
            >
              <Icons.Phone className="mr-2 h-5 w-5" />
              Telefon: +49 176 23152477
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePageLayout;