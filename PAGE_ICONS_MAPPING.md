# Page Icons Mapping - Supplier Portal

## Overview
This document maps each page to its corresponding Material-UI icon, providing visual consistency and improved UX across the application.

## Icon Mapping by Page

### 📊 Dashboard & Analytics
| Page | Icon | Component | Rationale |
|------|------|-----------|-----------|
| **Dashboard.tsx** | `DashboardIcon` | `@mui/icons-material/Dashboard` | Standard dashboard representation |
| **KPIDashboard.tsx** | `AnalyticsIcon` | `@mui/icons-material/Analytics` | Analytics and metrics focus |
| **KPIThresholds.tsx** | `TuneIcon` | `@mui/icons-material/Tune` | Configuration and tuning settings |

### 🏢 Supply Network Management
| Page | Icon | Component | Rationale |
|------|------|-----------|-----------|
| **SupplyNetwork.tsx** | `BusinessIcon` | `@mui/icons-material/Business` | Business entities management |
| **NewSupplyNetworkEntity.tsx** | `AddBusinessIcon` | `@mui/icons-material/AddBusiness` | Adding new business entities |
| **EntityDetailPage.tsx** | *No icon* | - | Uses breadcrumb navigation instead |

### 📋 Questionnaires & Forms
| Page | Icon | Component | Rationale |
|------|------|-----------|-----------|
| **QuestionnaireTemplates.tsx** | `ListAltIcon` | `@mui/icons-material/ListAlt` | Template and list management |
| **QuestionnaireAssignments.tsx** | `AssignmentTurnedInIcon` | `@mui/icons-material/AssignmentTurnedIn` | Completed assignments |

### 📄 Documents & Audits
| Page | Icon | Component | Rationale |
|------|------|-----------|-----------|
| **Documents.tsx** | `DescriptionIcon` | `@mui/icons-material/Description` | Document management |
| **Audits.tsx** | `AssignmentIcon` | `@mui/icons-material/Assignment` | Audit and inspection tasks |

### 🔐 Security & Administration
| Page | Icon | Component | Rationale |
|------|------|-----------|-----------|
| **Roles.tsx** | `SecurityIcon` | `@mui/icons-material/Security` | Security and permissions |
| **RBACExample.tsx** | `AdminPanelSettingsIcon` | `@mui/icons-material/AdminPanelSettings` | Admin panel functionality |

### 🏷️ Organization & Settings
| Page | Icon | Component | Rationale |
|------|------|-----------|-----------|
| **Taxonomies.tsx** | `LabelIcon` | `@mui/icons-material/Label` | Tags and labeling system |
| **RegionalSettingsExample.tsx** | `LanguageIcon` | `@mui/icons-material/Language` | Localization and language settings |

## Design Principles

### 🎨 **Visual Consistency**
- All icons use `color="primary"` for consistent theming
- Icons are semantically meaningful and intuitive
- Size and spacing are handled by the PageHeader component

### 🧠 **Cognitive Load Reduction**
- Icons help users quickly identify page types
- Consistent icon families (e.g., Assignment variants for forms)
- Clear visual hierarchy with title + icon combination

### ♿ **Accessibility**
- Icons are decorative and don't replace text labels
- All icons have proper ARIA handling via PageHeader component
- Color is not the only means of conveying information

## Implementation Notes

### 📦 **Import Pattern**
```typescript
import IconName from "@mui/icons-material/IconName";

<PageHeader
  title="Page Title"
  subtitle="Page description"
  icon={<IconName color="primary" />}
/>
```

### 🔧 **Customization Guidelines**
- **DO NOT** change icon colors (always use `color="primary"`)
- **DO NOT** change icon sizes (handled by PageHeader)
- **DO** choose semantically appropriate icons for new pages
- **DO** follow the established patterns for similar page types

## Future Considerations

### 🚀 **Potential Enhancements**
- Icon animations on page load
- Dynamic icon states (loading, error, success)
- Icon tooltips for additional context
- Dark mode icon variants

### 📊 **Metrics to Track**
- User recognition of page types by icon
- Navigation efficiency improvements
- Accessibility compliance scores

---

**Last Updated**: 2025-06-15  
**Author**: AI Assistant (Cascade)  
**Status**: ✅ Implemented across all pages
