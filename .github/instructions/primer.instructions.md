---
applyTo: '**'
---

# Primer Design System

## Component Library Usage
- Use Primer components whenever possible for consistent GitHub branding
- Import components from `@primer/react` package using named imports
- Import brand-specific components from `@primer/react-brand` package
- Use proper TypeScript interfaces for component props
- Follow component composition patterns (e.g., `Card.Body`, `Hero.Heading`)

### Action Components
- Use `ActionBar` for horizontal collections of IconButtons with overflow menu
- Use `ActionList` for vertical lists of interactive actions or options
- Use `ActionMenu` for quick actions and selections with ActionList and Overlay
- Use `Button` and `ButtonGroup` for actions
- Use `IconButton` for buttons with icons instead of text labels

### Layout Components
- Use `Box` for flexible container layouts with spacing and styling
- Use `PageLayout` for defining header, main, pane, and footer areas
- Use `PageHeader` for top-level page headings
- Use `Stack` for vertical or horizontal component stacking

### Navigation Components
- Use `Breadcrumbs` for hierarchical navigation
- Use `NavList` for vertical navigation links
- Use `Pagination` for paginated content
- Use `UnderlineNav` for horizontal tabbed navigation
- Use `UnderlinePanels` for tabbed content panels

### Content Components
- Use `Blankslate` as placeholder when content is missing
- Use `Banner` for highlighting important information
- Use `InlineMessage` for informing users about action results
- Use `Timeline` for chronological content
- Use `DataTable` for 2-dimensional data structures

### Typography Components
- Use `Heading` instead of HTML heading tags for consistent styling
- Use `Text` instead of HTML p tags for body text
- Use `Label` and `LabelGroup` for metadata and status indicators
- Use `Link` for hyperlink text styling
- Use `Truncate` for shortening overflowing text with ellipsis

### Interactive Components
- Use `Dialog` for floating surfaces with transient content
- Use `Popover` for bringing attention to specific UI elements
- Use `Tooltip` for contextual help on hover or focus
- Use `Details` for enhanced native <details> element behavior
- Use `TreeView` for hierarchical expandable/collapsible lists

### Form Components
- Use `TextInput` for single-line text input
- Use `Textarea` for multi-line text input
- Use `TextInputWithTokens` for list-based input values
- Use `Select` for dropdown selections from predefined choices
- Use `SelectPanel` for anchored dialogs with filterable item selection
- Use `Checkbox` and `CheckboxGroup` for multiple selections
- Use `Radio` and `RadioGroup` for single selections
- Use `FormControl` for form field containers with labels and validation
- Use `Autocomplete` for filtering and selecting from option lists
- Use `ToggleSwitch` for immediate on/off setting toggles
- Use `SegmentedControl` for linear choice selection with immediate application

### Display Components
- Use `Avatar`, `AvatarPair`, and `AvatarStack` for user/organization representation
- Use `CounterLabel` for adding counts to navigational elements
- Use `StateLabel` for issue/pull request status rendering
- Use `Token` for compact object representation with metadata
- Use `CircleBadge` for third-party service logo connections
- Use `CircleOcticon` for Octicons with circle backgrounds
- Use `BranchName` for displaying Git branch names
- Use `RelativeTime` for clear, accessible time display

### Overlay Components
- Use `Overlay` for floating surfaces like dialogs and menus
- Use `AnchoredOverlay` for overlays positioned relative to anchors
- Use `PointerBox` for customizable bordered boxes with caret pointers

### Status & Feedback Components
- Use `ProgressBar` for showing completion or visualizing parts of a whole
- Use `Spinner` for indeterminate loading indicators
- Use `SkeletonLoader` for content placeholders during loading

## Brand Components (@primer/react-brand)
Brand components are specifically designed for marketing pages and brand experiences.

### Layout & Structure Components
- Use `Bento` for responsive grid layouts presenting content
- Use `Section` to group and structure related content on a page
- Use `Stack` for vertical or horizontal component arrangement
- Use `Grid` for advanced grid-based layouts
- Use `Box` for flexible container layouts with spacing

### Hero & Banner Components
- Use `Hero` for full-width banners at the top of pages
- Use `BreakoutBanner` to break up content on longer pages and highlight important information
- Use `EyebrowBanner` to highlight important information at the top of pages
- Use `CTABanner` to highlight and create urgency around user actions

### Navigation Components
- Use `AnchorNav` for prompt navigation to different sections of a page
- Use `SubNav` for secondary navigation beneath primary navigation
- Use `SubdomainNavBar` for top-level navigation on subdomain sites
- Use `MinimalFooter` for global footer with legal links and GitHub logomarks

### Content & Information Components
- Use `Card` to display information in a compact way and link to other pages
- Use `Pillar` to group related content together
- Use `River` to introduce features using type and media pairing
- Use `RiverAccordion` to create expandable content panels with associated visuals
- Use `SectionIntro` to provide titles, descriptions, and links to new sections
- Use `FAQ` to display content in Q&A format
- Use `Testimonial` to display quotes from customers or users
- Use `Timeline` to display connected items as a vertical timeline

### Media & Visual Components
- Use `Image` to display graphical representations
- Use `VideoPlayer` for self-hosted video playback
- Use `IDE` to showcase simulated integrated developer environments
- Use `LogoSuite` to present lists of logos (sponsors, vendors)
- Use `Icon` to display Octicons with optional backgrounds

### Content Presentation Components
- Use `Prose` to apply Primer Brand styles to HTML markup
- Use `Statistic` to display concise numerical information
- Use `ComparisonTable` to compare products or features in table format
- Use `PricingOptions` to display pricing plan information
- Use `OrderedList` for numbered item lists
- Use `UnorderedList` for unordered item collections
- Use `Footnotes` to display contextual information and cite sources

### Interactive Components
- Use `ActionMenu` for expandable action or selection lists
- Use `CTAForm` to capture user input with call-to-action buttons
- Use `Tooltip` for short messages on hover or focus

### Form Components (Brand)
- Use `TextInput` for single-line text input with brand styling
- Use `TextArea` for multi-line text input with brand styling
- Use `Select` for dropdown selections with brand styling
- Use `Checkbox` and `CheckboxGroup` for brand-styled multiple selections
- Use `Radio` and `RadioGroup` for brand-styled single selections
- Use `FormControl` for brand-styled form field containers

## React Hooks
Primer provides several React hooks for accessing component features and behaviors when Primer components won't work as well for your use case.

### Color & Theme Hooks
- Use `useColorSchemeVar` to specify string values based on the active color scheme
- Use `useTheme` to get data from the current theme context
- Use `useResponsiveValue` to get values from objects mapped to viewport sizes

### Focus Management Hooks
- Use `useFocusTrap` to trap focus within a specified element
- Use `useFocusZone` to designate containers where focus can be moved using keys other than 'Tab'
- Use `useOpenAndCloseFocus` to focus elements on mount and return focus on unmount

### Form & Control Hooks
- Use `useFormControlForwardedProps` to provide accessibility features of the FormControl component
- Use `useConfirm` to show dialogs for user action confirmation
- Use `useDetails` to get props for the Details component

### Interaction Hooks
- Use `useOnEscapePress` to call functions when the 'Escape' key is pressed
- Use `useOnOutsideClick` to call callbacks when users click outside containers
- Use `useOverlay` to get all relevant Overlay behavior and container refs

### Utility Hooks
- Use `useProvidedRefOrCreate` to create refs when not provided as props
- Use `useRefObjectAsForwardedRef` to use ref objects as imperative handles for forwarded refs
- Use `useResizeObserver` to observe and react to element dimension changes
- Use `useSafeTimeout` to ensure all timeouts are cleared when components unmount

## Component Patterns & Best Practices
- Use compound components where available (e.g., `FAQ.Item`, `Card.Body`)
- Import components using named imports: `import { Button, Card } from '@primer/react'`
- Import brand components: `import { Hero, Bento, CTABanner } from '@primer/react-brand'`
- Use proper TypeScript interfaces for component customization
- Follow responsive design patterns with component breakpoint props
- Use theme-aware components that respect light/dark mode preferences
- Prefer Server Components in Next.js, add `'use client'` only when needed
- Use `sx` prop for component-specific styling instead of custom CSS
- Implement proper error boundaries and loading states
- Choose between `@primer/react` and `@primer/react-brand` based on use case:
  - Use `@primer/react` for application UI and functional interfaces
  - Use `@primer/react-brand` for marketing pages and brand experiences

## Theming & Styling

### Color Modes & Schemes
- Use `colorMode` prop on `ThemeProvider`: "day", "night", or "auto"
- Set color schemes with `dayScheme` and `nightScheme` props
- Available themes: `light`, `dark`, `dark_dimmed`, `light_high_contrast`, `dark_high_contrast`
- Use `useColorSchemeVar` hook for custom colors that adapt to color scheme
- Enable SSR compatibility with `preventSSRMismatch` prop

### CSS Variables & Primitives
- Import sizing, spacing, and typography tokens:
  ```css
  @import '@primer/primitives/dist/css/base/size/size.css';
  @import '@primer/primitives/dist/css/base/typography/typography.css';
  @import '@primer/primitives/dist/css/functional/size/border.css';
  @import '@primer/primitives/dist/css/functional/size/breakpoints.css';
  ```
- Use CSS variables directly: `var(--fgColor-default)`, `var(--bgColor-default)`
- Color categories: foreground, background, border, shadow, button, control, focus, overlay
- Typography scales: display, title-large, title-medium, title-small, subtitle, body-large, body-medium, body-small, caption
- Size tokens: base spacing, border radius, breakpoints, viewport units
