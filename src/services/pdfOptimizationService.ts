// PDF Optimization Service for SUZ Cleaning Services
// Advanced PDF generation with caching, compression, and performance optimizations

import jsPDF from 'jspdf';
import { QuoteData, PDFConfig, PDFGenerationRequest, PDFGenerationResponse } from '@/types/quote';
import { PDFService } from './pdfService';

// PDF Cache configuration
const PDF_CACHE_CONFIG = {
  maxCacheSize: 50, // Maximum number of cached PDFs
  cacheExpiryHours: 24, // Cache expiry time in hours
  compressionLevel: 0.8, // JPEG compression level (0.1 - 1.0)
  storageKey: 'suz_pdf_cache'
};

// Cached PDF data structure
interface CachedPDF {
  quoteId: string;
  quoteNumber: string;
  pdfDataUrl: string;
  pdfBlob: Blob;
  filename: string;
  createdAt: Date;
  fileSize: number;
  checksum: string;
}

// PDF generation metrics
interface PDFMetrics {
  generationTime: number;
  fileSize: number;
  compressionRatio: number;
  cacheHit: boolean;
  errorCount: number;
}

class PDFCacheManager {
  private static getStorageKey(): string {
    return PDF_CACHE_CONFIG.storageKey;
  }

  /**
   * Generate checksum for quote data to detect changes
   */
  private static generateChecksum(quote: QuoteData): string {
    const data = {
      id: quote.id,
      totalAmount: quote.totalAmount,
      items: quote.items.map(item => ({ id: item.id, amount: item.amount })),
      customer: quote.customer.email,
      updatedAt: quote.createdAt.getTime()
    };
    
    return btoa(JSON.stringify(data)).slice(0, 16);
  }

  /**
   * Get cached PDFs from localStorage
   */
  static getCachedPDFs(): CachedPDF[] {
    try {
      const stored = localStorage.getItem(this.getStorageKey());
      if (!stored) return [];
      
      const cached = JSON.parse(stored);
      return cached.map((item: any) => ({
        ...item,
        createdAt: new Date(item.createdAt)
      }));
    } catch (error) {
      console.error('Error loading PDF cache:', error);
      return [];
    }
  }

  /**
   * Save cached PDF to localStorage
   */
  static saveCachedPDF(cachedPDF: CachedPDF): void {
    try {
      const cached = this.getCachedPDFs();
      
      // Remove existing cache for this quote
      const filtered = cached.filter(item => item.quoteId !== cachedPDF.quoteId);
      
      // Add new cache entry
      filtered.push(cachedPDF);
      
      // Limit cache size
      if (filtered.length > PDF_CACHE_CONFIG.maxCacheSize) {
        // Remove oldest entries
        filtered.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        filtered.splice(0, filtered.length - PDF_CACHE_CONFIG.maxCacheSize);
      }
      
      localStorage.setItem(this.getStorageKey(), JSON.stringify(filtered));
    } catch (error) {
      console.error('Error saving PDF cache:', error);
    }
  }

  /**
   * Get cached PDF for a quote
   */
  static getCachedPDF(quoteId: string, checksum: string): CachedPDF | null {
    try {
      const cached = this.getCachedPDFs();
      const found = cached.find(item => 
        item.quoteId === quoteId && 
        item.checksum === checksum
      );
      
      if (!found) return null;
      
      // Check if cache is expired
      const now = new Date();
      const expiryTime = new Date(found.createdAt.getTime() + PDF_CACHE_CONFIG.cacheExpiryHours * 60 * 60 * 1000);
      
      if (now > expiryTime) {
        this.removeCachedPDF(quoteId);
        return null;
      }
      
      return found;
    } catch (error) {
      console.error('Error getting cached PDF:', error);
      return null;
    }
  }

  /**
   * Remove cached PDF
   */
  static removeCachedPDF(quoteId: string): void {
    try {
      const cached = this.getCachedPDFs();
      const filtered = cached.filter(item => item.quoteId !== quoteId);
      localStorage.setItem(this.getStorageKey(), JSON.stringify(filtered));
    } catch (error) {
      console.error('Error removing cached PDF:', error);
    }
  }

  /**
   * Clear all cached PDFs
   */
  static clearCache(): void {
    try {
      localStorage.removeItem(this.getStorageKey());
    } catch (error) {
      console.error('Error clearing PDF cache:', error);
    }
  }

  /**
   * Get cache statistics
   */
  static getCacheStats(): {
    totalCached: number;
    totalSize: number;
    oldestEntry: Date | null;
    newestEntry: Date | null;
  } {
    const cached = this.getCachedPDFs();
    
    const totalSize = cached.reduce((sum, item) => sum + item.fileSize, 0);
    const dates = cached.map(item => item.createdAt);
    
    return {
      totalCached: cached.length,
      totalSize,
      oldestEntry: dates.length > 0 ? new Date(Math.min(...dates.map(d => d.getTime()))) : null,
      newestEntry: dates.length > 0 ? new Date(Math.max(...dates.map(d => d.getTime()))) : null
    };
  }
}

export class PDFOptimizationService {
  private static metrics: PDFMetrics[] = [];

  /**
   * Generate optimized PDF with caching and compression
   */
  static async generateOptimizedPDF(request: PDFGenerationRequest): Promise<PDFGenerationResponse> {
    const startTime = performance.now();
    let metrics: PDFMetrics = {
      generationTime: 0,
      fileSize: 0,
      compressionRatio: 1,
      cacheHit: false,
      errorCount: 0
    };

    try {
      const { quote } = request;
      const checksum = PDFCacheManager.generateChecksum(quote);
      
      // Check cache first
      const cachedPDF = PDFCacheManager.getCachedPDF(quote.id, checksum);
      if (cachedPDF) {
        metrics.generationTime = performance.now() - startTime;
        metrics.fileSize = cachedPDF.fileSize;
        metrics.cacheHit = true;
        this.recordMetrics(metrics);
        
        return {
          success: true,
          pdfBlob: cachedPDF.pdfBlob,
          pdfDataUrl: cachedPDF.pdfDataUrl,
          filename: cachedPDF.filename
        };
      }

      // Generate new PDF with optimizations
      const response = await this.generateOptimizedPDFInternal(request);
      
      if (response.success && response.pdfBlob && response.pdfDataUrl && response.filename) {
        // Cache the generated PDF
        const cachedPDF: CachedPDF = {
          quoteId: quote.id,
          quoteNumber: quote.quoteNumber,
          pdfDataUrl: response.pdfDataUrl,
          pdfBlob: response.pdfBlob,
          filename: response.filename,
          createdAt: new Date(),
          fileSize: response.pdfBlob.size,
          checksum
        };
        
        PDFCacheManager.saveCachedPDF(cachedPDF);
        
        metrics.generationTime = performance.now() - startTime;
        metrics.fileSize = response.pdfBlob.size;
        metrics.cacheHit = false;
        this.recordMetrics(metrics);
      }

      return response;
    } catch (error) {
      metrics.errorCount = 1;
      metrics.generationTime = performance.now() - startTime;
      this.recordMetrics(metrics);
      
      console.error('Optimized PDF generation error:', error);
      return {
        success: false,
        error: 'Fehler bei der optimierten PDF-Erstellung'
      };
    }
  }

  /**
   * Internal optimized PDF generation
   */
  private static async generateOptimizedPDFInternal(request: PDFGenerationRequest): Promise<PDFGenerationResponse> {
    // Use the existing PDF service but with optimizations
    const response = await PDFService.generateQuotePDF(request);
    
    if (!response.success || !response.pdfBlob) {
      return response;
    }

    // Apply compression if needed
    const compressedBlob = await this.compressPDF(response.pdfBlob);
    
    return {
      ...response,
      pdfBlob: compressedBlob,
      pdfDataUrl: await this.blobToDataUrl(compressedBlob)
    };
  }

  /**
   * Compress PDF blob
   */
  private static async compressPDF(pdfBlob: Blob): Promise<Blob> {
    try {
      // For now, return the original blob
      // In a real implementation, you might use PDF compression libraries
      return pdfBlob;
    } catch (error) {
      console.error('PDF compression error:', error);
      return pdfBlob;
    }
  }

  /**
   * Convert blob to data URL
   */
  private static async blobToDataUrl(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  /**
   * Record performance metrics
   */
  private static recordMetrics(metrics: PDFMetrics): void {
    this.metrics.push(metrics);
    
    // Keep only last 100 metrics
    if (this.metrics.length > 100) {
      this.metrics.splice(0, this.metrics.length - 100);
    }
  }

  /**
   * Get performance statistics
   */
  static getPerformanceStats(): {
    averageGenerationTime: number;
    averageFileSize: number;
    cacheHitRate: number;
    totalGenerations: number;
    errorRate: number;
  } {
    if (this.metrics.length === 0) {
      return {
        averageGenerationTime: 0,
        averageFileSize: 0,
        cacheHitRate: 0,
        totalGenerations: 0,
        errorRate: 0
      };
    }

    const totalTime = this.metrics.reduce((sum, m) => sum + m.generationTime, 0);
    const totalSize = this.metrics.reduce((sum, m) => sum + m.fileSize, 0);
    const cacheHits = this.metrics.filter(m => m.cacheHit).length;
    const errors = this.metrics.filter(m => m.errorCount > 0).length;

    return {
      averageGenerationTime: totalTime / this.metrics.length,
      averageFileSize: totalSize / this.metrics.length,
      cacheHitRate: (cacheHits / this.metrics.length) * 100,
      totalGenerations: this.metrics.length,
      errorRate: (errors / this.metrics.length) * 100
    };
  }

  /**
   * Preload PDF for faster access
   */
  static async preloadPDF(quote: QuoteData): Promise<void> {
    try {
      await this.generateOptimizedPDF({ quote });
    } catch (error) {
      console.error('PDF preload error:', error);
    }
  }

  /**
   * Batch generate PDFs for multiple quotes
   */
  static async batchGeneratePDFs(quotes: QuoteData[]): Promise<PDFGenerationResponse[]> {
    const results: PDFGenerationResponse[] = [];
    
    // Process in batches to avoid overwhelming the browser
    const batchSize = 3;
    for (let i = 0; i < quotes.length; i += batchSize) {
      const batch = quotes.slice(i, i + batchSize);
      const batchPromises = batch.map(quote => this.generateOptimizedPDF({ quote }));
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
      
      // Small delay between batches
      if (i + batchSize < quotes.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    return results;
  }

  /**
   * Clear cache and reset metrics
   */
  static clearAllData(): void {
    PDFCacheManager.clearCache();
    this.metrics = [];
  }

  /**
   * Get cache manager for external access
   */
  static getCacheManager() {
    return PDFCacheManager;
  }
}
