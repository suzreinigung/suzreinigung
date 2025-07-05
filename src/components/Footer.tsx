
import { useState } from 'react';
import { X } from 'lucide-react';

const Footer = () => {
  const [showImpressum, setShowImpressum] = useState(false);
  const [showDatenschutz, setShowDatenschutz] = useState(false);

  const ImpressumModal = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="suz-card-glass rounded-3xl border border-white/30 shadow-2xl max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="suz-text-heading-xl gradient-text-animated">Impressum</h2>
            <button
              type="button"
              onClick={() => setShowImpressum(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors suz-focus-ring"
              aria-label="Impressum schließen"
            >
              <X className="w-6 h-6 text-slate-300" />
            </button>
          </div>
          <div className="space-y-6 text-slate-300 suz-text-body-lg">
            <div>
              <h3 className="text-slate-200 font-semibold mb-2">S.U.Z. Schutz und Sicherheit GmbH</h3>
              <p><strong>Adresse:</strong><br />
              Paul-Langen-Straße 39<br />
              53229 Bonn</p>
            </div>
            <div>
              <h3 className="text-slate-200 font-semibold mb-2">Kontakt:</h3>
              <p>Telefon: +49 228 50461294<br />
              Fax: +49 228 50461294<br />
              E-Mail: info@suz-schutz-sicherheit.de</p>
            </div>
            <div>
              <h3 className="text-slate-200 font-semibold mb-2">Vertreten durch:</h3>
              <p>Geschäftsführer: Ali Mohamed</p>
            </div>
            <div>
              <h3 className="text-slate-200 font-semibold mb-2">Registereintrag:</h3>
              <p>Eintragung im Handelsregister.<br />
              Registergericht: Amtsgericht, Köln<br />
              Registernummer: HRB 119388</p>
            </div>
            <div>
              <h3 className="text-slate-200 font-semibold mb-2">Umsatzsteuer-ID:</h3>
              <p>Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz: 206/5948/1829 NAST 1</p>
            </div>
            <div>
              <h3 className="text-slate-200 font-semibold mb-2">Haftungsausschluss:</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-slate-200 font-medium">Haftung für Inhalte:</h4>
                  <p>Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.</p>
                </div>
                <div>
                  <h4 className="text-slate-200 font-medium">Haftung für Links:</h4>
                  <p>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.</p>
                </div>
                <div>
                  <h4 className="text-slate-200 font-medium">Urheberrecht:</h4>
                  <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const DatenschutzModal = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="suz-card-glass rounded-3xl border border-white/30 shadow-2xl max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="suz-text-heading-xl gradient-text-animated">Datenschutzerklärung</h2>
            <button
              type="button"
              onClick={() => setShowDatenschutz(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors suz-focus-ring"
              aria-label="Datenschutzerklärung schließen"
            >
              <X className="w-6 h-6 text-slate-300" />
            </button>
          </div>
          <div className="space-y-6 text-slate-300 suz-text-body-lg">
            <div>
              <h3 className="text-slate-200 font-semibold mb-2">Verantwortlicher:</h3>
              <p>S.U.Z. Schutz und Sicherheit GmbH<br />
              Paul-Langen-Straße 39<br />
              53229 Bonn<br />
              Telefon: +4917623152477<br />
              E-Mail: info@suz-schutz-sicherheit.de</p>
            </div>
            <div>
              <h3 className="text-slate-200 font-semibold mb-2">Allgemeine Hinweise:</h3>
              <p>Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Ihre Daten werden im Rahmen der gesetzlichen Vorschriften geschützt.</p>
            </div>
            <div>
              <h3 className="text-slate-200 font-semibold mb-2">Erhebung und Verarbeitung personenbezogener Daten:</h3>
              <p>Wir erheben und verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist. Die Erhebung und Verarbeitung personenbezogener Daten erfolgt regelmäßig nur nach Einwilligung des Nutzers. Eine Ausnahme gilt in solchen Fällen, in denen eine vorherige Einholung einer Einwilligung aus tatsächlichen Gründen nicht möglich ist und die Verarbeitung der Daten durch gesetzliche Vorschriften gestattet ist.</p>
            </div>
            <div>
              <h3 className="text-slate-200 font-semibold mb-2">Nutzung und Weitergabe personenbezogener Daten:</h3>
              <p>Personenbezogene Daten werden nur dann an Dritte weitergegeben, wenn dies im Rahmen der Vertragsabwicklung notwendig ist oder Sie eingewilligt haben. Eine Weitergabe der Daten an Dritte ohne Einwilligung des Betroffenen erfolgt nicht.</p>
            </div>
            <div>
              <h3 className="text-slate-200 font-semibold mb-2">Rechte der betroffenen Personen:</h3>
              <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten. Hierzu können Sie sich jederzeit an uns wenden.</p>
            </div>
            <div>
              <h3 className="text-slate-200 font-semibold mb-2">Recht auf Beschwerde bei einer Aufsichtsbehörde:</h3>
              <p>Im Falle datenschutzrechtlicher Verstöße steht dem Betroffenen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.</p>
            </div>
            <div>
              <h3 className="text-slate-200 font-semibold mb-2">Datensicherheit:</h3>
              <p>Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre Daten gegen zufällige oder vorsätzliche Manipulationen, Verlust, Zerstörung oder gegen den Zugriff unberechtigter Personen zu schützen. Unsere Sicherheitsmaßnahmen werden entsprechend der technologischen Entwicklung fortlaufend verbessert.</p>
            </div>
            <div>
              <h3 className="text-slate-200 font-semibold mb-2">Cookies:</h3>
              <p>Unsere Internetseiten verwenden Cookies. Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert. Sie dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Sie können die Installation der Cookies durch eine entsprechende Einstellung Ihrer Browser-Software verhindern; wir weisen jedoch darauf hin, dass in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website vollumfänglich genutzt werden können.</p>
            </div>
            <div>
              <h3 className="text-slate-200 font-semibold mb-2">Server-Log-Files:</h3>
              <p>Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log Files, die Ihr Browser automatisch an uns übermittelt. Dies sind: Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.</p>
            </div>
            <div>
              <h3 className="text-slate-200 font-semibold mb-2">Kontaktformular:</h3>
              <p>Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
            </div>
            <div>
              <h3 className="text-slate-200 font-semibold mb-2">Google Analytics:</h3>
              <p>Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist die Google Inc., 1600 Amphitheatre Parkway Mountain View, CA 94043, USA. Google Analytics verwendet so genannte "Cookies". Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.</p>
            </div>
            <div>
              <h3 className="text-slate-200 font-semibold mb-2">Änderungen der Datenschutzerklärung:</h3>
              <p>Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen, z. B. bei der Einführung neuer Services. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.</p>
            </div>
            <div>
              <h3 className="text-slate-200 font-semibold mb-2">Kontakt:</h3>
              <p>Für weitere Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden:<br />
              S.U.Z. Schutz und Sicherheit GmbH<br />
              Paul-Langen-Straße 39<br />
              53229 Bonn<br />
              E-Mail: info@suz-schutz-sicherheit.de</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <footer className="py-8 px-4" role="contentinfo" aria-label="Website Footer">
        <div className="max-w-6xl mx-auto">
          {/* Compact Footer */}
          <div className="suz-card-glass rounded-2xl border border-white/20 px-6 py-6">
            <div className="flex flex-col items-center gap-4">
              {/* Copyright */}
              <p className="suz-text-body-lg text-slate-300 text-center">
                © 2025 SUZ Schutz und Sicherheit GmbH
              </p>

              {/* Legal Links */}
              <div className="flex items-center gap-6 text-sm text-slate-400">
                <button
                  type="button"
                  onClick={() => setShowDatenschutz(true)}
                  className="hover:text-slate-200 transition-colors duration-200 suz-focus-ring"
                  aria-label="Datenschutz-Informationen"
                >
                  Datenschutz
                </button>
                <button
                  type="button"
                  onClick={() => setShowImpressum(true)}
                  className="hover:text-slate-200 transition-colors duration-200 suz-focus-ring"
                  aria-label="Impressum anzeigen"
                >
                  Impressum
                </button>
              </div>

              {/* EconicMedia Credit */}
              <p className="text-xs text-slate-500 text-center">
                Diese Seite wurde von{' '}
                <a
                  href="https://www.econicmedia.pro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200 suz-focus-ring"
                  aria-label="EconicMedia Website besuchen"
                >
                  EconicMedia
                </a>
                {' '}erstellt.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showImpressum && <ImpressumModal />}
      {showDatenschutz && <DatenschutzModal />}
    </>
  );
};

export default Footer;
