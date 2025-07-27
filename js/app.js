/**
 * S.U.Z. Reinigung Contract Generator - Main Application
 * 
 * This is the main application controller that manages the overall
 * application state, navigation, and user interactions.
 */

class ContractGeneratorApp {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 5;
        this.formData = {};
        this.isInitialized = false;
        
        // Bind methods to maintain context
        this.init = this.init.bind(this);
        this.handleStepNavigation = this.handleStepNavigation.bind(this);
        this.handleContractTypeSelection = this.handleContractTypeSelection.bind(this);
        this.validateCurrentStep = this.validateCurrentStep.bind(this);
        this.updateStepIndicator = this.updateStepIndicator.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    /**
     * Initialize the application
     */
    async init() {
        try {
            console.log('Initializing Contract Generator App...');

            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', this.init);
                return;
            }

            // Show loading progress
            this.updateLoadingProgress('Komponenten werden initialisiert...', 20);

            // Initialize components
            await this.initializeComponents();
            this.updateLoadingProgress('Event-Listener werden eingerichtet...', 40);

            // Set up event listeners
            this.setupEventListeners();
            this.updateLoadingProgress('Formular-Handler wird geladen...', 60);

            // Initialize form handler with error handling
            if (window.FormHandler) {
                try {
                    this.formHandler = new FormHandler(this);
                    await this.formHandler.init();
                } catch (formError) {
                    console.error('Failed to initialize form handler:', formError);
                    this.showError('Formular-Handler konnte nicht geladen werden.');
                }
            } else {
                console.warn('FormHandler not available');
            }

            this.updateLoadingProgress('PDF-Generator wird initialisiert...', 80);

            // Initialize PDF generator with error handling
            if (window.PDFGenerator) {
                try {
                    this.pdfGenerator = new PDFGenerator(this);
                } catch (pdfError) {
                    console.error('Failed to initialize PDF generator:', pdfError);
                    // PDF generator failure is not critical for basic functionality
                }
            } else {
                console.warn('PDFGenerator not available');
            }

            this.updateLoadingProgress('Anwendung wird gestartet...', 100);

            // Hide loading screen and show app
            setTimeout(() => {
                this.hideLoadingScreen();
            }, 500);

            this.isInitialized = true;
            console.log('Contract Generator App initialized successfully');

            // Check for URL parameters to pre-select contract type
            this.handleURLParameters();

            // Set up global error handlers
            this.setupGlobalErrorHandlers();

        } catch (error) {
            console.error('Failed to initialize app:', error);
            Utils.logError(error, { context: 'app_initialization' });
            this.showCriticalError('Fehler beim Laden der Anwendung. Bitte laden Sie die Seite neu.');
        }
    }

    /**
     * Initialize application components
     */
    async initializeComponents() {
        // Initialize step indicator
        this.updateStepIndicator();
        
        // Set initial form state
        this.updateNavigationButtons();
        
        // Load any saved form data
        this.loadSavedData();
        
        // Set up form validation
        this.setupFormValidation();
    }

    /**
     * Set up event listeners for the application
     */
    setupEventListeners() {
        // Navigation buttons
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleStepNavigation('prev');
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                console.log('Next button clicked. Event target:', e.target);
                this.handleStepNavigation('next');
            });
        }

        // Contract type selection
        const contractTypeCards = document.querySelectorAll('.contract-type-card');
        contractTypeCards.forEach(card => {
            card.addEventListener('click', (e) => {
                console.log('Contract type card click event. Event target:', e.target);
                console.log('Card element clicked:', card);
                const type = card.dataset.type;
                this.handleContractTypeSelection(type);
            });
        });

        // Modal controls
        const helpBtn = document.getElementById('help-btn');
        const settingsBtn = document.getElementById('settings-btn');
        
        if (helpBtn) {
            helpBtn.addEventListener('click', () => this.showHelpModal());
        }
        
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => this.showSettingsModal());
        }

        // Close modals when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.hideModal(e.target.id);
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideAllModals();
            }
        });

        // Form auto-save
        document.addEventListener('input', this.debounce(() => {
            this.saveFormData();
        }, 1000));

        // Prevent form submission
        const form = document.getElementById('contract-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission();
            });
        }
    }

    /**
     * Handle step navigation
     */
    async handleStepNavigation(direction) {
        try {
            console.log(`Attempting to navigate: direction=${direction}, currentStep=${this.currentStep}`);
            console.log(`handleStepNavigation: current formData.contractType before validation: ${this.formData.contractType}`);
            const isValid = await this.validateCurrentStep();
            console.log(`Validation result for current step (${this.currentStep}): isValid=${isValid}`);

            if (direction === 'next' && !isValid) {
                this.showError('Bitte füllen Sie alle Pflichtfelder korrekt aus.');
                return;
            }

            const newStep = direction === 'next' ? this.currentStep + 1 : this.currentStep - 1;
            console.log(`Calculated new step: ${newStep}`);

            if (newStep < 1 || newStep > this.totalSteps) {
                console.log(`New step ${newStep} is out of bounds (1-${this.totalSteps}). Aborting navigation.`);
                return;
            }

            // Save current step data before navigation
            this.saveCurrentStepData();
            console.log('Current step data saved before navigation');

            // Update current step
            this.currentStep = newStep;
            console.log(`Navigating to step ${this.currentStep}`);

            // Update UI immediately
            this.updateStepDisplay();
            // Load data for the current step
            if (this.formHandler) {
                this.formHandler.loadFormData(this.formData);
            }
            this.updateStepIndicator();
            this.updateNavigationButtons();

            // Handle special steps after UI update
            if (this.currentStep === 4) {
                console.log('Generating preview for step 4...');
                await this.generatePreview();
            } else if (this.currentStep === 5) {
                console.log('Preparing final step...');
                await this.prepareFinalStep();
            }

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (error) {
            console.error('Error during step navigation:', error);
            this.showError('Fehler beim Navigieren zwischen den Schritten.');
        }
    }

    /**
     * Handle contract type selection
     */
    handleContractTypeSelection(type) {
        console.log(`handleContractTypeSelection called with type: ${type}`);
        // Remove previous selection
        document.querySelectorAll('.contract-type-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Add selection to clicked card
        const selectedCard = document.querySelector(`[data-type="${type}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }
        
        // Update hidden input
        const contractTypeInput = document.getElementById('contract-type');
        if (contractTypeInput) {
            contractTypeInput.value = type;
        }
        
        // Store in form data
        this.formData.contractType = type;
        console.log(`Contract type selected and stored: ${this.formData.contractType}`);
        
        // Clear any error messages
        this.clearError('contract-type-error');
        
        // Enable next button
        this.updateNavigationButtons();
    }

    /**
     * Validate current step
     */
    async validateCurrentStep() {
        if (this.formHandler) {
            console.log(`Calling formHandler.validateStep for step ${this.currentStep}. FormHandler is available.`);
            return await this.formHandler.validateStep(this.currentStep);
        }
        console.warn('FormHandler is not available when calling validateCurrentStep. Returning true by default.');
        return true;
    }

    /**
     * Update step display
     */
    updateStepDisplay() {
        console.log(`Updating step display to step ${this.currentStep}`);

        // Hide all steps
        document.querySelectorAll('.form-step').forEach(step => {
            step.classList.remove('active');
            console.log(`Removed active class from step ${step.getAttribute('data-step')}`);
        });

        // Show current step
        const currentStepElement = document.querySelector(`[data-step="${this.currentStep}"]`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
            console.log(`Added active class to step ${this.currentStep}`);
        } else {
            console.error(`Step element not found for step ${this.currentStep}`);
        }

        // Force a reflow to ensure the changes are applied
        document.body.offsetHeight;
    }

    /**
     * Update step indicator
     */
    updateStepIndicator() {
        document.querySelectorAll('.step').forEach((step, index) => {
            const stepNumber = index + 1;
            step.classList.remove('active', 'completed');
            
            if (stepNumber === this.currentStep) {
                step.classList.add('active');
            } else if (stepNumber < this.currentStep) {
                step.classList.add('completed');
            }
        });
    }

    /**
     * Update navigation buttons
     */
    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentStep === 1;
        }
        
        if (nextBtn) {
            if (this.currentStep === this.totalSteps) {
                nextBtn.textContent = 'PDF Erstellen';
                nextBtn.innerHTML = '<span class="icon">📄</span> PDF Erstellen';
            } else {
                nextBtn.innerHTML = 'Weiter <span class="icon">→</span>';
            }
        }
    }

    /**
     * Save current step data
     */
    saveCurrentStepData() {
        if (this.formHandler) {
            this.formHandler.saveStepData(this.currentStep);
        }
    }

    /**
     * Save form data to localStorage
     */
    saveFormData() {
        try {
            const formData = this.formHandler ? this.formHandler.getFormData() : this.formData;
            localStorage.setItem('suz-contract-form-data', JSON.stringify({
                data: formData,
                step: this.currentStep,
                timestamp: Date.now()
            }));
        } catch (error) {
            console.warn('Could not save form data:', error);
        }
    }

    /**
     * Load saved form data from localStorage
     */
    loadSavedData() {
        try {
            const saved = localStorage.getItem('suz-contract-form-data');
            if (saved) {
                const { data, step, timestamp } = JSON.parse(saved);
                
                // Check if data is not too old (24 hours)
                if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
                    this.formData = data;
                    
                    if (this.formHandler) {
                        this.formHandler.loadFormData(data);
                    }
                    
                    // Ask user if they want to continue where they left off
                    if (step > 1) {
                        this.showContinueDialog(step);
                    }
                }
            }
        } catch (error) {
            console.warn('Could not load saved form data:', error);
        }
    }

    /**
     * Set up form validation
     */
    setupFormValidation() {
        // Add real-time validation to form inputs
        const inputs = document.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearError(input.id + '-error');
            });
        });
    }

    /**
     * Validate individual field
     */
    validateField(field) {
        if (this.formHandler) {
            return this.formHandler.validateField(field);
        }
        return true;
    }

    /**
     * Generate contract preview
     */
    async generatePreview() {
        try {
            console.log('Starting preview generation...');

            // Use the correct preview container from step 4
            const previewContainer = document.getElementById('contract-preview-content');
            if (!previewContainer) {
                console.error('Preview container not found');
                return;
            }

            // Show loading state
            previewContainer.innerHTML = '<div class="loading-spinner"></div><p>Vorschau wird generiert...</p>';

            // Get form data with detailed logging
            let formData = null;
            if (this.formHandler) {
                console.log('Getting formatted data from form handler...');
                formData = this.formHandler.getFormattedData();
                console.log('Formatted data result:', formData);
            } else {
                console.log('No form handler available, using raw form data');
                formData = this.formData;
            }

            if (!formData) {
                console.error('No form data available for preview');
                console.log('Raw form data from app:', this.formData);
                console.log('Form handler data:', this.formHandler ? this.formHandler.formData : 'No form handler');
                previewContainer.innerHTML = '<div class="preview-error">Keine Formulardaten verfügbar. Bitte füllen Sie die vorherigen Schritte aus.<br><small>Tipp: Gehen Sie zurück und füllen Sie alle Pflichtfelder aus.</small></div>';
                return;
            }

            // Generate preview content
            const previewHTML = await this.generatePreviewHTML(formData);
            previewContainer.innerHTML = previewHTML;
            console.log('Preview HTML generated and inserted');

            // Also update the final step summary
            this.updateFinalStepSummary(formData);

        } catch (error) {
            console.error('Failed to generate preview:', error);
            this.showError('Fehler beim Generieren der Vorschau.');
        }
    }

    /**
     * Generate preview HTML
     */
    async generatePreviewHTML(formData) {
        console.log('=== GENERATING PREVIEW HTML ===');
        console.log('Form data received:', formData);

        if (!formData) {
            console.error('No form data provided to generatePreviewHTML');
            return '<div class="preview-error">Keine Formulardaten verfügbar. Bitte füllen Sie alle vorherigen Schritte aus.</div>';
        }

        if (!formData.employee) {
            console.error('No employee data in form data:', formData);
            return '<div class="preview-error">Keine Mitarbeiterdaten verfügbar. Bitte füllen Sie Schritt 2 (Mitarbeiterdaten) aus.</div>';
        }

        console.log('Employee data found:', formData.employee);

        const contractTypeNames = {
            minijob: 'Minijob-Vertrag',
            teilzeit: 'Teilzeit-Vertrag',
            vollzeit: 'Vollzeit-Vertrag'
        };

        const contractTypeName = contractTypeNames[formData.contractType] || 'Arbeitsvertrag';

        return `
            <div class="contract-preview">
                <div class="contract-header">
                    <h3>${contractTypeName}</h3>
                    <p class="contract-subtitle">S.U.Z. Reinigung</p>
                </div>

                <div class="contract-content">
                    <div class="contract-section">
                        <h4>Vertragsparteien</h4>
                        <div class="contract-parties">
                            <div class="party">
                                <strong>Arbeitgeber:</strong><br>
                                S.U.Z. Reinigung<br>
                                Paul-Langen-Straße 39<br>
                                53229 Bonn<br>
                                Geschäftsführer: Ali Mohamed
                            </div>
                            <div class="party">
                                <strong>Arbeitnehmer:</strong><br>
                                ${formData.employee.name}<br>
                                ${formData.employee.address}<br>
                                ${formData.employee.postalCode} ${formData.employee.city}<br>
                                Geb.: ${Utils.formatDate(formData.employee.birthDate)}<br>
                                Steuer-ID: ${formData.employee.taxId}
                            </div>
                        </div>
                    </div>

                    <div class="contract-section">
                        <h4>Arbeitsdetails</h4>
                        <div class="work-details">
                            <div class="detail-row">
                                <span class="detail-label">Tätigkeitsbezeichnung:</span>
                                <span class="detail-value">${formData.employment.jobTitle}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Beschäftigungsbeginn:</span>
                                <span class="detail-value">${Utils.formatDate(formData.employment.startDate)}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Wöchentliche Arbeitszeit:</span>
                                <span class="detail-value">${formData.employment.weeklyHours} Stunden</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Stundenlohn (brutto):</span>
                                <span class="detail-value">${Utils.formatCurrency(formData.employment.hourlyWage)}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Arbeitstage:</span>
                                <span class="detail-value">${formData.employment.workDays}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Arbeitszeiten:</span>
                                <span class="detail-value">${formData.employment.workHours}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Urlaubsanspruch:</span>
                                <span class="detail-value">${formData.employment.vacationDays} Tage pro Jahr</span>
                            </div>
                        </div>
                    </div>

                    <div class="contract-section">
                        <h4>Kontaktdaten</h4>
                        <div class="contact-details">
                            <div class="detail-row">
                                <span class="detail-label">Telefon:</span>
                                <span class="detail-value">${formData.employee.phone}</span>
                            </div>
                            ${formData.employee.email ? `
                            <div class="detail-row">
                                <span class="detail-label">E-Mail:</span>
                                <span class="detail-value">${formData.employee.email}</span>
                            </div>
                            ` : ''}
                        </div>
                    </div>

                    <div class="contract-section">
                        <h4>Berechnungen</h4>
                        <div class="calculations">
                            <div class="detail-row">
                                <span class="detail-label">Monatliches Bruttoeinkommen:</span>
                                <span class="detail-value">${Utils.formatCurrency(Utils.calculateMonthlySalary(formData.employment.hourlyWage, formData.employment.weeklyHours))}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Jährliches Bruttoeinkommen:</span>
                                <span class="detail-value">${Utils.formatCurrency(Utils.calculateYearlySalary(formData.employment.hourlyWage, formData.employment.weeklyHours))}</span>
                            </div>
                        </div>
                    </div>

                    <div class="contract-section">
                        <h4>Bestätigungen</h4>
                        <div class="confirmations">
                            <div class="confirmation-item ${formData.agreements.datenschutz ? 'confirmed' : 'not-confirmed'}">
                                <span class="confirmation-icon">${formData.agreements.datenschutz ? '✅' : '❌'}</span>
                                Datenschutzbestimmungen akzeptiert
                            </div>
                            <div class="confirmation-item ${formData.agreements.arbeitsschutzBelehrung ? 'confirmed' : 'not-confirmed'}">
                                <span class="confirmation-icon">${formData.agreements.arbeitsschutzBelehrung ? '✅' : '❌'}</span>
                                Arbeitsschutzbelehrung durchgeführt
                            </div>
                            <div class="confirmation-item ${formData.agreements.hygieneSchulung ? 'confirmed' : 'not-confirmed'}">
                                <span class="confirmation-icon">${formData.agreements.hygieneSchulung ? '✅' : '❌'}</span>
                                Hygieneschulung absolviert
                            </div>
                        </div>
                    </div>
                </div>

                <div class="contract-footer">
                    <p><em>Dies ist eine Vorschau des Arbeitsvertrags. Der finale Vertrag wird als PDF generiert.</em></p>
                </div>
            </div>
        `;
    }

    /**
     * Update final step summary
     */
    updateFinalStepSummary(formData) {
        try {
            // Update contract type
            const contractTypeElement = document.getElementById('final-contract-type');
            if (contractTypeElement && formData.contractType) {
                const contractTypeNames = {
                    minijob: 'Minijob',
                    teilzeit: 'Teilzeit',
                    vollzeit: 'Vollzeit'
                };
                contractTypeElement.textContent = contractTypeNames[formData.contractType] || formData.contractType;
            }

            // Update employee name
            const employeeNameElement = document.getElementById('final-employee-name');
            if (employeeNameElement && formData.employee && formData.employee.name) {
                employeeNameElement.textContent = formData.employee.name;
            }

            // Update start date
            const startDateElement = document.getElementById('final-start-date');
            if (startDateElement && formData.employment && formData.employment.startDate) {
                startDateElement.textContent = Utils.formatDate(formData.employment.startDate);
            }

            // Update hourly wage
            const hourlyWageElement = document.getElementById('final-hourly-wage');
            if (hourlyWageElement && formData.employment && formData.employment.hourlyWage) {
                hourlyWageElement.textContent = Utils.formatCurrency(formData.employment.hourlyWage);
            }
        } catch (error) {
            console.error('Failed to update final step summary:', error);
        }
    }

    /**
     * Prepare final step
     */
    async prepareFinalStep() {
        try {
            console.log('Preparing final step...');

            // Get form data and update summary
            const formData = this.formHandler ? this.formHandler.getFormattedData() : this.formData;
            this.updateFinalStepSummary(formData);

            // Set up download button handlers
            this.setupDownloadHandlers(formData);

        } catch (error) {
            console.error('Failed to prepare final step:', error);
        }
    }

    /**
     * Set up download button handlers
     */
    setupDownloadHandlers(formData) {
        const downloadBtn = document.getElementById('download-pdf-btn');
        const emailBtn = document.getElementById('email-pdf-btn');
        const newContractBtn = document.getElementById('new-contract-btn');
        const editContractBtn = document.getElementById('edit-contract-btn');

        if (downloadBtn) {
            downloadBtn.onclick = () => this.generatePDF(formData);
        }

        if (emailBtn) {
            emailBtn.onclick = () => this.emailPDF(formData);
        }

        if (newContractBtn) {
            newContractBtn.onclick = () => this.startNewContract();
        }

        if (editContractBtn) {
            editContractBtn.onclick = () => this.editContract();
        }
    }

    /**
     * Handle form submission
     */
    async handleFormSubmission() {
        if (this.currentStep === this.totalSteps) {
            await this.generatePDF();
        }
    }

    /**
     * Generate PDF
     */
    async generatePDF(formData = null) {
        try {
            const data = formData || (this.formHandler ? this.formHandler.getFormattedData() : this.formData);
            if (this.pdfGenerator) {
                await this.pdfGenerator.generate(data);
            } else {
                console.error('PDF Generator not available');
                this.showError('PDF-Generator ist nicht verfügbar.');
            }
        } catch (error) {
            console.error('Failed to generate PDF:', error);
            this.showError('Fehler beim Erstellen der PDF-Datei.');
        }
    }

    /**
     * Email PDF
     */
    async emailPDF(formData = null) {
        // This would typically open an email client or send via server
        this.showError('E-Mail-Funktion ist noch nicht implementiert.');
    }

    /**
     * Start new contract
     */
    startNewContract() {
        if (confirm('Möchten Sie wirklich einen neuen Vertrag erstellen? Alle aktuellen Daten gehen verloren.')) {
            if (this.formHandler) {
                this.formHandler.resetForm();
            }
            // Clear localStorage
            localStorage.removeItem('suz-contract-form-data');
            // Reload page
            window.location.reload();
        }
    }

    /**
     * Edit contract
     */
    editContract() {
        // Go back to step 1
        this.currentStep = 1;
        this.updateStepDisplay();
        this.updateStepIndicator();
        this.updateNavigationButtons();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * Update loading progress
     */
    updateLoadingProgress(message, percentage) {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            const messageElement = loadingScreen.querySelector('p');
            if (messageElement) {
                messageElement.textContent = message;
            }

            // Add progress bar if it doesn't exist
            let progressBar = loadingScreen.querySelector('.progress-bar');
            if (!progressBar) {
                progressBar = document.createElement('div');
                progressBar.className = 'progress-bar';
                progressBar.innerHTML = '<div class="progress-fill"></div>';
                loadingScreen.appendChild(progressBar);
            }

            const progressFill = progressBar.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.width = `${percentage}%`;
            }
        }
    }

    /**
     * Handle URL parameters
     */
    handleURLParameters() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const contractType = urlParams.get('type');

            if (contractType && ['minijob', 'teilzeit', 'vollzeit'].includes(contractType)) {
                // Pre-select contract type
                setTimeout(() => {
                    this.handleContractTypeSelection(contractType);
                }, 100);
            }
        } catch (error) {
            console.warn('Failed to handle URL parameters:', error);
        }
    }

    /**
     * Hide loading screen
     */
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const app = document.getElementById('app');

        if (loadingScreen && app) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                app.style.display = 'block';
                app.style.opacity = '0';
                setTimeout(() => {
                    app.style.opacity = '1';
                }, 50);
            }, 300);
        }
    }

    /**
     * Show error message
     */
    showError(message, type = 'error', duration = 5000) {
        // Remove existing alerts of the same type
        document.querySelectorAll(`.alert-${type}`).forEach(alert => {
            if (alert.parentNode) {
                alert.parentNode.removeChild(alert);
            }
        });

        // Create new error alert
        const errorAlert = document.createElement('div');
        errorAlert.className = `alert alert-${type}`;

        const iconMap = {
            error: '⚠️',
            warning: '⚠️',
            info: 'ℹ️',
            success: '✅'
        };

        errorAlert.innerHTML = `
            <span class="alert-icon">${iconMap[type] || '⚠️'}</span>
            <span class="alert-message">${message}</span>
            <button class="alert-close" onclick="this.parentElement.remove()">&times;</button>
        `;

        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.insertBefore(errorAlert, mainContent.firstChild);
        } else {
            document.body.appendChild(errorAlert);
        }

        // Auto-hide after specified duration
        if (duration > 0) {
            setTimeout(() => {
                if (errorAlert.parentNode) {
                    errorAlert.style.opacity = '0';
                    setTimeout(() => {
                        if (errorAlert.parentNode) {
                            errorAlert.parentNode.removeChild(errorAlert);
                        }
                    }, 300);
                }
            }, duration);
        }
    }

    /**
     * Show critical error that prevents app from functioning
     */
    showCriticalError(message) {
        const loadingScreen = document.getElementById('loading-screen');
        const app = document.getElementById('app');

        // Hide loading screen
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }

        // Show app with error
        if (app) {
            app.style.display = 'block';
            app.style.opacity = '1';
        }

        // Create critical error overlay
        const errorOverlay = document.createElement('div');
        errorOverlay.className = 'critical-error-overlay';
        errorOverlay.innerHTML = `
            <div class="critical-error-content">
                <div class="error-icon">❌</div>
                <h2>Anwendungsfehler</h2>
                <p>${message}</p>
                <div class="error-actions">
                    <button onclick="window.location.reload()" class="btn btn-primary">
                        Seite neu laden
                    </button>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" class="btn btn-secondary">
                        Trotzdem fortfahren
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(errorOverlay);
    }

    /**
     * Set up global error handlers
     */
    setupGlobalErrorHandlers() {
        // Handle uncaught JavaScript errors
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
            Utils.logError(event.error, {
                context: 'global_error',
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno
            });

            // Don't show error for script loading failures (they're handled elsewhere)
            if (!event.filename || !event.filename.includes('.js')) {
                this.showError('Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.', 'error', 8000);
            }
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            Utils.logError(new Error(event.reason), {
                context: 'unhandled_promise_rejection'
            });

            this.showError('Ein Fehler bei der Datenverarbeitung ist aufgetreten. Bitte versuchen Sie es erneut.', 'error', 8000);

            // Prevent the default browser behavior
            event.preventDefault();
        });

        // Handle network errors
        window.addEventListener('offline', () => {
            this.showError('Keine Internetverbindung. Einige Funktionen sind möglicherweise nicht verfügbar.', 'warning', 0);
        });

        window.addEventListener('online', () => {
            this.showError('Internetverbindung wiederhergestellt.', 'success', 3000);
        });

        // Handle form submission errors
        document.addEventListener('submit', (event) => {
            if (event.target.id === 'contract-form') {
                event.preventDefault();
                this.handleFormSubmission();
            }
        });
    }

    /**
     * Clear error message
     */
    clearError(errorId) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.classList.remove('show');
            errorElement.textContent = '';
        }
    }

    /**
     * Show modal
     */
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            modal.style.display = 'flex';
        }
    }

    /**
     * Hide modal
     */
    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    }

    /**
     * Hide all modals
     */
    hideAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            this.hideModal(modal.id);
        });
    }

    /**
     * Show help modal
     */
    showHelpModal() {
        this.showModal('help-modal');
    }

    /**
     * Show settings modal
     */
    showSettingsModal() {
        this.showModal('settings-modal');
    }

    /**
     * Show continue dialog
     */
    showContinueDialog(savedStep) {
        const message = `Sie haben bereits begonnen, einen Vertrag zu erstellen. Möchten Sie bei Schritt ${savedStep} fortfahren?`;
        if (confirm(message)) {
            this.currentStep = savedStep;
            this.updateStepDisplay();
            this.updateStepIndicator();
            this.updateNavigationButtons();
        }
    }

    /**
     * Utility: Debounce function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize the application when the script loads
const app = new ContractGeneratorApp();

// Start the application
app.init();

// Make app globally available for debugging
window.ContractApp = app;
