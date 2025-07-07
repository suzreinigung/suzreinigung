import { useParams, Link, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getPostBySlug, blogCategories } from '@/data/blog';
import { trackBusinessEvents } from '@/lib/analytics';
import { updateMetaTags, injectStructuredData } from '@/lib/seo';

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

      // Inject structured data for article
      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.seo.schema.headline,
        "author": {
          "@type": "Person",
          "name": post.seo.schema.author,
          "jobTitle": post.author.title,
          "description": post.author.bio
        },
        "publisher": {
          "@type": "Organization",
          "name": post.seo.schema.publisher,
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.suzreinigung.de/assets/logo.png"
          }
        },
        "datePublished": post.seo.schema.datePublished,
        "dateModified": post.seo.schema.dateModified || post.seo.schema.datePublished,
        "mainEntityOfPage": post.seo.schema.mainEntityOfPage,
        "image": post.featuredImage,
        "articleSection": post.category.name,
        "wordCount": post.content.split(' ').length,
        "timeRequired": `PT${post.readingTime}M`,
        "keywords": post.tags.join(', ')
      };

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
    <div className="min-h-screen bg-gray-50">
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
      <section className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">Startseite</Link>
            <span>›</span>
            <Link to="/blog" className="hover:text-blue-600">Blog</Link>
            <span>›</span>
            <Link 
              to={`/blog?category=${post.category.id}`}
              className="hover:text-blue-600"
            >
              {post.category.name}
            </Link>
            <span>›</span>
            <span className="text-gray-400 truncate">{post.title}</span>
          </nav>
        </div>
      </section>

      {/* Article Header */}
      <article className="bg-white">
        <header className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium bg-${post.category.color}-100 text-${post.category.color}-800 flex items-center gap-2`}>
                <span>{post.category.icon}</span>
                {post.category.name}
              </span>
              <span className="text-sm text-gray-500">
                {post.readingTime} Min. Lesezeit
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>

            {post.subtitle && (
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {post.subtitle}
              </p>
            )}

            <div className="flex items-center gap-6 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {post.author.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{post.author.name}</div>
                  <div className="text-sm text-gray-600">{post.author.title}</div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
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
        <div className="h-96 bg-gradient-to-br from-blue-100 to-slate-100 flex items-center justify-center mb-12">
          <div className="text-6xl">{post.category.icon}</div>
        </div>

        {/* Article Content */}
        <div className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: post.content
                    .split('\n')
                    .map(line => {
                      if (line.startsWith('# ')) {
                        return `<h1 class="text-3xl font-bold text-gray-900 mt-12 mb-6">${line.slice(2)}</h1>`;
                      }
                      if (line.startsWith('## ')) {
                        return `<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">${line.slice(3)}</h2>`;
                      }
                      if (line.startsWith('### ')) {
                        return `<h3 class="text-xl font-bold text-gray-900 mt-8 mb-3">${line.slice(4)}</h3>`;
                      }
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return `<p class="font-semibold text-gray-900 mt-6 mb-3">${line.slice(2, -2)}</p>`;
                      }
                      if (line.startsWith('- ')) {
                        return `<li class="mb-2">${line.slice(2)}</li>`;
                      }
                      if (line.trim() === '') {
                        return '<br>';
                      }
                      return `<p class="mb-4">${line}</p>`;
                    })
                    .join('')
                }}
              />
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Schlagwörter:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
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
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">
                    {post.author.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Über {post.author.name}
                  </h3>
                  <p className="text-gray-600 mb-3">{post.author.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.author.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Benötigen Sie professionelle Reinigung?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
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
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
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
            <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <Link
                  to="/blog"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  onClick={() => trackBusinessEvents.serviceInquiry('blog_back_to_list')}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Zurück zur Übersicht
                </Link>
                
                <Link
                  to={`/blog?category=${post.category.id}`}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
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