import { Building2, Home, Sparkles, Users, Briefcase, Heart } from 'lucide-react';

export const services = {
  hotelzimmerreinigung: {
    id: 'hotelzimmerreinigung',
    title: 'Hotelzimmerreinigung',
    slug: 'hotelzimmerreinigung',
    description: 'Tiefenreinigung und tägliche Pflege für höchste Hygienestandards in Hotelzimmern.',
    longDescription: 'Professionelle Hotelzimmerreinigung mit höchsten Hygienestandards. Wir sorgen für perfekt saubere Zimmer, die Ihre Gäste begeistern und für positive Bewertungen sorgen.',
    icon: Building2,
    image: '/assets/images/services/Hotelzimmerreinigung-min.png',
    category: 'Gewerbereinigung',
    color: 'blue',
    
    features: [
      'Tägliche Zimmerreinigung',
      'Tiefenreinigung nach Auszug',
      'Badezimmer-Vollreinigung',
      'Bettwäsche-Service',
      'Staubsaugen und Wischen',
      'Mülleimer-Service',
      'Handtuch-Austausch',
      'Minibar-Auffüllung'
    ],
    
    benefits: [
      'Höchste Hygienestandards',
      'Zufriedene Hotelgäste',
      'Bessere Online-Bewertungen',
      'Professionelle Ausstattung',
      'Zuverlässige Zeiten',
      'Geschultes Personal',
      'Qualitätskontrolle',
      'Flexible Buchungszeiten'
    ],
    
    process: [
      {
        step: 1,
        title: 'Zimmer-Check',
        description: 'Inspektion der Zimmer und Bestandsaufnahme'
      },
      {
        step: 2,
        title: 'Badezimmer',
        description: 'Vollständige Reinigung aller Sanitäranlagen'
      },
      {
        step: 3,
        title: 'Schlafbereich',
        description: 'Bettwäsche, Staubsaugen, Oberflächenreinigung'
      },
      {
        step: 4,
        title: 'Endkontrolle',
        description: 'Qualitätsprüfung und finale Inspektion'
      }
    ],
    
    pricing: {
      title: 'Hotelzimmerreinigung Preise',
      options: [
        {
          name: 'Einzelzimmer',
          price: 'ab 25€',
          description: 'Standard Hotelzimmer bis 25m²',
          features: ['Komplette Zimmerreinigung', 'Badezimmer', 'Bettwäsche-Service']
        },
        {
          name: 'Doppelzimmer',
          price: 'ab 35€',
          description: 'Doppelzimmer bis 35m²',
          features: ['Erweiterte Reinigung', 'Zusätzliche Handtücher', 'Minibar-Check']
        },
        {
          name: 'Suite',
          price: 'auf Anfrage',
          description: 'Luxus-Suiten und große Zimmer',
          features: ['Premium-Service', 'Erweiterte Ausstattung', 'Spezielle Anforderungen']
        }
      ]
    },
    
    faqs: [
      {
        question: 'Wie lange dauert die Zimmerreinigung?',
        answer: 'Ein Standardzimmer reinigen wir in 20-30 Minuten. Suiten können 45-60 Minuten dauern, je nach Größe und Ausstattung.'
      },
      {
        question: 'Arbeiten Sie auch an Wochenenden?',
        answer: 'Ja, wir sind 7 Tage die Woche verfügbar. Hotels haben einen kontinuierlichen Betrieb und wir passen uns Ihren Bedürfnissen an.'
      },
      {
        question: 'Welche Reinigungsmittel verwenden Sie?',
        answer: 'Wir verwenden professionelle, hotelzertifizierte Reinigungsmittel, die höchste Hygiene gewährleisten und umweltfreundlich sind.'
      },
      {
        question: 'Bieten Sie auch Tiefenreinigung an?',
        answer: 'Ja, bei Zimmerrenovierungen oder nach längeren Aufenthalten bieten wir spezielle Tiefenreinigungen mit erweiterten Services an.'
      }
    ],
    
    seo: {
      title: 'Hotelzimmerreinigung Köln & Bonn | SUZ Reinigung',
      description: 'Professionelle Hotelzimmerreinigung in Köln und Bonn. Höchste Hygienestandards für zufriedene Gäste. ✓ 20+ Jahre Erfahrung ✓ Täglich verfügbar',
      keywords: ['Hotelzimmerreinigung', 'Hotelreinigung Köln', 'Zimmerreinigung', 'Hotelhygiene', 'Gastgewerbe Reinigung']
    }
  },

  teppichreinigung: {
    id: 'teppichreinigung',
    title: 'Teppichreinigung',
    slug: 'teppichreinigung',
    description: 'Tiefenreinigung für Teppiche und Polster. Wir entfernen Flecken, Gerüche und Allergene für ein frisches und hygienisches Raumklima.',
    longDescription: 'Professionelle Teppich- und Polsterreinigung mit modernsten Verfahren. Wir entfernen selbst hartnäckige Flecken und Gerüche dauerhaft.',
    icon: Home,
    image: '/assets/images/services/Teppichreinigung-min.png',
    category: 'Spezialreinigung',
    color: 'green',
    
    features: [
      'Fleckenentfernung',
      'Geruchsbeseitigung',
      'Allergen-Entfernung',
      'Tiefenreinigung',
      'Polsterreinigung',
      'Teppichpflege',
      'Schnelle Trocknung',
      'Umweltfreundlich'
    ],
    
    benefits: [
      'Frisches Raumklima',
      'Entfernung von Allergenen',
      'Verlängerte Teppichlebensdauer',
      'Professionelle Ausrüstung',
      'Schonende Verfahren',
      'Schnelle Ergebnisse',
      'Garantierte Sauberkeit',
      'Gesünderes Wohnen'
    ],
    
    process: [
      {
        step: 1,
        title: 'Inspektion',
        description: 'Analyse der Verschmutzung und Materialprüfung'
      },
      {
        step: 2,
        title: 'Vorbehandlung',
        description: 'Spezielle Behandlung von Flecken und Problemstellen'
      },
      {
        step: 3,
        title: 'Tiefenreinigung',
        description: 'Maschinelle Reinigung mit professionellen Geräten'
      },
      {
        step: 4,
        title: 'Nachbehandlung',
        description: 'Trocknung und finale Qualitätskontrolle'
      }
    ],
    
    pricing: {
      title: 'Teppichreinigung Preise',
      options: [
        {
          name: 'Standard Teppich',
          price: 'ab 4€/m²',
          description: 'Normale Verschmutzung, Standardmaterial',
          features: ['Grundreinigung', 'Fleckenbehandlung', 'Geruchsbeseitigung']
        },
        {
          name: 'Premium Teppich',
          price: 'ab 6€/m²',
          description: 'Hochwertige Materialien, starke Verschmutzung',
          features: ['Intensive Reinigung', 'Spezialbehandlung', 'Materialschutz']
        },
        {
          name: 'Polsterreinigung',
          price: 'ab 15€/Sitzplatz',
          description: 'Sofas, Sessel, Autositze',
          features: ['Tiefenreinigung', 'Fleckenschutz', 'Geruchsneutralisation']
        }
      ]
    },
    
    faqs: [
      {
        question: 'Wie lange dauert die Trocknung?',
        answer: 'Die Trocknungszeit beträgt in der Regel 4-8 Stunden, abhängig von Material, Raumtemperatur und Luftfeuchtigkeit.'
      },
      {
        question: 'Können alle Flecken entfernt werden?',
        answer: 'Die meisten Flecken können wir erfolgreich entfernen. Bei hartnäckigen oder alten Flecken besprechen wir die Erfolgsaussichten vorab.'
      },
      {
        question: 'Ist die Reinigung für Haustiere sicher?',
        answer: 'Ja, wir verwenden haustiersichere Reinigungsmittel. Nach der Trocknung ist der Teppich vollständig sicher für Ihre Haustiere.'
      },
      {
        question: 'Reinigen Sie auch Orientteppiche?',
        answer: 'Ja, wir haben spezielle Erfahrung mit wertvollen Orientteppichen und verwenden schonende, materialgerechte Verfahren.'
      }
    ],
    
    seo: {
      title: 'Teppichreinigung Köln & Bonn | Professionell & Gründlich | SUZ Reinigung',
      description: 'Professionelle Teppichreinigung in Köln und Bonn. ✓ Fleckenentfernung ✓ Geruchsbeseitigung ✓ Allergene entfernen ✓ Schnelle Trocknung',
      keywords: ['Teppichreinigung', 'Polsterreinigung', 'Fleckenentfernung', 'Allergene', 'Teppichreinigung Köln']
    }
  },

  bodenreinigung: {
    id: 'bodenreinigung',
    title: 'Bodenreinigung',
    slug: 'bodenreinigung',
    description: 'Professionelle Pflege für Hartböden, Fliesen, Laminat und mehr. Wir sorgen für glänzende, hygienisch saubere Oberflächen.',
    longDescription: 'Spezialisierte Bodenreinigung für alle Hartböden. Von Fliesen über Parkett bis Laminat - wir sorgen für perfekt saubere und gepflegte Oberflächen.',
    icon: Sparkles,
    image: '/assets/images/services/Bodenreinigung-min.png',
    category: 'Grundreinigung',
    color: 'purple',
    
    features: [
      'Alle Bodenarten',
      'Tiefenreinigung',
      'Versiegelung',
      'Fleckenentfernung',
      'Kratzerentfernung',
      'Glanzauffrischung',
      'Hygienische Reinigung',
      'Materialgerechte Pflege'
    ],
    
    benefits: [
      'Längere Bodenlebensdauer',
      'Glänzende Oberflächen',
      'Hygienische Sauberkeit',
      'Werterhaltung',
      'Professionelle Ausrüstung',
      'Materialschonung',
      'Zeitersparnis',
      'Garantierte Ergebnisse'
    ],
    
    process: [
      {
        step: 1,
        title: 'Bodenanalyse',
        description: 'Bestimmung des Bodentyps und Verschmutzungsgrads'
      },
      {
        step: 2,
        title: 'Vorreinigung',
        description: 'Entfernung von Schmutz und Staub'
      },
      {
        step: 3,
        title: 'Hauptreinigung',
        description: 'Intensive Reinigung mit speziellen Geräten'
      },
      {
        step: 4,
        title: 'Nachbehandlung',
        description: 'Versiegelung oder Politur je nach Bedarf'
      }
    ],
    
    pricing: {
      title: 'Bodenreinigung Preise',
      options: [
        {
          name: 'Fliesen & Steinböden',
          price: 'ab 3€/m²',
          description: 'Grundreinigung für harte Oberflächen',
          features: ['Tiefenreinigung', 'Fugenreinigung', 'Versiegelung optional']
        },
        {
          name: 'Parkett & Laminat',
          price: 'ab 4€/m²',
          description: 'Schonende Reinigung für empfindliche Böden',
          features: ['Materialgerechte Pflege', 'Glanzauffrischung', 'Kratzerentfernung']
        },
        {
          name: 'Spezialböden',
          price: 'auf Anfrage',
          description: 'Naturstein, Marmor, Designer-Böden',
          features: ['Expertenwissen', 'Spezialausrüstung', 'Individualbehandlung']
        }
      ]
    },
    
    faqs: [
      {
        question: 'Welche Böden können Sie reinigen?',
        answer: 'Wir reinigen alle Arten von Hartböden: Fliesen, Parkett, Laminat, Vinyl, Naturstein, Marmor und Spezialböden.'
      },
      {
        question: 'Ist eine Versiegelung notwendig?',
        answer: 'Eine Versiegelung empfiehlt sich bei stark beanspruchten Böden oder nach einer Tiefenreinigung für längeren Schutz.'
      },
      {
        question: 'Können Sie Kratzer entfernen?',
        answer: 'Oberflächliche Kratzer können wir oft erfolgreich behandeln. Bei tiefen Kratzern beraten wir über Reparaturmöglichkeiten.'
      },
      {
        question: 'Wie oft sollte eine Grundreinigung stattfinden?',
        answer: 'Für Privathaushalte empfehlen wir 1-2 mal jährlich, für gewerbliche Flächen je nach Beanspruchung alle 3-6 Monate.'
      }
    ],
    
    seo: {
      title: 'Bodenreinigung Köln & Bonn | Parkett, Fliesen, Laminat | SUZ Reinigung',
      description: 'Professionelle Bodenreinigung in Köln und Bonn. ✓ Alle Bodenarten ✓ Tiefenreinigung ✓ Versiegelung ✓ Materialgerechte Pflege',
      keywords: ['Bodenreinigung', 'Parkettreinigung', 'Fliesenreinigung', 'Laminatreinigung', 'Bodenreinigung Köln']
    }
  },

  gemeinschaftsraeume: {
    id: 'gemeinschaftsraeume',
    title: 'Gemeinschaftsräume',
    slug: 'gemeinschaftsraeume',
    description: 'Zuverlässige Reinigung von Treppenhäusern, Fluren und Gemeinschaftsbereichen für Mehrfamilienhäuser und Wohnanlagen.',
    longDescription: 'Professionelle Reinigung von Gemeinschaftsräumen in Wohnanlagen. Für einen gepflegten Eindruck und Wohlfühlambiente aller Bewohner.',
    icon: Users,
    image: '/assets/images/services/Gemeinschaftsräume-min.png',
    category: 'Hausreinigung',
    color: 'orange',
    
    features: [
      'Treppenhausreinigung',
      'Flurreinigung',
      'Keller & Dachboden',
      'Briefkastenanlagen',
      'Aufzugsreinigung',
      'Fensterreinigung',
      'Müllplatzreinigung',
      'Außenbereiche'
    ],
    
    benefits: [
      'Gepflegter Gesamteindruck',
      'Wertsteigerung der Immobilie',
      'Zufriedene Mieter',
      'Regelmäßige Termine',
      'Professionelle Ausführung',
      'Flexible Reinigungszeiten',
      'Langfristige Partnerschaften',
      'Faire Preise'
    ],
    
    process: [
      {
        step: 1,
        title: 'Bestandsaufnahme',
        description: 'Erfassung aller zu reinigenden Bereiche'
      },
      {
        step: 2,
        title: 'Reinigungsplan',
        description: 'Erstellung eines individuellen Reinigungsplans'
      },
      {
        step: 3,
        title: 'Regelmäßige Reinigung',
        description: 'Durchführung nach vereinbartem Rhythmus'
      },
      {
        step: 4,
        title: 'Qualitätskontrolle',
        description: 'Regelmäßige Überprüfung der Reinigungsqualität'
      }
    ],
    
    pricing: {
      title: 'Gemeinschaftsräume Preise',
      options: [
        {
          name: 'Wöchentliche Reinigung',
          price: 'ab 45€/Woche',
          description: 'Kleinere Wohnanlagen bis 10 Parteien',
          features: ['Treppenhaus', 'Eingangsbereiche', 'Müllplatz']
        },
        {
          name: 'Große Wohnanlagen',
          price: 'ab 80€/Woche',
          description: 'Mehrere Treppenhäuser, Aufzüge',
          features: ['Alle Gemeinschaftsbereiche', 'Aufzugsreinigung', 'Außenbereiche']
        },
        {
          name: 'Sonderreinigungen',
          price: 'auf Anfrage',
          description: 'Grundreinigungen, Renovierungen',
          features: ['Intensive Reinigung', 'Spezialgeräte', 'Flexible Termine']
        }
      ]
    },
    
    faqs: [
      {
        question: 'Wie oft sollten Gemeinschaftsräume gereinigt werden?',
        answer: 'Wir empfehlen eine wöchentliche Reinigung für Treppenhäuser und Eingangsbereiche, je nach Nutzungsintensität.'
      },
      {
        question: 'Können Sie auch am Wochenende reinigen?',
        answer: 'Ja, wir bieten flexible Reinigungszeiten, auch am Wochenende oder an Feiertagen, um Bewohner nicht zu stören.'
      },
      {
        question: 'Was ist bei der Schlüsselübergabe zu beachten?',
        answer: 'Wir besprechen die Schlüsselübergabe individuell. Oft arbeiten wir mit Hausverwaltungen oder Hausmeistern zusammen.'
      },
      {
        question: 'Reinigen Sie auch Aufzüge?',
        answer: 'Ja, die Aufzugsreinigung gehört zu unserem Standard-Service für Gemeinschaftsbereiche, inklusive Kabine und Bedienelemente.'
      }
    ],
    
    seo: {
      title: 'Treppenhausreinigung Köln & Bonn | Gemeinschaftsräume | SUZ Reinigung',
      description: 'Professionelle Reinigung von Treppenhäusern und Gemeinschaftsräumen in Köln und Bonn. ✓ Regelmäßig ✓ Zuverlässig ✓ Faire Preise',
      keywords: ['Treppenhausreinigung', 'Gemeinschaftsräume', 'Mehrfamilienhaus', 'Wohnanlage', 'Hausreinigung Köln']
    }
  },

  bueroreinigung: {
    id: 'bueroreinigung',
    title: 'Büroreinigung',
    slug: 'bueroreinigung',
    description: 'Professionelle Reinigung von Büroflächen und Arbeitsplätzen für ein sauberes und produktives Arbeitsumfeld.',
    longDescription: 'Büroreinigung für moderne Arbeitsplätze. Wir sorgen für hygienische Sauberkeit und ein produktives Arbeitsumfeld für Ihre Mitarbeiter.',
    icon: Briefcase,
    image: '/assets/images/services/Büroreinigung-min.png',
    category: 'Gewerbereinigung',
    color: 'blue',
    
    features: [
      'Arbeitsplatzreinigung',
      'Sanitärreinigung',
      'Küchen & Pausenräume',
      'Konferenzräume',
      'Empfangsbereiche',
      'Fensterreinigung',
      'Müllentsorgung',
      'Desinfektionsservice'
    ],
    
    benefits: [
      'Produktiveres Arbeitsklima',
      'Gesunde Mitarbeiter',
      'Professioneller Eindruck',
      'Flexible Reinigungszeiten',
      'Hygiene-Standards',
      'Langfristige Partnerschaften',
      'Kosteneffizienz',
      'Zuverlässiger Service'
    ],
    
    process: [
      {
        step: 1,
        title: 'Büro-Analyse',
        description: 'Begehung und Ermittlung der Reinigungsanforderungen'
      },
      {
        step: 2,
        title: 'Reinigungskonzept',
        description: 'Erstellung eines maßgeschneiderten Reinigungsplans'
      },
      {
        step: 3,
        title: 'Regelmäßige Reinigung',
        description: 'Durchführung nach Ihrem gewünschten Rhythmus'
      },
      {
        step: 4,
        title: 'Qualitätsmanagement',
        description: 'Kontinuierliche Kontrolle und Optimierung'
      }
    ],
    
    pricing: {
      title: 'Büroreinigung Preise',
      options: [
        {
          name: 'Kleinbüro',
          price: 'ab 120€/Monat',
          description: 'Bis 100m², wöchentliche Reinigung',
          features: ['Arbeitsplätze', 'Sanitärräume', 'Küche', 'Müllentsorgung']
        },
        {
          name: 'Mittelständisches Büro',
          price: 'ab 280€/Monat',
          description: 'Bis 300m², 2x wöchentlich',
          features: ['Erweiterte Bereiche', 'Konferenzräume', 'Empfang', 'Fenster']
        },
        {
          name: 'Großraumbüro',
          price: 'auf Anfrage',
          description: 'Über 300m², täglich oder individuell',
          features: ['Vollservice', 'Spezialreinigungen', 'Notfallservice', '24/7 verfügbar']
        }
      ]
    },
    
    faqs: [
      {
        question: 'Zu welchen Zeiten können Sie reinigen?',
        answer: 'Wir reinigen flexibel nach Ihren Bedürfnissen: vor Arbeitsbeginn, in der Mittagspause, nach Feierabend oder am Wochenende.'
      },
      {
        question: 'Sind Ihre Mitarbeiter versichert?',
        answer: 'Ja, alle unsere Mitarbeiter sind vollständig versichert und haben Zugang zu Ihren Geschäftsräumen nur unter strengen Sicherheitsvorkehrungen.'
      },
      {
        question: 'Können Sie auch kurzfristige Reinigungen durchführen?',
        answer: 'Ja, für wichtige Termine oder Besuch können wir oft kurzfristige Zusatzreinigungen anbieten. Sprechen Sie uns einfach an.'
      },
      {
        question: 'Verwenden Sie umweltfreundliche Reinigungsmittel?',
        answer: 'Ja, wir setzen auf ökologische und gesundheitsschonende Reinigungsmittel, die trotzdem höchste Reinigungsstandards erreichen.'
      }
    ],
    
    seo: {
      title: 'Büroreinigung Köln & Bonn | Professionell & Zuverlässig | SUZ Reinigung',
      description: 'Professionelle Büroreinigung in Köln und Bonn. ✓ Flexible Zeiten ✓ Hygiene-Standards ✓ Arbeitsplatzreinigung ✓ Langfristige Partnerschaften',
      keywords: ['Büroreinigung', 'Arbeitsplatzreinigung', 'Gewerbliche Reinigung', 'Unternehmen', 'Büroreinigung Köln']
    }
  },

  krankenhausreinigung: {
    id: 'krankenhausreinigung',
    title: 'Krankenhausreinigung',
    slug: 'krankenhausreinigung',
    description: 'Spezialisierte Reinigung für medizinische Einrichtungen mit höchsten Hygienestandards und Desinfektionsprotokollen für Patientensicherheit.',
    longDescription: 'Spezialisierte Krankenhausreinigung mit höchsten Hygienestandards. Zertifiziert für medizinische Einrichtungen, Praxen und Gesundheitszentren.',
    icon: Heart,
    image: '/assets/images/services/Krankenhausreinigung-min.png',
    category: 'Medizinische Reinigung',
    color: 'red',
    
    features: [
      'Krankenhauszertifiziert',
      'Sterilisation',
      'Desinfektionsprotokolle',
      'OP-Bereich geeignet',
      'Patientenzimmer',
      'Intensivstationen',
      'Notaufnahme',
      'Laborräume'
    ],
    
    benefits: [
      'Höchste Hygiene-Standards',
      'Patientensicherheit',
      'Zertifizierte Verfahren',
      'Speziell geschultes Personal',
      'Compliance mit Vorschriften',
      'Infektionsschutz',
      '24/7 Notfall-Service',
      'Dokumentierte Verfahren'
    ],
    
    process: [
      {
        step: 1,
        title: 'Hygiene-Assessment',
        description: 'Analyse der medizinischen Anforderungen'
      },
      {
        step: 2,
        title: 'Protokoll-Entwicklung',
        description: 'Erstellung spezifischer Reinigungs- und Desinfektionsprotokolle'
      },
      {
        step: 3,
        title: 'Zertifizierte Durchführung',
        description: 'Reinigung nach medizinischen Standards'
      },
      {
        step: 4,
        title: 'Dokumentation',
        description: 'Vollständige Dokumentation aller durchgeführten Maßnahmen'
      }
    ],
    
    pricing: {
      title: 'Krankenhausreinigung Preise',
      options: [
        {
          name: 'Arztpraxis',
          price: 'ab 180€/Monat',
          description: 'Kleinere Praxen, wöchentliche Reinigung',
          features: ['Behandlungsräume', 'Wartebereiche', 'Sanitäranlagen', 'Desinfektion']
        },
        {
          name: 'Fachklinik',
          price: 'ab 450€/Monat',
          description: 'Spezialisierte medizinische Einrichtungen',
          features: ['OP-Bereiche', 'Sterilisation', 'Patientenzimmer', 'Intensivbereich']
        },
        {
          name: 'Krankenhaus',
          price: 'auf Anfrage',
          description: 'Große Kliniken, 24/7 Service',
          features: ['Vollumfänglicher Service', 'Notfall-Bereitschaft', 'Compliance-Management', 'Personalschulung']
        }
      ]
    },
    
    faqs: [
      {
        question: 'Sind Sie für Krankenhäuser zertifiziert?',
        answer: 'Ja, wir sind nach den aktuellen Standards für medizinische Einrichtungen zertifiziert und bilden unser Personal kontinuierlich weiter.'
      },
      {
        question: 'Können Sie auch in OP-Bereichen reinigen?',
        answer: 'Ja, unser geschultes Personal ist für die Reinigung von Operationssälen und sterilen Bereichen nach höchsten Standards ausgebildet.'
      },
      {
        question: 'Wie wird die Hygiene dokumentiert?',
        answer: 'Wir dokumentieren alle Reinigungsvorgänge lückenlos und stellen Ihnen regelmäßige Berichte für Ihre Compliance zur Verfügung.'
      },
      {
        question: 'Arbeiten Sie auch nachts?',
        answer: 'Ja, wir bieten 24/7-Service und können auch in den Nachtstunden reinigen, um den Klinikbetrieb nicht zu stören.'
      }
    ],
    
    seo: {
      title: 'Krankenhausreinigung Köln & Bonn | Zertifiziert & Steril | SUZ Reinigung',
      description: 'Zertifizierte Krankenhausreinigung in Köln und Bonn. ✓ Höchste Hygiene-Standards ✓ OP-Bereiche ✓ Desinfektionsprotokolle ✓ 24/7 Service',
      keywords: ['Krankenhausreinigung', 'Medizinische Reinigung', 'Hygiene', 'Desinfektion', 'Gesundheitswesen', 'Klinik Reinigung']
    }
  }
};

export default services;