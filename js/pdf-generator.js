/**
 * S.U.Z. Reinigung Contract Generator - PDF Generator
 * 
 * Handles PDF generation both client-side and server-side
 */

class PDFGenerator {
    constructor(app) {
        this.app = app;
        this.isGenerating = false;
        
        // Bind methods
        this.generate = this.generate.bind(this);
        this.generateClientSide = this.generateClientSide.bind(this);
        this.generateServerSide = this.generateServerSide.bind(this);
        this.createContractHTML = this.createContractHTML.bind(this);
    }

    /**
     * Generate PDF (tries server-side first, falls back to client-side)
     */
    async generate(formData) {
        if (this.isGenerating) {
            console.warn('PDF generation already in progress');
            return;
        }

        this.isGenerating = true;
        
        try {
            console.log('Starting PDF generation...');
            
            // Show loading state
            this.showLoadingState();
            
            // Try server-side generation first
            try {
                const result = await this.generateServerSide(formData);
                if (result.success) {
                    console.log('PDF generated successfully on server');
                    this.hideLoadingState();
                    this.showSuccessMessage();
                    return result;
                }
            } catch (serverError) {
                console.warn('Server-side PDF generation failed, falling back to client-side:', serverError);
            }
            
            // Fallback to client-side generation
            const result = await this.generateClientSide(formData);
            console.log('PDF generated successfully on client');
            this.hideLoadingState();
            this.showSuccessMessage();
            return result;
            
        } catch (error) {
            console.error('PDF generation failed:', error);
            this.hideLoadingState();
            this.showErrorMessage('PDF-Generierung fehlgeschlagen. Bitte versuchen Sie es erneut.');
            throw error;
        } finally {
            this.isGenerating = false;
        }
    }

    /**
     * Generate PDF on server using Netlify function
     */
    async generateServerSide(formData) {
        const response = await fetch('/api/generate-pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                formData: formData,
                options: {
                    format: 'A4',
                    margin: {
                        top: '15mm',
                        right: '10mm',
                        bottom: '10mm',
                        left: '15mm'
                    },
                    printBackground: true,
                    preferCSSPageSize: true
                }
            })
        });

        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
        }

        const blob = await response.blob();
        const filename = Utils.generateContractFilename(
            formData.contractType,
            formData.employeeName || 'Mitarbeiter'
        );
        
        Utils.downloadBlob(blob, filename);
        
        return { success: true, method: 'server', filename };
    }

    /**
     * Generate PDF on client-side using html2pdf
     */
    async generateClientSide(formData) {
        let container = null;

        try {
            // Validate form data
            if (!formData || !formData.employee || !formData.employee.name) {
                throw new Error('Unvollständige Formulardaten. Bitte füllen Sie alle Pflichtfelder aus.');
            }

            // Check if html2pdf is available
            if (typeof html2pdf === 'undefined') {
                console.log('Loading html2pdf library...');
                await this.loadHtml2PDF();
            }

            // Create contract HTML
            const contractHTML = this.createContractHTML(formData);

            if (!contractHTML || contractHTML.trim().length === 0) {
                throw new Error('Vertragsdaten konnten nicht generiert werden.');
            }

            // Create temporary container
            container = document.createElement('div');
            container.innerHTML = contractHTML;
            container.style.position = 'absolute';
            container.style.left = '-9999px';
            container.style.top = '-9999px';
            container.style.width = '210mm'; // A4 width
            container.style.minHeight = '297mm'; // A4 height
            document.body.appendChild(container);

            // Generate filename
            const filename = Utils.generateContractFilename(
                formData.contractType,
                formData.employee.name || 'Mitarbeiter'
            );

            // PDF generation options
            const options = {
                margin: [15, 10, 10, 15], // Top, Right, Bottom, Left (mm)
                filename: filename,
                image: {
                    type: 'jpeg',
                    quality: 0.95
                },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    letterRendering: true,
                    allowTaint: true,
                    backgroundColor: '#ffffff',
                    logging: false,
                    width: 794, // A4 width in pixels at 96 DPI
                    height: 1123 // A4 height in pixels at 96 DPI
                },
                jsPDF: {
                    unit: 'mm',
                    format: 'a4',
                    orientation: 'portrait',
                    compress: true
                },
                pagebreak: {
                    mode: ['avoid-all', 'css', 'legacy'],
                    before: '.signature-section'
                }
            };

            console.log('Generating PDF with options:', options);

            // Generate and download PDF
            await html2pdf().set(options).from(container).save();

            console.log('PDF generated successfully:', filename);
            return { success: true, method: 'client', filename };

        } catch (error) {
            console.error('Client-side PDF generation failed:', error);

            // Provide user-friendly error messages
            let userMessage = 'PDF-Erstellung fehlgeschlagen.';

            if (error.message.includes('html2pdf')) {
                userMessage = 'PDF-Bibliothek konnte nicht geladen werden. Bitte überprüfen Sie Ihre Internetverbindung.';
            } else if (error.message.includes('Unvollständige')) {
                userMessage = error.message;
            } else if (error.message.includes('canvas')) {
                userMessage = 'Fehler beim Rendern des Vertrags. Bitte versuchen Sie es erneut.';
            }

            throw new Error(userMessage);

        } finally {
            // Clean up
            if (container && container.parentNode) {
                document.body.removeChild(container);
            }
        }
    }

    /**
     * Load html2pdf library dynamically
     */
    async loadHtml2PDF() {
        return new Promise((resolve, reject) => {
            if (typeof html2pdf !== 'undefined') {
                resolve();
                return;
            }

            // Set a timeout for loading
            const timeout = setTimeout(() => {
                reject(new Error('Timeout beim Laden der PDF-Bibliothek. Bitte überprüfen Sie Ihre Internetverbindung.'));
            }, 10000); // 10 second timeout

            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
            script.onload = () => {
                clearTimeout(timeout);
                console.log('html2pdf library loaded successfully');
                resolve();
            };
            script.onerror = () => {
                clearTimeout(timeout);
                reject(new Error('PDF-Bibliothek konnte nicht geladen werden. Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.'));
            };

            // Add integrity check if available
            script.integrity = 'sha512-GK0w8+/XRZcEe/jNmFUVQs+a7+3VkEa+1RgqTlAXHjQJPwZqJRXQjxigdqjZaGlqQSYqYQYQYQYQYQYQYQYQYQ==';
            script.crossOrigin = 'anonymous';

            document.head.appendChild(script);
        });
    }

    /**
     * Create contract HTML from form data
     */
    createContractHTML(formData) {
        try {
            // Validate required data
            if (!formData) {
                throw new Error('Keine Formulardaten verfügbar');
            }

            if (!formData.employee || !formData.employee.name) {
                throw new Error('Mitarbeiterdaten sind unvollständig');
            }

            if (!formData.employment) {
                throw new Error('Arbeitsdetails sind unvollständig');
            }

            const contractTypeMap = {
                minijob: 'Arbeitsvertrag für geringfügige Beschäftigung (Minijob)',
                teilzeit: 'Arbeitsvertrag für Teilzeitbeschäftigung',
                vollzeit: 'Arbeitsvertrag für Vollzeitbeschäftigung'
            };

            const contractTitle = contractTypeMap[formData.contractType] || 'Arbeitsvertrag';
            const creationDate = Utils.formatDate(new Date());

            // Calculate monthly salary with validation
            const hourlyWage = parseFloat(formData.employment.hourlyWage) || 0;
            const weeklyHours = parseFloat(formData.employment.weeklyHours) || 0;

            if (hourlyWage <= 0 || weeklyHours <= 0) {
                console.warn('Invalid wage or hours data:', { hourlyWage, weeklyHours });
            }

            const monthlySalary = Utils.calculateMonthlySalary(hourlyWage, weeklyHours);

        return `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${contractTitle} - S.U.Z. Reinigung</title>
    <style>
        ${this.getContractCSS()}
    </style>
</head>
<body>
    <div class="contract-container">
        <div class="header">
            <div class="logo-container">
                <img src="/assets/images/logo-new.png" alt="S.U.Z. Reinigung Logo">
            </div>
            <h1 class="company-title">S.U.Z. Reinigung</h1>
            <p class="contract-type">${contractTitle}</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h2 class="section-title">Vertragsparteien</h2>
                <div class="employer-info">
                    <strong>Arbeitgeber:</strong><br>
                    S.U.Z. Reinigung<br>
                    Paul-Langen-Straße 39<br>
                    53229 Bonn<br>
                    Geschäftsführer: Ali Mohamed
                </div>
                
                <div class="employee-info">
                    <strong>Arbeitnehmer/in:</strong><br>
                    ${formData.employee.name || ''}<br>
                    Geboren am: ${formData.employee.birthDate ? Utils.formatDate(formData.employee.birthDate) : ''}<br>
                    Steuer-ID: ${formData.employee.taxId || ''}<br>
                    ${formData.employee.address || ''}<br>
                    ${formData.employee.postalCode || ''} ${formData.employee.city || ''}<br>
                    Telefon: ${formData.employee.phone || ''}
                    ${formData.employee.email ? `<br>E-Mail: ${formData.employee.email}` : ''}
                </div>
            </div>

            <div class="section">
                <h2 class="section-title">Beschäftigungsbeginn und Probezeit</h2>
                <p><strong>Beschäftigungsbeginn:</strong> ${formData.employment.startDate ? Utils.formatDate(formData.employment.startDate) : ''}</p>
                <p class="section-text">
                    <strong>Probezeit:</strong> Es wird eine Probezeit von 3 (drei) Monaten vereinbart.
                    Während der Probezeit kann das Arbeitsverhältnis von beiden Seiten mit einer Frist von 2 Wochen gekündigt werden.
                </p>
            </div>

            <div class="section">
                <h2 class="section-title">Tätigkeit und Arbeitsort</h2>
                <p><strong>Tätigkeitsbezeichnung:</strong> ${formData.employment.jobTitle || 'Reinigungskraft'}</p>
                <p class="section-text">
                    <strong>Arbeitsort:</strong> Der/die Arbeitnehmer/in wird an verschiedenen Arbeitsorten eingesetzt, 
                    wo der Arbeitgeber ihn/sie beauftragt. Die konkreten Einsatzorte werden je nach betrieblichen 
                    Erfordernissen und Kundenaufträgen bestimmt.
                </p>
                <p class="section-text">
                    <strong>Tätigkeitsbeschreibung:</strong> Der/die Arbeitnehmer/in wird als Reinigungskraft eingesetzt. 
                    Die Tätigkeit umfasst die Reinigung von Büros, Gebäuden, sanitären Anlagen und anderen Räumlichkeiten 
                    sowie alle damit verbundenen Aufgaben wie Müllentsorgung, Oberflächenreinigung und Pflege.
                </p>
            </div>

            <div class="section">
                <h2 class="section-title">Arbeitszeit</h2>
                <p><strong>Wöchentliche Arbeitszeit:</strong> ${formData.employment.weeklyHours || ''} Stunden</p>
                <p><strong>Arbeitstage:</strong> ${formData.employment.workDays || ''}</p>
                <p><strong>Arbeitszeiten:</strong> ${formData.employment.workHours || ''}</p>
                <p class="section-text">
                    Die Arbeitszeit richtet sich nach den betrieblichen Erfordernissen. Überstunden sind nur nach
                    vorheriger Anordnung durch den Arbeitgeber zu leisten. Die gesetzlichen Bestimmungen des
                    Arbeitszeitgesetzes sind einzuhalten.
                </p>
            </div>

            <div class="section">
                <h2 class="section-title">Vergütung</h2>
                <p><strong>Stundenlohn (brutto):</strong> ${formData.employment.hourlyWage ? Utils.formatCurrency(formData.employment.hourlyWage) : ''}</p>
                ${monthlySalary > 0 ? `<p><strong>Monatliches Einkommen (ca.):</strong> ${Utils.formatCurrency(monthlySalary)}</p>` : ''}
                ${!formData.agreements.sonderzahlungen ? '<p>Sonderzahlungen (Urlaubs-/Weihnachtsgeld) sind nicht vereinbart.</p>' : ''}
            </div>

            <div class="section">
                <h2 class="section-title">Urlaub</h2>
                <p><strong>Urlaubsanspruch pro Jahr:</strong> ${formData.employment.vacationDays || ''} Tage</p>
                <p class="section-text">
                    Der Urlaubsanspruch richtet sich nach dem Bundesurlaubsgesetz und wird anteilig entsprechend
                    der vereinbarten Arbeitszeit berechnet. Urlaub ist rechtzeitig zu beantragen und bedarf der
                    Genehmigung durch den Arbeitgeber.
                </p>
            </div>

            <div class="section">
                <h2 class="section-title">Weitere Beschäftigungen</h2>
                <p><strong>Weitere Beschäftigungen:</strong> ${formData.employment.otherEmployment || ''}</p>
                <p class="section-text">
                    Der/die Arbeitnehmer/in ist verpflichtet, dem Arbeitgeber alle weiteren Beschäftigungsverhältnisse 
                    mitzuteilen, um die Einhaltung der Minijob-Grenzen zu gewährleisten.
                </p>
            </div>

            <div class="section">
                <h2 class="section-title">Bestätigungen</h2>
                ${formData.datenschutz ? '<p>✓ Datenschutzbestimmungen wurden zur Kenntnis genommen</p>' : ''}
                ${formData.arbeitsschutzBelehrung ? '<p>✓ Arbeitsschutzbelehrung wurde durchgeführt</p>' : ''}
                ${formData.hygieneSchulung ? '<p>✓ Hygieneschulung wurde absolviert</p>' : ''}
            </div>

            <div class="signature-section">
                <div class="signature-box">
                    <div class="signature-line"></div>
                    <div class="signature-label">
                        Ort, Datum<br>
                        Unterschrift Arbeitgeber<br>
                        S.U.Z. Reinigung
                    </div>
                </div>

                <div class="signature-box">
                    <div class="signature-line"></div>
                    <div class="signature-label">
                        Ort, Datum<br>
                        Unterschrift Arbeitnehmer/in
                    </div>
                </div>
            </div>
        </div>

        <div class="footer">
            <p><strong>S.U.Z. Reinigung</strong></p>
            <p>Paul-Langen-Straße 39 • 53229 Bonn</p>
            <p>Geschäftsführer: Ali Mohamed</p>
            <p>Telefon: +49 (0) 228 XXX XXXX • E-Mail: info@suz-reinigung.de</p>
            <p>Erstellt am: ${creationDate}</p>
        </div>
    </div>
</body>
</html>`;

        } catch (error) {
            console.error('Error creating contract HTML:', error);
            throw new Error('Vertragsdokument konnte nicht erstellt werden: ' + error.message);
        }
    }

    /**
     * Get CSS for contract PDF
     */
    getContractCSS() {
        return `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #2c3e50;
                background: white;
                font-size: 11pt;
            }
            
            .contract-container {
                max-width: 210mm;
                margin: 0 auto;
                background: white;
                padding: 15mm 10mm 10mm 15mm;
            }
            
            .header {
                text-align: center;
                padding-bottom: 10mm;
                border-bottom: 2px solid #2c3e50;
                margin-bottom: 8mm;
            }
            
            .logo-container {
                width: 60px;
                height: 60px;
                margin: 0 auto 5mm;
            }
            
            .logo-container img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
            
            .company-title {
                font-size: 18pt;
                font-weight: 700;
                margin-bottom: 2mm;
                color: #2c3e50;
            }
            
            .contract-type {
                font-size: 14pt;
                font-weight: 600;
                color: #2c3e50;
            }
            
            .section {
                page-break-inside: avoid;
                margin-bottom: 6mm;
                padding: 4mm;
                border: 1px solid #ccc;
                border-left: 3px solid #3498db;
            }
            
            .section-title {
                font-size: 12pt;
                font-weight: 600;
                color: #2c3e50;
                margin-bottom: 3mm;
                display: flex;
                align-items: center;
                gap: 2mm;
            }
            
            .section-title::before {
                content: '§';
                background: #3498db;
                color: white;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 10pt;
                font-weight: 700;
            }
            
            .section-text {
                margin-top: 2mm;
                font-size: 10pt;
                line-height: 1.5;
            }
            
            .employer-info, .employee-info {
                font-size: 10pt;
                line-height: 1.5;
                margin-bottom: 3mm;
                padding: 2mm 0;
            }
            
            .signature-section {
                display: flex;
                justify-content: space-between;
                gap: 10mm;
                margin-top: 10mm;
                page-break-inside: avoid;
            }
            
            .signature-box {
                flex: 1;
                text-align: center;
                padding: 5mm;
                border: 2px solid #2c3e50;
                min-height: 25mm;
            }
            
            .signature-line {
                border-bottom: 1px solid #2c3e50;
                height: 15mm;
                margin-bottom: 2mm;
            }
            
            .signature-label {
                font-size: 9pt;
                color: #2c3e50;
                line-height: 1.2;
            }
            
            .footer {
                text-align: center;
                font-size: 8pt;
                color: #7f8c8d;
                border-top: 1px solid #bdc3c7;
                padding-top: 3mm;
                margin-top: 5mm;
                page-break-inside: avoid;
            }
            
            .footer p {
                margin-bottom: 1mm;
            }
        `;
    }

    /**
     * Show loading state
     */
    showLoadingState() {
        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) {
            nextBtn.disabled = true;
            nextBtn.innerHTML = '<span class="loading-spinner"></span> PDF wird erstellt...';
        }
    }

    /**
     * Hide loading state
     */
    hideLoadingState() {
        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) {
            nextBtn.disabled = false;
            nextBtn.innerHTML = '<span class="icon">📄</span> PDF Erstellen';
        }
    }

    /**
     * Show success message
     */
    showSuccessMessage() {
        Utils.showToast('PDF wurde erfolgreich erstellt und heruntergeladen!', 'success', 5000);
    }

    /**
     * Show error message
     */
    showErrorMessage(message) {
        Utils.showToast(message, 'error', 5000);
    }
}

// Make PDFGenerator globally available
window.PDFGenerator = PDFGenerator;
