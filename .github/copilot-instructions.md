# Next.js Development Guidelines

## Framework Overview
Next.js is a React framework for building full-stack web applications with automatic optimizations, file-system based routing, and built-in performance features.

## Routing Architecture

### App Router (Recommended - Next.js 13+)
- Use the `app/` directory for modern routing
- Server Components by default for better performance
- Built-in streaming and suspense
- Enhanced data fetching with caching

### Pages Router (Legacy)
- Use the `pages/` directory for traditional routing
- Client-side rendering by default
- Still supported but not recommended for new projects

## Top-level Folders
Top-level folders are used to organize your application's code and static assets.

| Folder | Purpose |
|--------|---------|
| `app` | App Router (modern, recommended) |
| `pages` | Pages Router (legacy) |
| `public` | Static assets to be served |
| `src` | Optional application source folder |

## Top-level Files
Top-level files are used to configure your application, manage dependencies, run middleware, integrate monitoring tools, and define environment variables.

### Next.js Configuration
| File | Purpose |
|------|---------|
| `next.config.js` | Configuration file for Next.js |
| `package.json` | Project dependencies and scripts |
| `instrumentation.ts` | OpenTelemetry and Instrumentation file |
| `middleware.ts` | Next.js request middleware |

### Environment Variables
| File | Purpose |
|------|---------|
| `.env` | Environment variables |
| `.env.local` | Local environment variables |
| `.env.production` | Production environment variables |
| `.env.development` | Development environment variables |

### Configuration Files
| File | Purpose |
|------|---------|
| `.eslintrc.json` | Configuration file for ESLint |
| `.gitignore` | Git files and folders to ignore |
| `next-env.d.ts` | TypeScript declaration file for Next.js |
| `tsconfig.json` | Configuration file for TypeScript |
| `jsconfig.json` | Configuration file for JavaScript |

## Routing Files
| File | Extensions | Purpose |
|------|------------|---------|
| `layout` | `.js .jsx .tsx` | Layout |
| `page` | `.js .jsx .tsx` | Page |
| `loading` | `.js .jsx .tsx` | Loading UI |
| `not-found` | `.js .jsx .tsx` | Not found UI |
| `error` | `.js .jsx .tsx` | Error UI |
| `global-error` | `.js .jsx .tsx` | Global error UI |
| `route` | `.js .ts` | API endpoint |
| `template` | `.js .jsx .tsx` | Re-rendered layout |
| `default` | `.js .jsx .tsx` | Parallel route fallback page |

## Route Structure

### Nested Routes
| Pattern | Purpose |
|---------|---------|
| `folder` | Route segment |
| `folder/folder` | Nested route segment |

### Dynamic Routes
| Pattern | Purpose |
|---------|---------|
| `[folder]` | Dynamic route segment |
| `[...folder]` | Catch-all route segment |
| `[[...folder]]` | Optional catch-all route segment |

### Route Groups and Private Folders
| Pattern | Purpose |
|---------|---------|
| `(folder)` | Group routes without affecting routing |
| `_folder` | Opt folder and all child segments out of routing |

### Parallel and Intercepted Routes
| Pattern | Purpose |
|---------|---------|
| `@folder` | Named slot |
| `(.)folder` | Intercept same level |
| `(..)folder` | Intercept one level above |
| `(..)(..)folder` | Intercept two levels above |
| `(...)folder` | Intercept from root |

## Metadata File Conventions

### App Icons
| File | Extensions | Purpose |
|------|------------|---------|
| `favicon` | `.ico` | Favicon file |
| `icon` | `.ico .jpg .jpeg .png .svg` | App Icon file |
| `icon` | `.js .ts .tsx` | Generated App Icon |
| `apple-icon` | `.jpg .jpeg .png` | Apple App Icon file |
| `apple-icon` | `.js .ts .tsx` | Generated Apple App Icon |

### Open Graph and Twitter Images
| File | Extensions | Purpose |
|------|------------|---------|
| `opengraph-image` | `.jpg .jpeg .png .gif` | Open Graph image file |
| `opengraph-image` | `.js .ts .tsx` | Generated Open Graph image |
| `twitter-image` | `.jpg .jpeg .png .gif` | Twitter image file |
| `twitter-image` | `.js .ts .tsx` | Generated Twitter image |

### SEO
| File | Extensions | Purpose |
|------|------------|---------|
| `sitemap` | `.xml` | Sitemap file |
| `sitemap` | `.js .ts` | Generated Sitemap |
| `robots` | `.txt` | Robots file |
| `robots` | `.js .ts` | Generated Robots file |

## Component Hierarchy
The components defined in special files are rendered in a specific hierarchy:

1. `layout.js`
2. `template.js`
3. `error.js` (React error boundary)
4. `loading.js` (React suspense boundary)
5. `not-found.js` (React error boundary)
6. `page.js` or nested `layout.js`

> **Note**: Components are rendered recursively in nested routes, meaning the components of a route segment will be nested inside the components of its parent segment.

## Colocation
In the `app` directory, nested folders define route structure. Each folder represents a route segment that is mapped to a corresponding segment in a URL path.

**Key Points:**
- A route is not publicly accessible until a `page.js` or `route.js` file is added to a route segment
- Only the content returned by `page.js` or `route.js` is sent to the client
- Project files can be safely colocated inside route segments without accidentally being routable

## Private Folders
Private folders can be created by prefixing a folder with an underscore: `_folderName`

**Use Cases:**
- Separating UI logic from routing logic
- Consistently organizing internal files across a project
- Sorting and grouping files in code editors
- Avoiding potential naming conflicts with future Next.js file conventions

**Notes:**
- You can create URL segments that start with an underscore by prefixing the folder name with `%5F`: `%5FfolderName`
- Files outside private folders can also be marked as "private" using the same underscore pattern

## Route Groups
Route groups can be created by wrapping a folder in parenthesis: `(folderName)`

**Use Cases:**
- Organizing routes by site section, intent, or team (e.g., marketing pages, admin pages)
- Enabling nested layouts in the same route segment level
- Creating multiple nested layouts in the same segment, including multiple root layouts
- Adding a layout to a subset of routes in a common segment

## src Folder
Next.js supports storing application code (including `app`) inside an optional `src` folder. This separates application code from project configuration files which mostly live in the root of a project.

**Structure:**
```
src/
  app/
    layout.tsx
    page.tsx
    ...
```

## Examples
The following section lists a very high-level overview of common strategies. The simplest takeaway is to choose a strategy that works for you and your team and be consistent across the project.

> **Good to know**: In our examples below, we're using `components` and `lib` folders as generalized placeholders, their naming has no special framework significance and your projects might use other folders like `ui`, `utils`, `hooks`, `styles`, etc.

### Store project files outside of app
This strategy stores all application code in shared folders in the root of your project and keeps the `app` directory purely for routing purposes.

**Structure:**
```
project-root/
  app/
    layout.tsx
    page.tsx
    dashboard/
      page.tsx
  components/
    ui/
  lib/
    utils.ts
  styles/
```

### Store project files in top-level folders inside of app
This strategy stores all application code in shared folders in the root of the `app` directory.

**Structure:**
```
app/
  layout.tsx
  page.tsx
  dashboard/
    page.tsx
  components/
    ui/
  lib/
    utils.ts
  styles/
```

### Split project files by feature or route
This strategy stores globally shared application code in the root `app` directory and splits more specific application code into the route segments that use them.

**Structure:**
```
app/
  layout.tsx
  page.tsx
  components/        # Global components
    ui/
  lib/               # Global utilities
    utils.ts
  dashboard/
    page.tsx
    components/      # Dashboard-specific components
      chart.tsx
    lib/            # Dashboard-specific utilities
      data.ts
```

### Organize routes without affecting the URL path
To organize routes without affecting the URL, create a group to keep related routes together. The folders in parenthesis will be omitted from the URL (e.g. `(marketing)` or `(shop)`).

**Structure:**
```
app/
  layout.tsx
  page.tsx
  (marketing)/
    about/
      page.tsx
    contact/
      page.tsx
  (shop)/
    products/
      page.tsx
    cart/
      page.tsx
```

> **Note**: Even though routes inside `(marketing)` and `(shop)` share the same URL hierarchy, you can create a different layout for each group by adding a `layout.js` file inside their folders.

### Opting specific segments into a layout
To opt specific routes into a layout, create a new route group (e.g. `(shop)`) and move the routes that share the same layout into the group (e.g. `account` and `cart`). The routes outside of the group will not share the layout (e.g. `checkout`).

**Structure:**
```
app/
  layout.tsx
  page.tsx
  (shop)/
    layout.tsx      # Shared layout for shop routes
    account/
      page.tsx
    cart/
      page.tsx
  checkout/         # Outside the group, different layout
    page.tsx
```

### Opting for loading skeletons on a specific route
To apply a loading skeleton via a `loading.js` file to a specific route, create a new route group (e.g., `/(overview)`) and then move your `loading.tsx` inside that route group.

**Structure:**
```
app/
  dashboard/
    layout.tsx
    page.tsx
    (overview)/
      loading.tsx   # Only applies to overview page
      page.tsx
    settings/
      page.tsx      # No loading skeleton
```

> **Note**: The `loading.tsx` file will only apply to your dashboard → overview page instead of all your dashboard pages without affecting the URL path structure.

### Creating multiple root layouts
To create multiple root layouts, remove the top-level `layout.js` file, and add a `layout.js` file inside each route group. This is useful for partitioning an application into sections that have a completely different UI or experience. The `<html>` and `<body>` tags need to be added to each root layout.

**Structure:**
```
app/
  (marketing)/
    layout.tsx      # Root layout for marketing
    page.tsx
    about/
      page.tsx
  (shop)/
    layout.tsx      # Root layout for shop
    page.tsx
    products/
      page.tsx
```

> **Important**: In the example above, both `(marketing)` and `(shop)` have their own root layout.

## Development Best Practices

### Component Guidelines
- Use Server Components by default in App Router
- Add `'use client'` directive only when needed (hooks, event handlers, browser APIs)
- Keep components small and focused on a single responsibility
- Use TypeScript for better type safety and developer experience

### Data Fetching Patterns
- Use `async/await` in Server Components for data fetching
- Leverage built-in `fetch()` with caching options
- Use `revalidatePath()` and `revalidateTag()` for cache invalidation
- Implement proper error boundaries with `error.tsx`

### Performance Optimization
- Use `<Image>` component for optimized images
- Implement `loading.tsx` for better user experience
- Use dynamic imports for code splitting
- Optimize fonts with `next/font`

### Error Handling
- Create `error.tsx` files for route-specific error handling
- Use `not-found.tsx` for 404 pages
- Implement proper error boundaries in components
- Use `try/catch` blocks in Server Components

### SEO and Metadata
- Use `generateMetadata()` for dynamic metadata
- Implement `sitemap.ts` for search engine optimization
- Add proper Open Graph and Twitter card metadata
- Use structured data when appropriate

## Code Organization Strategies

### Recommended Structure (Store files outside app)
```
project-root/
  app/
    layout.tsx
    page.tsx
    dashboard/
      page.tsx
  components/
    ui/
  lib/
    utils.ts
  styles/
```

### Alternative Structure (Store files in app)
```
app/
  layout.tsx
  page.tsx
  dashboard/
    page.tsx
  components/
    ui/
  lib/
    utils.ts
  styles/
```

## Key API Functions

### Server-Side Functions
- `cookies()` - Access request cookies
- `headers()` - Access request headers
- `redirect()` - Server-side redirects
- `notFound()` - Trigger 404 page
- `generateMetadata()` - Dynamic metadata generation
- `generateStaticParams()` - Static generation parameters

### Client-Side Hooks
- `useRouter()` - Programmatic navigation
- `usePathname()` - Current pathname
- `useSearchParams()` - URL search parameters
- `useParams()` - Dynamic route parameters

### Cache Management
- `revalidatePath()` - Revalidate specific paths
- `revalidateTag()` - Revalidate by cache tags
- `unstable_cache()` - Cache function results
- `unstable_noStore()` - Opt out of caching

## Rendering Patterns

### Static Generation (SSG)
- Default behavior for pages without dynamic data
- Use `generateStaticParams()` for dynamic routes
- Best for content that doesn't change frequently

### Server-Side Rendering (SSR)
- Use when data changes on every request
- Automatic when using Server Components with dynamic data
- Good for personalized content

### Incremental Static Regeneration (ISR)
- Use `revalidate` option in `fetch()` or route config
- Updates static content without full rebuilds
- Ideal for content that updates periodically

## Security Best Practices
- Validate all user inputs
- Use environment variables for sensitive data
- Implement proper authentication and authorization
- Sanitize data before rendering
- Use HTTPS in production

## Environment Configuration
- Use `.env.local` for local development secrets
- Use `.env.production` for production-only variables
- Prefix client-side variables with `NEXT_PUBLIC_`
- Never commit sensitive environment variables

## Testing Guidelines
- Write tests for business logic in `lib/` folder
- Use React Testing Library for component tests
- Implement E2E tests with Playwright or Cypress
- Test both client and server components

## Deployment Considerations
- Use Vercel for seamless deployment
- Configure proper build settings
- Set up monitoring and analytics
- Implement proper error tracking
- Use CDN for static assets

