import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BookOpen } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { blogPosts } from '@/data/blog';
import { trackBusinessEvents } from '@/lib/analytics';

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  useEffect(() => {
    trackBusinessEvents.servicePageView('blog');
  }, []);

  const filteredPosts = useMemo(() => {
    let filtered = [...blogPosts.filter(post => post.status === 'published')];

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    return filtered;
  }, []);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(startIndex, startIndex + postsPerPage);
  }, [filteredPosts, currentPage]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

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
    <div className="min-h-screen bg-premium-gradient blog-page">
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

      {/* Enhanced Blog Section with Premium SUZ Design */}
      <section
        id="blog"
        className="relative suz-section-hero suz-hero-enhanced"
        role="main"
        aria-label="Reinigungstipps & Ratgeber Blog"
      >
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-slate-900/95 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>

        <div className="max-w-6xl mx-auto text-center animate-fade-in relative z-10 px-4 sm:px-6 lg:px-8">
          {/* Premium Hero Header */}
          <header className="suz-hero-headline-container mb-8">
            <div
              className="suz-icon-badge-premium mb-8 mx-auto"
              role="img"
              aria-label="Blog & Ratgeber Icon"
              tabIndex={0}
            >
              <BookOpen
                className="w-12 h-12 transition-all duration-500"
                strokeWidth={2}
                aria-hidden="true"
                focusable="false"
              />
            </div>
            <h1
              className="suz-hero-title text-slate-100 optimize-lcp"
              itemProp="name"
              data-ai-content="blog-heading"
              role="heading"
              aria-level="1"
            >
              <span
                className="suz-hero-accent gradient-text-animated pulse-glow"
                aria-label="Reinigungstipps & Ratgeber - Premium Blog"
              >
                Reinigungstipps & Ratgeber
              </span>
            </h1>
            <p className="suz-text-body-xl text-slate-300 mt-6 mb-8 max-w-4xl mx-auto leading-relaxed font-normal">
              Professionelle Tipps und Anleitungen für optimale Reinigungsergebnisse von Ihrem Experten aus Köln
            </p>
          </header>

          {/* Blog Posts Grid - Integrated in Same Section */}
          <div className="w-full max-w-7xl mx-auto">
            {filteredPosts.length > 0 ? (
              <>
                {/* Posts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {paginatedPosts.map((post) => (
                  <article key={post.id} className="suz-card-glass rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 group suz-blog-card-zoom-independent">
                    <div className="h-40 bg-gradient-to-br from-slate-700/50 to-slate-800/50 flex items-center justify-center border-b border-white/10 suz-blog-icon-container">
                      <div className="text-3xl opacity-80 group-hover:opacity-100 transition-opacity suz-blog-icon">{post.category.icon}</div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-400/30">
                          {post.category.name}
                        </span>
                        <span className="text-xs text-slate-400">
                          {post.readingTime} Min.
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-white line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-slate-300 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-slate-400">
                          {formatDate(post.publishedAt)}
                        </div>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors group-hover:gap-2 flex items-center gap-1"
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
                  <div className="flex justify-center items-center gap-2 mt-8">
                  <button
                    type="button"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-white/20 text-slate-300 hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Zurück
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'border border-white/20 text-slate-300 hover:bg-slate-700/50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-white/20 text-slate-300 hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Weiter
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto mb-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Keine Artikel gefunden
                </h3>
                <p className="text-slate-300 mb-4">
                  Versuchen Sie andere Suchbegriffe oder wählen Sie eine andere Kategorie.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage(1);
                  }}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  Alle Artikel anzeigen
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;