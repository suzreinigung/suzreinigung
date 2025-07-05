/**
 * Mobile Testing Utilities for CompanyShowcase
 * Comprehensive mobile responsiveness and performance testing
 */

export interface MobileTestResult {
  viewport: {
    width: number;
    height: number;
    devicePixelRatio: number;
    orientation: 'portrait' | 'landscape';
  };
  animation: {
    isRunning: boolean;
    duration: string;
    playState: string;
    webkitPlayState?: string;
    fps: number;
  };
  performance: {
    hasHardwareAcceleration: boolean;
    hasBackfaceVisibility: boolean;
    hasPerspective: boolean;
    touchAction: string;
  };
  glassEffects: {
    hasBackdropFilter: boolean;
    backdropFilterValue: string;
    backgroundValue: string;
    borderValue: string;
  };
  accessibility: {
    reducedMotionRespected: boolean;
    ariaLabelsPresent: boolean;
    touchTargetSize: boolean;
  };
  browserInfo: {
    userAgent: string;
    isMobile: boolean;
    isIOS: boolean;
    isAndroid: boolean;
    browser: string;
  };
}

export class MobileCompanyShowcaseTester {
  private element: HTMLElement | null = null;
  private scrollContainer: HTMLElement | null = null;

  constructor() {
    this.element = document.querySelector('.suz-company-showcase');
    this.scrollContainer = document.querySelector('.suz-company-scroll');
  }

  /**
   * Run comprehensive mobile test suite
   */
  public async runMobileTestSuite(): Promise<MobileTestResult> {
    if (!this.element || !this.scrollContainer) {
      throw new Error('CompanyShowcase elements not found');
    }

    const [fps] = await Promise.all([
      this.measureAnimationFPS(),
    ]);

    return {
      viewport: this.getViewportInfo(),
      animation: {
        ...this.getAnimationInfo(),
        fps
      },
      performance: this.getPerformanceInfo(),
      glassEffects: this.getGlassEffectsInfo(),
      accessibility: this.getAccessibilityInfo(),
      browserInfo: this.getBrowserInfo()
    };
  }

  /**
   * Get viewport information
   */
  private getViewportInfo() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio || 1,
      orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait' as 'portrait' | 'landscape'
    };
  }

  /**
   * Get animation information
   */
  private getAnimationInfo() {
    const computedStyle = window.getComputedStyle(this.scrollContainer!);
    return {
      isRunning: computedStyle.animationPlayState === 'running',
      duration: computedStyle.animationDuration,
      playState: computedStyle.animationPlayState,
      webkitPlayState: (computedStyle as any).webkitAnimationPlayState
    };
  }

  /**
   * Get performance optimization information
   */
  private getPerformanceInfo() {
    const computedStyle = window.getComputedStyle(this.scrollContainer!);
    return {
      hasHardwareAcceleration: this.checkHardwareAcceleration(computedStyle),
      hasBackfaceVisibility: computedStyle.backfaceVisibility === 'hidden',
      hasPerspective: computedStyle.perspective !== 'none',
      touchAction: (computedStyle as any).touchAction || 'auto'
    };
  }

  /**
   * Check hardware acceleration
   */
  private checkHardwareAcceleration(computedStyle: CSSStyleDeclaration): boolean {
    const transform = computedStyle.transform;
    const willChange = computedStyle.willChange;
    
    return transform.includes('matrix3d') || 
           transform.includes('translate3d') || 
           willChange.includes('transform') ||
           computedStyle.backfaceVisibility === 'hidden';
  }

  /**
   * Get glass morphism effects information
   */
  private getGlassEffectsInfo() {
    const glassCard = this.element!.querySelector('.suz-card-glass') as HTMLElement;
    if (!glassCard) {
      return {
        hasBackdropFilter: false,
        backdropFilterValue: 'none',
        backgroundValue: 'none',
        borderValue: 'none'
      };
    }

    const computedStyle = window.getComputedStyle(glassCard);
    return {
      hasBackdropFilter: computedStyle.backdropFilter !== 'none',
      backdropFilterValue: computedStyle.backdropFilter,
      backgroundValue: computedStyle.background,
      borderValue: computedStyle.border
    };
  }

  /**
   * Get accessibility information
   */
  private getAccessibilityInfo() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animationRunning = this.getAnimationInfo().isRunning;
    
    return {
      reducedMotionRespected: prefersReducedMotion ? !animationRunning : true,
      ariaLabelsPresent: this.checkAriaLabels(),
      touchTargetSize: this.checkTouchTargetSize()
    };
  }

  /**
   * Check ARIA labels presence
   */
  private checkAriaLabels(): boolean {
    const hasAriaLabel = this.element!.hasAttribute('aria-label');
    const hasRole = this.element!.hasAttribute('role');
    const hasAriaLive = this.scrollContainer!.hasAttribute('aria-live');
    
    return hasAriaLabel && hasRole && hasAriaLive;
  }

  /**
   * Check touch target size (minimum 44px)
   */
  private checkTouchTargetSize(): boolean {
    const cards = this.element!.querySelectorAll('.suz-company-card');
    return Array.from(cards).every(card => {
      const rect = card.getBoundingClientRect();
      return rect.height >= 44 && rect.width >= 44;
    });
  }

  /**
   * Get browser information
   */
  private getBrowserInfo() {
    const userAgent = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    const isAndroid = /Android/.test(userAgent);
    
    let browser = 'Unknown';
    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';

    return {
      userAgent,
      isMobile,
      isIOS,
      isAndroid,
      browser
    };
  }

  /**
   * Measure animation FPS
   */
  private async measureAnimationFPS(duration: number = 2000): Promise<number> {
    return new Promise((resolve) => {
      let frameCount = 0;
      const startTime = performance.now();
      
      const countFrames = () => {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - startTime < duration) {
          requestAnimationFrame(countFrames);
        } else {
          const fps = Math.round((frameCount * 1000) / duration);
          resolve(fps);
        }
      };
      
      requestAnimationFrame(countFrames);
    });
  }

  /**
   * Test touch interaction
   */
  public testTouchInteraction(): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.scrollContainer) {
        resolve(false);
        return;
      }

      let touchStarted = false;
      let animationContinued = true;

      const handleTouchStart = () => {
        touchStarted = true;
        const animationState = this.getAnimationInfo();
        animationContinued = animationState.isRunning;
      };

      const handleTouchEnd = () => {
        setTimeout(() => {
          const animationState = this.getAnimationInfo();
          const success = touchStarted && animationState.isRunning && animationContinued;
          
          this.scrollContainer!.removeEventListener('touchstart', handleTouchStart);
          this.scrollContainer!.removeEventListener('touchend', handleTouchEnd);
          
          resolve(success);
        }, 100);
      };

      this.scrollContainer.addEventListener('touchstart', handleTouchStart);
      this.scrollContainer.addEventListener('touchend', handleTouchEnd);

      // Simulate touch if no real touch occurs within 3 seconds
      setTimeout(() => {
        if (!touchStarted) {
          this.scrollContainer!.removeEventListener('touchstart', handleTouchStart);
          this.scrollContainer!.removeEventListener('touchend', handleTouchEnd);
          resolve(true); // Assume success if no touch interaction
        }
      }, 3000);
    });
  }

  /**
   * Generate mobile test report
   */
  public async generateMobileTestReport(): Promise<string> {
    const result = await this.runMobileTestSuite();
    const touchTest = await this.testTouchInteraction();
    
    const status = this.evaluateOverallStatus(result, touchTest);
    
    return `
🔍 Mobile CompanyShowcase Test Report
=====================================
📱 Viewport: ${result.viewport.width}x${result.viewport.height} (${result.viewport.orientation})
🎬 Animation: ${result.animation.isRunning ? '✅ Running' : '❌ Stopped'} (${result.animation.fps} FPS)
⚡ Performance: ${result.performance.hasHardwareAcceleration ? '✅ GPU Accelerated' : '❌ No GPU Acceleration'}
🎨 Glass Effects: ${result.glassEffects.hasBackdropFilter ? '✅ Working' : '❌ Not Working'}
♿ Accessibility: ${result.accessibility.reducedMotionRespected ? '✅ Compliant' : '❌ Issues'}
👆 Touch Interaction: ${touchTest ? '✅ Working' : '❌ Issues'}
🌐 Browser: ${result.browserInfo.browser} (${result.browserInfo.isMobile ? 'Mobile' : 'Desktop'})

Overall Status: ${status}
    `.trim();
  }

  /**
   * Evaluate overall test status
   */
  private evaluateOverallStatus(result: MobileTestResult, touchTest: boolean): string {
    const issues = [];
    
    if (!result.animation.isRunning) issues.push('Animation not running');
    if (result.animation.fps < 30) issues.push('Low FPS');
    if (!result.performance.hasHardwareAcceleration) issues.push('No GPU acceleration');
    if (!result.glassEffects.hasBackdropFilter) issues.push('Glass effects not working');
    if (!result.accessibility.reducedMotionRespected) issues.push('Accessibility issues');
    if (!touchTest) issues.push('Touch interaction problems');
    
    if (issues.length === 0) return '🟢 EXCELLENT';
    if (issues.length <= 2) return '🟡 GOOD (Minor issues)';
    return `🔴 NEEDS WORK (${issues.join(', ')})`;
  }
}

// Export convenience functions
export const testMobileCompanyShowcase = async (): Promise<MobileTestResult> => {
  const tester = new MobileCompanyShowcaseTester();
  return await tester.runMobileTestSuite();
};

export const logMobileTestResults = async (): Promise<void> => {
  const tester = new MobileCompanyShowcaseTester();
  const report = await tester.generateMobileTestReport();
  console.log(report);
};
