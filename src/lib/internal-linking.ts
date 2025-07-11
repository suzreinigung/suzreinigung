// Internal Linking Strategy for SEO Enhancement
// SUZ Reinigung - Premium Cleaning Services

export interface InternalLink {
  text: string;
  url: string;
  context: string;
  priority: 'high' | 'medium' | 'low';
}

export interface LinkingStrategy {
  serviceToService: InternalLink[];
  serviceToBlog: InternalLink[];
  blogToService: InternalLink[];
  blogToBlog: InternalLink[];
}

// Strategic internal linking for SEO juice distribution
export const internalLinkingStrategy: LinkingStrategy = {
  // Service page cross-linking
  serviceToService: [
    {
      text: 'Büroreinigung',
      url: '/services/bueroreinigung',
      context: 'Für Unternehmen bieten wir auch professionelle {link} an.',
      priority: 'high'
    },
    {
      text: 'Hausreinigung',
      url: '/services/hausreinigung',
      context: 'Privatkunden profitieren von unserer zuverlässigen {link}.',
      priority: 'high'
    },
    {
      text: 'Fensterreinigung',
      url: '/services/fensterreinigung',
      context: 'Ergänzend zur Grundreinigung empfehlen wir unsere {link}.',
      priority: 'medium'
    }
  ],

  // Service pages to blog articles
  serviceToBlog: [
    {
      text: 'Büroreinigung Tipps',
      url: '/blog/bueroreinigung-koeln-tipps',
      context: 'Lesen Sie unsere {link} für optimale Arbeitsplatz-Hygiene.',
      priority: 'high'
    },
    {
      text: 'Frühjahrsputz Guide',
      url: '/blog/hausreinigung-fruehjahrsputz-2024',
      context: 'Unser {link} hilft bei der systematischen Hausreinigung.',
      priority: 'medium'
    }
  ],

  // Blog articles to service pages
  blogToService: [
    {
      text: 'professionelle Büroreinigung',
      url: '/services/bueroreinigung',
      context: 'Für {link} in Köln kontaktieren Sie SUZ Reinigung.',
      priority: 'high'
    },
    {
      text: 'Hausreinigungsservice',
      url: '/services/hausreinigung',
      context: 'Unser {link} übernimmt alle Aufgaben für Sie.',
      priority: 'high'
    }
  ],

  // Blog to blog cross-linking
  blogToBlog: [
    {
      text: 'Büroreinigung Tipps',
      url: '/blog/bueroreinigung-koeln-tipps',
      context: 'Weitere Informationen finden Sie in unseren {link}.',
      priority: 'medium'
    },
    {
      text: 'Hausreinigung Guide',
      url: '/blog/hausreinigung-fruehjahrsputz-2024',
      context: 'Ergänzend empfehlen wir unseren {link}.',
      priority: 'medium'
    }
  ]
};

// Auto-generate contextual internal links
export const generateInternalLinks = (
  currentPageType: 'service' | 'blog',
  currentPageId: string,
  content: string
): string => {
  let enhancedContent = content;
  
  const relevantLinks = currentPageType === 'service' 
    ? [...internalLinkingStrategy.serviceToService, ...internalLinkingStrategy.serviceToBlog]
    : [...internalLinkingStrategy.blogToService, ...internalLinkingStrategy.blogToBlog];

  // Filter out self-references
  const applicableLinks = relevantLinks.filter(link => 
    !link.url.includes(currentPageId)
  );

  // Insert high-priority links first
  const prioritizedLinks = applicableLinks
    .sort((a, b) => a.priority === 'high' ? -1 : 1)
    .slice(0, 3); // Limit to 3 internal links per page

  prioritizedLinks.forEach(link => {
    const linkHtml = `<a href="${link.url}" class="text-blue-600 hover:text-blue-700 font-medium">${link.text}</a>`;
    const contextWithLink = link.context.replace('{link}', linkHtml);
    
    // Insert at strategic positions in content
    if (enhancedContent.includes('## Fazit') || enhancedContent.includes('## Zusammenfassung')) {
      enhancedContent = enhancedContent.replace(
        /(## Fazit|## Zusammenfassung)/,
        `${contextWithLink}\n\n$1`
      );
    }
  });

  return enhancedContent;
};

// SEO-optimized anchor text variations
export const anchorTextVariations = {
  bueroreinigung: [
    'Büroreinigung Köln',
    'professionelle Büroreinigung',
    'Arbeitsplatzreinigung',
    'Gewerbliche Reinigung',
    'Office Cleaning Service'
  ],
  hausreinigung: [
    'Hausreinigung Köln',
    'Privatreinigung',
    'Wohnungsreinigung',
    'Haushaltsreinigung',
    'Residential Cleaning'
  ],
  fensterreinigung: [
    'Fensterreinigung',
    'Glasreinigung',
    'Window Cleaning',
    'Scheibenreinigung',
    'Fassadenreinigung'
  ]
};

// Track internal link performance
export const trackInternalLinkClick = (linkUrl: string, sourcePageId: string) => {
  // Integration with existing analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'internal_link_click', {
      event_category: 'navigation',
      event_label: `${sourcePageId} -> ${linkUrl}`,
      value: 1
    });
  }
};
