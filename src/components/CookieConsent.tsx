/**
 * GDPR-Compliant Cookie Consent Component for SUZ Reinigung
 * German language support with comprehensive privacy controls
 */

import { useState, useEffect } from 'react';
import { X, Shield, Settings, Check } from 'lucide-react';
import { analyticsConsent } from '@/lib/analytics';
import { updateGTMConsent } from '@/lib/gtm';

interface CookieConsentProps {
  onAccept?: () => void;
  onDecline?: () => void;
}

const CookieConsent = ({ onAccept, onDecline }: CookieConsentProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    functional: false,
  });

  // useEffect(() => {
  //   // Check if user has already made a choice
  //   const consent = localStorage.getItem('cookie_consent');
  //   const consentDate = localStorage.getItem('cookie_consent_date');
    
  //   // Show consent if no previous choice or consent is older than 1 year
  //   if (!consent || !consentDate || 
  //       (Date.now() - parseInt(consentDate)) > 365 * 24 * 60 * 60 * 1000) {
  //     setIsVisible(true);
  //   }
  // }, []);

  const handleAcceptAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    
    saveConsent(newPreferences);
    analyticsConsent.grant();
    updateGTMConsent(true);
    setIsVisible(false);
    onAccept?.();
  };

  const handleDeclineAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    
    saveConsent(newPreferences);
    analyticsConsent.deny();
    updateGTMConsent(false);
    setIsVisible(false);
    onDecline?.();
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);

    if (preferences.analytics) {
      analyticsConsent.grant();
      updateGTMConsent(true);
    } else {
      analyticsConsent.deny();
      updateGTMConsent(false);
    }
    
    setIsVisible(false);
    setShowDetails(false);
  };

  const saveConsent = (prefs: typeof preferences) => {
    localStorage.setItem('cookie_consent', JSON.stringify(prefs));
    localStorage.setItem('cookie_consent_date', Date.now().toString());
  };

  const updatePreference = (key: keyof typeof preferences, value: boolean) => {
    if (key === 'necessary') return; // Cannot disable necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div className="suz-card-glass max-w-2xl w-full rounded-3xl border border-white/30 shadow-2xl animate-slide-up">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-blue-400" aria-hidden="true" />
              <h2 
                id="cookie-consent-title"
                className="text-xl font-semibold text-slate-100"
              >
                Datenschutz & Cookies
              </h2>
            </div>
            <button
              onClick={handleDeclineAll}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Cookie-Banner schließen"
            >
              <X className="w-5 h-5 text-slate-400" aria-hidden="true" />
            </button>
          </div>

          {/* Main Content */}
          {!showDetails ? (
            <div>
              <p 
                id="cookie-consent-description"
                className="text-slate-300 mb-6 leading-relaxed"
              >
                Wir verwenden Cookies und ähnliche Technologien, um Ihnen die bestmögliche 
                Erfahrung auf unserer Website zu bieten. Einige sind notwendig für den Betrieb 
                der Website, andere helfen uns, diese Website und Ihre Erfahrung zu verbessern.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAcceptAll}
                  className="suz-btn-primary flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
                >
                  Alle akzeptieren
                </button>
                <button
                  onClick={() => setShowDetails(true)}
                  className="suz-btn-secondary flex-1 bg-slate-700 hover:bg-slate-600 text-slate-100 px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Settings className="w-4 h-4" aria-hidden="true" />
                  Einstellungen
                </button>
                <button
                  onClick={handleDeclineAll}
                  className="suz-btn-tertiary flex-1 bg-transparent hover:bg-white/10 text-slate-300 px-6 py-3 rounded-xl font-medium transition-all duration-300 border border-slate-600"
                >
                  Nur notwendige
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-slate-300 mb-6">
                Wählen Sie, welche Cookies Sie zulassen möchten:
              </p>

              <div className="space-y-4 mb-6">
                {/* Necessary Cookies */}
                <div className="flex items-start justify-between p-4 bg-slate-800/50 rounded-xl">
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-100 mb-1">
                      Notwendige Cookies
                    </h3>
                    <p className="text-sm text-slate-400">
                      Diese Cookies sind für die Grundfunktionen der Website erforderlich.
                    </p>
                  </div>
                  <div className="ml-4">
                    <Check className="w-5 h-5 text-green-400" aria-hidden="true" />
                    <span className="sr-only">Immer aktiviert</span>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-start justify-between p-4 bg-slate-800/50 rounded-xl">
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-100 mb-1">
                      Analyse-Cookies
                    </h3>
                    <p className="text-sm text-slate-400">
                      Helfen uns zu verstehen, wie Besucher mit der Website interagieren.
                    </p>
                  </div>
                  <label className="ml-4 relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => updatePreference('analytics', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-start justify-between p-4 bg-slate-800/50 rounded-xl">
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-100 mb-1">
                      Marketing-Cookies
                    </h3>
                    <p className="text-sm text-slate-400">
                      Werden verwendet, um Werbung relevanter zu gestalten.
                    </p>
                  </div>
                  <label className="ml-4 relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => updatePreference('marketing', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Functional Cookies */}
                <div className="flex items-start justify-between p-4 bg-slate-800/50 rounded-xl">
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-100 mb-1">
                      Funktionale Cookies
                    </h3>
                    <p className="text-sm text-slate-400">
                      Ermöglichen erweiterte Funktionalitäten und Personalisierung.
                    </p>
                  </div>
                  <label className="ml-4 relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) => updatePreference('functional', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSavePreferences}
                  className="suz-btn-primary flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
                >
                  Einstellungen speichern
                </button>
                <button
                  onClick={() => setShowDetails(false)}
                  className="suz-btn-secondary flex-1 bg-slate-700 hover:bg-slate-600 text-slate-100 px-6 py-3 rounded-xl font-medium transition-all duration-300"
                >
                  Zurück
                </button>
              </div>
            </div>
          )}

          {/* Footer Links */}
          <div className="mt-6 pt-4 border-t border-slate-700">
            <p className="text-xs text-slate-400 text-center">
              Weitere Informationen finden Sie in unserer{' '}
              <a 
                href="/datenschutz" 
                className="text-blue-400 hover:text-blue-300 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Datenschutzerklärung
              </a>
              {' '}und den{' '}
              <a 
                href="/impressum" 
                className="text-blue-400 hover:text-blue-300 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Nutzungsbedingungen
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
