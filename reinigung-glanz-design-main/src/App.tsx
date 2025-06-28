import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { ThemeProvider } from "@/hooks/use-theme";
import { initializeAnalytics, performanceMonitoring, trackPageView } from "@/lib/analytics";
import { updateMetaTags, injectStructuredData, generateFAQStructuredData } from "@/lib/seo";
import { WebVitalsMonitor } from "@/lib/performance";

// Lazy load pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CookieConsent = lazy(() => import("./components/CookieConsent"));

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
