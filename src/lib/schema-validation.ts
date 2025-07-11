/**
 * Schema Validation Utilities for SUZ Reinigung
 * Helps validate and test schema markup for Google Rich Results
 */

export interface SchemaValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  schemaType: string;
  url?: string;
}

/**
 * Validate FAQ Schema
 */
export const validateFAQSchema = (schema: any): SchemaValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields validation
  if (!schema['@context'] || schema['@context'] !== 'https://schema.org') {
    errors.push('Missing or invalid @context');
  }

  if (!schema['@type'] || schema['@type'] !== 'FAQPage') {
    errors.push('Missing or invalid @type for FAQ schema');
  }

  if (!schema.mainEntity || !Array.isArray(schema.mainEntity)) {
    errors.push('Missing or invalid mainEntity array');
  } else {
    schema.mainEntity.forEach((question: any, index: number) => {
      if (!question['@type'] || question['@type'] !== 'Question') {
        errors.push(`Question ${index + 1}: Missing or invalid @type`);
      }
      
      if (!question.name || typeof question.name !== 'string') {
        errors.push(`Question ${index + 1}: Missing or invalid name`);
      }
      
      if (!question.acceptedAnswer || !question.acceptedAnswer.text) {
        errors.push(`Question ${index + 1}: Missing acceptedAnswer text`);
      }
      
      if (question.name && question.name.length > 300) {
        warnings.push(`Question ${index + 1}: Name is very long (${question.name.length} chars)`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    schemaType: 'FAQPage'
  };
};

/**
 * Validate Article Schema
 */
export const validateArticleSchema = (schema: any): SchemaValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields validation
  if (!schema['@context'] || schema['@context'] !== 'https://schema.org') {
    errors.push('Missing or invalid @context');
  }

  if (!schema['@type'] || schema['@type'] !== 'BlogPosting') {
    errors.push('Missing or invalid @type for Article schema');
  }

  if (!schema.headline || typeof schema.headline !== 'string') {
    errors.push('Missing or invalid headline');
  }

  if (!schema.author || !schema.author.name) {
    errors.push('Missing author information');
  }

  if (!schema.publisher || !schema.publisher.name) {
    errors.push('Missing publisher information');
  }

  if (!schema.datePublished) {
    errors.push('Missing datePublished');
  }

  if (!schema.image || !schema.image.url) {
    errors.push('Missing image information');
  }

  // Warnings for best practices
  if (schema.headline && schema.headline.length > 110) {
    warnings.push(`Headline is very long (${schema.headline.length} chars)`);
  }

  if (!schema.description) {
    warnings.push('Missing description for better SEO');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    schemaType: 'BlogPosting'
  };
};

/**
 * Validate LocalBusiness Schema
 */
export const validateLocalBusinessSchema = (schema: any): SchemaValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields validation
  if (!schema['@context'] || schema['@context'] !== 'https://schema.org') {
    errors.push('Missing or invalid @context');
  }

  if (!schema['@type'] || schema['@type'] !== 'LocalBusiness') {
    errors.push('Missing or invalid @type for LocalBusiness schema');
  }

  if (!schema.name || typeof schema.name !== 'string') {
    errors.push('Missing or invalid business name');
  }

  if (!schema.address || !schema.address.addressLocality) {
    errors.push('Missing address information');
  }

  if (!schema.telephone && !schema.email) {
    errors.push('Missing contact information (telephone or email)');
  }

  // Warnings for best practices
  if (!schema.description) {
    warnings.push('Missing description for better SEO');
  }

  if (!schema.openingHours) {
    warnings.push('Missing opening hours information');
  }

  if (!schema.priceRange) {
    warnings.push('Missing price range information');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    schemaType: 'LocalBusiness'
  };
};

/**
 * Test schema markup with Google Rich Results Test
 */
export const testWithGoogleRichResults = async (url: string): Promise<SchemaValidationResult> => {
  try {
    // Note: This would require a backend service to call Google's API
    // For now, we'll return a mock result with instructions
    return {
      isValid: true,
      errors: [],
      warnings: ['Use Google Rich Results Test manually: https://search.google.com/test/rich-results'],
      schemaType: 'Manual Test Required',
      url: `https://search.google.com/test/rich-results?url=${encodeURIComponent(url)}`
    };
  } catch (error) {
    return {
      isValid: false,
      errors: ['Failed to test with Google Rich Results Test'],
      warnings: [],
      schemaType: 'Test Error'
    };
  }
};

/**
 * Validate all schema markup on current page
 */
export const validatePageSchema = (): SchemaValidationResult[] => {
  const results: SchemaValidationResult[] = [];
  const scripts = document.querySelectorAll('script[type="application/ld+json"]');

  scripts.forEach((script, index) => {
    try {
      const schema = JSON.parse(script.textContent || '{}');
      
      let result: SchemaValidationResult;
      
      switch (schema['@type']) {
        case 'FAQPage':
          result = validateFAQSchema(schema);
          break;
        case 'BlogPosting':
          result = validateArticleSchema(schema);
          break;
        case 'LocalBusiness':
          result = validateLocalBusinessSchema(schema);
          break;
        default:
          result = {
            isValid: true,
            errors: [],
            warnings: [`Unknown schema type: ${schema['@type']}`],
            schemaType: schema['@type'] || 'Unknown'
          };
      }
      
      results.push(result);
    } catch (error) {
      results.push({
        isValid: false,
        errors: [`Invalid JSON in script ${index + 1}`],
        warnings: [],
        schemaType: 'Parse Error'
      });
    }
  });

  return results;
};

/**
 * Log schema validation results to console
 */
export const logSchemaValidation = () => {
  const results = validatePageSchema();
  
  console.group('🔍 Schema Markup Validation');
  
  results.forEach((result, index) => {
    console.group(`Schema ${index + 1}: ${result.schemaType}`);
    
    if (result.isValid) {
      console.log('✅ Valid schema markup');
    } else {
      console.log('❌ Invalid schema markup');
      result.errors.forEach(error => console.error(`Error: ${error}`));
    }
    
    if (result.warnings.length > 0) {
      result.warnings.forEach(warning => console.warn(`Warning: ${warning}`));
    }
    
    if (result.url) {
      console.log(`🔗 Test URL: ${result.url}`);
    }
    
    console.groupEnd();
  });
  
  console.groupEnd();
  
  return results;
};

// Auto-validate schema in development
if (process.env.NODE_ENV === 'development') {
  // Run validation after page load
  window.addEventListener('load', () => {
    setTimeout(logSchemaValidation, 1000);
  });
}
