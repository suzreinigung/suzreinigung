import { useState, useMemo } from 'react';
import { trackBusinessEvents } from '@/lib/analytics';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
}

interface EnhancedFAQProps {
  showSearch?: boolean;
  showCategories?: boolean;
  maxItems?: number;
}

const EnhancedFAQ = ({ 
  showSearch = true, 
  showCategories = true, 
  maxItems 
}: EnhancedFAQProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const faqData: FAQItem[] = [
    // Büroreinigung
    {
      id: 'office-frequency',
      question: 'Wie oft sollte ein Büro gereinigt werden?',
      answer: 'Das hängt von der Bürogröße und Mitarbeiteranzahl ab. Typischerweise empfehlen wir 2-3x pro Woche für normale Büros und täglich für hochfrequentierte Bereiche wie Empfang und Besprechungsräume.',
      category: 'bueroreinigung',
      keywords: ['büro', 'häufigkeit', 'mitarbeiter', 'tage', 'woche']
    },
    {
      id: 'office-timing',
      question: 'Können Sie außerhalb der Arbeitszeiten reinigen?',
      answer: 'Ja, wir bieten flexible Zeiten an - früh morgens vor Arbeitsbeginn, abends nach Feierabend oder am Wochenende, damit Ihr Arbeitsablauf nicht gestört wird.',
      category: 'bueroreinigung',
      keywords: ['arbeitszeit', 'flexibel', 'morgens', 'abends', 'wochenende']
    },
    {
      id: 'office-services',
      question: 'Was ist in der Büroreinigung enthalten?',
      answer: 'Unser Standard-Service umfasst Staubsaugen, Oberflächenreinigung, Sanitärreinigung, Müllentsorgung und Fensterreinigung innen. Zusätzlich können wir Küchen, Teeküchen und spezielle Bereiche reinigen.',
      category: 'bueroreinigung',
      keywords: ['service', 'inhalten', 'staubsaugen', 'sanitär', 'fenster', 'küche']
    },
    {
      id: 'office-start',
      question: 'Wie schnell können Sie mit der Büroreinigung beginnen?',
      answer: 'Nach der kostenlosen Besichtigung und Vertragsabschluss können wir meist innerhalb von 3-5 Werktagen mit der regelmäßigen Reinigung beginnen.',
      category: 'bueroreinigung',
      keywords: ['schnell', 'beginnen', 'besichtigung', 'vertrag', 'werktage']
    },

    // Hausreinigung
    {
      id: 'house-presence',
      question: 'Muss ich während der Hausreinigung zu Hause sein?',
      answer: 'Nein, für regelmäßige Kunden bieten wir einen sicheren Schlüsselservice an. Sie können während der Reinigung arbeiten oder Ihre Freizeit genießen.',
      category: 'hausreinigung',
      keywords: ['zuhause', 'anwesenheit', 'schlüssel', 'service', 'freizeit']
    },
    {
      id: 'house-products',
      question: 'Bringen Sie eigene Reinigungsmittel mit?',
      answer: 'Ja, wir bringen professionelle, umweltfreundliche Reinigungsmittel mit. Auf Wunsch verwenden wir gerne auch Ihre bevorzugten Produkte.',
      category: 'hausreinigung',
      keywords: ['reinigungsmittel', 'umweltfreundlich', 'produkte', 'bevorzugt']
    },
    {
      id: 'house-duration',
      question: 'Wie lange dauert die Reinigung meines Hauses?',
      answer: 'Das hängt von der Hausgröße ab. Für eine 100m² Wohnung benötigen wir etwa 2-3 Stunden, für ein Einfamilienhaus 3-5 Stunden.',
      category: 'hausreinigung',
      keywords: ['dauer', 'zeit', 'hausgröße', 'wohnung', 'einfamilienhaus']
    },
    {
      id: 'house-satisfaction',
      question: 'Was passiert, wenn ich mit der Reinigung nicht zufrieden bin?',
      answer: 'Wir kommen kostenlos zurück und reinigen die beanstandeten Bereiche erneut. Ihre Zufriedenheit ist unsere Priorität.',
      category: 'hausreinigung',
      keywords: ['zufriedenheit', 'kostenlos', 'zurück', 'priorität', 'bereiche']
    },

    // Fensterreinigung
    {
      id: 'window-frequency',
      question: 'Wie oft sollten Fenster gereinigt werden?',
      answer: 'Für Privathaushalte empfehlen wir 2-4x pro Jahr, für Geschäfte je nach Lage monatlich bis vierteljährlich.',
      category: 'fensterreinigung',
      keywords: ['fenster', 'häufigkeit', 'privathaushalt', 'geschäfte', 'monatlich']
    },
    {
      id: 'window-weather',
      question: 'Reinigen Sie auch bei schlechtem Wetter?',
      answer: 'Bei leichtem Regen ja, bei starkem Regen oder Sturm verschieben wir den Termin zu Ihrer und unserer Sicherheit.',
      category: 'fensterreinigung',
      keywords: ['wetter', 'regen', 'sturm', 'sicherheit', 'termin']
    },
    {
      id: 'window-height',
      question: 'Können Sie auch sehr hohe Fenster reinigen?',
      answer: 'Ja, wir haben professionelle Ausrüstung für Arbeiten bis zu 20 Meter Höhe und sind entsprechend versichert.',
      category: 'fensterreinigung',
      keywords: ['hoch', 'ausrüstung', 'meter', 'höhe', 'versichert']
    },
    {
      id: 'window-streaks',
      question: 'Wie verhindern Sie Streifen auf den Fenstern?',
      answer: 'Wir verwenden professionelle Abzieher und spezielle Reinigungstechniken. Bei hartnäckigen Kalkflecken setzen wir entsprechende Spezialreiniger ein.',
      category: 'fensterreinigung',
      keywords: ['streifen', 'abzieher', 'techniken', 'kalk', 'spezialreiniger']
    },

    // Grundreinigung
    {
      id: 'deep-duration',
      question: 'Wie lange dauert eine Grundreinigung?',
      answer: 'Das hängt von der Größe und dem Zustand ab. Für eine 80m² Wohnung planen wir 6-8 Stunden, für größere Objekte entsprechend mehr.',
      category: 'grundreinigung',
      keywords: ['grundreinigung', 'dauer', 'größe', 'zustand', 'stunden']
    },
    {
      id: 'deep-weekend',
      question: 'Können Sie auch am Wochenende arbeiten?',
      answer: 'Ja, für Grundreinigungen bieten wir flexible Zeiten an, auch am Wochenende oder abends gegen einen kleinen Aufpreis.',
      category: 'grundreinigung',
      keywords: ['wochenende', 'flexibel', 'abends', 'aufpreis', 'zeiten']
    },
    {
      id: 'deep-difference',
      question: 'Was ist der Unterschied zur normalen Reinigung?',
      answer: 'Bei der Grundreinigung werden auch Bereiche gereinigt, die normalerweise nicht zugänglich sind: Schränke innen, hinter Geräten, intensive Badreinigung etc.',
      category: 'grundreinigung',
      keywords: ['unterschied', 'normal', 'schränke', 'geräte', 'intensiv']
    },

    // Allgemein
    {
      id: 'general-insurance',
      question: 'Sind Ihre Mitarbeiter versichert?',
      answer: 'Ja, alle unsere Mitarbeiter sind vollständig versichert. Wir haben eine Betriebshaftpflicht und alle Mitarbeiter sind unfallversichert.',
      category: 'allgemein',
      keywords: ['versichert', 'mitarbeiter', 'haftpflicht', 'unfall', 'betrieb']
    },
    {
      id: 'general-payment',
      question: 'Welche Zahlungsmöglichkeiten bieten Sie an?',
      answer: 'Wir akzeptieren Barzahlung, Überweisung und auf Wunsch auch Lastschriftverfahren für regelmäßige Kunden.',
      category: 'allgemein',
      keywords: ['zahlung', 'bar', 'überweisung', 'lastschrift', 'regelmäßig']
    },
    {
      id: 'general-emergency',
      question: 'Bieten Sie auch Notfallreinigung an?',
      answer: 'Ja, wir bieten Express-Reinigungsservice für Notfälle an. Kontaktieren Sie uns und wir finden eine Lösung.',
      category: 'allgemein',
      keywords: ['notfall', 'express', 'service', 'lösung', 'kontakt']
    }
  ];

  const categories = [
    { id: 'all', label: 'Alle Kategorien', count: faqData.length },
    { id: 'bueroreinigung', label: 'Büroreinigung', count: faqData.filter(item => item.category === 'bueroreinigung').length },
    { id: 'hausreinigung', label: 'Hausreinigung', count: faqData.filter(item => item.category === 'hausreinigung').length },
    { id: 'fensterreinigung', label: 'Fensterreinigung', count: faqData.filter(item => item.category === 'fensterreinigung').length },
    { id: 'grundreinigung', label: 'Grundreinigung', count: faqData.filter(item => item.category === 'grundreinigung').length },
    { id: 'allgemein', label: 'Allgemein', count: faqData.filter(item => item.category === 'allgemein').length },
  ];

  const filteredFAQs = useMemo(() => {
    let filtered = faqData;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.question.toLowerCase().includes(searchLower) ||
        item.answer.toLowerCase().includes(searchLower) ||
        item.keywords.some(keyword => keyword.includes(searchLower))
      );
    }

    // Limit results if maxItems is specified
    if (maxItems) {
      filtered = filtered.slice(0, maxItems);
    }

    return filtered;
  }, [searchTerm, selectedCategory, maxItems]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => {
      const isExpanded = prev.includes(itemId);
      
      // Track FAQ interaction
      if (!isExpanded) {
        trackBusinessEvents.serviceInquiry(`faq_${itemId}`);
      }
      
      return isExpanded 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId];
    });
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term) {
      trackBusinessEvents.serviceInquiry(`faq_search_${term.slice(0, 20)}`);
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    const icons: Record<string, string> = {
      bueroreinigung: '🏢',
      hausreinigung: '🏠',
      fensterreinigung: '🪟',
      grundreinigung: '✨',
      allgemein: 'ℹ️'
    };
    return icons[categoryId] || '❓';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Häufig gestellte Fragen
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Finden Sie schnell Antworten auf die wichtigsten Fragen zu unseren Reinigungsdienstleistungen.
        </p>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="mb-6">
          <div className="relative">
            <svg 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Suchen Sie nach Antworten..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      )}

      {/* Categories */}
      {showCategories && (
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{category.id !== 'all' ? getCategoryIcon(category.id) : '📋'}</span>
                <span>{category.label}</span>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results Count */}
      {(searchTerm || selectedCategory !== 'all') && (
        <div className="mb-4 text-sm text-gray-600 text-center">
          {filteredFAQs.length} Ergebnis{filteredFAQs.length !== 1 ? 'se' : ''} gefunden
        </div>
      )}

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((item) => (
            <div 
              key={item.id} 
              className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleExpanded(item.id)}
                className="w-full px-6 py-4 text-left flex justify-between items-start gap-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {item.question}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {getCategoryIcon(item.category)} {categories.find(c => c.id === item.category)?.label}
                    </span>
                  </div>
                </div>
                <svg 
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                    expandedItems.includes(item.id) ? 'rotate-180' : ''
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {expandedItems.includes(item.id) && (
                <div className="px-6 pb-4">
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 mb-4">
              Keine FAQ-Einträge für "{searchTerm}" gefunden.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Alle FAQs anzeigen
            </button>
          </div>
        )}
      </div>

      {/* Contact CTA */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Ihre Frage nicht dabei?
        </h3>
        <p className="text-gray-600 mb-4">
          Kontaktieren Sie uns direkt - wir helfen Ihnen gerne weiter!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://wa.me/4917623152477"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            onClick={() => trackBusinessEvents.contactFormSubmit('faq_whatsapp')}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.486"/>
            </svg>
            WhatsApp Chat
          </a>
          <a
            href="tel:+4917623152477"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            onClick={() => trackBusinessEvents.phoneClick()}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Anrufen
          </a>
        </div>
      </div>
    </div>
  );
};

export default EnhancedFAQ;