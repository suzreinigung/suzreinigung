/**
 * S.U.Z. Reinigung Contract Generator - Form Handler
 * 
 * Handles form validation, data management, and step-by-step form processing
 */

class FormHandler {
    constructor(app) {
        this.app = app;
        this.formData = {};
        this.validationRules = {};
        this.isInitialized = false;
        
        // Bind methods
        this.init = this.init.bind(this);
        this.validateStep = this.validateStep.bind(this);
        this.validateField = this.validateField.bind(this);
        this.saveStepData = this.saveStepData.bind(this);
        this.getFormData = this.getFormData.bind(this);
        this.loadFormData = this.loadFormData.bind(this);
    }

    /**
     * Initialize the form handler
     */
    async init() {
        try {
            console.log('Initializing Form Handler...');
            
            this.setupValidationRules();
            this.setupFormElements();
            this.setupRealTimeValidation();
            
            this.isInitialized = true;
            console.log('Form Handler initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize form handler:', error);
            throw error;
        }
    }

    /**
     * Set up validation rules for all form fields
     */
    setupValidationRules() {
        this.validationRules = {
            // Step 1: Contract Type
            contractType: {
                required: true,
                validator: (value) => ['minijob', 'teilzeit', 'vollzeit'].includes(value),
                message: 'Bitte wählen Sie eine Vertragsart aus.'
            },
            
            // Step 2: Employee Information
            employeeName: {
                required: true,
                minLength: 2,
                maxLength: 100,
                pattern: /^[a-zA-ZäöüÄÖÜß\s\-']+$/,
                message: 'Bitte geben Sie einen gültigen Namen ein (nur Buchstaben, Leerzeichen und Bindestriche).'
            },
            
            birthDate: {
                required: true,
                validator: (value) => {
                    const date = new Date(value);
                    const today = new Date();
                    const age = today.getFullYear() - date.getFullYear();
                    return age >= 16 && age <= 100;
                },
                message: 'Das Geburtsdatum muss zwischen 16 und 100 Jahren liegen.'
            },
            
            taxId: {
                required: true,
                pattern: /^[0-9]{11}$/,
                message: 'Die Steuer-ID muss genau 11 Ziffern enthalten.'
            },
            
            address: {
                required: true,
                minLength: 5,
                maxLength: 100,
                message: 'Bitte geben Sie eine gültige Adresse ein.'
            },
            
            postalCode: {
                required: true,
                pattern: /^[0-9]{5}$/,
                message: 'Die Postleitzahl muss genau 5 Ziffern enthalten.'
            },
            
            city: {
                required: true,
                minLength: 2,
                maxLength: 50,
                pattern: /^[a-zA-ZäöüÄÖÜß\s\-']+$/,
                message: 'Bitte geben Sie einen gültigen Ortsnamen ein.'
            },
            
            phone: {
                required: true,
                pattern: /^[\+]?[0-9\s\-\(\)]{10,20}$/,
                message: 'Bitte geben Sie eine gültige Telefonnummer ein.'
            },
            
            email: {
                required: false,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
            },
            
            // Step 3: Work Details
            startDate: {
                required: true,
                validator: (value) => {
                    const date = new Date(value);
                    const today = new Date();
                    return date >= today;
                },
                message: 'Das Startdatum muss in der Zukunft liegen.'
            },
            
            jobTitle: {
                required: true,
                minLength: 2,
                maxLength: 100,
                message: 'Bitte geben Sie eine gültige Tätigkeitsbezeichnung ein.'
            },
            
            weeklyHours: {
                required: true,
                validator: (value) => {
                    const hours = parseFloat(value);
                    return hours >= 1 && hours <= 43;
                },
                message: 'Die wöchentliche Arbeitszeit muss zwischen 1 und 43 Stunden liegen.'
            },
            
            hourlyWage: {
                required: true,
                validator: (value) => {
                    const wage = parseFloat(value);
                    return wage >= 12.00;
                },
                message: 'Der Stundenlohn muss mindestens 12,00€ betragen.'
            },
            
            workDays: {
                required: true,
                minLength: 5,
                maxLength: 100,
                message: 'Bitte geben Sie die Arbeitstage an.'
            },
            
            workHours: {
                required: true,
                minLength: 5,
                maxLength: 50,
                pattern: /^[0-9]{1,2}:[0-9]{2}\s*-\s*[0-9]{1,2}:[0-9]{2}/,
                message: 'Bitte geben Sie die Arbeitszeiten im Format "HH:MM - HH:MM" an.'
            },
            
            vacationDays: {
                required: true,
                validator: (value) => {
                    const days = parseInt(value);
                    return days >= 20 && days <= 30;
                },
                message: 'Der Urlaubsanspruch muss zwischen 20 und 30 Tagen liegen.'
            },
            
            otherEmployment: {
                required: true,
                minLength: 1,
                maxLength: 200,
                message: 'Bitte geben Sie weitere Beschäftigungen an oder "keine".'
            },
            
            // Checkboxes
            datenschutz: {
                required: true,
                validator: (value) => value === true,
                message: 'Sie müssen den Datenschutzbestimmungen zustimmen.'
            },
            
            arbeitsschutzBelehrung: {
                required: true,
                validator: (value) => value === true,
                message: 'Die Arbeitsschutzbelehrung muss bestätigt werden.'
            },
            
            hygieneSchulung: {
                required: true,
                validator: (value) => value === true,
                message: 'Die Hygieneschulung muss bestätigt werden.'
            }
        };
    }

    /**
     * Set up form elements and their initial state
     */
    setupFormElements() {
        // Set default values
        const jobTitleInput = document.getElementById('job-title');
        if (jobTitleInput && !jobTitleInput.value) {
            jobTitleInput.value = 'Reinigungskraft';
        }
        
        // Set minimum date for start date (today)
        const startDateInput = document.getElementById('start-date');
        if (startDateInput) {
            const today = new Date().toISOString().split('T')[0];
            startDateInput.min = today;
        }
        
        // Set maximum date for birth date (16 years ago)
        const birthDateInput = document.getElementById('birth-date');
        if (birthDateInput) {
            const maxDate = new Date();
            maxDate.setFullYear(maxDate.getFullYear() - 16);
            birthDateInput.max = maxDate.toISOString().split('T')[0];
            
            const minDate = new Date();
            minDate.setFullYear(minDate.getFullYear() - 100);
            birthDateInput.min = minDate.toISOString().split('T')[0];
        }
    }

    /**
     * Set up real-time validation for form fields
     */
    setupRealTimeValidation() {
        // Add input event listeners for real-time validation
        Object.keys(this.validationRules).forEach(fieldName => {
            const field = document.getElementById(this.getFieldId(fieldName));
            if (field) {
                field.addEventListener('input', () => {
                    this.clearFieldError(fieldName);
                });
                
                field.addEventListener('blur', () => {
                    this.validateField(field);
                });
            }
        });
        
        // Special handling for contract type cards
        const contractTypeCards = document.querySelectorAll('.contract-type-card');
        contractTypeCards.forEach(card => {
            card.addEventListener('click', () => {
                this.clearFieldError('contractType');
            });
        });
    }

    /**
     * Validate a specific step
     */
    async validateStep(stepNumber) {
        console.log(`--- Validating Step ${stepNumber} ---`);
        const stepFields = this.getStepFields(stepNumber);
        let isValid = true;
        
        for (const fieldName of stepFields) {
            const field = document.getElementById(this.getFieldId(fieldName));
            console.log(`Validating field: ${fieldName} (ID: ${field ? field.id : 'N/A'})`);
            if (field && !this.validateField(field)) {
                isValid = false;
                console.log(`Validation failed for field: ${fieldName}`);
            } else if (!field) {
                console.warn(`Field element not found for validation: ${fieldName}`);
                // If a required field element is not found, it should fail validation
                if (this.validationRules[fieldName] && this.validationRules[fieldName].required) {
                    isValid = false;
                    this.showFieldError(fieldName, `Fehler: Feld "${fieldName}" nicht gefunden.`);
                }
            }
        }
        console.log(`--- Step ${stepNumber} validation result: ${isValid} ---`);
        return isValid;
    }

    /**
     * Validate a single field
     */
    validateField(field) {
        const fieldName = this.getFieldName(field.id);
        const rule = this.validationRules[fieldName];
        
        if (!rule) {
            console.log(`No validation rule found for field: ${fieldName}`);
            return true;
        }
        
        const value = this.getFieldValue(field);
        console.log(`Field: ${fieldName}, Value: "${value}", Rule:`, rule);
        const isValid = this.validateValue(value, rule);
        
        if (!isValid) {
            this.showFieldError(fieldName, rule.message);
            field.classList.add('error');
            console.log(`Validation FAILED for ${fieldName}. Message: ${rule.message}`);
        } else {
            this.clearFieldError(fieldName);
            field.classList.remove('error');
            console.log(`Validation PASSED for ${fieldName}.`);
        }
        
        return isValid;
    }

    /**
     * Validate a value against a rule
     */
    validateValue(value, rule) {
        console.log(`  - Validating value "${value}" against rule:`, rule);
        // Required check
        if (rule.required && (value === null || value === undefined || value === '' || value === false)) {
            console.log(`    - Required check failed: value is "${value}"`);
            return false;
        }
        
        // Skip other validations if field is not required and empty
        if (!rule.required && (value === null || value === undefined || value === '')) {
            console.log(`    - Not required and empty, skipping further validation.`);
            return true;
        }
        
        // Length checks
        if (rule.minLength && value.length < rule.minLength) {
            console.log(`    - MinLength check failed: ${value.length} < ${rule.minLength}`);
            return false;
        }
        if (rule.maxLength && value.length > rule.maxLength) {
            console.log(`    - MaxLength check failed: ${value.length} > ${rule.maxLength}`);
            return false;
        }
        
        // Pattern check
        if (rule.pattern && !rule.pattern.test(value)) {
            console.log(`    - Pattern check failed: "${value}" does not match ${rule.pattern}`);
            return false;
        }
        
        // Custom validator
        if (rule.validator) {
            const customValidationResult = rule.validator(value);
            console.log(`    - Custom validator result: ${customValidationResult}`);
            if (!customValidationResult) return false;
        }
        
        console.log(`    - All validations passed.`);
        return true;
    }

    /**
     * Get field value based on field type
     */
    getFieldValue(field) {
        if (field.type === 'checkbox') {
            return field.checked;
        } else if (field.type === 'radio') {
            const radioGroup = document.querySelectorAll(`input[name="${field.name}"]`);
            const checked = Array.from(radioGroup).find(radio => radio.checked);
            const val = checked ? checked.value : '';
            console.log(`  - getFieldValue for radio group ${field.name}: "${val}"`);
            return val;
        } else {
            const val = field.value.trim();
            console.log(`  - getFieldValue for input ${field.id}: "${val}"`);
            return val;
        }
    }

    /**
     * Get fields for a specific step
     */
    getStepFields(stepNumber) {
        const stepFieldMap = {
            1: ['contractType'],
            2: ['employeeName', 'birthDate', 'taxId', 'address', 'postalCode', 'city', 'phone', 'email'],
            3: ['startDate', 'jobTitle', 'weeklyHours', 'hourlyWage', 'workDays', 'workHours', 
                'vacationDays', 'otherEmployment', 'datenschutz', 'arbeitsschutzBelehrung', 'hygieneSchulung'],
            4: [], // Preview step - no validation needed
            5: []  // Final step - no validation needed
        };
        
        return stepFieldMap[stepNumber] || [];
    }

    /**
     * Get field ID from field name
     */
    getFieldId(fieldName) {
        // Convert camelCase to kebab-case
        return fieldName.replace(/([A-Z])/g, '-$1').toLowerCase();
    }

    /**
     * Get field name from field ID
     */
    getFieldName(fieldId) {
        // Convert kebab-case to camelCase
        return fieldId.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
    }

    /**
     * Show field error
     */
    showFieldError(fieldName, message) {
        const errorId = this.getFieldId(fieldName) + '-error';
        const errorElement = document.getElementById(errorId);
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    /**
     * Clear field error
     */
    clearFieldError(fieldName) {
        const errorId = this.getFieldId(fieldName) + '-error';
        const errorElement = document.getElementById(errorId);
        
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    }

    /**
     * Save data for current step
     */
    saveStepData(stepNumber) {
        console.log(`=== SAVING STEP ${stepNumber} DATA ===`);
        const stepFields = this.getStepFields(stepNumber);
        console.log(`Fields to save for step ${stepNumber}:`, stepFields);

        stepFields.forEach(fieldName => {
            const fieldId = this.getFieldId(fieldName);
            const field = document.getElementById(fieldId);
            console.log(`Looking for field: ${fieldName} -> ID: ${fieldId}`);

            if (field) {
                const value = this.getFieldValue(field);
                this.formData[fieldName] = value;
                console.log(`✓ Saved field ${fieldName} (${fieldId}):`, value);
            } else {
                console.error(`✗ Field not found: ${fieldName} (${fieldId})`);
                // Check if field exists with different ID
                const alternativeField = document.querySelector(`[name="${fieldName}"]`);
                if (alternativeField) {
                    const value = this.getFieldValue(alternativeField);
                    this.formData[fieldName] = value;
                    console.log(`✓ Found field by name attribute: ${fieldName}:`, value);
                } else {
                    console.error(`✗ Field not found by name either: ${fieldName}`);
                }
            }
        });

        // Special handling for contract type
        if (stepNumber === 1) {
            const contractTypeInput = document.getElementById('contract-type');
            if (contractTypeInput && contractTypeInput.value) {
                this.formData.contractType = contractTypeInput.value;
                console.log('✓ Saved contract type:', contractTypeInput.value);
            } else {
                console.error('✗ Contract type field not found or empty');
            }
        }

        console.log(`=== STEP ${stepNumber} DATA SAVED ===`);
        console.log('Current form data:', JSON.stringify(this.formData, null, 2));
    }

    /**
     * Get all form data
     */
    getFormData() {
        // Save current step data first
        console.log(`Getting form data, current step: ${this.app.currentStep}`);
        this.saveStepData(this.app.currentStep);
        console.log('Form data after saving current step:', this.formData);
        return { ...this.formData };
    }

    /**
     * Load form data into form fields
     */
    loadFormData(data) {
        this.formData = { ...data };
        
        Object.keys(data).forEach(fieldName => {
            const field = document.getElementById(this.getFieldId(fieldName));
            if (field) {
                if (field.type === 'checkbox') {
                    field.checked = data[fieldName];
                } else {
                    field.value = data[fieldName];
                }
            }
        });
        
        // Special handling for contract type selection
        if (data.contractType) {
            const contractTypeCard = document.querySelector(`[data-type="${data.contractType}"]`);
            if (contractTypeCard) {
                contractTypeCard.classList.add('selected');
            }
            
            const contractTypeInput = document.getElementById('contract-type');
            if (contractTypeInput) {
                contractTypeInput.value = data.contractType;
            }
        }
    }

    /**
     * Reset form to initial state
     */
    resetForm() {
        this.formData = {};
        
        // Clear all form fields
        const form = document.getElementById('contract-form');
        if (form) {
            form.reset();
        }
        
        // Clear all error messages
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
            error.classList.remove('show');
        });
        
        // Clear contract type selection
        document.querySelectorAll('.contract-type-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Reset to step 1
        this.app.currentStep = 1;
        this.app.updateStepDisplay();
        this.app.updateStepIndicator();
        this.app.updateNavigationButtons();
    }

    /**
     * Get form data as formatted object for contract generation
     */
    getFormattedData() {
        const data = this.getFormData();

        console.log('Raw form data:', data);
        console.log('Available form data keys:', Object.keys(data));

        // Validate required data
        if (!data.contractType) {
            console.error('Contract type is missing from form data');
            console.log('Available data:', data);
            return null;
        }

        if (!data.employeeName) {
            console.error('Employee name is missing from form data');
            console.log('Available data:', data);
            console.log('Looking for employeeName in:', Object.keys(data));

            // Try to get data directly from form fields as fallback
            const employeeNameField = document.getElementById('employee-name');
            if (employeeNameField && employeeNameField.value) {
                console.log('Found employee name in form field as fallback:', employeeNameField.value);
                data.employeeName = employeeNameField.value;
            } else {
                return null;
            }
        }

        // Format data for contract template
        const formattedData = {
            contractType: data.contractType,
            employee: {
                name: data.employeeName || '',
                birthDate: data.birthDate || '',
                taxId: data.taxId || '',
                address: data.address || '',
                postalCode: data.postalCode || '',
                city: data.city || '',
                phone: data.phone || '',
                email: data.email || ''
            },
            employment: {
                startDate: data.startDate || '',
                jobTitle: data.jobTitle || 'Reinigungskraft',
                weeklyHours: parseFloat(data.weeklyHours) || 0,
                hourlyWage: parseFloat(data.hourlyWage) || 0,
                workDays: data.workDays || '',
                workHours: data.workHours || '',
                vacationDays: parseInt(data.vacationDays) || 24,
                otherEmployment: data.otherEmployment || 'keine'
            },
            agreements: {
                sonderzahlungen: data.sonderzahlungen || false,
                datenschutz: data.datenschutz || false,
                arbeitsschutzBelehrung: data.arbeitsschutzBelehrung || false,
                hygieneSchulung: data.hygieneSchulung || false
            },
            metadata: {
                createdAt: new Date().toISOString(),
                version: '1.0.0'
            }
        };

        console.log('Formatted data:', formattedData);
        return formattedData;
    }
}

// Make FormHandler globally available
window.FormHandler = FormHandler;
