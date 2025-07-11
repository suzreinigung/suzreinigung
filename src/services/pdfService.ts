// PDF Generation Service for SUZ Cleaning Services
// Handles professional PDF creation with SUZ branding and German formatting

import jsPDF from 'jspdf';
import { 
  QuoteData, 
  PDFConfig, 
  PDFGenerationRequest, 
  PDFGenerationResponse 
} from '@/types/quote';
import { QuoteService } from './quoteService';

// Default PDF configuration
const DEFAULT_PDF_CONFIG: PDFConfig = {
  format: 'a4',
  orientation: 'portrait',
  margins: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
  },
  fonts: {
    primary: 'helvetica',
    secondary: 'helvetica'
  },
  colors: {
    primary: '#0A84FF',
    secondary: '#64D2FF',
    text: '#1C1C1E',
    background: '#FFFFFF',
    accent: '#30D158'
  },
  branding: {
    showLogo: true,
    showWatermark: false,
    headerHeight: 60,
    footerHeight: 30
  }
};

export class PDFService {
  /**
   * Generate PDF from quote data
   */
  static async generateQuotePDF(request: PDFGenerationRequest): Promise<PDFGenerationResponse> {
    try {
      const { quote, config } = request;
      const pdfConfig = { ...DEFAULT_PDF_CONFIG, ...config };

      // Create new PDF document
      const doc = new jsPDF({
        orientation: pdfConfig.orientation,
        unit: 'mm',
        format: pdfConfig.format
      });

      // Set up document properties
      doc.setProperties({
        title: `Angebot ${quote.quoteNumber}`,
        subject: 'Reinigungsdienstleistung Angebot',
        author: 'SUZ Reinigungsservice',
        creator: 'SUZ Website',
        producer: 'SUZ Quote System'
      });

      // Add content to PDF
      await this.addHeader(doc, quote, pdfConfig);
      await this.addCustomerInfo(doc, quote, pdfConfig);
      await this.addQuoteDetails(doc, quote, pdfConfig);
      await this.addItemsTable(doc, quote, pdfConfig);
      await this.addTotals(doc, quote, pdfConfig);
      await this.addTerms(doc, quote, pdfConfig);
      await this.addFooter(doc, quote, pdfConfig);

      // Generate PDF blob
      const pdfBlob = doc.output('blob');
      const pdfDataUrl = doc.output('dataurlstring');
      const filename = `Angebot_${quote.quoteNumber}_${QuoteService.formatDate(quote.createdAt).replace(/\./g, '-')}.pdf`;

      return {
        success: true,
        pdfBlob,
        pdfDataUrl,
        filename
      };

    } catch (error) {
      console.error('PDF generation error:', error);
      return {
        success: false,
        error: 'Fehler bei der PDF-Erstellung. Bitte versuchen Sie es erneut.'
      };
    }
  }

  /**
   * Add header with company branding
   */
  private static async addHeader(doc: jsPDF, quote: QuoteData, config: PDFConfig): Promise<void> {
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPosition = config.margins.top;

    // Company name and logo area
    doc.setFontSize(24);
    doc.setTextColor(config.colors.primary);
    doc.setFont(config.fonts.primary, 'bold');
    doc.text('SUZ Reinigungsservice', config.margins.left, yPosition);

    // Company tagline
    yPosition += 8;
    doc.setFontSize(12);
    doc.setTextColor(config.colors.text);
    doc.setFont(config.fonts.primary, 'normal');
    doc.text('Professionelle Reinigungsdienstleistungen', config.margins.left, yPosition);

    // Quote title
    yPosition += 15;
    doc.setFontSize(20);
    doc.setTextColor(config.colors.text);
    doc.setFont(config.fonts.primary, 'bold');
    doc.text('ANGEBOT', config.margins.left, yPosition);

    // Quote number and date (right aligned)
    doc.setFontSize(12);
    doc.setFont(config.fonts.primary, 'normal');
    const quoteInfo = [
      `Angebots-Nr.: ${quote.quoteNumber}`,
      `Datum: ${QuoteService.formatDate(quote.createdAt)}`,
      `Gültig bis: ${QuoteService.formatDate(quote.validUntil)}`
    ];

    let rightYPosition = config.margins.top;
    quoteInfo.forEach(info => {
      const textWidth = doc.getTextWidth(info);
      doc.text(info, pageWidth - config.margins.right - textWidth, rightYPosition);
      rightYPosition += 6;
    });

    // Add separator line
    yPosition += 10;
    doc.setDrawColor(config.colors.primary);
    doc.setLineWidth(0.5);
    doc.line(config.margins.left, yPosition, pageWidth - config.margins.right, yPosition);
  }

  /**
   * Add customer information section
   */
  private static async addCustomerInfo(doc: jsPDF, quote: QuoteData, config: PDFConfig): Promise<void> {
    let yPosition = 80;

    // Customer section header
    doc.setFontSize(14);
    doc.setTextColor(config.colors.text);
    doc.setFont(config.fonts.primary, 'bold');
    doc.text('Kunde:', config.margins.left, yPosition);

    // Customer details
    yPosition += 8;
    doc.setFontSize(11);
    doc.setFont(config.fonts.primary, 'normal');

    const customerInfo = [
      quote.customer.name,
      quote.customer.company || '',
      quote.customer.email,
      quote.customer.phone || ''
    ].filter(info => info.trim() !== '');

    customerInfo.forEach(info => {
      doc.text(info, config.margins.left, yPosition);
      yPosition += 5;
    });

    // Company info (right side)
    let companyYPosition = 80;
    doc.setFont(config.fonts.primary, 'bold');
    doc.text('Anbieter:', 120, companyYPosition);

    companyYPosition += 8;
    doc.setFont(config.fonts.primary, 'normal');
    const companyInfo = [
      quote.company.name,
      quote.company.address.street,
      `${quote.company.address.postalCode} ${quote.company.address.city}`,
      quote.company.contact.phone,
      quote.company.contact.email
    ];

    companyInfo.forEach(info => {
      doc.text(info, 120, companyYPosition);
      companyYPosition += 5;
    });
  }

  /**
   * Add quote details section
   */
  private static async addQuoteDetails(doc: jsPDF, quote: QuoteData, config: PDFConfig): Promise<void> {
    let yPosition = 140;

    // Service details header
    doc.setFontSize(14);
    doc.setTextColor(config.colors.text);
    doc.setFont(config.fonts.primary, 'bold');
    doc.text('Leistungsdetails:', config.margins.left, yPosition);

    yPosition += 8;
    doc.setFontSize(11);
    doc.setFont(config.fonts.primary, 'normal');

    const serviceDetails = [
      `Service: ${quote.serviceDetails.serviceDescription}`,
      `Objekttyp: ${quote.serviceDetails.propertyType}`,
      `Fläche: ${quote.serviceDetails.areaSize} m²`,
      `Standort: ${quote.serviceDetails.location}`,
      `Häufigkeit: ${quote.serviceDetails.frequency}`,
      `Dringlichkeit: ${quote.serviceDetails.urgency}`
    ];

    serviceDetails.forEach(detail => {
      doc.text(detail, config.margins.left, yPosition);
      yPosition += 5;
    });

    if (quote.serviceDetails.additionalServices.length > 0) {
      yPosition += 3;
      doc.text(`Zusatzleistungen: ${quote.serviceDetails.additionalServices.join(', ')}`, config.margins.left, yPosition);
    }

    if (quote.serviceDetails.specialRequirements) {
      yPosition += 8;
      doc.text('Besondere Anforderungen:', config.margins.left, yPosition);
      yPosition += 5;
      doc.text(quote.serviceDetails.specialRequirements, config.margins.left, yPosition);
    }
  }

  /**
   * Add items table
   */
  private static async addItemsTable(doc: jsPDF, quote: QuoteData, config: PDFConfig): Promise<void> {
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPosition = 200;

    // Table header
    doc.setFontSize(12);
    doc.setFont(config.fonts.primary, 'bold');
    doc.setFillColor(240, 240, 240);
    doc.rect(config.margins.left, yPosition - 5, pageWidth - config.margins.left - config.margins.right, 8, 'F');

    doc.text('Pos.', config.margins.left + 2, yPosition);
    doc.text('Beschreibung', config.margins.left + 15, yPosition);
    doc.text('Menge', config.margins.left + 100, yPosition);
    doc.text('Einheit', config.margins.left + 120, yPosition);
    doc.text('Einzelpreis', config.margins.left + 140, yPosition);
    doc.text('Gesamtpreis', config.margins.left + 165, yPosition);

    yPosition += 10;

    // Table rows
    doc.setFont(config.fonts.primary, 'normal');
    doc.setFontSize(10);

    quote.items.forEach((item, index) => {
      doc.text((index + 1).toString(), config.margins.left + 2, yPosition);
      
      // Handle long descriptions
      const maxDescWidth = 80;
      const descLines = doc.splitTextToSize(item.description, maxDescWidth);
      doc.text(descLines, config.margins.left + 15, yPosition);
      
      doc.text(item.quantity.toString(), config.margins.left + 100, yPosition);
      doc.text(item.unit, config.margins.left + 120, yPosition);
      doc.text(QuoteService.formatPrice(item.unitPrice), config.margins.left + 140, yPosition);
      doc.text(QuoteService.formatPrice(item.totalPrice), config.margins.left + 165, yPosition);

      yPosition += Math.max(6, descLines.length * 4);
    });
  }

  /**
   * Add totals section
   */
  private static async addTotals(doc: jsPDF, quote: QuoteData, config: PDFConfig): Promise<void> {
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPosition = doc.internal.pageSize.getHeight() - 80;

    // Totals box
    const boxWidth = 80;
    const boxHeight = 30;
    const boxX = pageWidth - config.margins.right - boxWidth;

    doc.setDrawColor(config.colors.primary);
    doc.setLineWidth(0.5);
    doc.rect(boxX, yPosition - 5, boxWidth, boxHeight);

    // Totals content
    doc.setFontSize(11);
    doc.setFont(config.fonts.primary, 'normal');

    doc.text('Zwischensumme:', boxX + 2, yPosition);
    doc.text(QuoteService.formatPrice(quote.subtotal), boxX + 50, yPosition);

    yPosition += 6;
    doc.text(`MwSt. (19%):`, boxX + 2, yPosition);
    doc.text(QuoteService.formatPrice(quote.vatAmount), boxX + 50, yPosition);

    yPosition += 8;
    doc.setFont(config.fonts.primary, 'bold');
    doc.setFontSize(12);
    doc.text('Gesamtbetrag:', boxX + 2, yPosition);
    doc.text(QuoteService.formatPrice(quote.totalAmount), boxX + 50, yPosition);
  }

  /**
   * Add terms and conditions
   */
  private static async addTerms(doc: jsPDF, quote: QuoteData, config: PDFConfig): Promise<void> {
    let yPosition = doc.internal.pageSize.getHeight() - 45;

    doc.setFontSize(10);
    doc.setFont(config.fonts.primary, 'bold');
    doc.text('Allgemeine Geschäftsbedingungen:', config.margins.left, yPosition);

    yPosition += 5;
    doc.setFont(config.fonts.primary, 'normal');
    doc.setFontSize(8);

    const terms = [
      'Alle Preise verstehen sich zzgl. der gesetzlichen Mehrwertsteuer.',
      'Zahlungsziel: 14 Tage netto nach Rechnungsstellung.',
      'Bei Stornierung weniger als 24h vor Termin wird eine Ausfallgebühr von 50% berechnet.'
    ];

    terms.forEach(term => {
      doc.text(term, config.margins.left, yPosition);
      yPosition += 3;
    });
  }

  /**
   * Add footer
   */
  private static async addFooter(doc: jsPDF, quote: QuoteData, config: PDFConfig): Promise<void> {
    const pageWidth = doc.internal.pageSize.getWidth();
    const yPosition = doc.internal.pageSize.getHeight() - 15;

    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.setFont(config.fonts.primary, 'normal');

    const footerText = `${quote.company.name} | ${quote.company.contact.email} | ${quote.company.contact.phone}`;
    const textWidth = doc.getTextWidth(footerText);
    doc.text(footerText, (pageWidth - textWidth) / 2, yPosition);
  }

  /**
   * Download PDF file
   */
  static downloadPDF(pdfBlob: Blob, filename: string): void {
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Open PDF in new tab
   */
  static openPDFInNewTab(pdfDataUrl: string): void {
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(`
        <iframe width='100%' height='100%' src='${pdfDataUrl}'></iframe>
      `);
    }
  }
}
