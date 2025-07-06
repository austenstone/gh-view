---
applyTo: '**'
---
# GitHub View Project Guidelines

GitHub View is a Next.js application designed to display GitHub webhook deliveries. This document outlines the coding standards, project structure, and component usage guidelines to ensure consistency and maintainability across the codebase.

## Project Architecture
- Use App Router (`app/` directory) for all routing
- Store shared components in `components/` folder at root level
- Keep utilities and helpers in `lib/` folder
- Use TypeScript for all files (.tsx, .ts extensions)
- Follow file-based routing with special files: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`

## Component Guidelines
- Use Server Components by default for better performance
- Add `'use client'` directive only when needed (hooks, event handlers, browser APIs)
- Keep components small and focused on single responsibility
- Use functional components with TypeScript interfaces
- Implement proper error boundaries with `error.tsx` files

## File Organization
- Place API routes in `app/api/` directory as `route.ts` files
- Use dynamic routes with `[param]` folder naming
- Group related routes with `(groupName)` folders
- Use `_folder` prefix for private folders that shouldn't be routable
- Colocate route-specific components within route folders when appropriate

## Data Fetching & API Routes
- Use `async/await` in Server Components for data fetching
- Leverage built-in `fetch()` with Next.js caching options
- Use `revalidatePath()` and `revalidateTag()` for cache invalidation
- Implement proper error handling with try/catch blocks
- Use Supabase client for database operations
- Handle real-time subscriptions in client components

## TypeScript Standards
- Use interfaces for data structures and props
- Implement proper typing for API responses
- Use optional chaining (?.) and nullish coalescing (??) operators
- Prefer `const` and `readonly` for immutable data
- Type all function parameters and return values

## Performance & Security
- Use `<Image>` component from `next/image` for optimized images
- Implement `loading.tsx` for better user experience
- Validate all user inputs in API routes
- Use environment variables for sensitive data (prefix client-side vars with `NEXT_PUBLIC_`)
- Sanitize data before rendering
- Use proper HTTP status codes in API responses

## Routing Patterns
- Use `generateMetadata()` for dynamic metadata
- Implement `notFound()` for 404 handling
- Use `redirect()` for server-side redirects
- Access route parameters with `useParams()` hook
- Use `useRouter()` for programmatic navigation

## Code Style
- Use camelCase for variables and functions
- Use PascalCase for components and types
- Use single quotes for strings
- Use 2-space indentation
- Keep functions small and focused
- Write meaningful names for variables and functions

## Project-Specific Patterns
- Use webhook data structure for API responses
- Implement real-time updates with Supabase subscriptions
- Follow established component patterns for webhook display
- Use consistent error handling across API routes
- Implement proper loading states for async operations

## Primer Component Library
- Use Primer Brand components whenever possible for consistent GitHub branding
- Import components from `@primer/brand` package
- Use proper TypeScript interfaces for component props
- Follow component composition patterns (e.g., Card.Body, Hero.Heading)

### Layout Components
- Use `Box` for flexible container layouts with spacing and styling
- Use `Grid` for responsive grid layouts
- Use `Stack` for vertical or horizontal component stacking
- Use `Section` for page sections with consistent padding

### Navigation Components
- Use `SubdomainNavBar` for top-level navigation
- Use `AnchorNav` for in-page navigation
- Use `SubNav` for secondary navigation
- Use `Breadcrumbs` for hierarchical navigation
- Use `Pagination` for paginated content

### Content Components
- Use `Hero` for page headers and primary content areas
- Use `Card` for content grouping and interactive elements
- Use `Bento` for responsive grid layouts with mixed content
- Use `Pillar` for feature highlighting and content grouping
- Use `River` for alternating content sections
- Use `Testimonial` for customer quotes and feedback

### Typography Components
- Use `Heading` instead of HTML heading tags for consistent styling
- Use `Text` instead of HTML p tags for body text
- Use `Label` for metadata and status indicators
- Use `Prose` for rich text content formatting

### Interactive Components
- Use `Button` and `ButtonGroup` for actions
- Use `ActionMenu` for dropdown menus
- Use `Accordion` for collapsible content sections
- Use `FAQ` for question-and-answer sections
- Use `Timeline` for chronological content
- Use `VideoPlayer` for media content

### Form Components
- Use `TextInput` for single-line text input
- Use `TextArea` for multi-line text input
- Use `Select` for dropdown selections
- Use `Checkbox` and `CheckboxGroup` for multiple selections
- Use `Radio` and `RadioGroup` for single selections
- Use `FormControl` for form field containers

### Display Components
- Use `Image` for optimized image display
- Use `Avatar` for user profile images
- Use `Icon` for Octicon display
- Use `LogoSuite` for brand logo collections
- Use `Statistic` for numerical data display
- Use `ComparisonTable` for feature comparisons

### Banner Components
- Use `CTABanner` for call-to-action sections
- Use `BreakoutBanner` for highlighted content
- Use `EyebrowBanner` for important announcements

### Utility Components
- Use `Tooltip` for contextual help
- Use `MinimalFooter` for page footers
- Use `Footnotes` for reference citations
- Use `PricingOptions` for pricing displays
- Use `IDE` for code editor simulations

### Component Patterns
- Use compound components where available (e.g., `FAQ.Item`, `Card.Body`)
- Import components using named imports: `import { Button, Card } from '@primer/brand'`
- Use proper TypeScript props interfaces for component customization
- Follow responsive design patterns with component breakpoint props
- Use theme-aware components that respect light/dark mode preferences