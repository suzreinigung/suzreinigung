
import { Mail, Phone, Users } from 'lucide-react';

const Contact = () => {
  return (
    <section
      id="contact"
      className="suz-section-standard"
    >
      <div className="max-w-5xl mx-auto text-center">
        <div className="suz-card-glass rounded-3xl border border-white/30 animate-fade-in shadow-2xl" style={{ padding: 'var(--space-16)' }}>
          <h2 className="suz-section-title text-slate-100 mb-8">
            <span className="gradient-text">Kontakt</span> aufnehmen
          </h2>
          <p className="suz-text-heading-lg text-slate-300 mb-12">
            Kontaktieren Sie uns jetzt – schnell & unkompliziert!
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-8 mb-16">
            <a
              href="https://wa.me/4917623152477"
              target="_blank"
              rel="noopener noreferrer"
              className="suz-btn-primary bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-12 py-6 rounded-full text-xl shadow-2xl flex items-center justify-center gap-3"
              aria-label="Kontakt über WhatsApp aufnehmen"
            >
              <Phone className="w-6 h-6" aria-hidden="true" />
              WhatsApp
            </a>
            <a
              href="mailto:info@suzreinigung.de"
              className="suz-btn-primary bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-12 py-6 rounded-full text-xl shadow-2xl flex items-center justify-center gap-3"
              aria-label="E-Mail an SUZ Reinigung senden"
            >
              <Mail className="w-6 h-6" aria-hidden="true" />
              E-Mail
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-12 text-slate-300">
            <div className="flex flex-col items-center">
              <Users className="w-10 h-10 mb-4" style={{ color: 'var(--suz-blue-primary)' }} aria-hidden="true" />
              <h3 className="suz-text-heading-md font-semibold text-slate-100 mb-4">Unser Standort</h3>
              <address className="suz-text-body-lg not-italic text-center">
                Paul-Langen-Straße 39<br />
                53229 Bonn<br />
                Deutschland
              </address>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="w-10 h-10 mb-4" style={{ color: 'var(--suz-blue-primary)' }} aria-hidden="true" />
              <h3 className="suz-text-heading-md font-semibold text-slate-100 mb-4">Direkte Kontaktaufnahme</h3>
              <div className="text-center space-y-2">
                <p className="suz-text-body-lg">
                  <a href="tel:+4917623152477" className="hover:text-blue-600 transition-colors font-medium">
                    +49 176 23152477
                  </a>
                </p>
                <p className="suz-text-body-lg">
                  <a href="mailto:info@suzreinigung.de" className="hover:text-blue-600 transition-colors font-medium">
                    info@suzreinigung.de
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
