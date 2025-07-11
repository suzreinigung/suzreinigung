import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: (error: Event) => void;
}

/**
 * Optimized Image Component for SUZ Reinigung
 * Features:
 * - WebP format support with fallbacks
 * - Lazy loading with intersection observer
 * - Performance optimizations for 60fps
 * - Loading shimmer effect
 * - Error handling with fallbacks
 * - SUZ design system integration
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  title,
  className = '',
  loading = 'lazy',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const imgRef = useRef<HTMLImageElement>(null);
  const [isInView, setIsInView] = useState(priority);

  // WebP support detection
  const supportsWebP = (): boolean => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  };

  // Get optimized image source
  const getOptimizedSrc = (originalSrc: string): string => {
    if (supportsWebP() && !originalSrc.includes('.webp')) {
      // Try WebP version first
      return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    return originalSrc;
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || loading === 'eager') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, loading]);

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true);
    setIsError(false);
    onLoad?.();
  };

  // Handle image error with fallback
  const handleError = (error: Event) => {
    if (currentSrc.includes('.webp')) {
      // Fallback to original format
      setCurrentSrc(src);
      setIsError(false);
    } else {
      setIsError(true);
      onError?.(error);
    }
  };

  // Preload critical images
  useEffect(() => {
    if (priority) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = getOptimizedSrc(src);
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [src, priority]);

  // Set optimized source when in view
  useEffect(() => {
    if (isInView && !isError) {
      setCurrentSrc(getOptimizedSrc(src));
    }
  }, [isInView, src, isError]);

  const imageClasses = `
    ${className}
    ${isLoaded ? 'loaded' : 'lazy-load'}
    ${isError ? 'error' : ''}
    image-optimized
    performance-optimized
    transition-all duration-300 ease-in-out
  `.trim();

  return (
    <div className="relative overflow-hidden">
      {/* Loading shimmer background */}
      {!isLoaded && !isError && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800/20 via-slate-600/30 to-slate-800/20 animate-pulse rounded-xl" />
      )}
      
      {/* Optimized Image */}
      <img
        ref={imgRef}
        src={isInView ? currentSrc : undefined}
        alt={alt}
        title={title}
        className={imageClasses}
        loading={loading}
        decoding="async"
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          objectFit: 'contain', // User preference for showing complete images
          objectPosition: 'center',
          transform: 'translateZ(0)', // Hardware acceleration
          willChange: 'transform, opacity',
          contain: 'layout style paint'
        }}
      />

      {/* Error fallback */}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800/50 rounded-xl">
          <div className="text-center text-slate-400">
            <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <p className="text-sm">Bild konnte nicht geladen werden</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
