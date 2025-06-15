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

## 📋 **Phase 2: Structural Improvements (Priorità Alta)** - ✅ **COMPLETATO**

### 2.1 **Large File Decomposition** [CSD, CA] - ✅ **COMPLETATO**
- [x] **NetworkEntities.tsx refactoring** ✅ **COMPLETATO**
  - [x] Extract `useNetworkEntities` custom hook (165 lines) ✅
  - [x] Create `EntityFilters` component (85 lines) ✅
  - [x] Create `EntityTable` component (140 lines) ✅
  - [x] Create `EntityStates` components (LoadingState, ErrorState, NoResultsState) ✅
  - [x] Extract filter constants to `networkEntitiesFilters.ts` ✅
  - [x] **RESULT**: 427 → 108 lines (**75% reduction**) ✅

- [x] **NewSupplyNetworkEntity.tsx refactoring** ✅ **COMPLETATO**
  - [x] Extract `useEntityEnums` custom hook (80 lines) ✅
  - [x] Extract `useNewEntityForm` custom hook (140 lines) ✅
  - [x] Extract `useEntitySubmission` custom hook (95 lines) ✅
  - [x] Create `EntityStates` components (45 lines) ✅
  - [x] Replace 8+ console.log with structured logging ✅
  - [x] **RESULT**: 353 → 129 lines (**63% reduction**) ✅

### 2.2 **Custom Hooks Extraction** [DRY, TDT] - ✅ **COMPLETATO**
- [x] **useNetworkEntities** - State management + API calls ✅
- [x] **useEntityEnums** - Enum loading with error handling ✅
- [x] **useNewEntityForm** - Form state management + validation ✅
- [x] **useEntitySubmission** - Entity creation with logging ✅

### 2.3 **Component Decomposition** [SF, CA] - ✅ **COMPLETATO**
- [x] **NetworkEntities module** ✅
  - [x] EntityFilters component ✅
  - [x] EntityTable component ✅
  - [x] EntityStates components ✅
  - [x] Index exports ✅
- [x] **NewEntity module** ✅
  - [x] EntityStates components ✅
  - [x] Index exports ✅

### 📊 **Phase 2 Results Summary**
- **NetworkEntities.tsx**: 427 → 108 lines (75% reduction) ✅
- **NewSupplyNetworkEntity.tsx**: 353 → 129 lines (63% reduction) ✅
- **Total Lines Reduced**: 543 lines (69% average reduction) ✅
- **Large Files Eliminated**: 2/2 completed ✅
- **Custom Hooks Created**: 4 specialized hooks ✅
- **Components Extracted**: 7 reusable components ✅

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
**Phase 2**: ✅ **COMPLETATO**  
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

**Next Action**: Continue Phase 3 - Code Quality Enhancement
