import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { blogPosts, blogCategories, getFeaturedPosts } from '@/data/blog';
import { BlogPost, BlogSearchFilters } from '@/types/blog';
import { trackBusinessEvents } from '@/lib/analytics';

const Blog = () => {
  const [searchFilters, setSearchFilters] = useState<BlogSearchFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  useEffect(() => {
    trackBusinessEvents.servicePageView('blog');
  }, []);

  const filteredPosts = useMemo(() => {
    let filtered = [...blogPosts.filter(post => post.status === 'published')];

    // Filter by search term
    if (searchFilters.searchTerm) {
      const searchLower = searchFilters.searchTerm.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Filter by category
    if (searchFilters.category) {
      filtered = filtered.filter(post => post.category.id === searchFilters.category);
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    return filtered;
  }, [searchFilters]);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(startIndex, startIndex + postsPerPage);
  }, [filteredPosts, currentPage]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const featuredPosts = getFeaturedPosts().slice(0, 3);

  const handleSearch = (searchTerm: string) => {
    setSearchFilters(prev => ({ ...prev, searchTerm }));
    setCurrentPage(1);
    if (searchTerm) {
      trackBusinessEvents.serviceInquiry(`blog_search_${searchTerm.slice(0, 20)}`);
    }
  };

  const handleCategoryFilter = (category: string) => {
    setSearchFilters(prev => ({ 
      ...prev, 
      category: category === 'all' ? undefined : category 
    }));
    setCurrentPage(1);
    trackBusinessEvents.serviceInquiry(`blog_category_${category}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Reinigungstipps & Ratgeber | SUZ Reinigung Blog Köln</title>
        <meta 
          name="description" 
          content="Professionelle Reinigungstipps und Ratgeber vom Experten. Büroreinigung, Hausreinigung und Pflege-Guides für Köln und Umgebung. ✓ Kostenlose Tipps" 
        />
        <meta 
          name="keywords" 
          content="Reinigungstipps, Büroreinigung Köln, Hausreinigung Ratgeber, Putztipps, Reinigung Blog" 
        />
        <link rel="canonical" href="https://www.suzreinigung.de/blog" />
      </Helmet>

      <Navigation scrollToSection={scrollToSection} />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-slate-900 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Reinigungstipps & Ratgeber
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Professionelle Tipps und Anleitungen für optimale Reinigungsergebnisse von Ihrem Experten aus Köln
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <svg 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Suchen Sie nach Reinigungstipps..."
                value={searchFilters.searchTerm || ''}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && !searchFilters.searchTerm && !searchFilters.category && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Beliebte Artikel
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-slate-100 flex items-center justify-center">
                    <div className="text-4xl">{post.category.icon}</div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${post.category.color}-100 text-${post.category.color}-800`}>
                        {post.category.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {post.readingTime} Min. Lesezeit
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-gray-500">
                          {formatDate(post.publishedAt)}
                        </div>
                      </div>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                        onClick={() => trackBusinessEvents.serviceInquiry(`blog_click_${post.id}`)}
                      >
                        Lesen
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => handleCategoryFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !searchFilters.category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              Alle Artikel ({blogPosts.length})
            </button>
            {Object.values(blogCategories).map(category => {
              const categoryCount = blogPosts.filter(post => post.category.id === category.id).length;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryFilter(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                    searchFilters.category === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                    {categoryCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {filteredPosts.length > 0 ? (
            <>
              {/* Results Count */}
              <div className="mb-8 text-center">
                <p className="text-gray-600">
                  {filteredPosts.length} Artikel gefunden
                  {searchFilters.searchTerm && ` für "${searchFilters.searchTerm}"`}
                  {searchFilters.category && ` in "${blogCategories[searchFilters.category]?.name}"`}
                </p>
              </div>

              {/* Posts Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {paginatedPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="text-3xl">{post.category.icon}</div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${post.category.color}-100 text-${post.category.color}-800`}>
                          {post.category.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {post.readingTime} Min.
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-gray-900 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          {formatDate(post.publishedAt)}
                        </div>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                          onClick={() => trackBusinessEvents.serviceInquiry(`blog_click_${post.id}`)}
                        >
                          Weiterlesen →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Zurück
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Weiter
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Keine Artikel gefunden
              </h3>
              <p className="text-gray-600 mb-4">
                Versuchen Sie andere Suchbegriffe oder wählen Sie eine andere Kategorie.
              </p>
              <button
                onClick={() => {
                  setSearchFilters({});
                  setCurrentPage(1);
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Alle Artikel anzeigen
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Bleiben Sie auf dem Laufenden
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Erhalten Sie die neuesten Reinigungstipps und exklusive Angebote direkt in Ihr Postfach
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Ihre E-Mail-Adresse"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Anmelden
            </button>
          </div>
          <p className="text-sm text-blue-200 mt-4">
            Keine Spam-Emails. Jederzeit abbestellbar.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;