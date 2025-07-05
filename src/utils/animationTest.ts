/**
 * Animation Test Utility for CompanyShowcase
 * Tests responsive animation functionality across different viewport sizes
 */

export interface AnimationTestResult {
  isAnimationRunning: boolean;
  animationDuration: string;
  transformValue: string;
  viewport: 'mobile' | 'tablet' | 'desktop';
  hasHardwareAcceleration: boolean;
  reducedMotionRespected: boolean;
}

export class CompanyShowcaseAnimationTester {
  private element: HTMLElement | null = null;

  constructor(elementSelector: string = '.suz-company-scroll') {
    this.element = document.querySelector(elementSelector);
  }

  /**
   * Test animation functionality across different viewport sizes
   */
  public testResponsiveAnimation(): AnimationTestResult {
    if (!this.element) {
      throw new Error('CompanyShowcase element not found');
    }

    const viewport = this.detectViewport();
    const computedStyle = window.getComputedStyle(this.element);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return {
      isAnimationRunning: this.isAnimationRunning(),
      animationDuration: computedStyle.animationDuration,
      transformValue: computedStyle.transform,
      viewport,
      hasHardwareAcceleration: this.hasHardwareAcceleration(),
      reducedMotionRespected: prefersReducedMotion ? !this.isAnimationRunning() : true
    };
  }

  /**
   * Check if animation is currently running
   */
  private isAnimationRunning(): boolean {
    if (!this.element) return false;
    
    const computedStyle = window.getComputedStyle(this.element);
    const animationPlayState = computedStyle.animationPlayState;
    const animationName = computedStyle.animationName;
    
    return animationPlayState === 'running' && animationName !== 'none';
  }

  /**
   * Detect current viewport size category
   */
  private detectViewport(): 'mobile' | 'tablet' | 'desktop' {
    const width = window.innerWidth;
    
    if (width <= 768) return 'mobile';
    if (width <= 1024) return 'tablet';
    return 'desktop';
  }

  /**
   * Check if hardware acceleration is enabled
   */
  private hasHardwareAcceleration(): boolean {
    if (!this.element) return false;
    
    const computedStyle = window.getComputedStyle(this.element);
    const transform = computedStyle.transform;
    const willChange = computedStyle.willChange;
    
    // Check for 3D transforms or will-change: transform
    return transform.includes('matrix3d') || 
           transform.includes('translate3d') || 
           willChange.includes('transform');
  }

  /**
   * Test animation performance by measuring frame rate
   */
  public async testAnimationPerformance(duration: number = 2000): Promise<number> {
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
   * Simulate viewport resize and test animation consistency
   */
  public testViewportResize(): Promise<boolean> {
    return new Promise((resolve) => {
      const originalWidth = window.innerWidth;
      
      // Simulate mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375
      });
      
      window.dispatchEvent(new Event('resize'));
      
      setTimeout(() => {
        const mobileResult = this.testResponsiveAnimation();
        
        // Restore original viewport
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: originalWidth
        });
        
        window.dispatchEvent(new Event('resize'));
        
        setTimeout(() => {
          const desktopResult = this.testResponsiveAnimation();
          
          // Animation should work on both mobile and desktop
          resolve(mobileResult.isAnimationRunning && desktopResult.isAnimationRunning);
        }, 100);
      }, 100);
    });
  }

  /**
   * Generate comprehensive test report
   */
  public generateTestReport(): string {
    const result = this.testResponsiveAnimation();
    
    return `
CompanyShowcase Animation Test Report
=====================================
Viewport: ${result.viewport}
Animation Running: ${result.isAnimationRunning ? '✅' : '❌'}
Animation Duration: ${result.animationDuration}
Hardware Acceleration: ${result.hasHardwareAcceleration ? '✅' : '❌'}
Reduced Motion Respected: ${result.reducedMotionRespected ? '✅' : '❌'}
Transform Value: ${result.transformValue}

Status: ${result.isAnimationRunning && result.hasHardwareAcceleration ? 'PASS' : 'FAIL'}
    `.trim();
  }
}

// Export convenience function for quick testing
export const testCompanyShowcaseAnimation = (): AnimationTestResult => {
  const tester = new CompanyShowcaseAnimationTester();
  return tester.testResponsiveAnimation();
};

// Export function to log test results to console
export const logAnimationTestResults = (): void => {
  const tester = new CompanyShowcaseAnimationTester();
  const result = tester.testResponsiveAnimation();

  console.log('🎬 CompanyShowcase Animation Test Results:', {
    ...result,
    timestamp: new Date().toISOString()
  });

  // Mobile-specific debugging
  if (result.viewport === 'mobile') {
    const element = document.querySelector('.suz-company-scroll') as HTMLElement;
    if (element) {
      const computedStyle = window.getComputedStyle(element);
      console.log('📱 Mobile Animation Debug:', {
        animationName: computedStyle.animationName,
        animationDuration: computedStyle.animationDuration,
        animationPlayState: computedStyle.animationPlayState,
        webkitAnimationPlayState: (computedStyle as any).webkitAnimationPlayState,
        transform: computedStyle.transform,
        webkitTransform: (computedStyle as any).webkitTransform,
        willChange: computedStyle.willChange,
        touchAction: (computedStyle as any).touchAction
      });
    }
  }

  // Log warnings for potential issues
  if (!result.isAnimationRunning) {
    console.warn('⚠️ Animation is not running! Check CSS and JavaScript implementation.');
  }

  if (!result.hasHardwareAcceleration) {
    console.warn('⚠️ Hardware acceleration not detected. Performance may be suboptimal.');
  }

  if (!result.reducedMotionRespected) {
    console.warn('⚠️ Reduced motion preference not respected. Check accessibility implementation.');
  }

  console.log(tester.generateTestReport());
};
