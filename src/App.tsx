import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { ThemeProvider } from "@/hooks/use-theme";
import { initializeAnalytics, performanceMonitoring, trackPageView } from "@/lib/analytics";
import { updateMetaTags, injectStructuredData, generateFAQStructuredData } from "@/lib/seo";
import { initializeGTM, integrateWithExistingAnalytics } from "@/lib/gtm";
import { WebVitalsMonitor } from "@/lib/performance";

// Lazy load pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CookieConsent = lazy(() => import("./components/CookieConsent"));

// Lazy load service pages - Updated to match real services
const Hotelzimmerreinigung = lazy(() => import("./pages/services/Hotelzimmerreinigung"));
const Teppichreinigung = lazy(() => import("./pages/services/Teppichreinigung"));
const Bodenreinigung = lazy(() => import("./pages/services/Bodenreinigung"));
const Gemeinschaftsraeume = lazy(() => import("./pages/services/Gemeinschaftsraeume"));
const Bueroreinigung = lazy(() => import("./pages/services/Bueroreinigung"));
const Krankenhausreinigung = lazy(() => import("./pages/services/Krankenhausreinigung"));

// Lazy load blog pages
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

// Lazy load location pages
const LocationPage = lazy(() => import("./pages/LocationPage"));

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
    <div className="text-center space-y-4">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
      <p className="text-slate-600 font-medium">Lädt...</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

// SEO and Analytics Provider
const SEOAnalyticsProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  useEffect(() => {
    // Initialize Google Tag Manager first
    initializeGTM();

    // Initialize analytics on app load
    initializeAnalytics();

    // Start performance monitoring
    performanceMonitoring.monitorCoreWebVitals();
    performanceMonitoring.monitorAnimationPerformance();

    // Initialize Core Web Vitals monitoring
    const webVitalsMonitor = new WebVitalsMonitor((metric) => {
      // Send metrics to analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'web_vitals', {
          event_category: 'Performance',
          event_label: metric.name,
          value: Math.round(metric.value),
          custom_parameter_1: metric.rating,
        });
      }
    });

    // Initialize SEO
    updateMetaTags({});
    injectStructuredData(generateFAQStructuredData());

    // Integrate GTM with existing analytics
    integrateWithExistingAnalytics();

    // Cleanup function
    return () => {
      webVitalsMonitor.disconnect();
    };
  }, []);

  useEffect(() => {
    // Track page views on route changes
    trackPageView(location.pathname, document.title);

    // Update meta tags based on route
    if (location.pathname !== '/') {
      updateMetaTags({
        title: `${document.title} | SUZ Reinigung`,
        url: `https://www.suzreinigung.de${location.pathname}`,
      });
    }
  }, [location]);

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <SEOAnalyticsProvider>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                
                {/* Service Pages - Updated to match real services */}
                <Route path="/services/hotelzimmerreinigung" element={<Hotelzimmerreinigung />} />
                <Route path="/services/teppichreinigung" element={<Teppichreinigung />} />
                <Route path="/services/bodenreinigung" element={<Bodenreinigung />} />
                <Route path="/services/gemeinschaftsraeume" element={<Gemeinschaftsraeume />} />
                <Route path="/services/bueroreinigung" element={<Bueroreinigung />} />
                <Route path="/services/krankenhausreinigung" element={<Krankenhausreinigung />} />
                
                {/* Blog Routes */}
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                
                {/* Local SEO Routes */}
                <Route path="/standorte/:location" element={<LocationPage />} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Suspense fallback={null}>
              <CookieConsent />
            </Suspense>
          </SEOAnalyticsProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
