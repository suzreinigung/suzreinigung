# Design System Specification - SUZ Reinigung Apple-Inspired Design

## Design Philosophy

### Core Principles
1. **Simplicity First**: Every element serves a purpose
2. **Clarity Over Cleverness**: Information hierarchy is paramount
3. **Subtle Sophistication**: Premium feel through restraint
4. **Human-Centered**: Accessibility and usability drive decisions
5. **Timeless Elegance**: Design that ages gracefully

### Apple Design DNA Integration
- **Minimalism**: Generous white space, clean lines
- **Typography**: Emphasis on readability and hierarchy
- **Color**: Purposeful, restrained palette
- **Motion**: Subtle, meaningful animations
- **Materials**: Glass, depth, and layering effects

## Color System

### Primary Palette
```css
/* Primary Brand Colors */
--suz-blue-primary: #007AFF;      /* Apple System Blue */
--suz-blue-secondary: #5AC8FA;    /* Light Blue */
--suz-blue-tertiary: #34C759;     /* Success Green */

/* Neutral Foundation */
--suz-gray-50: #F9FAFB;          /* Background Light */
--suz-gray-100: #F3F4F6;         /* Background */
--suz-gray-200: #E5E7EB;         /* Border Light */
--suz-gray-300: #D1D5DB;         /* Border */
--suz-gray-400: #9CA3AF;         /* Text Muted */
--suz-gray-500: #6B7280;         /* Text Secondary */
--suz-gray-600: #4B5563;         /* Text Primary */
--suz-gray-700: #374151;         /* Text Strong */
--suz-gray-800: #1F2937;         /* Text Emphasis */
--suz-gray-900: #111827;         /* Text Maximum */
```

### Semantic Colors
```css
/* Semantic Applications */
--suz-success: #34C759;          /* Success states */
--suz-warning: #FF9500;          /* Warning states */
--suz-error: #FF3B30;            /* Error states */
--suz-info: #007AFF;             /* Information */

/* Surface Colors */
--suz-surface-primary: #FFFFFF;   /* Primary surfaces */
--suz-surface-secondary: #F9FAFB; /* Secondary surfaces */
--suz-surface-tertiary: #F3F4F6;  /* Tertiary surfaces */
--suz-surface-glass: rgba(255, 255, 255, 0.8); /* Glass morphism */
```

### Color Usage Guidelines
- **Primary Blue**: CTAs, links, brand elements
- **Secondary Blue**: Hover states, secondary actions
- **Success Green**: Confirmations, positive feedback
- **Grays**: Text hierarchy, borders, backgrounds
- **Glass Effects**: Overlays, floating elements

## Typography System

### Font Stack
```css
/* Primary Font Family */
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 
             'Helvetica Neue', Helvetica, Arial, sans-serif;

/* Fallback for older systems */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 
             'Segoe UI', Roboto, sans-serif;
```

### Type Scale
```css
/* Display Typography */
--text-display-xl: 4.5rem;    /* 72px - Hero headlines */
--text-display-lg: 3.75rem;   /* 60px - Section headers */
--text-display-md: 3rem;      /* 48px - Page titles */
--text-display-sm: 2.25rem;   /* 36px - Card titles */

/* Heading Typography */
--text-heading-xl: 1.875rem;  /* 30px - H1 */
--text-heading-lg: 1.5rem;    /* 24px - H2 */
--text-heading-md: 1.25rem;   /* 20px - H3 */
--text-heading-sm: 1.125rem;  /* 18px - H4 */

/* Body Typography */
--text-body-xl: 1.125rem;     /* 18px - Large body */
--text-body-lg: 1rem;         /* 16px - Default body */
--text-body-md: 0.875rem;     /* 14px - Small body */
--text-body-sm: 0.75rem;      /* 12px - Caption */
```

### Font Weights
```css
--font-weight-light: 300;     /* Light text */
--font-weight-regular: 400;   /* Regular text */
--font-weight-medium: 500;    /* Medium emphasis */
--font-weight-semibold: 600;  /* Strong emphasis */
--font-weight-bold: 700;      /* Bold text */
```

### Line Heights
```css
--line-height-tight: 1.2;     /* Headlines */
--line-height-normal: 1.5;    /* Body text */
--line-height-relaxed: 1.75;  /* Reading text */
```

## Spacing System

### Spacing Scale (8px base unit)
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
```

### Layout Spacing
```css
/* Section Spacing */
--section-padding-sm: var(--space-16);  /* 64px */
--section-padding-md: var(--space-20);  /* 80px */
--section-padding-lg: var(--space-24);  /* 96px */
--section-padding-xl: var(--space-32);  /* 128px */

/* Component Spacing */
--component-padding-sm: var(--space-4); /* 16px */
--component-padding-md: var(--space-6); /* 24px */
--component-padding-lg: var(--space-8); /* 32px */
```

## Border Radius System

### Radius Scale
```css
--radius-none: 0;
--radius-sm: 0.25rem;    /* 4px - Small elements */
--radius-md: 0.5rem;     /* 8px - Default */
--radius-lg: 0.75rem;    /* 12px - Cards */
--radius-xl: 1rem;       /* 16px - Large cards */
--radius-2xl: 1.5rem;    /* 24px - Hero elements */
--radius-3xl: 2rem;      /* 32px - Special elements */
--radius-full: 9999px;   /* Circular */
```

## Shadow System

### Elevation Shadows
```css
/* Subtle Shadows */
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

/* Colored Shadows */
--shadow-blue: 0 10px 25px -5px rgba(0, 122, 255, 0.15);
--shadow-green: 0 10px 25px -5px rgba(52, 199, 89, 0.15);
```

## Component Library Specifications

### Button System
```css
/* Primary Button */
.btn-primary {
  background: var(--suz-blue-primary);
  color: white;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: var(--font-weight-medium);
  box-shadow: var(--shadow-md);
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: #0056CC;
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}

/* Secondary Button */
.btn-secondary {
  background: var(--suz-surface-primary);
  color: var(--suz-blue-primary);
  border: 1px solid var(--suz-gray-200);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: var(--font-weight-medium);
}
```

### Card System
```css
.card-primary {
  background: var(--suz-surface-primary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  padding: var(--space-6);
  border: 1px solid var(--suz-gray-100);
}

.card-glass {
  background: var(--suz-surface-glass);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-xl);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: var(--shadow-lg);
}
```

### Navigation System
```css
.nav-primary {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--suz-gray-100);
  padding: var(--space-4) 0;
}

.nav-link {
  color: var(--suz-gray-600);
  font-weight: var(--font-weight-medium);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: var(--suz-blue-primary);
  background: var(--suz-gray-50);
}
```

## Animation & Motion

### Timing Functions
```css
--ease-out-cubic: cubic-bezier(0.33, 1, 0.68, 1);
--ease-in-out-cubic: cubic-bezier(0.65, 0, 0.35, 1);
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

### Duration Scale
```css
--duration-fast: 150ms;      /* Quick interactions */
--duration-normal: 250ms;    /* Standard transitions */
--duration-slow: 350ms;      /* Complex animations */
--duration-slower: 500ms;    /* Page transitions */
```

### Animation Principles
1. **Subtle by Default**: Animations enhance, don't distract
2. **Purposeful Motion**: Every animation has a reason
3. **Consistent Timing**: Use standard duration scale
4. **Respect Preferences**: Honor `prefers-reduced-motion`

## Responsive Design System

### Breakpoint System
```css
--breakpoint-sm: 640px;   /* Small devices */
--breakpoint-md: 768px;   /* Medium devices */
--breakpoint-lg: 1024px;  /* Large devices */
--breakpoint-xl: 1280px;  /* Extra large devices */
--breakpoint-2xl: 1536px; /* 2X large devices */
```

### Container System
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

@media (min-width: 640px) {
  .container { padding: 0 var(--space-6); }
}

@media (min-width: 1024px) {
  .container { padding: 0 var(--space-8); }
}
```

## Accessibility Guidelines

### Color Contrast
- **AA Standard**: 4.5:1 for normal text
- **AAA Standard**: 7:1 for enhanced accessibility
- **Large Text**: 3:1 minimum ratio

### Focus States
```css
.focus-ring {
  outline: 2px solid var(--suz-blue-primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Implementation Guidelines

### CSS Custom Properties Usage
- Use CSS custom properties for all design tokens
- Implement dark mode support through property overrides
- Ensure fallback values for older browsers

### Component Naming Convention
- Use BEM methodology for CSS classes
- Prefix component classes with `suz-`
- Keep naming semantic and descriptive

### Performance Considerations
- Minimize CSS bundle size
- Use efficient selectors
- Implement critical CSS inlining
- Optimize for Core Web Vitals

This design system provides the foundation for creating a premium, Apple-inspired cleaning business website that maintains brand consistency while delivering exceptional user experience.
