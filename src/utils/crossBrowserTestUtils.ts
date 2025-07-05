/**
 * Cross-Browser Mobile Testing Utilities
 * Comprehensive testing for Chrome Mobile, Firefox Mobile, and Safari Mobile
 */

export interface BrowserCapabilities {
  name: string;
  version: string;
  engine: string;
  supportsBackdropFilter: boolean;
  supportsTransform3d: boolean;
  supportsWillChange: boolean;
  supportsTouchAction: boolean;
  supportsContain: boolean;
  isMobile: boolean;
  isIOS: boolean;
  isAndroid: boolean;
}

export interface CrossBrowserTestResult {
  browser: BrowserCapabilities;
  animation: {
    isWorking: boolean;
    fps: number;
    smoothness: 'excellent' | 'good' | 'poor';
  };
  glassEffects: {
    backdropFilterSupported: boolean;
    fallbackActive: boolean;
    visualQuality: 'excellent' | 'good' | 'poor';
  };
  performance: {
    hardwareAcceleration: boolean;
    memoryUsage: 'low' | 'medium' | 'high';
    cpuUsage: 'low' | 'medium' | 'high';
  };
  compatibility: {
    cssFeatures: string[];
    jsFeatures: string[];
    issues: string[];
    recommendations: string[];
  };
}

export class CrossBrowserMobileTester {
  private element: HTMLElement | null = null;
  private scrollContainer: HTMLElement | null = null;

  constructor() {
    this.element = document.querySelector('.suz-company-showcase');
    this.scrollContainer = document.querySelector('.suz-company-scroll');
  }

  /**
   * Detect browser capabilities
   */
  public detectBrowserCapabilities(): BrowserCapabilities {
    const userAgent = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    const isAndroid = /Android/.test(userAgent);
    const isMobile = isIOS || isAndroid || /Mobile/.test(userAgent);

    let name = 'Unknown';
    let version = 'Unknown';
    let engine = 'Unknown';

    // Detect browser
    if (userAgent.includes('Chrome') && !userAgent.includes('Edge')) {
      name = 'Chrome';
      const match = userAgent.match(/Chrome\/(\d+)/);
      version = match ? match[1] : 'Unknown';
      engine = 'Blink';
    } else if (userAgent.includes('Firefox')) {
      name = 'Firefox';
      const match = userAgent.match(/Firefox\/(\d+)/);
      version = match ? match[1] : 'Unknown';
      engine = 'Gecko';
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
      name = 'Safari';
      const match = userAgent.match(/Version\/(\d+)/);
      version = match ? match[1] : 'Unknown';
      engine = 'WebKit';
    } else if (userAgent.includes('Edge')) {
      name = 'Edge';
      const match = userAgent.match(/Edge\/(\d+)/);
      version = match ? match[1] : 'Unknown';
      engine = 'EdgeHTML';
    }

    return {
      name,
      version,
      engine,
      supportsBackdropFilter: this.testBackdropFilterSupport(),
      supportsTransform3d: this.testTransform3dSupport(),
      supportsWillChange: this.testWillChangeSupport(),
      supportsTouchAction: this.testTouchActionSupport(),
      supportsContain: this.testContainSupport(),
      isMobile,
      isIOS,
      isAndroid
    };
  }

  /**
   * Test backdrop-filter support
   */
  private testBackdropFilterSupport(): boolean {
    const testElement = document.createElement('div');
    testElement.style.backdropFilter = 'blur(10px)';
    testElement.style.webkitBackdropFilter = 'blur(10px)';
    
    return testElement.style.backdropFilter !== '' || 
           testElement.style.webkitBackdropFilter !== '';
  }

  /**
   * Test 3D transform support
   */
  private testTransform3dSupport(): boolean {
    const testElement = document.createElement('div');
    testElement.style.transform = 'translate3d(0, 0, 0)';
    testElement.style.webkitTransform = 'translate3d(0, 0, 0)';
    
    return testElement.style.transform !== '' || 
           testElement.style.webkitTransform !== '';
  }

  /**
   * Test will-change support
   */
  private testWillChangeSupport(): boolean {
    const testElement = document.createElement('div');
    testElement.style.willChange = 'transform';
    return testElement.style.willChange !== '';
  }

  /**
   * Test touch-action support
   */
  private testTouchActionSupport(): boolean {
    const testElement = document.createElement('div');
    (testElement.style as any).touchAction = 'pan-y';
    return (testElement.style as any).touchAction !== '';
  }

  /**
   * Test contain support
   */
  private testContainSupport(): boolean {
    const testElement = document.createElement('div');
    (testElement.style as any).contain = 'layout';
    return (testElement.style as any).contain !== '';
  }

  /**
   * Test animation performance
   */
  public async testAnimationPerformance(): Promise<{ fps: number; smoothness: 'excellent' | 'good' | 'poor' }> {
    return new Promise((resolve) => {
      let frameCount = 0;
      let lastTime = performance.now();
      const duration = 2000; // 2 seconds
      const startTime = lastTime;

      const measureFrame = (currentTime: number) => {
        frameCount++;
        
        if (currentTime - startTime < duration) {
          requestAnimationFrame(measureFrame);
        } else {
          const fps = Math.round((frameCount * 1000) / duration);
          let smoothness: 'excellent' | 'good' | 'poor';
          
          if (fps >= 55) smoothness = 'excellent';
          else if (fps >= 30) smoothness = 'good';
          else smoothness = 'poor';
          
          resolve({ fps, smoothness });
        }
      };

      requestAnimationFrame(measureFrame);
    });
  }

  /**
   * Test glass morphism effects
   */
  public testGlassEffects(): { backdropFilterSupported: boolean; fallbackActive: boolean; visualQuality: 'excellent' | 'good' | 'poor' } {
    const glassCard = this.element?.querySelector('.suz-card-glass') as HTMLElement;
    if (!glassCard) {
      return { backdropFilterSupported: false, fallbackActive: true, visualQuality: 'poor' };
    }

    const computedStyle = window.getComputedStyle(glassCard);
    const backdropFilterSupported = computedStyle.backdropFilter !== 'none' || 
                                   (computedStyle as any).webkitBackdropFilter !== 'none';
    
    const fallbackActive = computedStyle.backgroundImage !== 'none';
    
    let visualQuality: 'excellent' | 'good' | 'poor';
    if (backdropFilterSupported && !fallbackActive) visualQuality = 'excellent';
    else if (backdropFilterSupported || fallbackActive) visualQuality = 'good';
    else visualQuality = 'poor';

    return { backdropFilterSupported, fallbackActive, visualQuality };
  }

  /**
   * Run comprehensive cross-browser test
   */
  public async runCrossBrowserTest(): Promise<CrossBrowserTestResult> {
    const browser = this.detectBrowserCapabilities();
    const animationTest = await this.testAnimationPerformance();
    const glassTest = this.testGlassEffects();

    const issues: string[] = [];
    const recommendations: string[] = [];

    // Analyze issues and recommendations
    if (!browser.supportsBackdropFilter) {
      issues.push('Backdrop-filter not supported');
      recommendations.push('Use gradient fallback for glass effects');
    }

    if (!browser.supportsTransform3d) {
      issues.push('3D transforms not supported');
      recommendations.push('Use 2D transforms as fallback');
    }

    if (animationTest.fps < 30) {
      issues.push('Poor animation performance');
      recommendations.push('Reduce animation complexity or disable on this browser');
    }

    if (browser.isIOS && parseInt(browser.version) < 14) {
      issues.push('Older iOS version detected');
      recommendations.push('Consider additional webkit prefixes');
    }

    return {
      browser,
      animation: {
        isWorking: animationTest.fps > 15,
        fps: animationTest.fps,
        smoothness: animationTest.smoothness
      },
      glassEffects: glassTest,
      performance: {
        hardwareAcceleration: browser.supportsTransform3d && browser.supportsWillChange,
        memoryUsage: this.estimateMemoryUsage(),
        cpuUsage: this.estimateCPUUsage(animationTest.fps)
      },
      compatibility: {
        cssFeatures: this.getSupportedCSSFeatures(browser),
        jsFeatures: this.getSupportedJSFeatures(),
        issues,
        recommendations
      }
    };
  }

  /**
   * Estimate memory usage
   */
  private estimateMemoryUsage(): 'low' | 'medium' | 'high' {
    // Simple heuristic based on browser and device
    const browser = this.detectBrowserCapabilities();
    
    if (browser.isIOS && parseInt(browser.version) < 14) return 'high';
    if (browser.isAndroid && parseInt(browser.version) < 90) return 'medium';
    return 'low';
  }

  /**
   * Estimate CPU usage based on FPS
   */
  private estimateCPUUsage(fps: number): 'low' | 'medium' | 'high' {
    if (fps >= 55) return 'low';
    if (fps >= 30) return 'medium';
    return 'high';
  }

  /**
   * Get supported CSS features
   */
  private getSupportedCSSFeatures(browser: BrowserCapabilities): string[] {
    const features: string[] = [];
    
    if (browser.supportsBackdropFilter) features.push('backdrop-filter');
    if (browser.supportsTransform3d) features.push('transform3d');
    if (browser.supportsWillChange) features.push('will-change');
    if (browser.supportsTouchAction) features.push('touch-action');
    if (browser.supportsContain) features.push('contain');
    
    return features;
  }

  /**
   * Get supported JavaScript features
   */
  private getSupportedJSFeatures(): string[] {
    const features: string[] = [];
    
    if ('IntersectionObserver' in window) features.push('IntersectionObserver');
    if ('requestAnimationFrame' in window) features.push('requestAnimationFrame');
    if ('matchMedia' in window) features.push('matchMedia');
    if ('performance' in window) features.push('Performance API');
    
    return features;
  }

  /**
   * Generate cross-browser test report
   */
  public async generateCrossBrowserReport(): Promise<string> {
    const result = await this.runCrossBrowserTest();
    
    return `
🌐 Cross-Browser Mobile Compatibility Report
==========================================
📱 Browser: ${result.browser.name} ${result.browser.version} (${result.browser.engine})
📱 Platform: ${result.browser.isIOS ? 'iOS' : result.browser.isAndroid ? 'Android' : 'Desktop'}

🎬 Animation Performance:
   Status: ${result.animation.isWorking ? '✅ Working' : '❌ Issues'}
   FPS: ${result.animation.fps}
   Smoothness: ${result.animation.smoothness}

🎨 Glass Effects:
   Backdrop Filter: ${result.glassEffects.backdropFilterSupported ? '✅ Supported' : '❌ Not Supported'}
   Fallback Active: ${result.glassEffects.fallbackActive ? '✅ Yes' : '❌ No'}
   Visual Quality: ${result.glassEffects.visualQuality}

⚡ Performance:
   Hardware Acceleration: ${result.performance.hardwareAcceleration ? '✅ Active' : '❌ Inactive'}
   Memory Usage: ${result.performance.memoryUsage}
   CPU Usage: ${result.performance.cpuUsage}

🔧 Supported Features:
   CSS: ${result.compatibility.cssFeatures.join(', ') || 'None detected'}
   JS: ${result.compatibility.jsFeatures.join(', ') || 'None detected'}

⚠️ Issues Found: ${result.compatibility.issues.length}
${result.compatibility.issues.map(issue => `   • ${issue}`).join('\n')}

💡 Recommendations: ${result.compatibility.recommendations.length}
${result.compatibility.recommendations.map(rec => `   • ${rec}`).join('\n')}

Overall Status: ${this.getOverallStatus(result)}
    `.trim();
  }

  /**
   * Get overall compatibility status
   */
  private getOverallStatus(result: CrossBrowserTestResult): string {
    const issues = result.compatibility.issues.length;
    const animationWorking = result.animation.isWorking;
    const glassQuality = result.glassEffects.visualQuality;
    
    if (issues === 0 && animationWorking && glassQuality === 'excellent') {
      return '🟢 EXCELLENT COMPATIBILITY';
    } else if (issues <= 2 && animationWorking && glassQuality !== 'poor') {
      return '🟡 GOOD COMPATIBILITY';
    } else {
      return '🔴 COMPATIBILITY ISSUES DETECTED';
    }
  }
}

// Export convenience functions
export const testCrossBrowserCompatibility = async (): Promise<CrossBrowserTestResult> => {
  const tester = new CrossBrowserMobileTester();
  return await tester.runCrossBrowserTest();
};

export const logCrossBrowserReport = async (): Promise<void> => {
  const tester = new CrossBrowserMobileTester();
  const report = await tester.generateCrossBrowserReport();
  console.log(report);
};
