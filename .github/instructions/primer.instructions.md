---
applyTo: '**'
---

## Primer Component Library
- Use Primer components whenever possible for consistent GitHub branding
- Import components from `@primer/react` package
- Use proper TypeScript interfaces for component props
- Follow component composition patterns (e.g., Card.Body, Hero.Heading)

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
- Use `SkeletonLoaders` for content placeholders during loading

### Component Patterns
- Use compound components where available (e.g., `FAQ.Item`, `Card.Body`)
- Import components using named imports: `import { Button, Card } from '@primer/react'`
- Use proper TypeScript props interfaces for component customization
- Follow responsive design patterns with component breakpoint props
- Use theme-aware components that respect light/dark mode preferences
