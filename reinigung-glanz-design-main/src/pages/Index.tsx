
import { useState, useEffect, lazy, Suspense } from 'react';
import Navigation from '../components/Navigation';

// Lazy load components for better code splitting
const Hero = lazy(() => import('../components/Hero'));
const CompanyShowcase = lazy(() => import('../components/CompanyShowcase'));
const Services = lazy(() => import('../components/Services'));
const Testimonials = lazy(() => import('../components/Testimonials'));
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

  // Debug: Log CSS classes being applied
  useEffect(() => {
    console.log('🎨 SUZ Design System Debug:');
    console.log('- Premium gradient class applied:', document.querySelector('.bg-premium-gradient') !== null);
    console.log('- Glass morphism class applied:', document.querySelector('.glass-morphism-premium') !== null);
    console.log('- Gradient text class applied:', document.querySelector('.gradient-text-animated') !== null);
    console.log('- Force Apple design class applied:', document.querySelector('.force-apple-design') !== null);

    // Check if CSS custom properties are loaded
    const rootStyles = getComputedStyle(document.documentElement);
    console.log('- SUZ Blue Primary:', rootStyles.getPropertyValue('--suz-blue-primary'));
    console.log('- Current theme class:', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }, []);

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
        <Contact />
      </Suspense>

      <Suspense fallback={<ComponentLoader />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
