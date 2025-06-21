# 📋 Task List: Multiple Entity Types for Questionnaire Templates

**Project**: SupplierPortal  
**Feature/Epic**: Epic B.1 - Questionnaire Template Management  
**Start Date**: 2024-12-19  
**Target Completion**: 2024-12-23  
**Status**: 🚧 In Progress

## 🎯 **Overview**

Implement support for multiple entity types per questionnaire template to enable templates that can target combinations of Suppliers, Sub-Suppliers, Sites, Persons, and Company Groups. This addresses the business requirement where questionnaires like "Environmental Compliance" should target both Suppliers and Sites, while "Contact Information" should target all entity types.

**Business Context**: Currently templates can only target one entity type (single `TargetEntityTypeId`), limiting flexibility. Need many-to-many relationship to support realistic business scenarios.

## 📊 **Progress Summary**

- **Total Tasks**: 15
- **Completed**: 0 ✅
- **In Progress**: 0 🚧
- **Pending**: 15 ⏳
- **Blocked**: 0 🚫

**Overall Progress**: 0% Complete

## 🔧 **Tasks**

### **Phase 1: Database Schema & Migration** (Estimated: 6 hours)

#### ✅ **Task 1: Create Junction Table Entity [DRY][REH]**

- **Status**: ✅ Complete
- **Priority**: 🔴 High
- **Estimated Time**: 2 hours
- **Assignee**: AI
- **Dependencies**: None
- **Description**: Create new domain entity and EF configuration for many-to-many relationship
- **Acceptance Criteria**:
  - [x] `QuestionnaireTemplateEntityType` domain entity created with proper navigation properties
  - [x] Entity Framework configuration added with cascade delete
  - [x] Unique constraint on (TemplateId, EntityType) combination
  - [x] Proper audit fields (Created, CreatedBy) included
- **Implementation Notes**:
  - Use EntityType enum from existing SupplyNetworkEntities
  - Ensure cascade delete when template is removed
  - Add to IApplicationDbContext interface

#### ✅ **Task 2: Database Migration with Backward Compatibility [REH][AC]**

- **Status**: ✅ Complete
- **Priority**: 🔴 High
- **Estimated Time**: 3 hours
- **Assignee**: AI
- **Dependencies**: Task 1
- **Description**: Create migration that preserves existing data while adding new structure
- **Acceptance Criteria**:
  - [x] Migration creates new junction table
  - [x] Existing `TargetEntityTypeId` data migrated to new table
  - [x] Old field marked as obsolete but not removed
  - [x] Migration is reversible
  - [x] No data loss during migration
- **Implementation Notes**:
  - Test migration on sample data
  - Add SQL script to populate junction table from existing data
  - Keep old field temporarily for rollback capability

#### ✅ **Task 3: Update QuestionnaireTemplate Domain Entity [DRY]**

- **Status**: ✅ Complete
- **Priority**: 🔴 High
- **Estimated Time**: 1 hour
- **Assignee**: AI
- **Dependencies**: Task 1
- **Description**: Add navigation property and mark old property as obsolete
- **Acceptance Criteria**:
  - [x] `TargetEntityTypes` collection property added
  - [x] `TargetEntityTypeId` marked with [Obsolete] attribute
  - [x] Navigation properties configured correctly
  - [x] Entity validates at least one target entity type is required
- **Implementation Notes**:
  - Use ICollection<QuestionnaireTemplateEntityType> for navigation
  - Add validation attribute for minimum 1 entity type

### **Phase 2: Application Layer Updates** (Estimated: 8 hours)

#### ✅ **Task 4: Update DTOs and Contracts [IV][DRY]**

- **Status**: ✅ Complete
- **Priority**: 🔴 High
- **Estimated Time**: 2 hours
- **Assignee**: AI
- **Dependencies**: Task 3
- **Description**: Modify all DTOs to use array of EntityType instead of single value
- **Acceptance Criteria**:
  - [x] `CreateTemplateRequest` uses `List<EntityType> TargetEntityTypes`
  - [x] `QuestionnaireTemplateResponse` includes entity types array
  - [x] `UpdateTemplateRequest` supports entity types modification
  - [x] Backward compatibility maintained with old DTOs
  - [x] Proper validation attributes added (minimum 1 required)
- **Implementation Notes**:
  - Keep old properties for API versioning
  - Add AutoMapper profiles for entity type conversion

#### ✅ **Task 5: Update MediatR Commands and Handlers [REH][TDT]**

- **Status**: ✅ Complete
- **Priority**: 🔴 High
- **Estimated Time**: 4 hours
- **Assignee**: AI
- **Dependencies**: Task 4
- **Description**: Modify all template-related commands to handle multiple entity types
- **Acceptance Criteria**:
  - [x] `CreateQuestionnaireTemplateCommand` handles entity types array
  - [x] `UpdateQuestionnaireTemplateCommand` supports entity types modification
  - [x] `GetQuestionnaireTemplateQuery` returns entity types in response
  - [x] Validation ensures at least one entity type is selected
  - [x] Error handling for invalid entity type combinations
- **Implementation Notes**:
  - Use FluentValidation for entity type validation
  - Ensure proper transaction handling for junction table operations

#### ✅ **Task 6: Update API Controllers [IV][REH]**

- **Status**: ✅ Complete
- **Priority**: 🟡 Medium
- **Estimated Time**: 2 hours
- **Assignee**: AI
- **Dependencies**: Task 5
- **Description**: Update controller endpoints to handle new entity types structure
- **Acceptance Criteria**:
  - [x] POST `/api/questionnaire-templates` accepts entity types array
  - [x] PUT endpoints support entity types modification
  - [x] GET endpoints return entity types in response
  - [x] Proper HTTP status codes for validation errors
  - [x] API documentation updated (Swagger)
- **Implementation Notes**:
  - Maintain API versioning compatibility
  - Add proper model validation at controller level

### **Phase 3: Frontend Implementation** (Estimated: 6 hours)

#### ✅ **Task 7: Update TypeScript Interfaces [IV][DRY]**

- **Status**: ✅ Complete
- **Priority**: 🔴 High
- **Estimated Time**: 1 hour
- **Assignee**: AI
- **Dependencies**: Task 4
- **Description**: Modify frontend types to support entity types array
- **Acceptance Criteria**:
  - [x] `QuestionnaireTemplate` interface uses `targetEntityTypes: EntityType[]`
  - [x] `CreateTemplateRequest` interface updated
  - [x] Form validation types support array validation
  - [x] Backward compatibility maintained during transition
- **Implementation Notes**:
  - Import EntityType from existing supply network entities types
  - Ensure type safety with proper validation

#### ✅ **Task 8: Implement Multi-Select UI Component [SF][RP]**

- **Status**: ✅ Complete
- **Priority**: 🔴 High
- **Estimated Time**: 3 hours
- **Assignee**: AI
- **Dependencies**: Task 7
- **Description**: Replace single-select dropdown with multi-select component with chips
- **Acceptance Criteria**:
  - [x] Multi-select dropdown with Material-UI Select component
  - [x] Selected entity types displayed as chips
  - [x] Proper validation (minimum 1 selection required)
  - [x] Responsive design following REMIRA design system
  - [x] Clear helper text explaining selection
- **Implementation Notes**:
  - Use MUI's `multiple` prop on Select component
  - Implement chip display in `renderValue`
  - Follow existing form field patterns in BasicInfoStep

#### ✅ **Task 9: Update Form Validation Logic [REH][TDT]**

- **Status**: ✅ Complete
- **Priority**: 🟡 Medium
- **Estimated Time**: 2 hours
- **Assignee**: AI
- **Dependencies**: Task 8
- **Description**: Update client-side validation to handle entity types array
- **Acceptance Criteria**:
  - [x] Validation ensures at least one entity type is selected
  - [x] Error messages display properly for empty selections
  - [x] Form submission blocked when validation fails
  - [x] Consistent error styling with other form fields
- **Implementation Notes**:
  - Use existing validation patterns from the form
  - Integrate with form's error handling system

### **Phase 4: Business Logic & Assignment** (Estimated: 4 hours)

#### ⏳ **Task 10: Update Questionnaire Assignment Logic [REH][PA]**

- **Status**: ⏳ Pending
- **Priority**: 🟡 Medium
- **Estimated Time**: 3 hours
- **Assignee**: AI
- **Dependencies**: Task 5
- **Description**: Modify assignment logic to consider multiple entity types when creating questionnaire instances
- **Acceptance Criteria**:
  - [ ] Assignment command filters entities by template's target types
  - [ ] Validation prevents assignment to incompatible entity types
  - [ ] Bulk assignment handles entity type filtering efficiently
  - [ ] Clear error messages for invalid assignments
- **Implementation Notes**:
  - Update `AssignQuestionnaireCommand` and handler
  - Add efficient LINQ queries for entity type filtering
  - Consider performance with large entity datasets

#### ⏳ **Task 11: Add Entity Type Validation Services [IV][REH]**

- **Status**: ⏳ Pending
- **Priority**: 🟢 Low
- **Estimated Time**: 1 hour
- **Assignee**: AI
- **Dependencies**: Task 10
- **Description**: Create validation service for entity type business rules
- **Acceptance Criteria**:
  - [ ] Service validates entity type combinations
  - [ ] Business rules for valid entity type selections
  - [ ] Reusable validation across application layers
- **Implementation Notes**:
  - Consider future business rules for entity type restrictions
  - Make service extensible for additional validation rules

### **Phase 5: Testing & Quality Assurance** (Estimated: 6 hours)

#### ⏳ **Task 12: Unit Tests [TDT][REH]**

- **Status**: ⏳ Pending
- **Priority**: 🟡 Medium
- **Estimated Time**: 3 hours
- **Assignee**: AI
- **Dependencies**: Task 11
- **Description**: Create comprehensive unit tests for new functionality
- **Acceptance Criteria**:
  - [ ] Tests for domain entity validation
  - [ ] Tests for MediatR command handlers
  - [ ] Tests for entity type validation logic
  - [ ] Tests for migration data integrity
  - [ ] Code coverage > 90% for new code
- **Implementation Notes**:
  - Test both success and failure scenarios
  - Mock dependencies appropriately
  - Use existing test patterns and fixtures

#### ⏳ **Task 13: Integration Tests [TDT][REH]**

- **Status**: ⏳ Pending
- **Priority**: 🟡 Medium
- **Estimated Time**: 2 hours
- **Assignee**: AI
- **Dependencies**: Task 12
- **Description**: Create integration tests for API endpoints and database operations
- **Acceptance Criteria**:
  - [ ] End-to-end tests for template creation with multiple entity types
  - [ ] Tests for questionnaire assignment with entity type filtering
  - [ ] Database migration testing
  - [ ] API contract testing
- **Implementation Notes**:
  - Use existing test infrastructure
  - Test with realistic data scenarios
  - Verify backward compatibility

#### ⏳ **Task 14: E2E Frontend Tests [TDT]**

- **Status**: ⏳ Pending
- **Priority**: 🟢 Low
- **Estimated Time**: 1 hour
- **Assignee**: AI
- **Dependencies**: Task 13
- **Description**: Create end-to-end tests for the multi-select UI component
- **Acceptance Criteria**:
  - [ ] Test multi-select interaction and chip display
  - [ ] Test form validation with entity type selection
  - [ ] Test template creation workflow
- **Implementation Notes**:
  - Use existing E2E test framework
  - Focus on critical user workflows

### **Phase 6: Documentation & Cleanup** (Estimated: 2 hours)

#### ⏳ **Task 15: Update Documentation [CDiP][AC]**

- **Status**: ⏳ Pending
- **Priority**: 🟢 Low
- **Estimated Time**: 2 hours
- **Assignee**: AI
- **Dependencies**: Task 14
- **Description**: Update all relevant documentation and cleanup obsolete code
- **Acceptance Criteria**:
  - [ ] API documentation reflects new entity types structure
  - [ ] User stories updated with multi-entity-type scenarios
  - [ ] Implementation plan marked as completed
  - [ ] Migration guide created for future deployments
  - [ ] Code comments updated for new functionality
- **Implementation Notes**:
  - Update Swagger documentation
  - Add examples of multi-entity-type usage
  - Document migration rollback procedures

## 🏆 **Completed Tasks Summary**

### **Phase 1 Results**

- (To be updated as tasks are completed)

## 🚫 **Blockers & Issues**

### **Current Blockers**

- None identified at project start

### **Resolved Issues**

- (To be updated as issues arise and are resolved)

## 🔗 **Related Documentation**

- [Epic B.1: Questionnaire Template Management](../../project/user-stories/questionnaire-management.md)
- [Implementation Plan: Template Builder](../../implementation/active-plans/questionnaire-template-builder.md)
- [Supply Network Entity Types](../../project/project-overview.md)
- [Design System Guidelines](../../design/design-system/design-system.md)

## 📈 **Metrics & KPIs**

- **Completion Rate**: 0%
- **Average Task Time**: TBD
- **Quality Metrics**: Code coverage >90%, All tests passing
- **Technical Debt**: Removal of obsolete `TargetEntityTypeId` in future release

## 🎯 **Next Steps**

1. Start with Task 1: Create Junction Table Entity
2. Implement database migration with data preservation
3. Update domain entities and application layer
4. Implement frontend multi-select component
5. Add comprehensive testing suite

## 📝 **Notes & Lessons Learned**

- **Risk Assessment**: Migration requires careful data preservation
- **Performance Considerations**: Entity type filtering queries need optimization
- **Backward Compatibility**: Maintain old API structure during transition period
- **User Experience**: Multi-select UI must be intuitive and follow design system

---

**Last Updated**: 2024-12-19  
**Updated By**: AI Assistant  
**Next Review**: 2024-12-20
