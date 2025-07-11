// SEO Keywords Strategy for SUZ Reinigung Blog
// Target keywords with search volume and competition analysis

export interface KeywordData {
  keyword: string;
  searchVolume: number; // Monthly searches in Germany
  competition: 'low' | 'medium' | 'high';
  difficulty: number; // 1-100 scale
  intent: 'informational' | 'commercial' | 'transactional';
  localFocus: boolean;
}

export interface KeywordCluster {
  primaryKeyword: string;
  supportingKeywords: string[];
  contentType: 'blog' | 'service' | 'landing';
  priority: 'high' | 'medium' | 'low';
}

// High-impact keywords for cleaning industry in Germany
export const targetKeywords: KeywordData[] = [
  // Primary service keywords
  {
    keyword: 'Büroreinigung Köln',
    searchVolume: 1200,
    competition: 'medium',
    difficulty: 45,
    intent: 'commercial',
    localFocus: true
  },
  {
    keyword: 'Hausreinigung Köln',
    searchVolume: 800,
    competition: 'medium',
    difficulty: 42,
    intent: 'commercial',
    localFocus: true
  },
  {
    keyword: 'Reinigungsservice Köln',
    searchVolume: 1500,
    competition: 'high',
    difficulty: 55,
    intent: 'commercial',
    localFocus: true
  },

  // Long-tail informational keywords (blog targets)
  {
    keyword: 'Büro richtig reinigen Tipps',
    searchVolume: 400,
    competition: 'low',
    difficulty: 25,
    intent: 'informational',
    localFocus: false
  },
  {
    keyword: 'Frühjahrsputz Checkliste',
    searchVolume: 2200,
    competition: 'low',
    difficulty: 20,
    intent: 'informational',
    localFocus: false
  },
  {
    keyword: 'umweltfreundliche Reinigungsmittel',
    searchVolume: 1800,
    competition: 'medium',
    difficulty: 35,
    intent: 'informational',
    localFocus: false
  },
  {
    keyword: 'Fenster streifenfrei putzen',
    searchVolume: 1600,
    competition: 'low',
    difficulty: 22,
    intent: 'informational',
    localFocus: false
  },
  {
    keyword: 'Teppich reinigen Hausmittel',
    searchVolume: 1400,
    competition: 'low',
    difficulty: 18,
    intent: 'informational',
    localFocus: false
  },

  // Local competition keywords
  {
    keyword: 'Reinigungsfirma Bonn',
    searchVolume: 600,
    competition: 'medium',
    difficulty: 40,
    intent: 'commercial',
    localFocus: true
  },
  {
    keyword: 'Putzfrau Köln',
    searchVolume: 900,
    competition: 'high',
    difficulty: 50,
    intent: 'commercial',
    localFocus: true
  },

  // Seasonal keywords
  {
    keyword: 'Winterreinigung Tipps',
    searchVolume: 300,
    competition: 'low',
    difficulty: 15,
    intent: 'informational',
    localFocus: false
  },
  {
    keyword: 'Büroreinigung Preise',
    searchVolume: 800,
    competition: 'medium',
    difficulty: 38,
    intent: 'commercial',
    localFocus: false
  }
];

// Keyword clusters for content planning
export const keywordClusters: KeywordCluster[] = [
  {
    primaryKeyword: 'Büroreinigung Köln',
    supportingKeywords: [
      'Arbeitsplatzreinigung',
      'Gewerbliche Reinigung Köln',
      'Office Cleaning',
      'Büro putzen lassen',
      'Unternehmensreinigung'
    ],
    contentType: 'blog',
    priority: 'high'
  },
  {
    primaryKeyword: 'Frühjahrsputz Checkliste',
    supportingKeywords: [
      'Hausreinigung Frühjahr',
      'Frühjahrsputz Tipps',
      'Grundreinigung Haus',
      'Putzen im Frühling',
      'Hausreinigung systematisch'
    ],
    contentType: 'blog',
    priority: 'high'
  },
  {
    primaryKeyword: 'umweltfreundliche Reinigungsmittel',
    supportingKeywords: [
      'ökologische Reinigung',
      'nachhaltig putzen',
      'Bio Reinigungsmittel',
      'umweltschonend reinigen',
      'grüne Reinigung'
    ],
    contentType: 'blog',
    priority: 'medium'
  },
  {
    primaryKeyword: 'Reinigungsservice Preise',
    supportingKeywords: [
      'Kosten Hausreinigung',
      'Büroreinigung Preise',
      'Reinigung Stundenlohn',
      'Putzfrau Kosten',
      'Reinigungsservice Angebot'
    ],
    contentType: 'blog',
    priority: 'high'
  }
];

// Content gap analysis - opportunities
export const contentGaps = [
  {
    topic: 'Spezialreinigung',
    keywords: ['Tatortreinigung', 'Brandschadenreinigung', 'Wasserschadenreinigung'],
    opportunity: 'Low competition, high value services',
    estimatedTraffic: 200
  },
  {
    topic: 'Branchenspezifische Reinigung',
    keywords: ['Praxisreinigung', 'Kanzleireinigung', 'Hotelreinigung'],
    opportunity: 'B2B focused content with high conversion potential',
    estimatedTraffic: 400
  },
  {
    topic: 'Reinigungsgeräte und -technik',
    keywords: ['Dampfreiniger Test', 'Staubsauger Vergleich', 'Reinigungsmaschinen'],
    opportunity: 'Affiliate potential and expertise demonstration',
    estimatedTraffic: 600
  }
];

// Seasonal keyword calendar
export const seasonalKeywords = {
  spring: [
    'Frühjahrsputz',
    'Pollenreinigung',
    'Gartenmöbel reinigen',
    'Terrassenreinigung'
  ],
  summer: [
    'Klimaanlage reinigen',
    'Sonnenschutz pflegen',
    'Grillreinigung',
    'Poolreinigung'
  ],
  autumn: [
    'Herbstputz',
    'Laub entfernen',
    'Heizung reinigen',
    'Wintervorbereitung'
  ],
  winter: [
    'Salzflecken entfernen',
    'Winterreinigung',
    'Luftfeuchtigkeit',
    'Schimmelprävention'
  ]
};

// Competitor keyword analysis
export const competitorKeywords = {
  'helpling.de': [
    'Putzfrau online buchen',
    'Haushaltsreinigung App',
    'Reinigungskraft vermittlung'
  ],
  'book-a-tiger.de': [
    'Reinigungskraft buchen',
    'Hausreinigung online',
    'Putzhilfe finden'
  ],
  'local-competitors': [
    'Reinigungsfirma Köln',
    'Gebäudereinigung Bonn',
    'Hausmeisterservice NRW'
  ]
};

// Keyword tracking and monitoring
export const keywordTracking = {
  primaryTargets: [
    'Büroreinigung Köln',
    'Hausreinigung Köln',
    'Reinigungsservice Köln',
    'Fensterreinigung Köln'
  ],
  secondaryTargets: [
    'Frühjahrsputz Checkliste',
    'umweltfreundliche Reinigungsmittel',
    'Büroreinigung Tipps',
    'Teppichreinigung Anleitung'
  ],
  longTailTargets: [
    'professionelle Büroreinigung Köln Preise',
    'Hausreinigung Köln Bonn günstig',
    'Reinigungsservice Köln 24 Stunden',
    'ökologische Reinigungsmittel Test'
  ]
};

// ROI calculation for keyword targeting
export const calculateKeywordROI = (keyword: KeywordData): number => {
  const baseValue = keyword.searchVolume * 0.02; // 2% CTR assumption
  const competitionMultiplier = keyword.competition === 'low' ? 1.5 : 
                               keyword.competition === 'medium' ? 1.0 : 0.7;
  const localMultiplier = keyword.localFocus ? 2.0 : 1.0;
  const intentMultiplier = keyword.intent === 'commercial' ? 3.0 :
                          keyword.intent === 'transactional' ? 4.0 : 1.0;
  
  return Math.round(baseValue * competitionMultiplier * localMultiplier * intentMultiplier);
};
