/**
 * S.U.Z. Reinigung Contract Generator - Utility Functions
 * 
 * Common utility functions used throughout the application
 */

/**
 * Utility class with static methods
 */
class Utils {
    /**
     * Format date to German locale
     */
    static formatDate(date, options = {}) {
        const defaultOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        };
        
        const formatOptions = { ...defaultOptions, ...options };
        
        if (typeof date === 'string') {
            date = new Date(date);
        }
        
        return date.toLocaleDateString('de-DE', formatOptions);
    }

    /**
     * Format currency to German locale
     */
    static formatCurrency(amount, currency = 'EUR') {
        return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }

    /**
     * Format number to German locale
     */
    static formatNumber(number, options = {}) {
        return new Intl.NumberFormat('de-DE', options).format(number);
    }

    /**
     * Validate German postal code
     */
    static isValidPostalCode(postalCode) {
        return /^[0-9]{5}$/.test(postalCode);
    }

    /**
     * Validate German tax ID
     */
    static isValidTaxId(taxId) {
        return /^[0-9]{11}$/.test(taxId);
    }

    /**
     * Validate email address
     */
    static isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    /**
     * Validate phone number (flexible format)
     */
    static isValidPhone(phone) {
        return /^[\+]?[0-9\s\-\(\)]{10,20}$/.test(phone);
    }

    /**
     * Calculate age from birth date
     */
    static calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    }

    /**
     * Calculate monthly salary from hourly wage and weekly hours
     */
    static calculateMonthlySalary(hourlyWage, weeklyHours) {
        const monthlyHours = weeklyHours * 4.33; // Average weeks per month
        return hourlyWage * monthlyHours;
    }

    /**
     * Calculate yearly salary from hourly wage and weekly hours
     */
    static calculateYearlySalary(hourlyWage, weeklyHours) {
        const yearlyHours = weeklyHours * 52; // Weeks per year
        return hourlyWage * yearlyHours;
    }

    /**
     * Check if employment qualifies as Minijob
     */
    static isMinijob(hourlyWage, weeklyHours) {
        const monthlySalary = this.calculateMonthlySalary(hourlyWage, weeklyHours);
        return monthlySalary <= 520; // Current Minijob limit
    }

    /**
     * Sanitize string for filename
     */
    static sanitizeFilename(filename) {
        return filename
            .replace(/[^a-zA-Z0-9äöüÄÖÜß\-_\.]/g, '_')
            .replace(/_{2,}/g, '_')
            .replace(/^_+|_+$/g, '');
    }

    /**
     * Generate filename for contract PDF
     */
    static generateContractFilename(contractType, employeeName, date = new Date()) {
        const dateStr = this.formatDate(date).replace(/\./g, '-');
        const cleanName = this.sanitizeFilename(employeeName);
        const typeMap = {
            minijob: 'Minijob',
            teilzeit: 'Teilzeit',
            vollzeit: 'Vollzeit'
        };
        
        return `Arbeitsvertrag_${typeMap[contractType] || contractType}_${cleanName}_${dateStr}.pdf`;
    }

    /**
     * Debounce function
     */
    static debounce(func, wait, immediate = false) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    }

    /**
     * Throttle function
     */
    static throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Deep clone object
     */
    static deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj.getTime());
        if (obj instanceof Array) return obj.map(item => this.deepClone(item));
        if (typeof obj === 'object') {
            const clonedObj = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    clonedObj[key] = this.deepClone(obj[key]);
                }
            }
            return clonedObj;
        }
    }

    /**
     * Check if object is empty
     */
    static isEmpty(obj) {
        if (obj == null) return true;
        if (Array.isArray(obj) || typeof obj === 'string') return obj.length === 0;
        return Object.keys(obj).length === 0;
    }

    /**
     * Capitalize first letter of string
     */
    static capitalize(str) {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    /**
     * Convert camelCase to kebab-case
     */
    static camelToKebab(str) {
        return str.replace(/([A-Z])/g, '-$1').toLowerCase();
    }

    /**
     * Convert kebab-case to camelCase
     */
    static kebabToCamel(str) {
        return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
    }

    /**
     * Generate UUID v4
     */
    static generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Get browser information
     */
    static getBrowserInfo() {
        const ua = navigator.userAgent;
        let browser = 'Unknown';
        let version = 'Unknown';

        if (ua.indexOf('Chrome') > -1) {
            browser = 'Chrome';
            version = ua.match(/Chrome\/([0-9.]+)/)?.[1] || 'Unknown';
        } else if (ua.indexOf('Firefox') > -1) {
            browser = 'Firefox';
            version = ua.match(/Firefox\/([0-9.]+)/)?.[1] || 'Unknown';
        } else if (ua.indexOf('Safari') > -1) {
            browser = 'Safari';
            version = ua.match(/Version\/([0-9.]+)/)?.[1] || 'Unknown';
        } else if (ua.indexOf('Edge') > -1) {
            browser = 'Edge';
            version = ua.match(/Edge\/([0-9.]+)/)?.[1] || 'Unknown';
        }

        return { browser, version };
    }

    /**
     * Check if device is mobile
     */
    static isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    /**
     * Check if device is tablet
     */
    static isTablet() {
        return /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent);
    }

    /**
     * Get device type
     */
    static getDeviceType() {
        if (this.isMobile()) return 'mobile';
        if (this.isTablet()) return 'tablet';
        return 'desktop';
    }

    /**
     * Copy text to clipboard
     */
    static async copyToClipboard(text) {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
                return true;
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                const result = document.execCommand('copy');
                textArea.remove();
                return result;
            }
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            return false;
        }
    }

    /**
     * Download file from blob
     */
    static downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    /**
     * Convert file to base64
     */
    static fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    /**
     * Format file size
     */
    static formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * Validate file type
     */
    static isValidFileType(file, allowedTypes) {
        const fileType = file.type.toLowerCase();
        const fileName = file.name.toLowerCase();
        
        return allowedTypes.some(type => {
            if (type.startsWith('.')) {
                return fileName.endsWith(type);
            } else {
                return fileType.includes(type);
            }
        });
    }

    /**
     * Show notification (if supported)
     */
    static async showNotification(title, options = {}) {
        if (!('Notification' in window)) {
            console.warn('This browser does not support notifications');
            return false;
        }

        if (Notification.permission === 'granted') {
            new Notification(title, options);
            return true;
        } else if (Notification.permission !== 'denied') {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                new Notification(title, options);
                return true;
            }
        }
        
        return false;
    }

    /**
     * Log error with context
     */
    static logError(error, context = {}) {
        const errorInfo = {
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            ...context
        };
        
        console.error('Application Error:', errorInfo);
        
        // In production, you might want to send this to an error tracking service
        // this.sendErrorToService(errorInfo);
    }

    /**
     * Create loading indicator
     */
    static createLoadingIndicator(text = 'Laden...') {
        const loading = document.createElement('div');
        loading.className = 'loading-indicator';
        loading.innerHTML = `
            <div class="loading-spinner"></div>
            <p>${text}</p>
        `;
        return loading;
    }

    /**
     * Show toast notification
     */
    static showToast(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        // Add to page
        document.body.appendChild(toast);
        
        // Show with animation
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Hide and remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, duration);
    }

    /**
     * Scroll to element smoothly
     */
    static scrollToElement(element, offset = 0) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Make Utils globally available
window.Utils = Utils;
