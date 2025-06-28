/**
 * Mobile Responsiveness Testing Utilities for SUZ Reinigung
 * Comprehensive testing across different devices and screen sizes
 */

// Mobile device configurations for testing
export const mobileDevices = {
  // iPhone devices
  iPhoneSE: { width: 375, height: 667, userAgent: 'iPhone SE' },
  iPhone12: { width: 390, height: 844, userAgent: 'iPhone 12' },
  iPhone14Pro: { width: 393, height: 852, userAgent: 'iPhone 14 Pro' },
  
  // Android devices
  galaxyS21: { width: 384, height: 854, userAgent: 'Galaxy S21' },
  pixelXL: { width: 411, height: 731, userAgent: 'Pixel XL' },
  
  // Tablets
  iPadMini: { width: 768, height: 1024, userAgent: 'iPad Mini' },
  iPadPro: { width: 1024, height: 1366, userAgent: 'iPad Pro' },
  
  // Common breakpoints
  mobile: { width: 320, height: 568, userAgent: 'Mobile' },
  mobileLarge: { width: 414, height: 896, userAgent: 'Mobile Large' },
  tablet: { width: 768, height: 1024, userAgent: 'Tablet' },
  desktop: { width: 1024, height: 768, userAgent: 'Desktop' },
};

// Touch interaction testing
export const touchUtils = {
  // Simulate touch events
  simulateTouch: (element: HTMLElement, type: 'start' | 'move' | 'end', coordinates: { x: number; y: number }) => {
    const touch = new Touch({
      identifier: 1,
      target: element,
      clientX: coordinates.x,
      clientY: coordinates.y,
      radiusX: 2.5,
      radiusY: 2.5,
      rotationAngle: 10,
      force: 0.5,
    });

    const touchEvent = new TouchEvent(`touch${type}`, {
      cancelable: true,
      bubbles: true,
      touches: type === 'end' ? [] : [touch],
      targetTouches: type === 'end' ? [] : [touch],
      changedTouches: [touch],
    });

    element.dispatchEvent(touchEvent);
  },

  // Test touch target sizes (minimum 44px x 44px)
  validateTouchTargets: (): { passed: boolean; issues: string[] } => {
    const issues: string[] = [];
    const interactiveElements = document.querySelectorAll(
      'button, a, input, select, textarea, [role="button"], [tabindex]:not([tabindex="-1"])'
    );

    interactiveElements.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      const minSize = 44;

      if (rect.width < minSize || rect.height < minSize) {
        issues.push(
          `Element ${index + 1} (${element.tagName.toLowerCase()}) is too small: ${Math.round(rect.width)}x${Math.round(rect.height)}px (minimum: ${minSize}x${minSize}px)`
        );
      }
    });

    return {
      passed: issues.length === 0,
      issues,
    };
  },

  // Test touch gesture support
  testGestureSupport: (element: HTMLElement): boolean => {
    const events = ['touchstart', 'touchmove', 'touchend'];
    let supported = true;

    events.forEach(eventType => {
      try {
        const event = new TouchEvent(eventType);
        element.dispatchEvent(event);
      } catch (error) {
        supported = false;
      }
    });

    return supported;
  },
};

// Viewport and orientation testing
export const viewportUtils = {
  // Get current viewport information
  getViewportInfo: () => {
    if (typeof window === 'undefined') return null;

    return {
      width: window.innerWidth,
      height: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio || 1,
      orientation: window.screen?.orientation?.type || 'unknown',
      isPortrait: window.innerHeight > window.innerWidth,
      isLandscape: window.innerWidth > window.innerHeight,
    };
  },

  // Test responsive breakpoints
  testBreakpoints: (): { current: string; breakpoints: Record<string, boolean> } => {
    if (typeof window === 'undefined') return { current: 'unknown', breakpoints: {} };

    const width = window.innerWidth;
    const breakpoints = {
      'mobile (≤480px)': width <= 480,
      'mobile-large (≤640px)': width <= 640,
      'tablet (≤768px)': width <= 768,
      'desktop (≤1024px)': width <= 1024,
      'desktop-large (≤1280px)': width <= 1280,
      'desktop-xl (>1280px)': width > 1280,
    };

    const current = Object.entries(breakpoints)
      .find(([_, matches]) => matches)?.[0] || 'unknown';

    return { current, breakpoints };
  },

  // Simulate different screen sizes
  simulateScreenSize: (device: keyof typeof mobileDevices) => {
    if (typeof window === 'undefined') return;

    const config = mobileDevices[device];
    
    // This is for testing purposes - in real scenarios, use browser dev tools
    console.log(`Simulating ${device}: ${config.width}x${config.height}`);
    
    // Dispatch resize event for components that listen to it
    window.dispatchEvent(new Event('resize'));
  },
};

// Performance testing for mobile
export const mobilePerformanceUtils = {
  // Test animation performance on mobile
  testAnimationPerformance: (): Promise<{ fps: number; dropped: number }> => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve({ fps: 0, dropped: 0 });
        return;
      }

      let frameCount = 0;
      let droppedFrames = 0;
      let lastTime = performance.now();
      const duration = 2000; // Test for 2 seconds
      const expectedFrames = 120; // 60fps for 2 seconds

      const testFrame = (currentTime: number) => {
        const deltaTime = currentTime - lastTime;
        
        if (deltaTime > 16.67 * 1.5) { // Frame took longer than expected (60fps = 16.67ms)
          droppedFrames++;
        }
        
        frameCount++;
        lastTime = currentTime;

        if (currentTime - performance.now() < duration) {
          requestAnimationFrame(testFrame);
        } else {
          const actualFPS = (frameCount / duration) * 1000;
          resolve({
            fps: Math.round(actualFPS),
            dropped: droppedFrames,
          });
        }
      };

      requestAnimationFrame(testFrame);
    });
  },

  // Test memory usage on mobile
  testMemoryUsage: () => {
    if (typeof window === 'undefined' || !('performance' in window)) return null;

    const memory = (performance as any).memory;
    if (!memory) return null;

    const usedMB = Math.round(memory.usedJSHeapSize / 1024 / 1024);
    const totalMB = Math.round(memory.totalJSHeapSize / 1024 / 1024);
    const limitMB = Math.round(memory.jsHeapSizeLimit / 1024 / 1024);

    return {
      used: usedMB,
      total: totalMB,
      limit: limitMB,
      percentage: Math.round((usedMB / limitMB) * 100),
      isHigh: usedMB > 50, // Flag if using more than 50MB
    };
  },

  // Test network conditions simulation
  testNetworkConditions: () => {
    if (typeof navigator === 'undefined') return null;

    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    
    if (!connection) return null;

    return {
      effectiveType: connection.effectiveType, // '4g', '3g', '2g', 'slow-2g'
      downlink: connection.downlink, // Mbps
      rtt: connection.rtt, // Round trip time in ms
      saveData: connection.saveData, // Data saver mode
    };
  },
};

// Accessibility testing for mobile
export const mobileA11yUtils = {
  // Test screen reader compatibility
  testScreenReaderSupport: (): { passed: boolean; issues: string[] } => {
    const issues: string[] = [];
    
    // Check for proper ARIA labels
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
    interactiveElements.forEach((element, index) => {
      const hasLabel = element.getAttribute('aria-label') || 
                      element.getAttribute('aria-labelledby') ||
                      element.textContent?.trim() ||
                      (element as HTMLInputElement).placeholder;
      
      if (!hasLabel) {
        issues.push(`Interactive element ${index + 1} lacks accessible label`);
      }
    });

    // Check for proper heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let lastLevel = 0;
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      if (index === 0 && level !== 1) {
        issues.push('Page should start with h1 heading');
      } else if (level > lastLevel + 1) {
        issues.push(`Heading level jumps from h${lastLevel} to h${level}`);
      }
      lastLevel = level;
    });

    return {
      passed: issues.length === 0,
      issues,
    };
  },

  // Test color contrast for mobile
  testColorContrast: (): { passed: boolean; issues: string[] } => {
    // This is a simplified test - in production, use a proper color contrast library
    const issues: string[] = [];
    
    // Check for common low-contrast combinations
    const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, a, button');
    
    textElements.forEach((element, index) => {
      const styles = window.getComputedStyle(element);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;
      
      // Simple check for very light text on light backgrounds
      if (color.includes('rgb(255') && backgroundColor.includes('rgb(255')) {
        issues.push(`Element ${index + 1} may have insufficient color contrast`);
      }
    });

    return {
      passed: issues.length === 0,
      issues,
    };
  },
};

// Comprehensive mobile testing suite
export const runMobileTestSuite = async (): Promise<{
  viewport: any;
  touchTargets: any;
  performance: any;
  accessibility: any;
  network: any;
  overall: { passed: boolean; score: number };
}> => {
  console.log('🧪 Running SUZ Mobile Test Suite...');

  const results = {
    viewport: viewportUtils.getViewportInfo(),
    touchTargets: touchUtils.validateTouchTargets(),
    performance: {
      animation: await mobilePerformanceUtils.testAnimationPerformance(),
      memory: mobilePerformanceUtils.testMemoryUsage(),
    },
    accessibility: {
      screenReader: mobileA11yUtils.testScreenReaderSupport(),
      colorContrast: mobileA11yUtils.testColorContrast(),
    },
    network: mobilePerformanceUtils.testNetworkConditions(),
    overall: { passed: false, score: 0 },
  };

  // Calculate overall score
  let totalTests = 0;
  let passedTests = 0;

  if (results.touchTargets.passed) passedTests++;
  totalTests++;

  if (results.performance.animation.fps >= 50) passedTests++; // Allow some tolerance
  totalTests++;

  if (results.accessibility.screenReader.passed) passedTests++;
  totalTests++;

  if (results.accessibility.colorContrast.passed) passedTests++;
  totalTests++;

  const score = Math.round((passedTests / totalTests) * 100);
  results.overall = {
    passed: score >= 80, // 80% pass rate
    score,
  };

  console.log(`📱 Mobile Test Results: ${score}% (${passedTests}/${totalTests} tests passed)`);
  
  return results;
};

// Export utilities
export default {
  mobileDevices,
  touchUtils,
  viewportUtils,
  mobilePerformanceUtils,
  mobileA11yUtils,
  runMobileTestSuite,
};
