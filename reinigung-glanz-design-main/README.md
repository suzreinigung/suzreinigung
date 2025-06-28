# SUZ Reinigung - Premium Cleaning Services Website

## Project Overview

**SUZ Reinigung** is a premium cleaning services website built with modern web technologies and Apple-inspired design principles. The website showcases professional cleaning services with a focus on quality, reliability, and customer satisfaction.

## Features

- **Apple-Inspired Design System**: Premium visual aesthetics with glass morphism effects
- **Responsive Design**: Mobile-first approach with seamless cross-device experience
- **Performance Optimized**: Fast loading times and smooth animations
- **Accessibility Focused**: WCAG 2.1 AA compliance with proper ARIA labels
- **German Language Support**: Native German content for local market
- **Contact Integration**: WhatsApp and email contact options

## Development Setup

### Prerequisites

- Node.js 18+ and npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- Git for version control

### Local Development

Follow these steps to set up the project locally:

```bash
git clone <your-repo-url>
cd suz-reinigung
npm install
npm run dev
```

The development server will start at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be generated in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Technology Stack

This project is built with modern web technologies:

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5.4+ for fast development and optimized builds
- **Styling**: Tailwind CSS 3.4+ with custom design system
- **UI Components**: Custom components with Radix UI primitives
- **State Management**: TanStack Query for server state
- **Icons**: Lucide React for consistent iconography
- **Fonts**: Inter variable font for optimal typography

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── styles/             # Global styles and design system
├── assets/             # Images, icons, and static assets
└── lib/                # Utility functions and configurations
```

## Design System

The website implements an Apple-inspired design system with:

- **Typography**: Inter font family with consistent scale
- **Colors**: Premium blue palette with semantic color tokens
- **Spacing**: 8px base unit system for consistent layouts
- **Components**: Glass morphism effects and smooth animations
- **Accessibility**: WCAG 2.1 AA compliance throughout

## Deployment

The website can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `dist/` folder or connect via Git
- **GitHub Pages**: Use GitHub Actions for automated deployment

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software owned by SUZ Reinigung. All rights reserved.
