# 📋 Task List: US-B1-015 Questionnaire Template Assignment

**Feature**: Questionnaire Template Assignment Wizard  
**Status**: 🚧 In Progress  
**Start Date**: 2024-06-22  
**Target Completion**: 2024-06-26

## ✅ Progress Overview

- [x] **Backend API** (9/9 tasks completed) ✓
- [x] **Frontend Wizard** (11/11 tasks completed) ✓
- [ ] **Testing & Polish** (0/4 tasks completed)

**Total Progress**: 21/24 tasks (87.5%)

---

## 🔧 Backend Tasks

### Database & Domain Layer
- [x] **B1**: Add `Notes` column to Questionnaire table (migration) ✓
- [x] **B2**: Update Questionnaire entity with Notes property ✓

### Application Layer
- [x] **B3**: Update `AssignQuestionnaireCommand` with Notes and SendNotifications fields ✓
- [x] **B4**: Update `AssignQuestionnaireCommandValidator` with Notes validation ✓
- [x] **B5**: Create `GetActiveTemplatesQuery` and handler for latest active templates ✓
- [x] **B6**: Update `AssignQuestionnaireCommandHandler` to handle notifications ✓

### API Layer
- [x] **B7**: Create `QuestionnaireAssignmentsController` with POST endpoint ✓
- [x] **B8**: Add GET endpoint for active templates ✓
- [x] **B9**: Add authorization attributes and audit logging ✓

---

## 🎨 Frontend Tasks

### Wizard Infrastructure
- [x] **F1**: Create `AssignmentWizard.tsx` main container with step management ✓
- [x] **F2**: Create wizard state management (context or local state) ✓
- [x] **F3**: Implement step navigation with validation ✓

### Wizard Steps
- [x] **F4**: Create `TemplateSelectionStep.tsx` with template cards/list ✓
- [x] **F5**: Create `EntitySelectionStep.tsx` with DataTable and filters ✓
- [x] **F6**: Create `AssignmentDetailsStep.tsx` with form fields ✓
- [x] **F7**: Create `ReviewConfirmStep.tsx` with summary ✓
- [x] **F8**: Create `AssignmentResultDialog.tsx` with tabs ✓

### Integration
- [x] **F9**: Create API service functions for assignments ✓
- [x] **F10**: Update `QuestionnaireAssignments.tsx` page to use wizard ✓
- [x] **F11**: Add routing and navigation ✓

---

## 🌐 Internationalization

- [x] **I1**: Add English translations for wizard ✓
- [ ] **I2**: Add German translations
- [ ] **I3**: Add Italian translations

---

## 🧪 Testing

- [ ] **T1**: Unit tests for backend commands and queries
- [ ] **T2**: Unit tests for frontend wizard components
- [ ] **T3**: Integration tests for complete assignment flow
- [ ] **T4**: Accessibility tests for wizard navigation

---

## 📝 Documentation

- [ ] **D1**: Update API documentation
- [ ] **D2**: Add user guide for assignment wizard
- [ ] **D3**: Update implementation documentation

---

## 🚀 Deployment Checklist

- [ ] Run database migration for Notes column
- [ ] Deploy backend changes
- [ ] Deploy frontend changes
- [ ] Verify permissions and audit trail
- [ ] Test email notifications
- [ ] Update feature flags if applicable

---

## 📊 Task Dependencies

```mermaid
graph TD
    B1 --> B2
    B2 --> B3
    B3 --> B4
    B3 --> B6
    B5 --> B8
    B6 --> B7
    B7 --> B9
    
    F1 --> F2
    F2 --> F3
    F3 --> F4
    F3 --> F5
    F3 --> F6
    F3 --> F7
    F4 --> F11
    F5 --> F11
    F6 --> F11
    F7 --> F8
    F8 --> F11
    F9 --> F11
    F10 --> F11
    
    B9 --> F9
    F11 --> I1
    I1 --> I2
    I2 --> I3
    
    F11 --> T2
    B9 --> T1
    T1 --> T3
    T2 --> T3
    T3 --> T4
```

---

## 💡 Notes

- Backend work can proceed in parallel with frontend wizard infrastructure
- Entity selection step (F5) is the most complex - allocate extra time
- Test with large datasets early to catch performance issues
- Coordinate with DevOps for database migration

---

**Last Updated**: 2024-06-22  
**Updated By**: AI Assistant  
**Implementation Status**: Core functionality complete - ready for testing