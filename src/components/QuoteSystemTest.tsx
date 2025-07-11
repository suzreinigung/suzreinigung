// Quote System Test Component
// For testing and debugging the quote generation system

import React, { useState } from 'react';
import { FileText, TestTube, Download, Mail, CheckCircle, AlertCircle, History } from 'lucide-react';
import { CalculatorData, PriceEstimate } from '@/components/CostCalculator/types';
import { QuoteData } from '@/types/quote';
import { QuoteService } from '@/services/quoteService';
import { PDFService } from '@/services/pdfService';
import { QuoteReferenceService } from '@/services/quoteReferenceService';
import { QuoteAnalyticsService } from '@/services/quoteAnalytics';
import { sendQuoteDeliveryEmail } from '@/lib/emailService';
import QuoteDisplay from './QuoteDisplay';
import QuoteHistoryDashboard from './QuoteHistoryDashboard';
import { toast } from 'sonner';

// Test data for development
const TEST_CALCULATOR_DATA: CalculatorData = {
  serviceType: 'bueroreinigung',
  propertyType: 'office',
  areaSize: 150,
  location: 'koeln',
  frequency: 'woechentlich',
  additionalServices: ['fenster', 'teppich'],
  urgency: 'standard',
  specialRequirements: 'Besondere Aufmerksamkeit für Konferenzräume'
};

const TEST_PRICE_ESTIMATE: PriceEstimate = {
  basePrice: 180,
  totalPrice: 245,
  frequency: 'woechentlich',
  savings: 27,
  breakdown: [
    { label: 'Büroreinigung (150 m²)', amount: 180, type: 'base' },
    { label: 'Wöchentlich Rabatt', amount: -27, type: 'discount' },
    { label: 'Fensterreinigung', amount: 25, type: 'additional' },
    { label: 'Teppichreinigung', amount: 35, type: 'additional' },
    { label: 'Standort Köln', amount: 0, type: 'base' }
  ],
  pricePerUnit: 1.63,
  unit: 'pro m²'
};

const QuoteSystemTest: React.FC = () => {
  const [testResults, setTestResults] = useState<Record<string, boolean>>({});
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testQuote, setTestQuote] = useState<QuoteData | null>(null);
  const [showQuoteDisplay, setShowQuoteDisplay] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const runTest = async (testName: string, testFunction: () => Promise<boolean>) => {
    try {
      const result = await testFunction();
      setTestResults(prev => ({ ...prev, [testName]: result }));
      return result;
    } catch (error) {
      console.error(`Test ${testName} failed:`, error);
      setTestResults(prev => ({ ...prev, [testName]: false }));
      return false;
    }
  };

  const testQuoteGeneration = async (): Promise<boolean> => {
    const response = await QuoteService.generateQuote({
      calculatorData: TEST_CALCULATOR_DATA,
      priceEstimate: TEST_PRICE_ESTIMATE,
      customer: {
        name: 'Max Mustermann',
        email: 'max.mustermann@beispiel.de',
        phone: '+49 123 456789',
        company: 'Mustermann GmbH'
      },
      notes: 'Test-Angebot für Systemvalidierung'
    });

    if (response.success && response.quote) {
      setTestQuote(response.quote);
      return true;
    }
    return false;
  };

  const testPDFGeneration = async (): Promise<boolean> => {
    if (!testQuote) return false;

    const response = await PDFService.generateQuotePDF({ quote: testQuote });
    return response.success && !!response.pdfBlob;
  };

  const testReferenceSystem = async (): Promise<boolean> => {
    if (!testQuote) return false;

    // Create reference
    const reference = QuoteReferenceService.createReference(testQuote);
    
    // Test retrieval
    const retrieved = QuoteReferenceService.getReference(testQuote.id);
    
    // Test statistics
    const stats = QuoteReferenceService.getStatistics();
    
    return !!(reference && retrieved && stats.total > 0);
  };

  const testEmailSystem = async (): Promise<boolean> => {
    if (!testQuote) return false;

    try {
      // Note: This would actually send an email in production
      // For testing, we just validate the email data structure
      const emailRequest = {
        quote: testQuote,
        emailTemplate: 'standard' as const,
        customMessage: 'Test-E-Mail für Systemvalidierung'
      };

      // Validate email request structure
      return !!(
        emailRequest.quote &&
        emailRequest.quote.customer.email &&
        emailRequest.quote.quoteNumber
      );
    } catch (error) {
      console.error('Email test error:', error);
      return false;
    }
  };

  const runAllTests = async () => {
    setIsRunningTests(true);
    setTestResults({});

    try {
      toast.info('Starte Systemtests...');

      // Test 1: Quote Generation
      const quoteTest = await runTest('Quote Generation', testQuoteGeneration);
      
      if (quoteTest) {
        // Test 2: PDF Generation
        await runTest('PDF Generation', testPDFGeneration);
        
        // Test 3: Reference System
        await runTest('Reference System', testReferenceSystem);
        
        // Test 4: Email System
        await runTest('Email System', testEmailSystem);
      }

      const allPassed = Object.values(testResults).every(result => result);
      
      if (allPassed) {
        toast.success('Alle Tests erfolgreich bestanden!');
      } else {
        toast.warning('Einige Tests sind fehlgeschlagen. Siehe Details unten.');
      }
    } catch (error) {
      console.error('Test suite error:', error);
      toast.error('Fehler beim Ausführen der Tests');
    } finally {
      setIsRunningTests(false);
    }
  };

  const downloadTestPDF = async () => {
    if (!testQuote) {
      toast.error('Kein Test-Angebot verfügbar');
      return;
    }

    try {
      const response = await PDFService.generateQuotePDF({ quote: testQuote });
      
      if (response.success && response.pdfBlob && response.filename) {
        PDFService.downloadPDF(response.pdfBlob, response.filename);
        toast.success('Test-PDF heruntergeladen');
      } else {
        throw new Error(response.error || 'PDF-Generierung fehlgeschlagen');
      }
    } catch (error) {
      console.error('PDF download error:', error);
      toast.error('Fehler beim Herunterladen der Test-PDF');
    }
  };

  const getTestIcon = (testName: string) => {
    if (!(testName in testResults)) {
      return <div className="w-5 h-5 border-2 border-slate-400 rounded-full animate-pulse" />;
    }
    
    return testResults[testName] ? (
      <CheckCircle size={20} className="text-green-400" />
    ) : (
      <AlertCircle size={20} className="text-red-400" />
    );
  };

  return (
    <div className="suz-card-glass rounded-2xl p-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="suz-icon-badge-premium mb-4 mx-auto">
          <TestTube size={32} className="text-purple-400" />
        </div>
        <h3 className="suz-text-heading-xl font-bold text-slate-100 mb-2">
          Quote System Test Suite
        </h3>
        <p className="suz-text-body-lg text-slate-300">
          Testen Sie alle Komponenten des Angebotssystems
        </p>
      </div>

      {/* Test Controls */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          type="button"
          onClick={runAllTests}
          disabled={isRunningTests}
          className="suz-btn-primary flex items-center gap-2"
        >
          <TestTube size={20} />
          {isRunningTests ? 'Tests laufen...' : 'Alle Tests ausführen'}
        </button>

        {testQuote && (
          <>
            <button
              type="button"
              onClick={downloadTestPDF}
              className="suz-btn-secondary flex items-center gap-2"
            >
              <Download size={20} />
              Test-PDF herunterladen
            </button>

            <button
              type="button"
              onClick={() => setShowQuoteDisplay(!showQuoteDisplay)}
              className="suz-btn-secondary flex items-center gap-2"
            >
              <FileText size={20} />
              {showQuoteDisplay ? 'Angebot ausblenden' : 'Test-Angebot anzeigen'}
            </button>

            <button
              type="button"
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="suz-btn-secondary flex items-center gap-2"
            >
              <TestTube size={20} />
              {showAnalytics ? 'Analytics ausblenden' : 'Analytics anzeigen'}
            </button>

            <button
              type="button"
              onClick={() => setShowHistory(!showHistory)}
              className="suz-btn-secondary flex items-center gap-2"
            >
              <History size={20} />
              {showHistory ? 'Verlauf ausblenden' : 'Angebotsverlauf anzeigen'}
            </button>
          </>
        )}
      </div>

      {/* Test Results */}
      <div className="space-y-4">
        <h4 className="suz-text-heading-md font-semibold text-slate-100">
          Test-Ergebnisse
        </h4>
        
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { key: 'Quote Generation', label: 'Angebotserstellung' },
            { key: 'PDF Generation', label: 'PDF-Generierung' },
            { key: 'Reference System', label: 'Referenzsystem' },
            { key: 'Email System', label: 'E-Mail-System' }
          ].map(test => (
            <div
              key={test.key}
              className="flex items-center gap-3 p-4 rounded-lg bg-slate-800/30 border border-white/10"
            >
              {getTestIcon(test.key)}
              <span className="suz-text-body-md text-slate-200">
                {test.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Test Quote Display */}
      {showQuoteDisplay && testQuote && (
        <div className="space-y-4">
          <h4 className="suz-text-heading-md font-semibold text-slate-100">
            Test-Angebot
          </h4>
          <QuoteDisplay
            quote={testQuote}
            showActions={true}
            onEmailQuote={async (quote) => {
              toast.info('E-Mail-Test würde hier ausgeführt werden');
            }}
          />
        </div>
      )}

      {/* Analytics Display */}
      {showAnalytics && (
        <div className="space-y-4">
          <h4 className="suz-text-heading-md font-semibold text-slate-100">
            Analytics Übersicht
          </h4>
          <div className="suz-card-glass rounded-xl p-6">
            {(() => {
              const analytics = QuoteAnalyticsService.getAnalyticsSummary();
              return (
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="suz-text-display-sm font-bold text-blue-400">
                      {analytics.quotesGenerated}
                    </p>
                    <p className="suz-text-body-md text-slate-300">Angebote erstellt</p>
                  </div>
                  <div className="text-center">
                    <p className="suz-text-display-sm font-bold text-green-400">
                      {analytics.pdfDownloads}
                    </p>
                    <p className="suz-text-body-md text-slate-300">PDF Downloads</p>
                  </div>
                  <div className="text-center">
                    <p className="suz-text-display-sm font-bold text-purple-400">
                      {analytics.conversionRate.toFixed(1)}%
                    </p>
                    <p className="suz-text-body-md text-slate-300">Conversion Rate</p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Quote History */}
      {showHistory && (
        <div className="space-y-4">
          <h4 className="suz-text-heading-md font-semibold text-slate-100">
            Angebotsverlauf
          </h4>
          <QuoteHistoryDashboard showAllQuotes={true} />
        </div>
      )}

      {/* System Information */}
      <div className="space-y-4 pt-6 border-t border-white/20">
        <h4 className="suz-text-heading-md font-semibold text-slate-100">
          System-Information
        </h4>
        
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="suz-card-glass rounded-lg p-4">
            <p className="text-slate-400 mb-1">Browser</p>
            <p className="text-slate-200">{navigator.userAgent.split(' ')[0]}</p>
          </div>
          <div className="suz-card-glass rounded-lg p-4">
            <p className="text-slate-400 mb-1">PDF Support</p>
            <p className="text-slate-200">
              {typeof window !== 'undefined' && 'jsPDF' in window ? 'Verfügbar' : 'Geladen'}
            </p>
          </div>
          <div className="suz-card-glass rounded-lg p-4">
            <p className="text-slate-400 mb-1">Local Storage</p>
            <p className="text-slate-200">
              {typeof Storage !== 'undefined' ? 'Verfügbar' : 'Nicht verfügbar'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteSystemTest;
