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
- Use [primer components](primer.instructions.md) from `@primer/react-brand` for consistent GitHub branding

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
