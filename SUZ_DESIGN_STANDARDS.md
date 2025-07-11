# SUZ Reinigung Design Standards Reference

## 🎨 Premium Design Language Overview

SUZ Reinigung follows an **Apple-inspired premium design language** with dark theme aesthetics, glass morphism effects, and sophisticated visual hierarchy. This document serves as the definitive reference for maintaining design consistency across all components and pages.

---

## 🌈 Color System

### Primary Brand Colors (Dark Theme Default)
```css
--suz-blue-primary: #0A84FF;      /* Primary CTA buttons, links */
--suz-blue-secondary: #64D2FF;    /* Secondary accents */
--suz-blue-tertiary: #30D158;     /* Success states, checkmarks */
```

### Dark Neutral Foundation
```css
--suz-gray-50: #1C1C1E;          /* Darkest backgrounds */
--suz-gray-100: #2C2C2E;         /* Card backgrounds */
--suz-gray-200: #3A3A3C;         /* Elevated surfaces */
--suz-gray-300: #48484A;         /* Borders, dividers */
--suz-gray-400: #636366;         /* Disabled text */
--suz-gray-500: #8E8E93;         /* Secondary text */
--suz-gray-600: #AEAEB2;         /* Body text */
--suz-gray-700: #C7C7CC;         /* Emphasized text */
--suz-gray-800: #D1D1D6;         /* High contrast text */
--suz-gray-900: #F2F2F7;         /* Primary text (white) */
```

### Semantic Colors
```css
--suz-success: #30D158;           /* Success messages, completed states */
--suz-warning: #FF9F0A;           /* Warning messages */
--suz-error: #FF453A;             /* Error messages */
--suz-info: #0A84FF;              /* Information messages */
```

### Surface Colors
```css
--suz-surface-primary: #000000;   /* Main background */
--suz-surface-secondary: #1C1C1E; /* Card backgrounds */
--suz-surface-tertiary: #2C2C2E;  /* Elevated elements */
--suz-surface-glass: rgba(28, 28, 30, 0.8); /* Glass morphism */
```

---

## 📝 Typography Scale

### Display Sizes (Hero Headlines)
```css
--text-display-xl: 4.5rem;    /* 72px - Main hero headlines */
--text-display-lg: 3.75rem;   /* 60px - Section headers */
--text-display-md: 3rem;      /* 48px - Page titles */
--text-display-sm: 2.25rem;   /* 36px - Card titles */
```

### Heading Sizes
```css
--text-heading-xl: 1.875rem;  /* 30px - H1 */
--text-heading-lg: 1.5rem;    /* 24px - H2 */
--text-heading-md: 1.25rem;   /* 20px - H3 */
--text-heading-sm: 1.125rem;  /* 18px - H4 */
```

### Body Text Sizes
```css
--text-body-xl: 1.25rem;      /* 20px - Large body text */
--text-body-lg: 1.125rem;     /* 18px - Default body text */
--text-body-md: 1rem;         /* 16px - Standard body text */
--text-body-sm: 0.875rem;     /* 14px - Small text */
--text-body-xs: 0.75rem;      /* 12px - Caption text */
```

### Font Weights
```css
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;
```

---

## 📏 Spacing System

### Standard Spacing Scale
```css
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */
```

### Section Spacing
- **Hero sections**: `py-20` (5rem top/bottom)
- **Standard sections**: `py-16` (4rem top/bottom)
- **Compact sections**: `py-12` (3rem top/bottom)
- **Card padding**: `p-6` to `p-8` (1.5rem to 2rem)

---

## 🎭 Glass Morphism Effects

### Primary Glass Card
```css
.suz-card-glass {
  background: rgba(28, 28, 30, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
```

### Enhanced Glass Card (Premium)
```css
.suz-card-glass-enhanced {
  background: rgba(28, 28, 30, 0.9);
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}
```

---

## 🏗️ Component Patterns

### Hero Section Template
```tsx
<section className="relative suz-section-hero suz-hero-enhanced">
  {/* Background Effects */}
  <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-slate-900/95 backdrop-blur-sm"></div>
  
  <div className="max-w-6xl mx-auto text-center animate-fade-in relative z-10">
    <header className="suz-hero-headline-container mb-8">
      <div className="suz-icon-badge-premium mb-8 mx-auto">
        {/* Icon Component */}
      </div>
      <h1 className="suz-hero-title text-slate-100">
        <span className="suz-hero-accent gradient-text-animated pulse-glow">
          {title}
        </span>
      </h1>
    </header>
  </div>
</section>
```

### Service Card Template
```tsx
<div className="suz-card-glass rounded-xl p-6 hover:scale-105 transition-all duration-300">
  <div className="suz-icon-badge mb-4">
    {/* Service Icon */}
  </div>
  <h3 className="suz-text-heading-md text-white mb-3">{title}</h3>
  <p className="suz-text-body-md text-slate-300 mb-4">{description}</p>
  <button className="suz-btn-primary">{ctaText}</button>
</div>
```

### Button System
```tsx
/* Primary Button */
<button className="suz-btn-primary">
  Primary Action
</button>

/* Secondary Button */
<button className="suz-btn-secondary">
  Secondary Action
</button>

/* Ghost Button */
<button className="suz-btn-ghost">
  Subtle Action
</button>
```

---

## 🎯 CSS Class Naming Conventions

### Prefix System
- **suz-**: All SUZ-specific classes use this prefix
- **suz-card-**: Card components and variations
- **suz-btn-**: Button components and states
- **suz-text-**: Typography classes
- **suz-icon-**: Icon containers and badges
- **suz-hero-**: Hero section specific classes
- **suz-section-**: Section layout classes

### Component Structure
```css
.suz-component-name {
  /* Base styles */
}

.suz-component-name-variant {
  /* Variant styles */
}

.suz-component-name-state {
  /* State styles (hover, active, disabled) */
}
```

### Responsive Modifiers
- Use Tailwind's responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`
- Mobile-first approach: base styles for mobile, then scale up

---

## 📱 Layout Principles

### Container System
```css
.suz-page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .suz-page-container {
    padding: 0 1.5rem;
  }
}

@media (min-width: 1024px) {
  .suz-page-container {
    padding: 0 2rem;
  }
}
```

### Grid System
- **3-column grid**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **2-column grid**: `grid-cols-1 md:grid-cols-2`
- **Gap spacing**: `gap-6` (1.5rem) for cards, `gap-8` (2rem) for sections

### Visual Hierarchy
1. **Primary headlines**: `suz-hero-title` with gradient effects
2. **Section headers**: `suz-text-heading-xl` with proper spacing
3. **Card titles**: `suz-text-heading-md` with consistent styling
4. **Body text**: `suz-text-body-md` with optimal line height
5. **Supporting text**: `suz-text-body-sm` for metadata

---

## ♿ Accessibility Requirements

### ARIA Labels
- All interactive elements must have proper ARIA labels
- Use `aria-label`, `aria-describedby`, and `role` attributes
- Implement proper heading hierarchy (h1 → h2 → h3)

### Focus Management
```css
.suz-focus-ring {
  outline: 2px solid var(--suz-blue-primary);
  outline-offset: 2px;
  border-radius: 0.25rem;
}
```

### Color Contrast
- Minimum contrast ratio: 4.5:1 for normal text
- Minimum contrast ratio: 3:1 for large text
- Use `text-white` for high contrast on dark backgrounds

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Implement proper tab order with `tabindex`
- Provide skip links for main content

---

## ⚡ Performance Requirements

### Animation Standards
- Use `transform` and `opacity` for animations (GPU-accelerated)
- Target 60fps performance with `will-change` property
- Implement `prefers-reduced-motion` for accessibility

### Image Optimization
- Use `object-fit: contain` for service images
- Implement lazy loading with `loading="lazy"`
- Provide proper alt text for all images

### CSS Performance
- Use zoom-independent styling (50%-200% browser zoom)
- Minimize reflows and repaints
- Implement efficient selectors

---

## 🔧 Implementation Templates

### Page Structure Template
```tsx
const PageComponent = () => {
  return (
    <div className="min-h-screen bg-premium-gradient">
      <Helmet>
        {/* SEO meta tags */}
      </Helmet>
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="suz-section-hero">
        {/* Hero content */}
      </section>
      
      {/* Content Sections */}
      <section className="suz-section-standard">
        {/* Section content */}
      </section>
      
      <Footer />
    </div>
  );
};
```

### Service Page Template
```tsx
const ServicePage = ({ serviceData }) => {
  return (
    <div className="min-h-screen bg-premium-gradient">
      {/* Hero with service-specific content */}
      {/* Features section */}
      {/* Benefits section */}
      {/* Process section */}
      {/* Pricing section */}
      {/* FAQ section */}
      {/* Quote request section */}
    </div>
  );
};
```

---

## 📋 Quality Checklist

### Design Consistency
- [ ] Uses SUZ color palette consistently
- [ ] Implements proper typography hierarchy
- [ ] Applies glass morphism effects appropriately
- [ ] Maintains consistent spacing and layout

### Technical Requirements
- [ ] Responsive design (320px - 1920px+)
- [ ] Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] Zoom-independent styling (50%-200%)
- [ ] 60fps animations and transitions

### Accessibility Compliance
- [ ] Proper ARIA labels and roles
- [ ] Keyboard navigation support
- [ ] Color contrast compliance
- [ ] Screen reader compatibility

### Performance Standards
- [ ] Optimized images and assets
- [ ] Efficient CSS and animations
- [ ] Minimal JavaScript bundle size
- [ ] Fast loading times (<3 seconds)

---

## 🚀 Future Enhancements

### Planned Improvements
- Enhanced micro-interactions
- Advanced animation sequences
- Improved mobile gestures
- Progressive Web App features

### Maintenance Guidelines
- Regular design system audits
- Performance monitoring
- Accessibility testing
- User feedback integration

---

*This document should be referenced for all SUZ Reinigung development work to ensure consistent, premium user experiences across all touchpoints.*
