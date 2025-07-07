import { Service, SERVICE_TYPES } from '@/types/services';

export const servicesData: Record<string, Service> = {
  [SERVICE_TYPES.BUEROREINIGUNG]: {
    id: SERVICE_TYPES.BUEROREINIGUNG,
    title: 'Professionelle Büroreinigung',
    subtitle: 'Für einen sauberen und produktiven Arbeitsplatz',
    description: 'Unsere professionelle Büroreinigung sorgt für ein hygienisches und motivierendes Arbeitsumfeld. Von kleinen Praxen bis hin zu großen Bürokomplexen – wir reinigen zuverlässig und diskret nach Ihren individuellen Anforderungen.',
    features: [
      'Tägliche, wöchentliche oder monatliche Reinigung',
      'Flexible Zeiten (früh morgens, abends, Wochenende)',
      'Umweltfreundliche Reinigungsmittel',
      'Erfahrenes und geschultes Personal',
      'Reinigung von Büroräumen, Besprechungsräumen, Küchen',
      'Sanitärbereich-Hygiene',
      'Müllentsorgung und Recycling',
      'Fensterreinigung innen und außen'
    ],
    benefits: [
      'Bessere Arbeitsatmosphäre für Ihre Mitarbeiter',
      'Professioneller Eindruck bei Kunden und Partnern',
      'Weniger Krankheitstage durch bessere Hygiene',
      'Mehr Zeit für Ihr Kerngeschäft',
      'Kostenersparnis gegenüber eigener Reinigungskraft',
      'Versicherte und bonded Mitarbeiter',
      'Qualitätsgarantie auf alle Leistungen'
    ],
    process: [
      {
        step: 1,
        title: 'Kostenlose Besichtigung',
        description: 'Wir besichtigen Ihre Räumlichkeiten und erstellen ein individuelles Angebot',
        icon: 'Eye'
      },
      {
        step: 2,
        title: 'Reinigungsplan erstellen',
        description: 'Gemeinsam entwickeln wir einen Reinigungsplan nach Ihren Bedürfnissen',
        icon: 'Calendar'
      },
      {
        step: 3,
        title: 'Team-Einsatz',
        description: 'Unser geschultes Team beginnt mit der regelmäßigen Reinigung',
        icon: 'Users'
      },
      {
        step: 4,
        title: 'Qualitätskontrolle',
        description: 'Regelmäßige Kontrollen sichern die gleichbleibend hohe Qualität',
        icon: 'CheckCircle'
      }
    ],
    pricing: {
      startingPrice: 'Ab 15€',
      priceRange: '15€ - 45€ pro Stunde',
      factors: [
        'Größe der Bürofläche',
        'Reinigungsfrequenz',
        'Spezielle Anforderungen',
        'Uhrzeit der Reinigung',
        'Zusätzliche Services'
      ],
      includes: [
        'Grundreinigung aller Oberflächen',
        'Staubsaugen und Wischen',
        'Sanitärbereich-Reinigung',
        'Müllentsorgung',
        'Reinigungsmittel und Equipment'
      ]
    },
    gallery: [
      '/assets/images/office-cleaning-1.jpg',
      '/assets/images/office-cleaning-2.jpg',
      '/assets/images/office-cleaning-3.jpg'
    ],
    faqs: [
      {
        question: 'Wie oft sollte ein Büro gereinigt werden?',
        answer: 'Das hängt von der Bürogröße und Mitarbeiteranzahl ab. Typischerweise empfehlen wir 2-3x pro Woche für normale Büros und täglich für hochfrequentierte Bereiche.'
      },
      {
        question: 'Können Sie außerhalb der Arbeitszeiten reinigen?',
        answer: 'Ja, wir bieten flexible Zeiten an - früh morgens, abends oder am Wochenende, damit Ihr Arbeitsablauf nicht gestört wird.'
      },
      {
        question: 'Was ist im Service enthalten?',
        answer: 'Unser Standard-Service umfasst Staubsaugen, Oberflächenreinigung, Sanitärreinigung, Müllentsorgung und Fensterreinigung innen.'
      },
      {
        question: 'Wie schnell können Sie starten?',
        answer: 'Nach der Besichtigung und Vertragsabschluss können wir meist innerhalb von 3-5 Werktagen mit der regelmäßigen Reinigung beginnen.'
      }
    ],
    cta: {
      primary: 'Kostenloses Angebot anfordern',
      secondary: 'Beratungstermin vereinbaren'
    },
    seo: {
      title: 'Büroreinigung Köln & Bonn - Professionell & Zuverlässig | SUZ Reinigung',
      description: 'Professionelle Büroreinigung in Köln und Bonn. ✓ Flexible Zeiten ✓ Erfahrenes Team ✓ Umweltfreundlich ✓ Kostenloses Angebot. Jetzt anfragen!',
      keywords: ['Büroreinigung Köln', 'Office Cleaning Bonn', 'Gebäudereinigung', 'Reinigungsservice Büro', 'Unterhaltsreinigung']
    }
  },

  [SERVICE_TYPES.HAUSREINIGUNG]: {
    id: SERVICE_TYPES.HAUSREINIGUNG,
    title: 'Zuverlässige Hausreinigung',
    subtitle: 'Mehr Zeit für die wichtigen Dinge im Leben',
    description: 'Unsere professionelle Hausreinigung gibt Ihnen die Zeit zurück, die Sie für Familie, Hobbys und Entspannung brauchen. Vertrauen Sie auf unsere erfahrenen Reinigungskräfte für Ihr Zuhause.',
    features: [
      'Regelmäßige Hausreinigung (wöchentlich, 14-tägig, monatlich)',
      'Grundreinigung bei Umzug oder saisonaler Reinigung',
      'Alle Räume: Wohnzimmer, Schlafzimmer, Küche, Bad',
      'Fensterreinigung innen und außen',
      'Treppenhaus und Keller auf Wunsch',
      'Eigene Reinigungsmittel oder Ihre bevorzugten Produkte',
      'Flexible Terminplanung',
      'Schlüsselservice für regelmäßige Kunden'
    ],
    benefits: [
      'Mehr Freizeit für Familie und Hobbys',
      'Immer ein sauberes und ordentliches Zuhause',
      'Professionelle Ergebnisse mit Qualitätsgarantie',
      'Entlastung vom Haushalts-Stress',
      'Geschultes und vertrauensvolles Personal',
      'Flexible Anpassung an Ihre Bedürfnisse',
      'Versicherungsschutz für Ihr Eigentum'
    ],
    process: [
      {
        step: 1,
        title: 'Erstberatung zu Hause',
        description: 'Wir lernen Ihr Zuhause und Ihre Wünsche kennen',
        icon: 'Home'
      },
      {
        step: 2,
        title: 'Individueller Reinigungsplan',
        description: 'Wir erstellen einen Plan, der perfekt zu Ihrem Alltag passt',
        icon: 'Calendar'
      },
      {
        step: 3,
        title: 'Regelmäßige Reinigung',
        description: 'Ihr persönliches Reinigungsteam kümmert sich um Ihr Zuhause',
        icon: 'Sparkles'
      },
      {
        step: 4,
        title: 'Zufriedenheitsgarantie',
        description: 'Wir sorgen dafür, dass Sie mit dem Ergebnis zu 100% zufrieden sind',
        icon: 'Heart'
      }
    ],
    pricing: {
      startingPrice: 'Ab 18€',
      priceRange: '18€ - 25€ pro Stunde',
      factors: [
        'Hausgröße und Anzahl der Räume',
        'Reinigungsfrequenz',
        'Besondere Wünsche und Anforderungen',
        'Zusätzliche Services (Fenster, Terrasse)',
        'Anfahrtszeit'
      ],
      includes: [
        'Alle Wohnräume (Staubsaugen, Wischen)',
        'Küche (Arbeitsflächen, Herd, Spüle)',
        'Badezimmer komplett',
        'Staubwischen aller Oberflächen',
        'Reinigungsmittel und Equipment'
      ]
    },
    gallery: [
      '/assets/images/house-cleaning-1.jpg',
      '/assets/images/house-cleaning-2.jpg',
      '/assets/images/house-cleaning-3.jpg'
    ],
    faqs: [
      {
        question: 'Muss ich während der Reinigung zu Hause sein?',
        answer: 'Nein, für regelmäßige Kunden bieten wir einen sicheren Schlüsselservice an. Sie können während der Reinigung arbeiten oder Ihre Freizeit genießen.'
      },
      {
        question: 'Bringen Sie eigene Reinigungsmittel mit?',
        answer: 'Ja, wir bringen professionelle, umweltfreundliche Reinigungsmittel mit. Auf Wunsch verwenden wir gerne auch Ihre bevorzugten Produkte.'
      },
      {
        question: 'Wie lange dauert die Reinigung meines Hauses?',
        answer: 'Das hängt von der Hausgröße ab. Für eine 100m² Wohnung benötigen wir etwa 2-3 Stunden, für ein Einfamilienhaus 3-5 Stunden.'
      },
      {
        question: 'Was passiert, wenn ich mit der Reinigung nicht zufrieden bin?',
        answer: 'Wir kommen kostenlos zurück und reinigen die beanstandeten Bereiche erneut. Ihre Zufriedenheit ist unsere Priorität.'
      }
    ],
    cta: {
      primary: 'Kostenlose Beratung buchen',
      secondary: 'Unverbindlich anfragen'
    },
    seo: {
      title: 'Hausreinigung Köln & Bonn - Privater Reinigungsservice | SUZ Reinigung',
      description: 'Professionelle Hausreinigung für Privatkunden in Köln und Bonn. ✓ Regelmäßig oder einmalig ✓ Vertrauensvoll ✓ Flexibel ✓ Kostenlose Beratung.',
      keywords: ['Hausreinigung Köln', 'Putzfrau Bonn', 'Reinigungsservice privat', 'Haushaltshilfe', 'Wohnungsreinigung']
    }
  },

  [SERVICE_TYPES.FENSTERREINIGUNG]: {
    id: SERVICE_TYPES.FENSTERREINIGUNG,
    title: 'Professionelle Fensterreinigung',
    subtitle: 'Kristallklare Sicht das ganze Jahr über',
    description: 'Saubere Fenster sorgen für mehr Licht, bessere Aussicht und einen gepflegten Eindruck. Unsere Fensterreinigung macht Ihre Fenster streifenfrei sauber – egal ob privat oder gewerblich.',
    features: [
      'Innen- und Außenreinigung aller Fenster',
      'Rahmen und Fensterbänke werden mitgereinigt',
      'Professionelle Ausrüstung für alle Höhen',
      'Regelmäßige Termine oder Einzelreinigung',
      'Auch für Wintergärten und Glasdächer',
      'Geschäfts- und Schaufenster',
      'Versicherung für Arbeiten in der Höhe',
      'Umweltfreundliche Reinigungsmittel'
    ],
    benefits: [
      'Deutlich mehr Tageslicht in Ihren Räumen',
      'Professioneller Eindruck bei Kunden',
      'Längere Lebensdauer Ihrer Fenster',
      'Keine streifigen oder schmierigen Ergebnisse',
      'Sicherheit durch professionelle Ausrüstung',
      'Zeitersparnis und keine eigene Anschaffung von Equipment',
      'Ganzjahresservice auch bei schwierigen Wetterbedingungen'
    ],
    process: [
      {
        step: 1,
        title: 'Kostenvoranschlag',
        description: 'Wir zählen Ihre Fenster und erstellen ein faires Angebot',
        icon: 'Calculator'
      },
      {
        step: 2,
        title: 'Terminplanung',
        description: 'Wir vereinbaren regelmäßige Termine oder Einzeltermine nach Ihren Wünschen',
        icon: 'Clock'
      },
      {
        step: 3,
        title: 'Professionelle Reinigung',
        description: 'Unser Team reinigt alle Fenster innen und außen streifenfrei',
        icon: 'Droplets'
      },
      {
        step: 4,
        title: 'Qualitätsprüfung',
        description: 'Wir prüfen das Ergebnis und garantieren streifenfreie Sauberkeit',
        icon: 'Shield'
      }
    ],
    pricing: {
      startingPrice: 'Ab 2€',
      priceRange: '2€ - 8€ pro Fenster',
      factors: [
        'Anzahl und Größe der Fenster',
        'Zugänglichkeit (Erdgeschoss vs. höhere Etagen)',
        'Reinigungsfrequenz',
        'Rahmen und Fensterbänke',
        'Verschmutzungsgrad'
      ],
      includes: [
        'Innen- und Außenreinigung',
        'Rahmen und Fensterbänke',
        'Professionelle Ausrüstung',
        'Umweltfreundliche Reinigungsmittel',
        'Versicherungsschutz'
      ]
    },
    gallery: [
      '/assets/images/window-cleaning-1.jpg',
      '/assets/images/window-cleaning-2.jpg',
      '/assets/images/window-cleaning-3.jpg'
    ],
    faqs: [
      {
        question: 'Wie oft sollten Fenster gereinigt werden?',
        answer: 'Für Privathaushalte empfehlen wir 2-4x pro Jahr, für Geschäfte je nach Lage monatlich bis vierteljährlich.'
      },
      {
        question: 'Reinigen Sie auch bei schlechtem Wetter?',
        answer: 'Bei leichtem Regen ja, bei starkem Regen oder Sturm verschieben wir den Termin zu Ihrer und unserer Sicherheit.'
      },
      {
        question: 'Können Sie auch sehr hohe Fenster reinigen?',
        answer: 'Ja, wir haben professionelle Ausrüstung für Arbeiten bis zu 20 Meter Höhe und sind entsprechend versichert.'
      },
      {
        question: 'Was machen Sie gegen Kalkflecken?',
        answer: 'Wir verwenden spezielle Reinigungsmittel gegen Kalkablagerungen und können auch hartnäckige Flecken entfernen.'
      }
    ],
    cta: {
      primary: 'Fenster zählen lassen',
      secondary: 'Kostenvoranschlag anfordern'
    },
    seo: {
      title: 'Fensterreinigung Köln & Bonn - Streifenfrei Sauber | SUZ Reinigung',
      description: 'Professionelle Fensterreinigung in Köln und Bonn. ✓ Innen & Außen ✓ Alle Höhen ✓ Streifenfrei ✓ Regelmäßig oder einmalig. Jetzt Termin buchen!',
      keywords: ['Fensterreinigung Köln', 'Fensterputzer Bonn', 'Glasreinigung', 'Schaufensterreinigung', 'Fenster putzen lassen']
    }
  },

  [SERVICE_TYPES.GRUNDREINIGUNG]: {
    id: SERVICE_TYPES.GRUNDREINIGUNG,
    title: 'Gründliche Grundreinigung',
    subtitle: 'Für den perfekten Neustart',
    description: 'Eine Grundreinigung schafft die perfekte Basis für ein sauberes Umfeld. Ob nach einem Umzug, vor einer Neuvermietung oder als saisonale Tiefenreinigung – wir machen alles wieder wie neu.',
    features: [
      'Komplette Tiefenreinigung aller Räume',
      'Entfernung hartnäckiger Verschmutzungen',
      'Reinigung von Küchenschränken innen und außen',
      'Sanitärbereiche mit Kalkentfernung',
      'Fensterreinigung innen und außen',
      'Teppich- und Polsterreinigung',
      'Entfernung von Klebstoffresten',
      'Balkon und Terrasse auf Wunsch'
    ],
    benefits: [
      'Perfekte Basis für Neuvermietung oder Einzug',
      'Wertsteigerung Ihrer Immobilie',
      'Hygienische Tiefenreinigung',
      'Entfernung aller Spuren der Vornutzung',
      'Professionelle Ergebnisse in kurzer Zeit',
      'Komplettservice ohne eigenen Aufwand',
      'Günstigere Alternative zur Eigenrenovierung'
    ],
    process: [
      {
        step: 1,
        title: 'Vor-Ort-Besichtigung',
        description: 'Wir bewerten den Umfang und erstellen ein detailliertes Angebot',
        icon: 'Search'
      },
      {
        step: 2,
        title: 'Planung & Vorbereitung',
        description: 'Wir planen den Ablauf und organisieren alle benötigten Materialien',
        icon: 'Clipboard'
      },
      {
        step: 3,
        title: 'Intensive Reinigung',
        description: 'Unser Team führt die komplette Grundreinigung durch',
        icon: 'Zap'
      },
      {
        step: 4,
        title: 'Abschlusskontrolle',
        description: 'Gemeinsame Abnahme und Qualitätskontrolle aller Bereiche',
        icon: 'CheckSquare'
      }
    ],
    pricing: {
      startingPrice: 'Ab 25€',
      priceRange: '25€ - 40€ pro Stunde',
      factors: [
        'Größe der zu reinigenden Fläche',
        'Grad der Verschmutzung',
        'Spezielle Anforderungen',
        'Zeitdruck und Terminwünsche',
        'Zusätzliche Services'
      ],
      includes: [
        'Komplette Grundreinigung aller Räume',
        'Professionelle Reinigungsmittel',
        'Spezialausrüstung für hartnäckige Verschmutzungen',
        'Entsorgung von Reinigungsabfällen',
        'Qualitätskontrolle'
      ]
    },
    gallery: [
      '/assets/images/deep-cleaning-1.jpg',
      '/assets/images/deep-cleaning-2.jpg',
      '/assets/images/deep-cleaning-3.jpg'
    ],
    faqs: [
      {
        question: 'Wie lange dauert eine Grundreinigung?',
        answer: 'Das hängt von der Größe und dem Zustand ab. Für eine 80m² Wohnung planen wir 6-8 Stunden, für größere Objekte entsprechend mehr.'
      },
      {
        question: 'Können Sie auch am Wochenende oder abends arbeiten?',
        answer: 'Ja, für Grundreinigungen bieten wir flexible Zeiten an, auch am Wochenende oder abends gegen einen kleinen Aufpreis.'
      },
      {
        question: 'Was ist der Unterschied zur normalen Reinigung?',
        answer: 'Bei der Grundreinigung werden auch Bereiche gereinigt, die normalerweise nicht zugänglich sind: Schränke innen, hinter Geräten, intensive Badreinigung etc.'
      },
      {
        question: 'Übernehmen Sie auch kleine Reparaturen?',
        answer: 'Kleine Ausbesserungen wie Bohrlöcher schließen können wir gegen Aufpreis übernehmen. Größere Reparaturen vermitteln wir gerne an Partner.'
      }
    ],
    cta: {
      primary: 'Grundreinigung anfragen',
      secondary: 'Kostenlosen Kostenvoranschlag'
    },
    seo: {
      title: 'Grundreinigung Köln & Bonn - Umzug & Renovierung | SUZ Reinigung',
      description: 'Professionelle Grundreinigung in Köln und Bonn. ✓ Nach Umzug ✓ Für Neuvermietung ✓ Tiefenreinigung ✓ Kostenvoranschlag. Jetzt anfragen!',
      keywords: ['Grundreinigung Köln', 'Umzugsreinigung Bonn', 'Tiefenreinigung', 'Endreinigung', 'Renovierungsreinigung']
    }
  }
};

export const getAllServices = (): Service[] => {
  return Object.values(servicesData);
};

export const getServiceById = (id: string): Service | undefined => {
  return servicesData[id];
};