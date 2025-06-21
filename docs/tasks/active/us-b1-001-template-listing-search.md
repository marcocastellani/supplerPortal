# 📋 US-B1-001: Template Listing & Search Implementation Plan

## 🎯 **User Story Reference**

**US-B1-001**: Template Listing & Search

> **As a** sustainability manager  
> **I want to** view all existing questionnaire templates with search and filter capabilities  
> **So that** I can quickly find and manage existing templates

## ✅ **Acceptance Criteria**

- [x] List all templates with title, creation date,certificate type, target entities chips, last modified, status, usage count
- [ ] Search by template name (server-side filtering)
- [ ] Filter by status (active/draft/archived), creation date, language
- [ ] Pagination for large datasets
- [ ] Sort by name, date, usage count

## 📊 **Current State Analysis**

✅ **Already Implemented:**

- Frontend API service `getTemplates()` method exists
- Basic template types and DTOs
- Individual template retrieval (`GetQuestionnaireTemplateQuery`)
- Basic QuestionnaireTemplates page structure

❌ **Missing Components:**

- Backend endpoint for listing/searching templates
- Query handler for filtering and pagination
- Frontend UI components for listing, search, and filters
- Sorting and pagination functionality

---

## 🛠️ **Implementation Tasks**

### **✅ Phase 1: Backend API Implementation - COMPLETED**

#### **Task 1.1: Create Query Infrastructure**

- [x] **1.1.1** Create `GetQuestionnaireTemplatesQuery.cs` ✅ **COMPLETED**

  - ✅ Include search term (string)
  - ✅ Include status filter (TemplateStatus?)
  - ✅ Include language filter (string?)
  - ✅ Include pagination (page, pageSize)
  - ✅ Include sorting (field, direction)
  - ✅ Include date range filters (createdFrom, createdTo)

- [x] **1.1.2** Create `GetQuestionnaireTemplatesQueryHandler.cs` ✅ **COMPLETED**

  - ✅ Implement server-side search by title
  - ✅ Implement status filtering
  - ✅ Implement language filtering
  - ✅ Implement date range filtering
  - ✅ Implement pagination with total count
  - ✅ Implement sorting (title, created, lastModified, usage count)
  - ✅ **Calculate usage count** (count of questionnaire instances per template)
  - ✅ Return paginated response with metadata including usage statistics

- [x] **1.1.3** Create `PaginatedTemplatesResponse.cs` ✅ **COMPLETED**
  - ✅ Templates list
  - ✅ Total count
  - ✅ Current page
  - ✅ Page size
  - ✅ Total pages
  - ✅ Has next/previous page indicators

#### **Task 1.2: Controller Implementation**

- [x] **1.2.1** Add `GetTemplates` endpoint to `QuestionnaireTemplatesController` ✅ **COMPLETED**
  - ✅ HTTP GET `/api/questionnairetemplates`
  - ✅ Query parameters: search, status, language, page, pageSize, sortBy, sortDirection
  - ✅ Date range parameters: createdFrom, createdTo
  - ✅ Proper error handling and validation
  - ✅ API documentation with Swagger attributes

#### **Task 1.3: Validation & Error Handling**

- [x] **1.3.1** Add query validation ✅ **COMPLETED**
  - ✅ Page must be >= 1
  - ✅ PageSize must be between 1-100
  - ✅ Valid sort fields only
  - ✅ Valid status enum values
- [x] **1.3.2** Add comprehensive error handling ✅ **COMPLETED**
  - ✅ Invalid query parameters → 400 Bad Request
  - ✅ Server errors → 500 Internal Server Error
  - ✅ Empty results → 200 OK with empty array

### **Phase 2: Frontend Implementation**

#### **Task 2.1: Core Components**

- [x] **2.1.1** Create `TemplatesList.tsx` component ✅ **COMPLETED**

  - ✅ Template cards/table layout
  - ✅ Loading and error states
  - ✅ Empty state when no templates
  - ✅ Responsive design following UnifiedUI patterns

- [x] **2.1.2** Create `TemplatesSearch.tsx` component ✅ **COMPLETED**

  - ✅ Search input with debounce
  - ✅ Status filter dropdown
  - ✅ Language filter dropdown
  - ✅ Date range picker
  - ✅ Clear filters functionality

- [x] **2.1.3** Create `TemplatesPagination.tsx` component ✅ **COMPLETED**
  - ✅ Page navigation controls
  - ✅ Page size selector
  - ✅ Total count display
  - ✅ Jump to page functionality

#### **Task 2.2: Advanced Features**

- [ ] **2.2.1** Create `TemplatesSorting.tsx` component

  - Sort by: Name, Created Date, Last Modified, Usage Count
  - Sort direction toggle (ASC/DESC)
  - Clear sort functionality

- [ ] **2.2.2** Create `TemplateCard.tsx` component
  - **Title** (primary display)
  - **Certificate Type** badge
  - **Target Entity Types** as chips
  - **Last Modified** date
  - **Status** badge (Draft/Active/Archived)
  - **Usage Count** (number of assignments/responses)
  - **Creation Date**
  - Quick actions (View, Edit, Duplicate, Delete)

#### **Task 2.3: State Management & Hooks**

- [x] **2.3.1** Create `useTemplatesList.ts` hook ✅ **COMPLETED**

  - ✅ Fetch templates with filters
  - ✅ Handle loading/error states
  - ✅ Debounced search
  - ✅ Filter and sort state management
  - ✅ Pagination state management

- [x] **2.3.2** Create `useDebounce.ts` hook ✅ **COMPLETED**
  - ✅ Debounce functionality for search optimization
  - ✅ Performance optimization for API calls

#### **Task 2.4: Page Integration**

- [x] **2.4.1** Update `QuestionnaireTemplates.tsx` page ✅ **COMPLETED**

  - ✅ Integrate all listing components
  - ✅ Add "Create New Template" button
  - ✅ Implement proper page layout
  - ✅ Add page header with search/filter summary
  - ✅ Full error handling and loading states
  - ✅ URL synchronization for filter persistence

- [x] **2.4.2** Connect to application routing system ✅ **COMPLETED**

  - ✅ Integrate with custom `Home.tsx` routing system
  - ✅ Add URL-based tab synchronization
  - ✅ Connect menu items to template pages
  - ✅ Support navigation to `/questionnaires/templates`
  - ✅ Support navigation to `/questionnaires/templates/new`

- [x] **2.4.3** Fix dependencies and runtime errors ✅ **COMPLETED**
  - ✅ Install missing `date-fns` package for date picker functionality
  - ✅ Resolve `@mui/x-date-pickers` dependency issues
  - ✅ Ensure all components load without runtime errors

### **Phase 3: Testing & Quality Assurance**

#### **Task 3.1: Backend Testing**

- [ ] **3.1.1** Unit tests for `GetQuestionnaireTemplatesQueryHandler`

  - Test search functionality
  - Test filtering by status, language, date
  - Test pagination logic
  - Test sorting functionality
  - Test edge cases (empty results, invalid params)

- [ ] **3.1.2** Integration tests for templates endpoint
  - Test full API endpoint
  - Test with various query combinations
  - Test performance with large datasets
  - Test error scenarios

#### **Task 3.2: Frontend Testing**

- [ ] **3.2.1** Unit tests for components

  - Test TemplatesList rendering
  - Test TemplatesSearch filtering
  - Test pagination controls
  - Test sorting functionality

- [ ] **3.2.2** Integration tests
  - Test complete listing workflow
  - Test search and filter combinations
  - Test error handling
  - Test responsive behavior

#### **Task 3.3: E2E Testing**

- [ ] **3.3.1** End-to-end scenarios
  - Load templates list
  - Search by template name
  - Filter by status and language
  - Test pagination navigation
  - Test sorting functionality

### **Phase 4: Documentation & Finalization**

#### **Task 4.1: Documentation Updates**

- [ ] **4.1.1** Update API documentation

  - Document new endpoint in API docs
  - Add request/response examples
  - Document query parameters

- [ ] **4.1.2** Update user documentation
  - Add feature description to user stories
  - Update implementation status

#### **Task 4.2: Performance & Optimization**

- [ ] **4.2.1** Backend optimization

  - Database query optimization
  - Add proper indexes if needed
  - Implement caching strategy if applicable

- [ ] **4.2.2** Frontend optimization
  - Implement virtual scrolling for large lists
  - Optimize re-renders
  - Add loading skeletons

---

## 📋 **Task Completion Checklist**

### **Definition of Done**

- [ ] All acceptance criteria met
- [ ] Backend API endpoint functional with all filters
- [ ] Frontend UI complete with search/filter/pagination
- [ ] Unit tests written and passing (>90% coverage)
- [ ] Integration tests passing
- [ ] E2E test scenarios passing
- [ ] API documentation updated
- [ ] Code follows project patterns (CQRS, UnifiedUI)
- [ ] Performance requirements met (<500ms response time)
- [ ] Responsive design working on mobile/tablet
- [ ] Accessibility standards met (WCAG 2.1 AA)

### **Technical Requirements**

- [ ] Follow CQRS pattern with MediatR
- [ ] Use UnifiedUI components consistently
- [ ] Implement proper error handling
- [ ] Add comprehensive logging
- [ ] Follow existing code patterns and conventions
- [ ] Ensure backward compatibility

### **Edge Cases Covered**

- [ ] Empty template list for new users
- [ ] Performance with 1000+ templates
- [ ] Concurrent access by multiple managers
- [ ] Network disconnection scenarios
- [ ] Invalid search parameters
- [ ] Very long template names/descriptions

---

## 🎯 **Success Metrics**

- Search response time: < 500ms
- Filter application time: < 200ms
- Pagination navigation: < 100ms
- Template list load time: < 1s for 100 templates
- Mobile responsiveness: All features work on mobile devices

---

## 📝 **Notes**

- **Architecture**: Follow existing CQRS pattern with MediatR
- **UI Framework**: Use UnifiedUI components exclusively
- **Database**: Optimize queries for performance
- **Security**: Ensure proper authorization for template access
- **Internationalization**: Support multi-language interface

---

**Created**: 2024-12-19  
**Epic**: B.1 - Questionnaire Template Management  
**Priority**: High  
**Estimated Effort**: 5-7 days  
**Dependencies**: None
