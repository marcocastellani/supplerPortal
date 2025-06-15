# 🧹 Code Cleanup Task List

## 📋 **Phase 1: Critical Issues (Priorità Massima)** - ✅ **IN PROGRESS**

### 1.1 **Logging Cleanup** [SFT, PA] - ✅ **COMPLETATO**
- [x] **Remove console.log from production files**
  - [x] `hooks/useErrorHandling.ts` - Removed 4 console statements 
  - [x] `hooks/useEntityDetail.ts` - Removed 3 console statements 
  - [x] `services/supplyNetworkEntitiesService.ts` - Removed 6 console statements 
  - [x] `pages/RegionalSettingsExample.tsx` - Removed 1 console statement 
  - [x] `services/dashboardService.ts` - Removed 1 console statement 
  - [x] Scan and remove remaining console statements across codebase 

- [x] **Implement proper logging system**
  - [x] Create `utils/logger.ts` with dev/prod modes 
  - [x] Replace console statements with structured logging 
  - [x] Add error tracking integration (basic implementation) 

### 1.2 **Type Safety Enhancement** [ISA, TDT] - 
- [x] **Create type definitions**
  - [x] Create `types/ui.ts` with proper interfaces 
  - [x] Define ApiError, NetworkError, AppError types 
  - [x] Create SelectOption and event handler types 

- [x] **Improve error handling types**
  - [x] Replace `catch (error: any)` in useErrorHandling 
  - [x] Replace `catch (error: any)` in useEntityDetail 
  - [x] Update error handling to use specific types 

- [ ] **Fix event handler types**
  - [x] Attempted NetworkEntities.tsx Select handlers (reverted due to compatibility)
  - [ ] Create proper interfaces for remaining components
  - [ ] Update all form event handlers with specific types

- [ ] **Remove generic any usage**
  - [ ] Fix test files with `as any` assertions
  - [ ] Create proper type definitions for complex objects
  - [ ] Update service responses with specific interfaces

## 📋 **Phase 2: Structural Improvements (Priorità Alta)**

### 2.1 **NetworkEntities.tsx Refactoring** [CSD, SF] - ✅ **COMPLETATO**
- [x] **Extract custom hooks** 
  - [x] Create `hooks/useNetworkEntitiesFilters.ts`
  - [x] Create `hooks/useNetworkEntitiesData.ts`
  - [x] Create `hooks/useNetworkEntitiesPagination.ts`
- [x] **Component decomposition**
  - [x] Extract `components/NetworkEntities/NetworkEntitiesSearch.tsx`
  - [x] Extract `components/NetworkEntities/NetworkEntitiesFilters.tsx`
  - [x] Extract `components/NetworkEntities/NetworkEntitiesTable.tsx`
  - [x] Extract `components/NetworkEntities/NetworkEntitiesPagination.tsx`
- [x] **RESULT**: 427 → 108 lines (**75% reduction**)

### 2.2 **NewSupplyNetworkEntity.tsx Refactoring** [CSD, CA]
- [ ] **Extract business logic** (353 → ~150 lines)
  - [ ] Create `hooks/useSupplyNetworkEntityForm.ts`
  - [ ] Create `hooks/useFormSubmission.ts`
  - [ ] Move form validation to dedicated hook

- [ ] **Component separation**
  - [ ] Extract form steps to separate components
  - [ ] Create reusable form field components
  - [ ] Separate success/error handling components

### 2.3 **Other Large Files Optimization**
- [ ] **EntitySelector.tsx** (236 lines)
  - [ ] Extract search logic to custom hook
  - [ ] Separate dropdown rendering component
  
- [ ] **EntityInfoField.tsx** (232 lines)
  - [ ] Extract inline editing logic to hook
  - [ ] Separate field type renderers

## 📋 **Phase 3: Code Quality Enhancement (Priorità Media)**

### 3.1 **Constants Extraction** [CMV]
- [ ] **Create constants structure**
  - [ ] Create `constants/ui.ts` for UI constants
  - [ ] Create `constants/api.ts` for API constants  
  - [ ] Create `constants/validation.ts` for validation rules

- [ ] **Replace magic numbers**
  - [ ] Replace hardcoded `pageSize = 20`
  - [ ] Replace hardcoded `debounce 500ms`
  - [ ] Replace hardcoded `zIndex: 1000`

### 3.2 **Error Handling Standardization** [REH]
- [ ] **Unify error patterns**
  - [ ] Create `components/ErrorBoundary.tsx`
  - [ ] Create `hooks/useErrorBoundary.ts`
  - [ ] Standardize error message formatting

- [ ] **Implement retry logic**
  - [ ] Add retry mechanism for API calls
  - [ ] Create exponential backoff utility
  - [ ] Add network error recovery

### 3.3 **Performance Optimization** [PA]
- [ ] **React optimization**
  - [ ] Add React.memo to heavy components
  - [ ] Implement useCallback for event handlers
  - [ ] Add useMemo for expensive calculations

- [ ] **Bundle optimization**
  - [ ] Implement lazy loading for routes
  - [ ] Add code splitting for large components
  - [ ] Optimize import statements

## 📋 **Phase 4: Testing & Documentation**

### 4.1 **Testing Enhancement**
- [ ] **Unit tests for refactored components**
  - [ ] Test new custom hooks
  - [ ] Test extracted components
  - [ ] Update existing tests

- [ ] **Integration tests**
  - [ ] Test error handling flows
  - [ ] Test form submission flows
  - [ ] Test data fetching flows

### 4.2 **Documentation Update**
- [ ] **Update component documentation**
  - [ ] Document new hooks and their usage
  - [ ] Update component prop interfaces
  - [ ] Add usage examples

- [ ] **Architecture documentation**
  - [ ] Update folder structure documentation
  - [ ] Document error handling patterns
  - [ ] Document performance optimizations

## 📋 **Phase 5: Quality Assurance**

### 5.1 **Code Quality Checks**
- [ ] **ESLint configuration**
  - [ ] Enable strict TypeScript rules
  - [ ] Add custom rules for code smells
  - [ ] Configure pre-commit hooks

- [ ] **Type checking**
  - [ ] Enable TypeScript strict mode
  - [ ] Fix all type errors
  - [ ] Add type coverage reporting

### 5.2 **Performance Validation**
- [ ] **Bundle analysis**
  - [ ] Analyze bundle size before/after
  - [ ] Identify optimization opportunities
  - [ ] Validate lazy loading effectiveness

- [ ] **Runtime performance**
  - [ ] Measure component render times
  - [ ] Validate memory usage improvements
  - [ ] Test application responsiveness

## 🎯 **Success Metrics**

### **Quantitative Goals**
- [ ] **Console statements**: 25+ → 0 (100% reduction)
- [ ] **Any types**: 40+ → <5 (87% reduction)
- [ ] **Large files**: 4 → 0 (files >300 lines)
- [ ] **Bundle size**: 10-15% reduction
- [ ] **Type coverage**: >95%

### **Qualitative Goals**
- [ ] **All ESLint rules passing**
- [ ] **TypeScript strict mode enabled**
- [ ] **No runtime errors in development**
- [ ] **Improved developer experience**
- [ ] **Better code maintainability**

---

## 🔄 **Current Status**

**Phase 1**: ⏳ **IN PROGRESS**  
**Phase 2**: 📋 **IN PROGRESS**  
**Phase 3**: 📋 **PLANNED**  
**Phase 4**: 📋 **PLANNED**  
**Phase 5**: 📋 **PLANNED**

---

## 📅 **Estimated Timeline**

- **Phase 1**: 2-3 days (Critical fixes)
- **Phase 2**: 3-4 days (Structural refactoring)
- **Phase 3**: 2-3 days (Quality improvements)
- **Phase 4**: 1-2 days (Testing & docs)
- **Phase 5**: 1-2 days (QA & validation)

**Total Estimated**: 9-14 days

---

**Next Action**: Continue Phase 2.2 - NewSupplyNetworkEntity.tsx Refactoring 
