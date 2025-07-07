export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  excerpt: string;
  content: string;
  author: BlogAuthor;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  category: BlogCategory;
  tags: string[];
  featuredImage: string;
  seo: BlogSEO;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
}

export interface BlogAuthor {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar?: string;
  expertise: string[];
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  seoTitle: string;
  seoDescription: string;
}

export interface BlogSEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl?: string;
  openGraph: {
    title: string;
    description: string;
    image: string;
    type: 'article';
  };
  schema: {
    headline: string;
    datePublished: string;
    dateModified?: string;
    author: string;
    publisher: string;
    mainEntityOfPage: string;
  };
}

export interface BlogListProps {
  posts: BlogPost[];
  category?: string;
  featured?: boolean;
  limit?: number;
}

export interface BlogSearchFilters {
  category?: string;
  tags?: string[];
  author?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  searchTerm?: string;
}

export const BLOG_CATEGORIES = {
  CLEANING_TIPS: 'cleaning-tips',
  OFFICE_MAINTENANCE: 'office-maintenance',
  HOME_CARE: 'home-care',
  INDUSTRY_NEWS: 'industry-news',
  COMPANY_NEWS: 'company-news',
  SEASONAL_GUIDES: 'seasonal-guides',
  HEALTH_HYGIENE: 'health-hygiene',
  SUSTAINABILITY: 'sustainability'
} as const;

export type BlogCategoryType = typeof BLOG_CATEGORIES[keyof typeof BLOG_CATEGORIES];