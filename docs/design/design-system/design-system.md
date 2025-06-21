# 🎨 REMIRA UnifiedUI Design System

**Version**: 1.0.239  
**Last Updated**: 2024-06-21  
**Storybook**: `@remira/unifiedui`

## 📋 Table of Contents

1. [Design Principles](#design-principles)
2. [Design Tokens](#design-tokens)
3. [Component Library](#component-library)
4. [Layout System](#layout-system)
5. [Patterns & Guidelines](#patterns--guidelines)
6. [Implementation Rules](#implementation-rules)

---

## 🎯 Design Principles

### Core Principles [SF]

- **Consistency First**: Always use existing UnifiedUI components before creating new ones
- **Accessibility by Default**: All components must meet WCAG 2.1 AA standards
- **Scalable Architecture**: Design for multiple themes and responsive breakpoints
- **Performance Optimized**: Minimize bundle size and optimize rendering

### Design Philosophy [RP]

- **Atomic Design**: Components are built from atoms → molecules → organisms → templates
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Mobile-First**: Responsive design starts from mobile viewport
- **User-Centric**: Interface serves user goals, not technical convenience

---

## 🎨 Design Tokens

### 🌈 Colors

#### Primary Colors

```scss
--primary: rgb(57, 180, 191); // #39B4BF - Main brand color
--primary-dark: rgb(0, 93, 107); // #005D6B - Dark variant
--primary-light: rgb(235, 247, 248); // #EBF7F8 - Light variant
--primary-lo: rgba(57, 180, 191, 0.2); // 20% opacity
```

#### Neutral Colors

```scss
--white: rgb(255, 255, 255); // #FFFFFF
--light-grey: rgb(236, 239, 241); // #ECEFF1
--dark-grey: rgb(38, 50, 56); // #263238
--disabled: rgb(176, 190, 197); // #B0BEC5

// Grey Scale
--grey-50: #eceff1;
--grey-100: #cfd8dc;
--grey-200: #b0bec5;
--grey-300: #90a4ae;
--grey-400: #78909c;
--grey-600: #546e7a;
--grey-900: #263238;
```

#### Signal Colors

```scss
--error: rgb(255, 88, 105); // #FF5869
--error-light: rgb(255, 238, 239); // #FFEEEF
--warning: rgb(255, 178, 91); // #FFB25B
--warning-light: rgb(247, 244, 240); // #F7F4F0
--success: rgb(92, 184, 92); // #5CB85C
--success-light: rgb(240, 247, 240); // #F0F7F0
--info: rgb(91, 192, 222); // #5BC0DE
--info-light: rgb(240, 246, 247); // #F0F6F7
```

#### Chart Colors

```scss
--dark-warning: rgb(255, 130, 0); // #FF8200
--yellow: rgb(255, 205, 0); // #FFCD00
--dark-petrol: rgb(0, 93, 107); // #005D6B
--blue: rgb(0, 94, 184); // #005EB8
```

### 📝 Typography

#### Font Families

```scss
--font-sans-pro: "Source Sans 3", "Helvetica Neue", "Helvetica", "Arial",
  sans-serif;
```

#### font Weights

```scss
--light: 300;
--regular: 400;
--bold: 600;
```

#### Typography Scale

```scss
// Headings
h1, .h1: 2rem (32px), font-weight: 300
h2, .h2: 1.75rem (28px), font-weight: 400
h3, .h3: 1.5rem (24px), font-weight: 400
h4, .h4: 1.25rem (20px), font-weight: 600
h5, .h5: 1.125rem (18px), font-weight: 600
h6, .h6: 1rem (16px), font-weight: 600

// Body Text
body: 1rem (16px), font-weight: 400
small: 0.875rem (14px), font-weight: 400
```

### 📐 Spacing & Layout

#### Spacing Scale (8px base)

```scss
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
--space-3xl: 64px;
```

#### Border Radius

```scss
--radius-sm: 4px;
--radius-md: 16px;
--radius-lg: 1em;
```

#### Shadows

```scss
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
--shadow-md: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
--shadow-nav: 0px 5px 4px 0px rgba(0, 0, 0, 0.1);
```

#### Breakpoints

```scss
--layout-breakpoint-small: 1080px;
```

---

## 🧩 Component Library

### 🔘 Buttons

#### Button Variants

- **Base**: Default button style
- **Text**: Minimal button without background
- **Contained**: Filled button with primary color
- **Outlined**: Border-only button

#### Button Sizes

- **Small**: Compact size for secondary actions
- **Medium**: Default size for most use cases
- **Large**: Prominent size for primary actions

#### Usage Rules [DRY]

```typescript
// ✅ Correct Usage
<Button variant="contained" color="primary" size="medium">
  Save Changes
</Button>

// ❌ Avoid Custom Styling
<button className="custom-blue-button">Save</button>
```

### 🏷️ Status Indicators

#### Badges

```typescript
// Status variants with semantic colors
<StatusBadge status="published">Live</StatusBadge>
<StatusBadge status="draft">Draft</StatusBadge>
<StatusBadge status="inProgress">In Progress</StatusBadge>
<StatusBadge status="completed">Completed</StatusBadge>
<StatusBadge status="overdue">Overdue</StatusBadge>
```

#### Chips

```typescript
// Multiple selection indicators
<Chip label="Active" color="primary" />
<Chip label="Inactive" color="default" />
<Chip label="Pending" color="warning" />
```

### 📊 Data Display

#### Tables

- **Base Table**: Simple data display
- **Enhanced Table**: With sorting, filtering, pagination
- **Editable Table**: Inline editing capabilities
- **Action Table**: With row actions and bulk operations

#### Cards

```typescript
// Card variants
<Card elevation={1}>           // Subtle shadow
<Card elevation={3}>           // Medium shadow
<Card clickable>               // Interactive card
<Card rounded>                 // Rounded corners
```

### 📝 Form Elements

#### Input Fields

```typescript
// Standard input with validation
<Input
  label="Email Address"
  type="email"
  required
  error={errors.email}
  helperText="Enter a valid email address"
/>

// Input with icon
<Input
  label="Search"
  startIcon={<SearchIcon />}
  placeholder="Search items..."
/>
```

#### Select Components

```typescript
// Single select
<Select
  label="Country"
  options={countryOptions}
  value={selectedCountry}
  onChange={handleCountryChange}
/>

// Multi-select with chips
<Select
  label="Skills"
  multiple
  options={skillOptions}
  value={selectedSkills}
  renderValue={(selected) => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
      {selected.map((value) => (
        <Chip key={value} label={value} />
      ))}
    </Box>
  )}
/>
```

### 🎛️ Navigation

#### Navbar

```typescript
// Standard navbar with theme support
<Navbar
  logo={<Logo variant="dark" />}
  items={navigationItems}
  user={currentUser}
  darkMode={isDarkMode}
/>
```

#### Tabs

```typescript
// Content tabs
<TabNavigator
  tabs={[
    { label: 'Overview', content: <OverviewTab /> },
    { label: 'Details', content: <DetailsTab /> },
    { label: 'History', content: <HistoryTab /> }
  ]}
/>

// Routing tabs
<RoutingTabs
  tabs={[
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Reports', path: '/reports' }
  ]}
/>
```

### 💬 Feedback

#### Dialogs

```typescript
// Confirmation dialog
<Dialog
  open={isOpen}
  title="Confirm Action"
  content="Are you sure you want to delete this item?"
  actions={[
    <Button onClick={handleCancel}>Cancel</Button>,
    <Button onClick={handleConfirm} color="error">
      Delete
    </Button>,
  ]}
/>
```

#### Loading States

```typescript
// Skeleton for loading content
<Skeleton variant="rectangular" width="100%" height={200} />
<Skeleton variant="text" width="60%" />
<Skeleton variant="circular" width={40} height={40} />

// Progress indicators
<Loader size="large" message="Loading data..." />
<ProgressBar value={65} />
```

---

## 📐 Layout System

### Grid System

```typescript
// 12-column responsive grid
<Grid container spacing={2}>
  <Grid item xs={12} md={6} lg={4}>
    <Card>Content 1</Card>
  </Grid>
  <Grid item xs={12} md={6} lg={4}>
    <Card>Content 2</Card>
  </Grid>
  <Grid item xs={12} md={12} lg={4}>
    <Card>Content 3</Card>
  </Grid>
</Grid>
```

### Layout Components

```typescript
// Page layout with header and sidebar
<AuthenticatedLayout>
  <PageHeader title="Dashboard" />
  <PageLayout>
    <MainContent />
    <Sidebar />
  </PageLayout>
</AuthenticatedLayout>
```

### Container System

```typescript
// Containers with consistent spacing
<Container maxWidth="lg">        // Large container
<Container maxWidth="md">        // Medium container
<Container elevation={1}>        // With shadow
<Container rounded>              // Rounded corners
```

---

## 🎨 Patterns & Guidelines

### 🎭 Theme System

#### Light/Dark Mode Support

```typescript
// Theme configuration
const themes = {
  light: {
    background: "#eceff1",
    bgHover: "rgb(224, 224, 224)",
    color: "#263238",
    navbarBackground: "#263238",
    navbarColor: "#fff",
  },
  dark: {
    background: "#36474f",
    bgHover: "rgb(44, 43, 43)",
    color: "#ffffff",
    navbarBackground: "#263238",
    navbarColor: "#bcc0c2",
  },
};
```

#### Theme Usage

```scss
// SCSS mixin for theme-aware styling
@include themify($themes) {
  background-color: themed("background");
  color: themed("color");
}
```

### 🎯 Status Patterns

#### Status Colors Mapping

```typescript
const statusConfig = {
  published: { color: "blue", bg: "blue-50" },
  inProgress: { color: "amber", bg: "amber-50" },
  completed: { color: "emerald", bg: "emerald-50" },
  overdue: { color: "red", bg: "red-50" },
  draft: { color: "gray", bg: "gray-50" },
};
```

#### Priority Indicators

```typescript
const priorityConfig = {
  critical: { color: "red-600", icon: "🔥", pulse: true },
  high: { color: "orange-600", icon: "⚡", pulse: false },
  medium: { color: "yellow-600", icon: "⚠️", pulse: false },
  low: { color: "green-600", icon: "✅", pulse: false },
};
```

### 📱 Responsive Patterns

#### Mobile-First Approach

```scss
// Base styles (mobile)
.component {
  padding: 16px;
  font-size: 14px;
}

// Tablet and up
@media (min-width: 768px) {
  .component {
    padding: 24px;
    font-size: 16px;
  }
}

// Desktop and up
@media (min-width: 1080px) {
  .component {
    padding: 32px;
    font-size: 18px;
  }
}
```

---

## 🔧 Implementation Rules

### ✅ DO's

1. **Always use UnifiedUI components first** [DRY]

   ```typescript
   // ✅ Use existing components
   import { Button, Card, Input } from "@remira/unifiedui";
   ```

2. **Follow naming conventions** [ISA]

   ```typescript
   // ✅ PascalCase for components
   const UserProfileCard = () => {};

   // ✅ camelCase for props and functions
   const handleUserSubmit = () => {};
   ```

3. **Use design tokens consistently** [SF]

   ```scss
   // ✅ Use CSS custom properties
   color: var(--primary);

   // ✅ Use SCSS variables
   color: $primary;
   ```

4. **Implement proper accessibility** [REH]

   ```typescript
   // ✅ Include ARIA labels and roles
   <Button aria-label="Delete item" role="button">
     <DeleteIcon />
   </Button>
   ```

5. **Use semantic HTML** [CA]
   ```typescript
   // ✅ Proper semantic structure
   <main>
     <header>
       <h1>Page Title</h1>
     </header>
     <section>
       <article>Content</article>
     </section>
   </main>
   ```

### ❌ DON'Ts

1. **Don't create custom components unnecessarily** [DRY]

   ```typescript
   // ❌ Don't reinvent existing components
   const CustomButton = styled.button`
     background: blue;
     color: white;
   `;
   ```

2. **Don't use magic numbers** [CMV]

   ```scss
   // ❌ Avoid hardcoded values
   margin: 23px;

   // ✅ Use design tokens
   margin: var(--space-lg);
   ```

3. **Don't ignore responsive design** [PA]

   ```scss
   // ❌ Fixed desktop-only styles
   width: 1200px;

   // ✅ Responsive approach
   max-width: 100%;
   ```

4. **Don't skip prop validation** [IV]

   ```typescript
   // ❌ Missing prop types
   const Component = ({ data }) => {};

   // ✅ Proper TypeScript interfaces
   interface Props {
     data: UserData[];
     onSubmit: (data: FormData) => void;
   }
   ```

### 🔍 Quality Checklist [CTC]

Before submitting any UI component, ensure:

- [ ] Uses existing UnifiedUI components where possible
- [ ] Follows responsive design principles
- [ ] Implements proper accessibility (ARIA, keyboard navigation)
- [ ] Uses design tokens for colors, spacing, typography
- [ ] Includes proper TypeScript interfaces
- [ ] Has consistent naming conventions
- [ ] Supports both light and dark themes
- [ ] Includes proper error handling
- [ ] Is tested across different screen sizes
- [ ] Follows the established file structure

### 📦 Component Creation Template

When creating new components, follow this structure:

```typescript
// ComponentName.tsx
import React from "react";
import { cn } from "@/utils/cn";

interface ComponentNameProps {
  /**
   * Component description
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Component variant
   */
  variant?: "default" | "primary" | "secondary";
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg";
}

/**
 * ComponentName - Brief description of what this component does
 *
 * @param props - Component props
 * @returns JSX.Element
 */
export const ComponentName: React.FC<ComponentNameProps> = ({
  children,
  className,
  variant = "default",
  size = "md",
  ...props
}) => {
  return (
    <div
      className={cn(
        "base-styles",
        `variant-${variant}`,
        `size-${size}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default ComponentName;
```

---

## 📚 References

- **Storybook**: Check `http://localhost:6006/` for live component examples
- **UnifiedUI Package**: `@remira/unifiedui` version 1.0.239
- **Design Tokens**: Located in `/styles/shared/_variables.scss`
- **Component Source**: All components follow Material-UI principles with REMIRA customizations

---

**⚠️ Important Note for AI Development**

When developing UI components:

1. **Always check existing components first** - Review the component library above before creating new ones
2. **Use UnifiedUI components** - Import from `@remira/unifiedui` package when available
3. **Follow the established patterns** - Maintain consistency with the design system
4. **Consider responsive design** - All components must work on mobile, tablet, and desktop
5. **Test accessibility** - Ensure proper ARIA labels, keyboard navigation, and screen reader support
6. **Use design tokens** - Never hardcode colors, spacing, or typography values

This design system ensures consistent, accessible, and maintainable UI components across the entire REMIRA platform. Always refer to this document when making UI-related decisions.
