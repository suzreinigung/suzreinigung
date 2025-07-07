
import { useState, useEffect, lazy, Suspense } from 'react';
import Navigation from '../components/Navigation';

// Lazy load components for better code splitting
const Hero = lazy(() => import('../components/Hero'));
const CompanyShowcase = lazy(() => import('../components/CompanyShowcase'));
const Services = lazy(() => import('../components/Services'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const UberUns = lazy(() => import('../components/UberUns'));
const Contact = lazy(() => import('../components/Contact'));
const Footer = lazy(() => import('../components/Footer'));

// Component loading fallback
const ComponentLoader = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center py-16 ${className}`}>
    <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
  </div>
);

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Removed debug console logs for production performance

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-premium-gradient overflow-x-hidden force-apple-design">
      <Navigation scrollToSection={scrollToSection} />

      <Suspense fallback={<ComponentLoader className="min-h-screen" />}>
        <Hero scrollY={scrollY} />
      </Suspense>

      <Suspense fallback={<ComponentLoader />}>
        <CompanyShowcase />
      </Suspense>

      <Suspense fallback={<ComponentLoader />}>
        <Services />
      </Suspense>

      <Suspense fallback={<ComponentLoader />}>
        <Testimonials />
      </Suspense>

      <Suspense fallback={<ComponentLoader />}>
        <UberUns />
      </Suspense>

      <Suspense fallback={<ComponentLoader />}>
        <Contact />
      </Suspense>

      <Suspense fallback={<ComponentLoader />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
