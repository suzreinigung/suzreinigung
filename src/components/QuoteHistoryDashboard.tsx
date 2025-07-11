// Quote History Dashboard for SUZ Cleaning Services
// Customer-facing dashboard to view and manage quote history

import React, { useState, useEffect } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  Download, 
  Mail, 
  Eye,
  Calendar,
  Euro,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { QuoteReferenceService } from '@/services/quoteReferenceService';
import { QuoteAnalyticsService } from '@/services/quoteAnalytics';
import { PDFService } from '@/services/pdfService';
import { QuoteService } from '@/services/quoteService';
import QuoteDisplay from './QuoteDisplay';
import { toast } from 'sonner';

interface QuoteReference {
  id: string;
  quoteNumber: string;
  customerId: string;
  customerEmail: string;
  createdAt: Date;
  validUntil: Date;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  totalAmount: number;
  serviceType: string;
  lastAccessed?: Date;
}

interface QuoteHistoryDashboardProps {
  customerEmail?: string;
  showAllQuotes?: boolean;
  onQuoteSelected?: (quoteId: string) => void;
}

const QuoteHistoryDashboard: React.FC<QuoteHistoryDashboardProps> = ({
  customerEmail,
  showAllQuotes = false,
  onQuoteSelected
}) => {
  const [quotes, setQuotes] = useState<QuoteReference[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<QuoteReference[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'status'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load quotes on component mount
  useEffect(() => {
    loadQuotes();
  }, [customerEmail, showAllQuotes]);

  // Filter and sort quotes when dependencies change
  useEffect(() => {
    filterAndSortQuotes();
  }, [quotes, searchTerm, statusFilter, sortBy, sortOrder]);

  const loadQuotes = () => {
    setIsLoading(true);
    try {
      let allQuotes: QuoteReference[] = [];
      
      if (showAllQuotes) {
        // Load all quotes (admin view)
        const searchResults = QuoteReferenceService.searchQuotes({});
        allQuotes = searchResults;
      } else if (customerEmail) {
        // Load quotes for specific customer
        allQuotes = QuoteReferenceService.getCustomerReferences(customerEmail);
      }
      
      setQuotes(allQuotes);
      
      // Track dashboard view
      QuoteAnalyticsService.trackEvent('quote_viewed', {
        metadata: { 
          viewType: showAllQuotes ? 'admin_dashboard' : 'customer_dashboard',
          quoteCount: allQuotes.length 
        }
      });
    } catch (error) {
      console.error('Error loading quotes:', error);
      toast.error('Fehler beim Laden der Angebote');
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortQuotes = () => {
    let filtered = [...quotes];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(quote =>
        quote.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(quote => quote.status === statusFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = a.createdAt.getTime() - b.createdAt.getTime();
          break;
        case 'amount':
          comparison = a.totalAmount - b.totalAmount;
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    setFilteredQuotes(filtered);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <Clock size={16} className="text-slate-400" />;
      case 'sent': return <Mail size={16} className="text-blue-400" />;
      case 'accepted': return <CheckCircle size={16} className="text-green-400" />;
      case 'rejected': return <XCircle size={16} className="text-red-400" />;
      case 'expired': return <AlertTriangle size={16} className="text-orange-400" />;
      default: return <FileText size={16} className="text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'text-slate-400';
      case 'sent': return 'text-blue-400';
      case 'accepted': return 'text-green-400';
      case 'rejected': return 'text-red-400';
      case 'expired': return 'text-orange-400';
      default: return 'text-slate-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft': return 'Entwurf';
      case 'sent': return 'Versendet';
      case 'accepted': return 'Angenommen';
      case 'rejected': return 'Abgelehnt';
      case 'expired': return 'Abgelaufen';
      default: return status;
    }
  };

  const handleQuoteAction = async (action: 'download' | 'preview' | 'email', quoteId: string) => {
    try {
      const quote = QuoteReferenceService.getReference(quoteId);
      if (!quote) {
        toast.error('Angebot nicht gefunden');
        return;
      }

      // For now, we'll show a placeholder since we don't have the full quote data
      toast.info(`${action} für Angebot ${quote.quoteNumber} würde hier ausgeführt werden`);
      
      // Track the action
      QuoteAnalyticsService.trackEvent(`quote_${action}` as any, {
        quoteId: quote.id,
        quoteNumber: quote.quoteNumber
      });
    } catch (error) {
      console.error(`Error performing ${action}:`, error);
      toast.error(`Fehler beim ${action}`);
    }
  };

  const handleDeleteQuote = (quoteId: string) => {
    try {
      QuoteReferenceService.deleteReference(quoteId);
      loadQuotes();
      toast.success('Angebot wurde gelöscht');
    } catch (error) {
      console.error('Error deleting quote:', error);
      toast.error('Fehler beim Löschen des Angebots');
    }
  };

  const handleRefresh = () => {
    loadQuotes();
    toast.success('Angebote aktualisiert');
  };

  if (isLoading) {
    return (
      <div className="suz-card-glass rounded-2xl p-8">
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3">
            <RefreshCw size={24} className="text-blue-400 animate-spin" />
            <span className="suz-text-body-lg text-slate-300">Lade Angebote...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="suz-card-glass rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="suz-icon-badge-premium">
              <History size={32} className="text-blue-400" />
            </div>
            <div>
              <h2 className="suz-text-heading-xl font-bold text-slate-100">
                {showAllQuotes ? 'Alle Angebote' : 'Meine Angebote'}
              </h2>
              <p className="suz-text-body-md text-slate-300">
                {filteredQuotes.length} von {quotes.length} Angeboten
              </p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={handleRefresh}
            className="suz-btn-secondary flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Aktualisieren
          </button>
        </div>

        {/* Filters and Search */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-800/50 border border-white/20 text-slate-100 placeholder-slate-400 focus:border-blue-400 focus:outline-none"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg bg-slate-800/50 border border-white/20 text-slate-100 focus:border-blue-400 focus:outline-none"
          >
            <option value="all">Alle Status</option>
            <option value="draft">Entwurf</option>
            <option value="sent">Versendet</option>
            <option value="accepted">Angenommen</option>
            <option value="rejected">Abgelehnt</option>
            <option value="expired">Abgelaufen</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'amount' | 'status')}
            className="px-4 py-2 rounded-lg bg-slate-800/50 border border-white/20 text-slate-100 focus:border-blue-400 focus:outline-none"
          >
            <option value="date">Nach Datum</option>
            <option value="amount">Nach Betrag</option>
            <option value="status">Nach Status</option>
          </select>

          {/* Sort Order */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="px-4 py-2 rounded-lg bg-slate-800/50 border border-white/20 text-slate-100 focus:border-blue-400 focus:outline-none"
          >
            <option value="desc">Absteigend</option>
            <option value="asc">Aufsteigend</option>
          </select>
        </div>
      </div>

      {/* Quote List */}
      {filteredQuotes.length === 0 ? (
        <div className="suz-card-glass rounded-2xl p-8 text-center">
          <FileText size={48} className="text-slate-400 mx-auto mb-4" />
          <h3 className="suz-text-heading-md font-semibold text-slate-200 mb-2">
            Keine Angebote gefunden
          </h3>
          <p className="suz-text-body-md text-slate-400">
            {searchTerm || statusFilter !== 'all' 
              ? 'Versuchen Sie andere Suchkriterien' 
              : 'Erstellen Sie Ihr erstes Angebot über den Kostenrechner'
            }
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredQuotes.map((quote) => (
            <div key={quote.id} className="suz-card-glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getStatusIcon(quote.status)}
                  <div>
                    <h3 className="suz-text-heading-md font-semibold text-slate-100">
                      {quote.quoteNumber}
                    </h3>
                    <p className="suz-text-body-sm text-slate-400">
                      {QuoteService.formatDate(quote.createdAt)}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="suz-text-heading-md font-bold text-slate-100">
                    {QuoteService.formatPrice(quote.totalAmount)}
                  </p>
                  <p className={`suz-text-body-sm ${getStatusColor(quote.status)}`}>
                    {getStatusLabel(quote.status)}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="suz-text-body-sm text-slate-400">Service</p>
                  <p className="suz-text-body-md text-slate-200">{quote.serviceType}</p>
                </div>
                {showAllQuotes && (
                  <div>
                    <p className="suz-text-body-sm text-slate-400">Kunde</p>
                    <p className="suz-text-body-md text-slate-200">{quote.customerEmail}</p>
                  </div>
                )}
                <div>
                  <p className="suz-text-body-sm text-slate-400">Gültig bis</p>
                  <p className="suz-text-body-md text-slate-200">
                    {QuoteService.formatDate(quote.validUntil)}
                  </p>
                </div>
                {quote.lastAccessed && (
                  <div>
                    <p className="suz-text-body-sm text-slate-400">Zuletzt angesehen</p>
                    <p className="suz-text-body-md text-slate-200">
                      {QuoteService.formatDate(quote.lastAccessed)}
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => handleQuoteAction('preview', quote.id)}
                  className="suz-btn-secondary flex items-center gap-2 text-sm py-2 px-3"
                >
                  <Eye size={14} />
                  Anzeigen
                </button>
                
                <button
                  type="button"
                  onClick={() => handleQuoteAction('download', quote.id)}
                  className="suz-btn-secondary flex items-center gap-2 text-sm py-2 px-3"
                >
                  <Download size={14} />
                  PDF
                </button>
                
                {quote.status === 'draft' && (
                  <button
                    type="button"
                    onClick={() => handleQuoteAction('email', quote.id)}
                    className="suz-btn-secondary flex items-center gap-2 text-sm py-2 px-3"
                  >
                    <Mail size={14} />
                    Senden
                  </button>
                )}
                
                {showAllQuotes && (
                  <button
                    type="button"
                    onClick={() => handleDeleteQuote(quote.id)}
                    className="suz-btn-secondary text-red-400 border-red-400/30 hover:bg-red-400/10 flex items-center gap-2 text-sm py-2 px-3"
                  >
                    <Trash2 size={14} />
                    Löschen
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuoteHistoryDashboard;
