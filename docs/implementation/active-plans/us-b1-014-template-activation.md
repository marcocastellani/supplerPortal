# 🎯 US-B1-014: Template Activation Implementation Plan

**Epic**: B.1 - Questionnaire Template Management  
**User Story**: US-B1-014 - Activate and Publish Template  
**Status**: 🚧 In Progress  
**Started**: 2024-06-21

## 📋 Requirements Summary

- Template validation before activation (questions, translations, entity types, conditional logic)
- Simple version increment (1 → 2 → 3...)
- Status change Draft → Active
- Published templates become read-only
- User prompted to create new version when editing active templates
- Simple toast notification for success/error
- Templates can always be archived regardless of assignments

## 🔧 Implementation Tasks

### ✅ Phase 1: Backend Core Services

- [x] **Task 1.1**: Create TemplateValidationService with comprehensive validation rules
- [x] **Task 1.2**: Create PublishTemplateCommand with MediatR pattern
- [x] **Task 1.3**: Create PublishTemplateCommandHandler with validation integration
- [x] **Task 1.4**: Register services in DI container (ConfigureServices.cs)
- [x] **Task 1.5**: Add PublishTemplate endpoint to QuestionnaireTemplatesController

### 🚧 Phase 2: Backend Integration & Testing

- [ ] **Task 2.1**: Update existing endpoint routing to match frontend expectations
- [ ] **Task 2.2**: Add proper error handling and validation response DTOs
- [ ] **Task 2.3**: Create unit tests for TemplateValidationService
- [ ] **Task 2.4**: Create unit tests for PublishTemplateCommandHandler
- [ ] **Task 2.5**: Create integration tests for publish endpoint

### 🔄 Phase 3: Version Control & New Version Creation

- [ ] **Task 3.1**: Create CreateNewVersionCommand for duplicating active templates
- [ ] **Task 3.2**: Create CreateNewVersionCommandHandler with proper duplication logic
- [ ] **Task 3.3**: Add CreateNewVersion endpoint to controller
- [ ] **Task 3.4**: Update frontend API service with createNewVersion function

### 🎨 Phase 4: Frontend Integration

- [ ] **Task 4.1**: Test existing publishTemplate function with new backend
- [ ] **Task 4.2**: Add template status validation in useTemplateWizard
- [ ] **Task 4.3**: Create "New Version" confirmation dialog component
- [ ] **Task 4.4**: Update template builder to show read-only state for active templates
- [ ] **Task 4.5**: Add version display in template wizard and lists

### 🔒 Phase 5: Edit Restrictions & UX

- [ ] **Task 5.1**: Implement edit restrictions for active templates
- [ ] **Task 5.2**: Show clear messaging about read-only state
- [ ] **Task 5.3**: Update template list to show status indicators clearly
- [ ] **Task 5.4**: Add confirmation dialog for template activation
- [ ] **Task 5.5**: Improve error messaging and toast notifications

### 🧪 Phase 6: Testing & Validation

- [ ] **Task 6.1**: End-to-end testing of activation workflow
- [ ] **Task 6.2**: Test version control and new version creation
- [ ] **Task 6.3**: Test edit restrictions and user experience
- [ ] **Task 6.4**: Validate all error scenarios and edge cases
- [ ] **Task 6.5**: Test with real questionnaire data

## 🎯 Acceptance Criteria Validation

- [ ] Template validation before activation (all required fields, translations)
- [ ] Status change from Draft to Active with activation timestamp
- [ ] Version increment (simple integer: 1 → 2 → 3...)
- [ ] Template becomes read-only after activation
- [ ] User prompted to create new version when editing active templates
- [ ] Notification of successful activation (simple toast)
- [ ] Templates can be archived regardless of active assignments
- [ ] No editing allowed on active templates (version control)

## 📁 Files Created/Modified

### Backend Files

- ✅ `api/SupplierPortal.Application/Services/TemplateValidationService.cs` - NEW
- ✅ `api/SupplierPortal.Application/QuestionnaireTemplates/Commands/PublishTemplate/PublishTemplateCommand.cs` - NEW
- ✅ `api/SupplierPortal.Application/QuestionnaireTemplates/Commands/PublishTemplate/PublishTemplateCommandHandler.cs` - NEW
- [ ] `api/SupplierPortal.Application/ConfigureServices.cs` - MODIFIED (DI registration)
- [ ] `api/SupplierPortal.API/Controllers/QuestionnaireTemplatesController.cs` - MODIFIED (new endpoint)

### Frontend Files

- [ ] `front/src/services/questionnaire-templates-api.ts` - MODIFIED (if needed)
- [ ] `front/src/hooks/useTemplateWizard.ts` - MODIFIED (validation, restrictions)
- [ ] `front/src/components/questionnaire-templates/TemplateWizard.tsx` - MODIFIED (UI updates)
- [ ] `front/src/components/questionnaire-templates/TemplatesList.tsx` - MODIFIED (status display)

### Test Files

- [ ] `api/tests/SupplierPortal.Application.UnitTests/Services/TemplateValidationServiceTests.cs` - NEW
- [ ] `api/tests/SupplierPortal.Application.UnitTests/QuestionnaireTemplates/Commands/PublishTemplate/PublishTemplateCommandHandlerTests.cs` - NEW
- [ ] `api/tests/SupplierPortal.Application.IntegrationTests/QuestionnaireTemplates/PublishTemplateTests.cs` - NEW

## 🚀 Current Status

**Phase 1**: ✅ 5/5 tasks completed  
**Phase 2**: 🔄 In Progress  
**Overall Progress**: 🚧 25% complete

## 📝 Notes

- Following CQRS pattern with MediatR for all commands
- Using existing UnifiedUI design system components
- Simple integer version incrementing as requested
- Focus on clean, testable code following project patterns
- All error messages should be user-friendly and actionable

---

**Next Step**: Task 1.4 - Register services in DI container
