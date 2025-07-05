import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    strictPort: false, // Allow fallback to next available port
    // Configure cache headers for development
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  },
  preview: {
    port: 8080,
    strictPort: false, // Allow fallback to next available port
    // Configure cache headers for preview
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable code splitting and chunk optimization
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching and Vercel CDN optimization
        manualChunks: {
          // Core React chunks
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],

          // UI and form chunks
          'ui-vendor': ['@radix-ui/react-slot', '@radix-ui/react-toast', '@radix-ui/react-tooltip'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],

          // Analytics and performance chunks
          'analytics-vendor': ['@vercel/analytics', '@vercel/speed-insights'],
          'query-vendor': ['@tanstack/react-query'],

          // Utility chunks
          'utils-vendor': ['clsx', 'tailwind-merge', 'class-variance-authority'],
          'icons-vendor': ['lucide-react'],

          // Business logic chunks
          'suz-analytics': ['./src/lib/analytics.ts'],
          'suz-seo': ['./src/lib/seo.ts'],
          'suz-accessibility': ['./src/lib/accessibility.ts'],
        },

        // Optimize chunk file names for Vercel CDN caching
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop()?.replace('.tsx', '').replace('.ts', '')
            : 'chunk';
          return `assets/js/[name]-[hash].js`;
        },
        entryFileNames: 'assets/js/[name]-[hash].js',

        // Optimize asset file names for CDN
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];

          // Images - optimize for CDN
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif/i.test(ext || '')) {
            return `assets/images/[name]-[hash][extname]`;
          }

          // CSS - optimize for CDN
          if (/css/i.test(ext || '')) {
            return `assets/css/[name]-[hash][extname]`;
          }

          // Fonts - optimize for CDN
          if (/woff|woff2|ttf|eot/i.test(ext || '')) {
            return `assets/fonts/[name]-[hash][extname]`;
          }

          return `assets/[name]-[hash][extname]`;
        },
      },
    },

    // Optimize build performance for Vercel
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false, // Disable for production

    // Enable CSS code splitting for better caching
    cssCodeSplit: true,

    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,

    // Additional optimizations for Vercel
    assetsInlineLimit: 4096, // Inline small assets
    reportCompressedSize: false, // Faster builds

    // Optimize for modern browsers (Vercel Edge)
    cssTarget: 'esnext',
  },
  // Performance optimizations
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'lucide-react',
    ],
  },
}));
