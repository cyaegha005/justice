# FocusFlow 3D - Immersive Learning Platform

## Overview

FocusFlow 3D is an immersive learning platform that combines 3D interactive scenes with intelligent learning features. The platform provides a unique learning experience through floating knowledge crystals, glassmorphism panels, and AI-powered tutoring.

## Tech Stack

### Core Framework
- **Next.js 16.1.6** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type-safe development

### 3D Rendering
- **Three.js 0.183.1** - 3D graphics library
- **@react-three/fiber 9.5.0** - React renderer for Three.js
- **@react-three/drei 10.7.7** - Useful helpers for react-three-fiber

### UI Components
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui 3.8.5** - Reusable UI component library
- **Radix UI 1.4.3** - Unstyled, accessible UI components
- **Lucide React 0.575.0** - Icon library

### Styling & Utilities
- **class-variance-authority 0.7.1** - Component variant management
- **clsx 2.1.1** - Conditional className utility
- **tailwind-merge 3.5.0** - Merge Tailwind classes without conflicts
- **tw-animate-css 1.4.0** - Tailwind CSS animations

### Development Tools
- **ESLint 9** - Code linting
- **Babel React Compiler 1.0.0** - React compiler for optimization

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd focus-flow
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The page auto-updates as you edit files. You can start editing the page by modifying `src/app/page.tsx`.

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── app/
│   ├── favicon.ico
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main entry page
├── components/
│   ├── core/
│   │   ├── panels/
│   │   │   ├── AITutorChatPanel.tsx    # AI tutor chat interface
│   │   │   ├── BookshelfPanel.tsx      # Learning resource management
│   │   │   ├── LearningPanel.tsx       # Learning modes and progress
│   │   │   ├── QuizPanel.tsx            # Knowledge quiz functionality
│   │   │   └── UploadPanel.tsx         # File upload functionality
│   │   ├── Scene3D.tsx       # 3D scene rendering component
│   │   └── World3D.tsx       # Main 3D world environment
│   └── ui/
│       ├── badge.tsx         # Badge component
│       ├── button.tsx        # Button component
│       ├── card.tsx          # Card component
│       ├── input.tsx         # Input component
│       ├── label.tsx         # Label component
│       ├── progress.tsx      # Progress bar component
│       ├── radio-group.tsx   # Radio group component
│       ├── slider.tsx        # Slider component
│       └── tabs.tsx          # Tabs component
└── lib/
    └── utils.ts              # Utility functions
```

## Code Documentation

### Core 3D Scene Components

#### World3D.tsx
Implements the complete 3D learning world environment:
- Floating knowledge crystals (octahedron geometry)
- Mouse-following camera controls
- Glassmorphism sidebar panel system
- Grid background and scene overlay effects

#### Scene3D.tsx
3D scene rendering component:
- Lighting setup (ambient + point lights)
- Starfield background effects
- Scene composition and rendering

### Core Interactive Panels

All panels adopt a glassmorphism design style with backdrop blur effects.

#### UploadPanel.tsx
- Drag-and-drop file upload functionality
- Supports PDF, Word, TXT, and Markdown formats
- File preview and conversion features

#### LearningPanel.tsx
- Three learning modes: Text, Visual, and Audio
- Learning progress tracking
- Chapter content list

#### QuizPanel.tsx
- Knowledge quiz functionality
- Real-time answer feedback
- Timer and score statistics

#### BookshelfPanel.tsx
- Learning resource management
- File type filtering (PDF/Video/Audio)
- Search functionality

#### AITutorChatPanel.tsx
- AI tutor chat interface
- Message animation effects
- Typing cursor animation

### UI Components

The project uses shadcn/ui components for consistent UI design:
- **Badge** - Status indicators and tags
- **Button** - Interactive buttons with variants
- **Card** - Content containers
- **Input** - Text input fields
- **Label** - Form labels
- **Progress** - Progress bars
- **Radio Group** - Radio button groups
- **Slider** - Range sliders
- **Tabs** - Tabbed navigation

### Styling

#### Global Styles (src/app/globals.css)
- Custom animations (pulse, glow, messageIn, blink)
- Custom scrollbar styles
- Plus Jakarta Sans font support
- Dark theme color scheme (#0f172a background)

#### Design System
- **Dark Theme**: Deep blue/slate background (#0f172a)
- **Glassmorphism**: Backdrop blur effects for panels
- **Gradient Colors**: Indigo → Purple → Pink
- **Grid Background**: Refined grid pattern

### Animation Effects
- Message fade-in animations
- Glow pulse animations
- Panel slide-in/slide-out animations
- Typing cursor blink animation

## Technical Features

### 3D Interaction
- 3D scenes implemented using React Three Fiber
- Octahedron crystal geometry + wireframe edge effects
- Floating animations and glow effects
- Camera follows mouse movement

### Visual Design
- Dark theme background (#0f172a)
- Glassmorphism panels (backdrop-filter: blur)
- Gradient color scheme (Indigo → Purple → Pink)
- Refined grid background

## Recent Updates

### Commit: feat: design entry landing page

This commit implements the entry page design for the FocusFlow 3D immersive learning platform, featuring 3D interactive scenes and core functional panels.

#### File Statistics
- New files: 17
- Modified files: 3
- Deleted files: 0
- Total line changes: +2,166 lines, -100 lines

## Future Plans

- Integrate real AI API for intelligent Q&A
- Add more 3D learning scenes
- Implement user learning data persistence
- Add multi-language support

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API
- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber) - 3D in React
- [Three.js Documentation](https://threejs.org/docs/) - 3D graphics library
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Utility-first CSS
- [shadcn/ui Documentation](https://ui.shadcn.com) - Component library

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

**Last Updated**: 2026-02-28  
**Version**: 0.1.0
