import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { getFeaturedPosts } from '@/data/blog';
import { trackBusinessEvents } from '@/lib/analytics';

const BlogPreview = () => {
  const featuredPosts = getFeaturedPosts().slice(0, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handlePostClick = (postId: string) => {
    trackBusinessEvents.serviceInquiry(`homepage_blog_click_${postId}`);
  };

  const handleViewAllClick = () => {
    trackBusinessEvents.serviceInquiry('homepage_blog_view_all');
  };

  if (featuredPosts.length === 0) {
    return null;
  }

  return (
    <section id="blog-preview" className="suz-section-standard bg-premium-gradient">
      <div className="suz-page-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="suz-text-heading-xl mb-4 text-white">
            Reinigungstipps & Ratgeber
          </h2>
          <p className="suz-text-body-lg text-slate-300 max-w-2xl mx-auto">
            Professionelle Tipps und Anleitungen für optimale Reinigungsergebnisse
          </p>
        </div>

        {/* Featured Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post) => (
            <article
              key={post.id}
              className="suz-card-glass rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 group suz-blog-card-zoom-independent"
            >
              {/* Post Image/Icon */}
              <div className="h-48 bg-gradient-to-br from-slate-700/50 to-slate-800/50 flex items-center justify-center border-b border-white/10 suz-blog-icon-container">
                <div className="text-5xl opacity-80 group-hover:opacity-100 transition-opacity suz-blog-icon">
                  {post.category.icon}
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                {/* Category Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-medium text-blue-400 uppercase tracking-wide">
                    {post.category.name}
                  </span>
                </div>

                {/* Post Title */}
                <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-blue-300 transition-colors">
                  {post.title}
                </h3>

                {/* Post Excerpt */}
                <p className="text-slate-300 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Post Meta & CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  
                  <Link
                    to={`/blog/${post.slug}`}
                    onClick={() => handlePostClick(post.id)}
                    className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors group-hover:gap-2"
                    aria-label={`${post.title} lesen`}
                  >
                    Weiterlesen
                    <ArrowRight className="w-3 h-3 transition-all" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Blog Posts CTA */}
        <div className="text-center">
          <Link
            to="/blog"
            onClick={handleViewAllClick}
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-all duration-300 hover:scale-105 suz-focus-ring"
            aria-label="Alle Blog-Artikel anzeigen"
          >
            Alle Artikel anzeigen
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
