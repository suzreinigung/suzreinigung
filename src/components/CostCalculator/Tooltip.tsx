// Tooltip Component for SUZ Calculator
// Provides helpful information and explanations for pricing factors

import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
  content: string;
  title?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ 
  content, 
  title, 
  position = 'top',
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  const arrowClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-slate-700',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-slate-700',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-slate-700',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-slate-700'
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className="text-slate-400 hover:text-blue-400 transition-colors focus:outline-none focus:text-blue-400"
        aria-label="Hilfe anzeigen"
      >
        <HelpCircle size={16} />
      </button>
      
      {isVisible && (
        <div className={`absolute z-50 ${positionClasses[position]}`}>
          <div className="bg-slate-700 text-slate-100 text-sm rounded-lg px-3 py-2 max-w-xs shadow-lg border border-slate-600">
            {title && (
              <div className="font-semibold text-blue-400 mb-1">
                {title}
              </div>
            )}
            <div className="text-slate-200">
              {content}
            </div>
          </div>
          <div className={`absolute w-0 h-0 border-4 ${arrowClasses[position]}`}></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;

// Predefined tooltip content for calculator sections
export const tooltipContent = {
  serviceType: {
    title: "Reinigungsart",
    content: "Wählen Sie die Art der Reinigung, die Sie benötigen. Verschiedene Services haben unterschiedliche Preisstrukturen basierend auf Komplexität und benötigter Ausrüstung."
  },
  areaSize: {
    title: "Fläche/Anzahl",
    content: "Geben Sie die zu reinigende Fläche in Quadratmetern oder die Anzahl der Zimmer/Fenster an. Dies ist der Hauptfaktor für die Preisberechnung."
  },
  location: {
    title: "Standort",
    content: "Der Standort beeinflusst die Preise aufgrund von Anfahrtskosten und regionalen Unterschieden. Zentrale Lagen sind oft günstiger."
  },
  frequency: {
    title: "Häufigkeit",
    content: "Regelmäßige Reinigungen sind günstiger pro Service, da weniger intensive Reinigung erforderlich ist und Anfahrtskosten sich verteilen."
  },
  buildingType: {
    title: "Gebäudetyp",
    content: "Komplexere Gebäude erfordern mehr Zeit und spezielle Ausrüstung. Hochhäuser und Komplexe haben höhere Preise aufgrund der zusätzlichen Logistik."
  },
  accessDifficulty: {
    title: "Zugang",
    content: "Schwer zugängliche Bereiche erhöhen den Aufwand für Transport von Ausrüstung und Personal, was sich im Preis widerspiegelt."
  },
  securityRequirements: {
    title: "Sicherheit",
    content: "Höhere Sicherheitsanforderungen bedeuten zusätzliche Schulungen, Hintergrundprüfungen und Dokumentation für unser Personal."
  },
  environmentalPreferences: {
    title: "Umweltfreundlich",
    content: "Umweltfreundliche Optionen können geringfügig teurer sein, bieten aber bessere Nachhaltigkeit und sind oft gesünder für Nutzer."
  },
  additionalServices: {
    title: "Zusatzleistungen",
    content: "Spezielle Services wie Fensterreinigung oder Desinfektion werden zusätzlich berechnet und erhöhen den Gesamtpreis."
  },
  urgency: {
    title: "Dringlichkeit",
    content: "Express- und Notfall-Services erfordern Umplanung und zusätzliche Ressourcen, daher fallen Aufschläge an."
  },
  monthlyPricing: {
    title: "Monatliche Preise",
    content: "Alle Preise werden als monatliche Kosten angezeigt, basierend auf der gewählten Häufigkeit. Dies hilft bei der Budgetplanung."
  }
};
