import { useParams, Link, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getPostBySlug, blogCategories } from '@/data/blog';
import { trackBusinessEvents } from '@/lib/analytics';
import { updateMetaTags, injectStructuredData, generateArticleSchema } from '@/lib/seo';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    if (post) {
      // Track blog post view
      trackBusinessEvents.servicePageView(`blog_${post.id}`);

      // Update meta tags for SEO
      updateMetaTags({
        title: post.seo.metaTitle,
        description: post.seo.metaDescription,
        keywords: post.seo.keywords.join(', '),
        url: post.seo.canonicalUrl || `https://www.suzreinigung.de/blog/${post.slug}`,
      });

      // Inject enhanced structured data for article
      const articleSchema = generateArticleSchema(post);
      injectStructuredData(articleSchema);
    }
  }, [post]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleCTAClick = () => {
    trackBusinessEvents.contactFormSubmit(`blog_cta_${post?.id}`);
  };

  // If post not found, redirect to blog index
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-premium-gradient">
      <Helmet>
        <title>{post.seo.metaTitle}</title>
        <meta name="description" content={post.seo.metaDescription} />
        <meta name="keywords" content={post.seo.keywords.join(', ')} />
        <link rel="canonical" href={post.seo.canonicalUrl || `https://www.suzreinigung.de/blog/${post.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.seo.openGraph.title} />
        <meta property="og:description" content={post.seo.openGraph.description} />
        <meta property="og:image" content={post.seo.openGraph.image} />
        <meta property="og:type" content={post.seo.openGraph.type} />
        <meta property="og:url" content={`https://www.suzreinigung.de/blog/${post.slug}`} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.seo.openGraph.title} />
        <meta name="twitter:description" content={post.seo.openGraph.description} />
        <meta name="twitter:image" content={post.seo.openGraph.image} />
      </Helmet>

      <Navigation scrollToSection={scrollToSection} />

      {/* Breadcrumb */}
      <section className="bg-slate-900/50 border-b border-white/10 py-4 pt-28">
        <div className="suz-page-container">
          <nav className="flex items-center space-x-2 text-sm text-slate-300">
            <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors">Startseite</Link>
            <span className="text-slate-500">›</span>
            <Link to="/blog" className="text-blue-400 hover:text-blue-300 transition-colors">Blog</Link>
            <span className="text-slate-500">›</span>
            <Link
              to={`/blog?category=${post.category.id}`}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              {post.category.name}
            </Link>
            <span className="text-slate-500">›</span>
            <span className="text-slate-400 truncate">{post.title}</span>
          </nav>
        </div>
      </section>

      {/* Article Header */}
      <article className="bg-premium-gradient">
        <header className="py-12">
          <div className="suz-page-container">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center gap-2">
                <span>{post.category.icon}</span>
                {post.category.name}
              </span>
              <span className="text-sm text-slate-400">
                {post.readingTime} Min. Lesezeit
              </span>
            </div>

            <h1 className="suz-text-heading-xl text-white mb-4 leading-tight">
              {post.title}
            </h1>

            {post.subtitle && (
              <p className="text-xl text-slate-300 mb-6 leading-relaxed">
                {post.subtitle}
              </p>
            )}

            <div className="flex items-center gap-6 pb-8 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {post.author.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-white">{post.author.name}</div>
                  <div className="text-sm text-slate-300">{post.author.title}</div>
                </div>
              </div>
              <div className="text-sm text-slate-400">
                Veröffentlicht am {formatDate(post.publishedAt)}
                {post.updatedAt && post.updatedAt !== post.publishedAt && (
                  <span className="block">
                    Aktualisiert am {formatDate(post.updatedAt)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="h-64 bg-gradient-to-br from-slate-700/50 to-slate-800/50 flex items-center justify-center mb-8 border-y border-white/10">
          <div className="text-5xl text-white/80">{post.category.icon}</div>
        </div>

        {/* Enhanced Article Content with SUZ Design System */}
        <div className="pb-12 suz-blog-post-container">
          <div className="suz-page-container">
            {/* Premium Content Container with Enhanced Glass Morphism */}
            <div className="suz-blog-content-glass">
              <div className="prose prose-lg max-w-none suz-blog-content">
                <div
                  className="suz-blog-typography"
                  dangerouslySetInnerHTML={{
                    __html: post.content
                      .split('\n')
                      .map(line => {
                        if (line.startsWith('# ')) {
                          return `<h1 class="suz-text-heading-xl text-white gradient-text-subtle">${line.slice(2)}</h1>`;
                        }
                        if (line.startsWith('## ')) {
                          return `<h2 class="suz-text-heading-lg text-white">${line.slice(3)}</h2>`;
                        }
                        if (line.startsWith('### ')) {
                          return `<h3 class="suz-text-heading-md text-white">${line.slice(4)}</h3>`;
                        }
                        if (line.startsWith('**') && line.endsWith('**')) {
                          return `<blockquote class="suz-text-body-lg font-semibold text-white">${line.slice(2, -2)}</blockquote>`;
                        }
                        if (line.startsWith('- ')) {
                          return `<li class="text-slate-300 suz-text-body-md">${line.slice(2)}</li>`;
                        }
                        if (line.trim() === '') {
                          return '<div class="h-4"></div>';
                        }
                        return `<p class="text-slate-300 suz-text-body-md">${line}</p>`;
                      })
                      .join('')
                  }}
                />
              </div>
            </div>

            {/* Enhanced Tags Section with SUZ Design */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="suz-text-heading-md font-semibold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-blue-400/30">
                  <span className="text-blue-400 text-sm">🏷️</span>
                </span>
                Schlagwörter:
              </h3>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="suz-card-glass px-4 py-2 text-slate-300 rounded-full text-sm hover:text-white hover:scale-105 transition-all duration-300 cursor-pointer border border-white/20 hover:border-blue-400/50 hover:bg-blue-500/10 backdrop-blur-sm"
                    onClick={() => {
                      trackBusinessEvents.serviceInquiry(`blog_tag_${tag}`);
                      // Could navigate to filtered blog view
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">
                    {post.author.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Über {post.author.name}
                  </h3>
                  <p className="text-slate-300 mb-3">{post.author.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.author.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-sm border border-blue-400/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 suz-card-glass rounded-xl p-8 text-center border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                Benötigen Sie professionelle Reinigung?
              </h3>
              <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Lassen Sie unsere Experten für Sie arbeiten. Kontaktieren Sie uns für eine kostenlose Beratung und ein unverbindliches Angebot.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/4917623152477"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  onClick={handleCTAClick}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.486"/>
                  </svg>
                  WhatsApp Beratung
                </a>
                <a
                  href="tel:+4917623152477"
                  className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900 px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  onClick={handleCTAClick}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Jetzt anrufen
                </a>
              </div>
            </div>

            {/* Navigation to related articles */}
            <div className="mt-16 pt-8 border-t border-white/10">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <Link
                  to="/blog"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  onClick={() => trackBusinessEvents.serviceInquiry('blog_back_to_list')}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Zurück zur Übersicht
                </Link>
                
                <Link
                  to={`/blog?category=${post.category.id}`}
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  onClick={() => trackBusinessEvents.serviceInquiry(`blog_more_${post.category.id}`)}
                >
                  Mehr {post.category.name} Artikel
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;