# 📋 Epic B.1: Questionnaire Template Management
## Feature Requirements & User Stories

### 🎯 Feature Overview

**Epic Reference:** Epic B - Questionnaire Management  
**User Story Reference:** B.1 - "As a sustainability manager, I want to create personalized questionnaire templates with conditional questions so as to collect only the relevant information for each type of supply network entity."

### 📊 Current State vs Target State

**Current State:**
- Manual questionnaire creation in Excel
- Year-over-year duplication and manual modification
- No standardization or process control
- No automated scheduling or KPI preparation

**Target State:**
- Digital template builder with conditional logic
- Standardized evaluation process
- Controlled scheduling system
- Foundation for automated KPI generation
- Multi-language support
- Document upload capabilities

---

## 🔢 User Stories

### 📝 Template Creation & Management

**US-B1-001**: Template Listing & Search
> **As a** sustainability manager  
> **I want to** view all existing questionnaire templates with search and filter capabilities  
> **So that** I can quickly find and manage existing templates

**Acceptance Criteria:**
- List all templates with title, creation date, last modified, status
- Search by template name (server-side filtering)
- Filter by status (active/draft/archived), creation date, language
- Pagination for large datasets
- Sort by name, date, usage count

**Edge Cases:**
- Empty template list for new users
- Performance with 1000+ templates
- Concurrent access by multiple managers

**Technical Notes:**
- API: `GET /api/questionnaire-templates` with query parameters
- MediatR: `GetQuestionnaireTemplatesQuery` + `GetQuestionnaireTemplatesQueryHandler`
- Frontend: Templates list page with search/filter components

---

**US-B1-002**: Create New Template (Basic Info)
> **As a** sustainability manager  
> **I want to** create a new questionnaire template with basic information  
> **So that** I can start building a structured questionnaire

**Acceptance Criteria:**
- Form with: title (required), description, target supply network entity type
- Primary language selection (default: English)
- Template category/tag selection
- Save as draft functionality
- Validation: title uniqueness, required fields

**Edge Cases:**
- Duplicate template names
- Invalid special characters in title
- Network disconnection during save

**Technical Notes:**
- API: `POST /api/questionnaire-templates`
- MediatR: `CreateQuestionnaireTemplateCommand` + Handler
- DTO: `CreateQuestionnaireTemplateRequest`, `QuestionnaireTemplateResponse`

---

**US-B1-003**: Duplicate Existing Template
> **As a** sustainability manager  
> **I want to** duplicate an existing template  
> **So that** I can create a new version based on previous year's questionnaire

**Acceptance Criteria:**
- "Duplicate" action on template list
- Auto-generated name: "Copy of [Original Name]"
- Copy all questions, conditions, and settings
- New template starts in draft status
- Preserve original structure but allow immediate editing

**Edge Cases:**
- Duplicating archived templates
- Very large templates (100+ questions)
- Templates with complex conditional logic

**Technical Notes:**
- API: `POST /api/questionnaire-templates/{id}/duplicate`
- MediatR: `DuplicateQuestionnaireTemplateCommand` + Handler

---

### ❓ Question Management

**US-B1-004**: Add Non-Conformity Question
> **As a** sustainability manager  
> **I want to** add a non-conformity question to my template  
> **So that** I can collect structured compliance information

**Acceptance Criteria:**
- Question text input (multi-language support)
- Required/optional toggle
- Non-conformity severity levels (Critical, Major, Minor)
- Help text/description field
- Question ordering (drag & drop or up/down arrows)

**Edge Cases:**
- Very long question text
- Special characters in questions
- Maximum questions per template limit

**Technical Notes:**
- Question type: `NonConformityQuestion`
- Properties: text, severity, isRequired, helpText, order
- Frontend: Question builder component

---

**US-B1-005**: Add Yes/No Question
> **As a** sustainability manager  
> **I want to** add yes/no questions to my template  
> **So that** I can collect binary decision data

**Acceptance Criteria:**
- Question text input (multi-language)
- Required/optional toggle
- Default answer option
- Custom labels for Yes/No (e.g., "Compliant/Non-Compliant")
- Help text field

**Edge Cases:**
- Empty question text
- Very long custom labels
- Unicode characters in labels

**Technical Notes:**
- Question type: `YesNoQuestion`
- Properties: text, isRequired, yesLabel, noLabel, defaultValue

---

**US-B1-006**: Add Multiple Choice Question
> **As a** sustainability manager  
> **I want to** add multiple choice questions with customizable options  
> **So that** I can collect categorized responses

**Acceptance Criteria:**
- Question text input (multi-language)
- Add/remove answer options dynamically
- Option text editing
- Single vs multiple selection toggle
- Minimum/maximum selections for multiple choice
- Required/optional toggle

**Edge Cases:**
- Single option multiple choice
- Duplicate option texts
- Maximum number of options (e.g., 20)
- Empty options

**Technical Notes:**
- Question type: `MultipleChoiceQuestion`
- Properties: text, options[], allowMultiple, minSelections, maxSelections

---

**US-B1-007**: Add Text Question (Rare Cases)
> **As a** sustainability manager  
> **I want to** add open text questions for exceptional cases  
> **So that** I can collect detailed explanations when needed

**Acceptance Criteria:**
- Question text input (multi-language)
- Text area size configuration (small, medium, large)
- Character limit setting
- Placeholder text
- Required/optional toggle
- Clear indication this should be used sparingly

**Edge Cases:**
- Very large character limits
- Rich text formatting requirements
- Empty responses for required fields

**Technical Notes:**
- Question type: `TextQuestion`
- Properties: text, maxLength, placeholder, textAreaSize

---

### 📎 Document Upload Management

**US-B1-008**: Configure Document Upload for Questions
> **As a** sustainability manager  
> **I want to** enable document uploads for any question  
> **So that** supply network entities can provide supporting evidence

**Acceptance Criteria:**
- Toggle document upload for each question
- Configure allowed file types (PDF, JPG, PNG, DOC, XLS)
- Set maximum file size per document
- Set maximum number of documents per question
- Required vs optional document upload

**Edge Cases:**
- Large file uploads (>10MB)
- Unsupported file types
- Storage quota limits
- Virus scanning requirements

**Technical Notes:**
- Document upload configuration per question
- File validation on both client and server
- Secure file storage integration

---

### 🔄 Conditional Logic

**US-B1-009**: Set Up Non-Conformity Conditional Questions
> **As a** sustainability manager  
> **I want to** show follow-up questions when a non-conformity is reported  
> **So that** I can collect detailed information about issues

**Acceptance Criteria:**
- "Show if non-conformity exists" condition option
- Target question selection for conditional display
- Multiple questions can depend on same non-conformity
- Visual indication of conditional relationships
- Condition preview in template builder

**Edge Cases:**
- Circular dependencies between questions
- Multiple levels of conditional nesting
- Performance with complex condition trees

**Technical Notes:**
- Condition type: `NonConformityTrigger`
- Relationship mapping between questions
- Client-side condition evaluation

---

**US-B1-010**: Set Up Yes/No Conditional Questions
> **As a** sustainability manager  
> **I want to** show follow-up questions based on yes/no answers  
> **So that** I can create dynamic questionnaire flows

**Acceptance Criteria:**
- "Show if answer is Yes/No" condition options
- Select source yes/no question
- Select target questions to show/hide
- Support for "Show if Yes" and "Show if No" conditions
- Clear visual representation of logic flow

**Edge Cases:**
- Dependencies on optional questions
- Source question deleted after condition is set
- Nested conditional chains

**Technical Notes:**
- Condition type: `YesNoTrigger`
- Properties: sourceQuestionId, triggerValue (true/false), targetQuestionIds[]

---

### 🌐 Multi-Language Support

**US-B1-011**: Manage Template Languages
> **As a** sustainability manager  
> **I want to** add translations for my template  
> **So that** supply network entities can complete questionnaires in their preferred language

**Acceptance Criteria:**
- Add/remove supported languages for template
- Primary language designation (cannot be removed)
- Language-specific editing mode
- Translation completeness indicator
- Fallback to primary language for missing translations

**Edge Cases:**
- Removing languages with existing responses
- Adding languages to active templates
- Right-to-left language support

**Technical Notes:**
- Language entity with ISO codes
- Translation storage per question and template
- Frontend language switcher in template builder

---

**US-B1-012**: Translate Questions and Options
> **As a** sustainability manager  
> **I want to** provide translations for all questions and answer options  
> **So that** the questionnaire is accessible in multiple languages

**Acceptance Criteria:**
- Side-by-side translation interface
- Required field validation per language
- Copy from primary language functionality
- Translation status tracking (complete, partial, missing)
- Bulk translation tools

**Edge Cases:**
- Very long translations exceeding UI space
- Special characters in different languages
- Translation consistency across similar questions

**Technical Notes:**
- Nested translation objects in question entities
- Translation validation rules
- Language-aware form components

---

### 👁️ Preview & Testing

**US-B1-013**: Preview Template as Supply Network Entity
> **As a** sustainability manager  
> **I want to** preview how the questionnaire will appear to supply network entities  
> **So that** I can test the flow and user experience before publishing

**Acceptance Criteria:**
- Full questionnaire preview mode
- Test conditional logic with sample answers
- Switch between languages in preview
- Mobile-responsive preview
- Document upload simulation

**Edge Cases:**
- Complex conditional logic scenarios
- Very long questionnaires
- Templates with missing translations

**Technical Notes:**
- Read-only rendering of questionnaire
- Mock response system for testing conditions
- Same components used for actual questionnaire completion

---

### 📋 Template Activation & Assignment

**US-B1-014**: Activate and Publish Template
> **As a** sustainability manager  
> **I want to** activate a completed template  
> **So that** it becomes available for assignment to supply network entities

**Acceptance Criteria:**
- Template validation before activation (all required fields, translations)
- Status change from Draft to Active
- Activation timestamp recording
- Template becomes read-only after activation (version control for future)
- Notification of successful activation

**Edge Cases:**
- Activating incomplete templates
- Network issues during activation
- Templates with no questions

**Technical Notes:**
- API: `POST /api/questionnaire-templates/{id}/activate`
- MediatR: `ActivateQuestionnaireTemplateCommand` + Handler
- Template validation service

---

**US-B1-015**: Assign Template to Supply Network Entities
> **As a** sustainability manager  
> **I want to** assign questionnaire templates to specific supply network entities  
> **So that** they can complete the required evaluations

**Acceptance Criteria:**
- Select active template from list
- Multi-select supply network entities (with search/filter)
- Set due date for completion
- Add assignment notes/instructions
- Bulk assignment capabilities
- Assignment confirmation

**Edge Cases:**
- Assigning to inactive supply network entities
- Duplicate assignments
- Very large bulk assignments (1000+ entities)

**Technical Notes:**
- API: `POST /api/questionnaire-assignments`
- MediatR: `AssignQuestionnaireCommand` + Handler
- DTO: `QuestionnaireAssignmentRequest`

---

**US-B1-016**: Manage Template Versions
> **As a** sustainability manager  
> **I want to** track different versions of my templates  
> **So that** I can maintain audit trail and handle template evolution

**Acceptance Criteria:**
- Version numbering (major.minor format)
- Version history view
- Compare versions functionality
- Archive old versions
- Prevent editing of templates with active assignments

**Edge Cases:**
- Templates with hundreds of versions
- Comparing very different template structures
- Storage optimization for version data

**Technical Notes:**
- Template versioning entity
- Version comparison algorithms
- Archive/restore functionality

---

**US-B1-017**: Lean Template Builder Interface
> **As a** sustainability manager  
> **I want to** build templates through a step-by-step wizard interface  
> **So that** I can create complex questionnaires without being overwhelmed

**Acceptance Criteria:**
- Multi-step wizard: Basic Info → Questions → Conditions → Languages → Preview
- Progress indicator showing current step
- Save progress at each step
- Navigation between steps with validation
- Step completion indicators

**Edge Cases:**
- Browser refresh during template building
- Validation errors when moving between steps
- Very complex templates requiring multiple sessions

**Technical Notes:**
- State management for wizard steps
- Step validation rules
- Auto-save functionality
- Progressive enhancement approach

---

## 🏗️ Technical Architecture Overview

### Backend Components (API)
- **Controllers**: `QuestionnaireTemplatesController`, `QuestionnaireAssignmentsController`
- **Commands**: Create, Update, Duplicate, Activate, Assign templates
- **Queries**: Get templates, search/filter, version history
- **Entities**: `QuestionnaireTemplate`, `Question`, `QuestionCondition`, `Translation`
- **Validation**: Template completeness, conditional logic validation
- **Services**: Template builder, condition evaluator, version manager

### Frontend Components
- **Pages**: Template list, template builder wizard, assignment management
- **Components**: Question builders (by type), condition configurator, language manager
- **State**: Template builder state management, wizard progress
- **Services**: Template API client, validation services

### Key Design Principles Applied
- **[SF]** Simple, step-by-step wizard approach
- **[RP]** Clear separation between question types and conditions
- **[AC]** Each user story represents atomic functionality
- **[TDT]** All components designed for easy unit testing
- **[DM]** Minimal dependencies, leverage existing patterns

---

## 🧪 Testing Strategy

### Unit Tests
- Template validation logic
- Conditional logic evaluation
- Question type builders
- Translation management

### Integration Tests
- Template CRUD operations
- Assignment workflow
- Multi-language data handling
- File upload scenarios

### E2E Tests
- Complete template creation workflow
- Template assignment and completion
- Conditional question scenarios
- Multi-language questionnaire completion

---

## 📈 Success Metrics

- Time to create template: < 30 minutes for standard questionnaire
- Template reuse rate: > 70% of new questionnaires from duplicates
- Conditional logic usage: > 40% of templates use conditions
- Multi-language adoption: > 60% of templates have 2+ languages
- User satisfaction: > 8/10 in usability testing

---

*This document serves as the comprehensive specification for Epic B.1 implementation. Each user story should be implemented following TDD principles with appropriate test coverage.*
