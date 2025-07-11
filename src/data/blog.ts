import { BlogPost, BlogCategory, BlogAuthor, BLOG_CATEGORIES } from '@/types/blog';

// Blog Authors
export const blogAuthors: Record<string, BlogAuthor> = {
  'stefan-mueller': {
    id: 'stefan-mueller',
    name: 'Stefan Müller',
    title: 'Geschäftsführer & Reinigungsexperte',
    bio: 'Über 20 Jahre Erfahrung in der professionellen Gebäudereinigung. Experte für Büro- und Gewerbereinigung in Köln und Umgebung.',
    expertise: ['Büroreinigung', 'Fensterreinigung', 'Qualitätsmanagement', 'Umweltfreundliche Reinigung']
  },
  'maria-schmidt': {
    id: 'maria-schmidt',
    name: 'Maria Schmidt',
    title: 'Hausreinigungsexpertin',
    bio: 'Spezialistin für Hausreinigung und Grundreinigung. Entwickelt individuelle Reinigungskonzepte für Privathaushalte.',
    expertise: ['Hausreinigung', 'Grundreinigung', 'Haushaltstipps', 'Allergiker-Reinigung']
  }
};

// Blog Categories
export const blogCategories: Record<string, BlogCategory> = {
  [BLOG_CATEGORIES.CLEANING_TIPS]: {
    id: BLOG_CATEGORIES.CLEANING_TIPS,
    name: 'Reinigungstipps',
    slug: 'reinigungstipps',
    description: 'Professionelle Tipps und Tricks für die optimale Reinigung',
    color: 'blue',
    icon: '💡',
    seoTitle: 'Reinigungstipps vom Profi | SUZ Reinigung Köln',
    seoDescription: 'Expertentipps für effektive Reinigung von Büro und Zuhause. Professionelle Anleitungen vom Reinigungsservice aus Köln.'
  },
  [BLOG_CATEGORIES.OFFICE_MAINTENANCE]: {
    id: BLOG_CATEGORIES.OFFICE_MAINTENANCE,
    name: 'Büropflege',
    slug: 'bueropflege',
    description: 'Alles rund um professionelle Büroreinigung und -pflege',
    color: 'indigo',
    icon: '🏢',
    seoTitle: 'Büroreinigung & Büropflege Tipps | Köln',
    seoDescription: 'Professionelle Büroreinigung in Köln. Tipps für saubere Arbeitsplätze und hygienische Büroumgebungen.'
  },
  [BLOG_CATEGORIES.SEASONAL_GUIDES]: {
    id: BLOG_CATEGORIES.SEASONAL_GUIDES,
    name: 'Saisonale Reinigung',
    slug: 'saisonale-reinigung',
    description: 'Reinigungsguides für jede Jahreszeit',
    color: 'green',
    icon: '🌸',
    seoTitle: 'Saisonale Reinigungstipps | SUZ Reinigung',
    seoDescription: 'Reinigungstipps für Frühling, Sommer, Herbst und Winter. Saisonale Reinigungsarbeiten vom Profi.'
  }
};

// Sample Blog Posts
export const blogPosts: BlogPost[] = [
  {
    id: 'bueroreinigung-koeln-tipps',
    title: 'Büroreinigung in Köln: 10 Profi-Tipps für saubere Arbeitsplätze',
    subtitle: 'Wie Sie Ihr Büro in Köln professionell sauber halten',
    slug: 'bueroreinigung-koeln-tipps',
    excerpt: 'Entdecken Sie die wichtigsten Tipps für eine effektive Büroreinigung in Köln. Von der täglichen Pflege bis zur Grundreinigung - so bleibt Ihr Arbeitsplatz hygienisch und einladend.',
    content: `
# Büroreinigung in Köln: 10 Profi-Tipps für saubere Arbeitsplätze

Die richtige Büroreinigung ist entscheidend für ein produktives Arbeitsumfeld. Als Reinigungsexperte mit über 20 Jahren Erfahrung in Köln und Umgebung teile ich die wichtigsten Tipps für eine effektive Büropflege.

## 1. Tägliche Oberflächenreinigung

**Arbeitsplätze täglich desinfizieren**: Besonders wichtig sind Tastatur, Maus, Telefon und Schreibtischoberfläche. Verwenden Sie alkoholbasierte Desinfektionstücher für eine schnelle und effektive Reinigung.

## 2. Richtige Mülltrennung

In Köln ist die Mülltrennung besonders wichtig. Stellen Sie verschiedene Behälter für:
- Papier und Karton
- Gelber Sack (Verpackungen)
- Restmüll
- Biomüll (falls vorhanden)

## 3. Fensterreinigung für mehr Licht

Saubere Fenster verbessern die Arbeitsatmosphäre erheblich. In Köln sollten Bürofenster mindestens 4x pro Jahr professionell gereinigt werden - häufiger bei Standorten nahe dem Rhein oder in verkehrsreichen Gebieten. Für optimale Ergebnisse empfehlen wir unsere <a href="/services/fensterreinigung" class="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">professionelle Fensterreinigung</a>.

## 4. Sanitärbereich hygienisch halten

**Tägliche Reinigung ist Pflicht**:
- Toiletten und Waschbecken desinfizieren
- Seifenspender und Handtuchspender auffüllen
- Böden feucht wischen
- Spiegel streifenfrei reinigen

## 5. Teppichpflege im Büro

Büroteppiche in Köln sind besonderen Belastungen ausgesetzt:
- Wöchentlich staubsaugen
- Monatlich Fleckenbehandlung
- Jährlich <a href="/services/teppichreinigung" class="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">professionelle Teppichreinigung</a>

## 6. Küchenbereich professionell reinigen

Die Büroküche ist ein Hygiene-Hotspot:
- Kühlschrank wöchentlich reinigen
- Mikrowelle täglich säubern
- Kaffeemaschine regelmäßig entkalken
- Spülmaschine monatlich durchlaufen lassen

## 7. Luftqualität verbessern

**Regelmäßiges Lüften**: Besonders in den Wintermonaten ist die Luftqualität in Kölner Büros oft schlecht. Lüften Sie 3-4x täglich für 5-10 Minuten.

## 8. Elektronikgeräte richtig reinigen

- Computer und Bildschirme mit antistatischen Tüchern
- Drucker und Kopierer entstauben
- Telefone und Headsets desinfizieren

## 9. Eingangsbereich sauber halten

Der erste Eindruck zählt:
- Fußmatten täglich reinigen
- Empfangstresen desinfizieren
- Glasflächen streifenfrei putzen
- Pflanzen entstauben

## 10. Professionelle Unterstützung

Für Unternehmen in Köln empfiehlt sich eine professionelle Büroreinigung 2-3x pro Woche. Dies gewährleistet:
- Konstant hohe Hygienestandards
- Mehr Zeit für das Kerngeschäft
- Professionelle Ausrüstung und Reinigungsmittel
- Flexibilität bei besonderen Anforderungen

## Fazit

Eine saubere Büroumgebung steigert die Produktivität und das Wohlbefinden Ihrer Mitarbeiter. Mit diesen Tipps halten Sie Ihr Büro in Köln professionell sauber.

Für Unternehmen bieten wir auch <a href="/services/bueroreinigung" class="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">professionelle Büroreinigung</a> an. Privatkunden profitieren von unserer zuverlässigen <a href="/services/hausreinigung" class="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">Hausreinigung</a>. Unser <a href="/blog/hausreinigung-fruehjahrsputz-2024" class="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">Frühjahrsputz Guide</a> hilft bei der systematischen Hausreinigung.

**Benötigen Sie professionelle Unterstützung?** Kontaktieren Sie uns für ein kostenloses Beratungsgespräch zur optimalen Büroreinigung in Köln.
    `,
    author: blogAuthors['stefan-mueller'],
    publishedAt: '2024-01-15',
    readingTime: 8,
    category: blogCategories[BLOG_CATEGORIES.OFFICE_MAINTENANCE],
    tags: ['Büroreinigung', 'Köln', 'Arbeitsplatz', 'Hygiene', 'Tipps'],
    featuredImage: '/images/blog/bueroreinigung-koeln.jpg',
    seo: {
      metaTitle: 'Büroreinigung Köln: 10 Profi-Tipps für saubere Arbeitsplätze | SUZ Reinigung',
      metaDescription: 'Professionelle Tipps für Büroreinigung in Köln. Erfahren Sie, wie Sie Ihren Arbeitsplatz hygienisch und einladend halten. ✓ Expertenrat ✓ Köln-spezifisch',
      keywords: ['Büroreinigung Köln', 'Arbeitsplatz reinigen', 'Büropflege', 'Reinigungstipps', 'Hygiene Büro'],
      openGraph: {
        title: 'Büroreinigung Köln: 10 Profi-Tipps für saubere Arbeitsplätze',
        description: 'Expertentipps für professionelle Büroreinigung in Köln. Hygienische Arbeitsplätze für mehr Produktivität.',
        image: '/images/blog/bueroreinigung-koeln.jpg',
        type: 'article'
      },
      schema: {
        headline: 'Büroreinigung in Köln: 10 Profi-Tipps für saubere Arbeitsplätze',
        datePublished: '2024-01-15',
        author: 'Stefan Müller',
        publisher: 'SUZ Reinigung',
        mainEntityOfPage: 'https://www.suzreinigung.de/blog/bueroreinigung-koeln-tipps'
      }
    },
    status: 'published',
    featured: true
  },
  {
    id: 'hausreinigung-fruehling-2024',
    title: 'Frühjahrsputz 2024: Komplette Hausreinigung in 7 Schritten',
    subtitle: 'Ihr Zuhause optimal auf das Frühjahr vorbereiten',
    slug: 'hausreinigung-fruejahrsputz-2024',
    excerpt: 'Der ultimative Guide für den Frühjahrsputz. Schritt-für-Schritt Anleitung für eine gründliche Hausreinigung, die Ihr Zuhause zum Strahlen bringt.',
    content: `
# Frühjahrsputz 2024: Komplette Hausreinigung in 7 Schritten

Der Frühling steht vor der Tür und es ist Zeit für den traditionellen Frühjahrsputz. Als Reinigungsexperte zeige ich Ihnen, wie Sie Ihr Zuhause systematisch und effektiv auf die warme Jahreszeit vorbereiten.

## Schritt 1: Vorbereitung und Planung

**Zeitplan erstellen**: Planen Sie 2-3 Wochenenden für eine gründliche Hausreinigung ein.

**Reinigungsmittel und Ausrüstung**:
- Allzweckreiniger
- Glasreiniger
- Entkalker
- Microfasertücher
- Staubsauger mit Aufsätzen
- Dampfreiniger (optional)

## Schritt 2: Entrümpelung

Beginnen Sie in jedem Raum mit dem Aussortieren:
- Was nicht mehr gebraucht wird → entsorgen
- Kleidung für die Kleiderspende → sammeln
- Defekte Gegenstände → reparieren oder entsorgen

## Schritt 3: Fenster und Rahmen reinigen

**Innenreinigung**:
- Rahmen entstauben und feucht abwischen
- Scheiben mit Glasreiniger und Abzieher reinigen
- Fensterbänke gründlich säubern

**Außenreinigung**:
- Bei mehrstöckigen Häusern professionelle Hilfe in Anspruch nehmen
- Rollläden und Markisen kontrollieren

## Schritt 4: Wände und Decken

- Spinnweben entfernen
- Lichtschalter und Steckdosen reinigen
- Flecken an Wänden behandeln
- Bei Bedarf Farbanstrich erneuern

## Schritt 5: Böden gründlich reinigen

**Hartböden**:
- Gründlich staubsaugen
- Feucht wischen mit geeignetem Reiniger
- Fugen bei Fliesen extra behandeln

**Teppiche**:
- Intensiv staubsaugen
- Fleckenbehandlung
- Bei starker Verschmutzung <a href="/services/teppichreinigung" class="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">professionelle Teppichreinigung</a>

## Schritt 6: Möbel und Einrichtung

- Möbel abstauben und polieren
- Polstermöbel absaugen
- Matratzen wenden und absaugen
- Bettwäsche bei 60°C waschen

## Schritt 7: Küche und Bad intensiv reinigen

**Küche**:
- Kühlschrank abtauen und reinigen
- Backofen und Herd entfetten
- Abzugshaube reinigen
- Fliesen und Fugen säubern

**Badezimmer**:
- Kalk an Armaturen entfernen
- Duschkabine gründlich reinigen
- Toilette desinfizieren
- Fugen erneuern falls nötig

## Profi-Tipps für den Frühjahrsputz

1. **Von oben nach unten arbeiten**
2. **Raum für Raum systematisch vorgehen**
3. **Ausreichend lüften während der Reinigung**
4. **Schwere Arbeiten auf mehrere Tage verteilen**
5. **Bei Überforderung professionelle Hilfe holen**

## Wann professionelle Hausreinigung beauftragen?

Bei zeitlichen Engpässen oder körperlichen Einschränkungen ist eine <a href="/services/hausreinigung" class="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">professionelle Grundreinigung</a> die ideale Lösung. Besonders in der Region Köln/Bonn nutzen viele Familien professionelle Reinigungsdienste für den Frühjahrsputz.

**Vorteile der professionellen Hausreinigung**:
- Zeitersparnis
- Professionelle Ausrüstung
- Erfahrung bei hartnäckigen Verschmutzungen
- Garantie auf die Reinigungsleistung

## Fazit

Mit systematischem Vorgehen wird der Frühjahrsputz zu einer überschaubaren Aufgabe. Ihr Zuhause wird nicht nur sauber, sondern Sie schaffen auch Platz für neue Energie im Frühjahr.

Für <a href="/services/bueroreinigung" class="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">professionelle Büroreinigung</a> in Köln kontaktieren Sie SUZ Reinigung. Unser <a href="/services/hausreinigung" class="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">Hausreinigungsservice</a> übernimmt alle Aufgaben für Sie. Lesen Sie auch unsere <a href="/blog/bueroreinigung-koeln-tipps" class="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">Büroreinigung Tipps</a> für optimale Arbeitsplatz-Hygiene.

**Benötigen Sie Unterstützung beim Frühjahrsputz?** Wir bieten professionelle Grundreinigung für Ihr Zuhause.
    `,
    author: blogAuthors['maria-schmidt'],
    publishedAt: '2024-02-20',
    readingTime: 10,
    category: blogCategories[BLOG_CATEGORIES.SEASONAL_GUIDES],
    tags: ['Frühjahrsputz', 'Hausreinigung', 'Grundreinigung', 'Reinigungsanleitung'],
    featuredImage: '/images/blog/fruehjahrsputz-2024.jpg',
    seo: {
      metaTitle: 'Frühjahrsputz 2024: Komplette Hausreinigung in 7 Schritten | SUZ Reinigung',
      metaDescription: 'Ultimativer Frühjahrsputz Guide 2024. ✓ 7-Schritte Anleitung ✓ Profi-Tipps ✓ Hausreinigung leicht gemacht. Jetzt lesen!',
      keywords: ['Frühjahrsputz 2024', 'Hausreinigung Anleitung', 'Grundreinigung', 'Putztipps'],
      openGraph: {
        title: 'Frühjahrsputz 2024: Komplette Hausreinigung in 7 Schritten',
        description: 'Der ultimative Guide für den Frühjahrsputz 2024. Profi-Anleitung für eine gründliche Hausreinigung.',
        image: '/images/blog/fruehjahrsputz-2024.jpg',
        type: 'article'
      },
      schema: {
        headline: 'Frühjahrsputz 2024: Komplette Hausreinigung in 7 Schritten',
        datePublished: '2024-02-20',
        author: 'Maria Schmidt',
        publisher: 'SUZ Reinigung',
        mainEntityOfPage: 'https://www.suzreinigung.de/blog/hausreinigung-fruehjahrsputz-2024'
      }
    },
    status: 'published',
    featured: true
  },
  {
    id: 'teppichreinigung-koeln-guide',
    title: 'Teppichreinigung in Köln: Professionelle Pflege für langanhaltende Sauberkeit',
    subtitle: 'Wie Sie Ihre Teppiche richtig reinigen und pflegen',
    slug: 'teppichreinigung-koeln-guide',
    excerpt: 'Entdecken Sie die besten Methoden für die Teppichreinigung in Köln. Von der täglichen Pflege bis zur professionellen Tiefenreinigung - so bleiben Ihre Teppiche lange schön.',
    content: `
# Teppichreinigung in Köln: Professionelle Pflege für langanhaltende Sauberkeit

Teppiche verleihen jedem Raum Wärme und Gemütlichkeit, benötigen aber die richtige Pflege, um ihre Schönheit zu bewahren. Als Reinigungsexperte in Köln zeige ich Ihnen, wie Sie Ihre Teppiche optimal pflegen und wann eine professionelle Reinigung sinnvoll ist.

## Warum ist regelmäßige Teppichreinigung wichtig?

**Gesundheit und Hygiene**: Teppiche sammeln Staub, Allergene und Bakterien. Besonders in Köln, wo die Luftfeuchtigkeit oft hoch ist, können sich Milben und Schimmel bilden.

**Werterhaltung**: Regelmäßige Pflege verlängert die Lebensdauer Ihrer Teppiche erheblich.

**Optik**: Saubere Teppiche sehen nicht nur besser aus, sondern riechen auch frisch.

## Tägliche Teppichpflege - Die Grundlagen

### 1. Regelmäßiges Staubsaugen

**Häufigkeit**: Mindestens 2-3x pro Woche in stark frequentierten Bereichen
- Verwenden Sie die richtige Bürsteneinstellung
- Saugen Sie langsam und gründlich
- Achten Sie besonders auf Ecken und Kanten

### 2. Sofortige Fleckenbehandlung

**Goldene Regel**: Je schneller Sie handeln, desto besser
- Flüssigkeiten sofort abtupfen (nicht reiben!)
- Von außen nach innen arbeiten
- Kaltes Wasser für die meisten Flecken verwenden

## Professionelle Teppichreinigung in Köln

### Wann ist eine Profi-Reinigung nötig?

- **Mindestens 1x jährlich** für normale Haushalte
- **2x jährlich** bei Haustieren oder Allergikern
- **Sofort** bei hartnäckigen Flecken oder Gerüchen
- **Nach Wasserschäden** oder Überschwemmungen

### Verschiedene Reinigungsverfahren

**1. Heißwasserextraktion**
- Ideal für die meisten Teppicharten
- Entfernt tiefsitzenden Schmutz
- Kurze Trocknungszeit

**2. Trockenreinigung**
- Schonend für empfindliche Materialien
- Sofort wieder begehbar
- Perfekt für Büros

**3. Schaum-Reinigung**
- Gut für stark verschmutzte Bereiche
- Intensive Reinigungswirkung
- Längere Trocknungszeit

## Spezielle Herausforderungen in Köln

### Rheinische Luftfeuchtigkeit

Die hohe Luftfeuchtigkeit in Köln kann zu Problemen führen:
- Längere Trocknungszeiten nach der Reinigung
- Erhöhtes Schimmelrisiko
- Verstärkte Geruchsbildung

**Lösung**: Professionelle Reinigung mit speziellen Trocknungsgeräten

### Stadtstaub und Verkehrsemissionen

Köln ist eine Großstadt mit entsprechender Belastung:
- Feinstaub setzt sich tief in Teppichfasern
- Abgase können Verfärbungen verursachen
- Häufigere Reinigung notwendig

## DIY vs. Professionelle Reinigung

### Was Sie selbst machen können:

- Regelmäßiges Staubsaugen
- Sofortige Fleckenbehandlung
- Oberflächliche Reinigung mit Teppichschaum
- Geruchsneutralisation mit Natron

### Wann Sie Profis brauchen:

- Tiefenreinigung
- Hartnäckige Flecken (Wein, Blut, Urin)
- Geruchsentfernung
- Allergen-Entfernung
- Wertvolle oder antike Teppiche

## Teppicharten und ihre Pflege

### Hochflor-Teppiche
- Besonders anfällig für Verschmutzung
- Benötigen spezielle Bürstenaufsätze
- Professionelle Reinigung alle 6-8 Monate

### Orientteppiche
- Nur von Spezialisten reinigen lassen
- Besondere Vorsicht bei Farben
- Niemals selbst mit Wasser behandeln

### Synthetische Teppiche
- Pflegeleichter als Naturfasern
- Vertragen die meisten Reinigungsmittel
- Jährliche Profi-Reinigung ausreichend

## Kosten der Teppichreinigung in Köln

**Richtwerte pro Quadratmeter**:
- Grundreinigung: 8-15 Euro
- Fleckenbehandlung: 15-25 Euro
- Spezialreinigung: 20-35 Euro

**Faktoren, die den Preis beeinflussen**:
- Teppichart und -größe
- Verschmutzungsgrad
- Anfahrtsweg
- Zusatzleistungen

## Tipps für die Auswahl eines Reinigungsdienstes

1. **Erfahrung und Referenzen prüfen**
2. **Versicherungsschutz erfragen**
3. **Kostenvoranschlag einholen**
4. **Reinigungsverfahren erklären lassen**
5. **Garantie auf die Reinigungsleistung**

## Nachbehandlung und Schutz

### Imprägnierung
- Schützt vor neuen Flecken
- Erleichtert die tägliche Pflege
- Hält 6-12 Monate

### Richtige Trocknung
- Gute Belüftung sicherstellen
- Heizung nicht zu hoch stellen
- Teppich nicht betreten bis vollständig trocken

## Fazit

Eine professionelle Teppichreinigung ist eine Investition in Gesundheit, Wohnkomfort und Werterhaltung. In Köln mit seinen besonderen klimatischen Bedingungen ist regelmäßige Pflege besonders wichtig.

Für <a href="/services/bueroreinigung" class="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">professionelle Büroreinigung</a> und <a href="/services/hausreinigung" class="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">Hausreinigung</a> in Köln stehen wir Ihnen gerne zur Verfügung. Lesen Sie auch unsere Tipps zur <a href="/blog/bueroreinigung-koeln-tipps" class="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">Büroreinigung</a> und zum <a href="/blog/hausreinigung-fruehjahrsputz-2024" class="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">Frühjahrsputz</a>.

**Benötigen Sie professionelle Teppichreinigung?** Kontaktieren Sie uns für ein kostenloses Beratungsgespräch und individuelles Angebot.
    `,
    author: blogAuthors['stefan-mueller'],
    publishedAt: '2024-03-10',
    readingTime: 12,
    category: blogCategories[BLOG_CATEGORIES.CLEANING_TIPS],
    tags: ['Teppichreinigung', 'Köln', 'Teppichpflege', 'Fleckenentfernung', 'Hausreinigung'],
    featuredImage: '/images/blog/teppichreinigung-koeln.jpg',
    seo: {
      metaTitle: 'Teppichreinigung Köln: Professionelle Pflege & Reinigung | SUZ Reinigung',
      metaDescription: 'Professionelle Teppichreinigung in Köln. ✓ Fleckenentfernung ✓ Tiefenreinigung ✓ Alle Teppicharten ✓ Kostenloser Kostenvoranschlag',
      keywords: ['Teppichreinigung Köln', 'Teppichpflege', 'Fleckenentfernung', 'Teppich reinigen', 'Polsterreinigung'],
      openGraph: {
        title: 'Teppichreinigung Köln: Professionelle Pflege für langanhaltende Sauberkeit',
        description: 'Expertentipps für Teppichreinigung in Köln. Von der täglichen Pflege bis zur professionellen Tiefenreinigung.',
        image: '/images/blog/teppichreinigung-koeln.jpg',
        type: 'article'
      },
      schema: {
        headline: 'Teppichreinigung in Köln: Professionelle Pflege für langanhaltende Sauberkeit',
        datePublished: '2024-03-10',
        author: 'Stefan Müller',
        publisher: 'SUZ Reinigung',
        mainEntityOfPage: 'https://www.suzreinigung.de/blog/teppichreinigung-koeln-guide'
      }
    },
    status: 'published',
    featured: true
  }
];

// Helper functions
export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.featured && post.status === 'published');
};

export const getPostsByCategory = (categoryId: string): BlogPost[] => {
  return blogPosts.filter(post => 
    post.category.id === categoryId && post.status === 'published'
  );
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug && post.status === 'published');
};