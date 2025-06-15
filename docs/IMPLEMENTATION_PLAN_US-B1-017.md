# 📋 IMPLEMENTATION PLAN: US-B1-017 - Lean Template Builder Interface

## 🎯 Overview
Implementation of a dynamic wizard interface for questionnaire template creation with sections, auto-save, and up to 20 steps navigation.

## 📊 Progress Tracking
- [ ] **Phase 1**: Backend Foundation (Domain + Application Layer)
- [ ] **Phase 2**: API Layer (Controllers + DTOs)
- [ ] **Phase 3**: Frontend State Management
- [ ] **Phase 4**: Wizard UI Components
- [ ] **Phase 5**: Auto-save Implementation
- [ ] **Phase 6**: Testing Suite
- [ ] **Phase 7**: Integration & Validation

---

## 🏗️ PHASE 1: Backend Foundation (Domain + Application Layer)

### 1.1 Domain Entities
**Files to create:**

**`api/SupplierPortal.Domain/Entities/QuestionnaireTemplate.cs`**
```csharp
public class QuestionnaireTemplate : BaseEntity
{
    public string Title { get; set; }
    public string Description { get; set; }
    public int TargetEntityTypeId { get; set; }
    public string PrimaryLanguage { get; set; }
    public int ExpirationMonths { get; set; } // NEW
    public CertificateType CertificateType { get; set; } // NEW
    public TemplateStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? LastModified { get; set; }
    public List<QuestionnaireSection> Sections { get; set; } = new();
    public List<Question> Questions { get; set; } = new();
}
```

**`api/SupplierPortal.Domain/Entities/QuestionnaireSection.cs`** (NEW)
```csharp
public class QuestionnaireSection : BaseEntity
{
    public string Title { get; set; }
    public string Description { get; set; }
    public int Order { get; set; }
    public int QuestionnaireTemplateId { get; set; }
    public QuestionnaireTemplate QuestionnaireTemplate { get; set; }
    public List<Question> Questions { get; set; } = new();
}
```

**`api/SupplierPortal.Domain/Entities/Question.cs`** (UPDATE)
```csharp
public class Question : BaseEntity
{
    public string Text { get; set; }
    public QuestionType Type { get; set; }
    public bool IsRequired { get; set; }
    public int Order { get; set; }
    public int QuestionnaireTemplateId { get; set; }
    public int? SectionId { get; set; } // NEW
    public QuestionnaireTemplate QuestionnaireTemplate { get; set; }
    public QuestionnaireSection Section { get; set; } // NEW
    public string ConfigurationJson { get; set; } // For question-specific settings
    public List<QuestionTranslation> Translations { get; set; } = new();
}
```

**`api/SupplierPortal.Domain/Enums/CertificateType.cs`** (NEW)
```csharp
public enum CertificateType
{
    SelfAssessment = 1,
    InspectorRequired = 2,
    Both = 3
}
```

**`api/SupplierPortal.Domain/Enums/TemplateStatus.cs`** (NEW)
```csharp
public enum TemplateStatus
{
    Draft = 1,
    Active = 2,
    Archived = 3
}
```

**`api/SupplierPortal.Domain/Enums/QuestionType.cs`** (NEW)
```csharp
public enum QuestionType
{
    NonConformity = 1,
    YesNo = 2,
    MultipleChoice = 3,
    Text = 4
}
```

### 1.2 Application Layer - Commands

**`api/SupplierPortal.Application/QuestionnaireTemplates/Commands/CreateTemplate/CreateQuestionnaireTemplateCommand.cs`**
```csharp
public class CreateQuestionnaireTemplateCommand : IRequest<QuestionnaireTemplateResponse>
{
    public string Title { get; set; }
    public string Description { get; set; }
    public int TargetEntityTypeId { get; set; }
    public string PrimaryLanguage { get; set; }
    public int ExpirationMonths { get; set; }
    public CertificateType CertificateType { get; set; }
    public List<CreateSectionDto> Sections { get; set; } = new();
}

public class CreateSectionDto
{
    public string Title { get; set; }
    public string Description { get; set; }
    public int Order { get; set; }
}
```

**`api/SupplierPortal.Application/QuestionnaireTemplates/Commands/CreateTemplate/CreateQuestionnaireTemplateCommandHandler.cs`**
```csharp
public class CreateQuestionnaireTemplateCommandHandler : IRequestHandler<CreateQuestionnaireTemplateCommand, QuestionnaireTemplateResponse>
{
    // Implementation with entity creation, sections creation, and response mapping
}
```

**`api/SupplierPortal.Application/QuestionnaireTemplates/Commands/SaveDraft/SaveDraftCommand.cs`**
```csharp
public class SaveDraftCommand : IRequest<Unit>
{
    public int TemplateId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public int ExpirationMonths { get; set; }
    public CertificateType CertificateType { get; set; }
    public List<UpdateSectionDto> Sections { get; set; } = new();
    public List<UpdateQuestionDto> Questions { get; set; } = new();
}
```

**`api/SupplierPortal.Application/QuestionnaireTemplates/Commands/SaveDraft/SaveDraftCommandHandler.cs`**

**`api/SupplierPortal.Application/QuestionnaireTemplates/Commands/CreateSection/CreateSectionCommand.cs`**
```csharp
public class CreateSectionCommand : IRequest<SectionResponse>
{
    public int TemplateId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public int Order { get; set; }
}
```

**`api/SupplierPortal.Application/QuestionnaireTemplates/Commands/CreateSection/CreateSectionCommandHandler.cs`**

### 1.3 Application Layer - Queries

**`api/SupplierPortal.Application/QuestionnaireTemplates/Queries/GetTemplate/GetQuestionnaireTemplateQuery.cs`**
```csharp
public class GetQuestionnaireTemplateQuery : IRequest<QuestionnaireTemplateResponse>
{
    public int Id { get; set; }
}
```

**`api/SupplierPortal.Application/QuestionnaireTemplates/Queries/GetTemplate/GetQuestionnaireTemplateQueryHandler.cs`**

**`api/SupplierPortal.Application/QuestionnaireTemplates/Queries/GetDraft/GetDraftQuestionnaireQuery.cs`** (REQUIRED)
```csharp
public class GetDraftQuestionnaireQuery : IRequest<QuestionnaireTemplateResponse>
{
    public int Id { get; set; }
}
```

**`api/SupplierPortal.Application/QuestionnaireTemplates/Queries/GetDraft/GetDraftQuestionnaireQueryHandler.cs`**

### 1.4 DTOs and Responses

**`api/SupplierPortal.Application/QuestionnaireTemplates/Common/QuestionnaireTemplateResponse.cs`**
```csharp
public class QuestionnaireTemplateResponse
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public int TargetEntityTypeId { get; set; }
    public string PrimaryLanguage { get; set; }
    public int ExpirationMonths { get; set; }
    public CertificateType CertificateType { get; set; }
    public TemplateStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? LastModified { get; set; }
    public List<SectionResponse> Sections { get; set; } = new();
    public List<QuestionResponse> Questions { get; set; } = new();
}
```

**`api/SupplierPortal.Application/QuestionnaireTemplates/Common/SectionResponse.cs`**
```csharp
public class SectionResponse
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public int Order { get; set; }
    public List<QuestionResponse> Questions { get; set; } = new();
}
```

**`api/SupplierPortal.Application/QuestionnaireTemplates/Common/QuestionResponse.cs`**
```csharp
public class QuestionResponse
{
    public int Id { get; set; }
    public string Text { get; set; }
    public QuestionType Type { get; set; }
    public bool IsRequired { get; set; }
    public int Order { get; set; }
    public int? SectionId { get; set; }
    public object Configuration { get; set; } // Parsed from ConfigurationJson
}
```

### 1.5 Infrastructure - Database Configuration

**`api/SupplierPortal.Infrastructure/Configurations/QuestionnaireTemplateConfiguration.cs`**
```csharp
public class QuestionnaireTemplateConfiguration : IEntityTypeConfiguration<QuestionnaireTemplate>
{
    public void Configure(EntityTypeBuilder<QuestionnaireTemplate> builder)
    {
        // Configure entity, relationships, constraints
    }
}
```

**`api/SupplierPortal.Infrastructure/Configurations/QuestionnaireSectionConfiguration.cs`**
**`api/SupplierPortal.Infrastructure/Configurations/QuestionConfiguration.cs`** (UPDATE)

---

## 🌐 PHASE 2: API Layer (Controllers + DTOs)

### 2.1 Controllers

**`api/SupplierPortal.API/Controllers/QuestionnaireTemplatesController.cs`**
```csharp
[ApiController]
[Route("api/[controller]")]
public class QuestionnaireTemplatesController : ControllerBase
{
    private readonly IMediator _mediator;

    [HttpPost]
    public async Task<ActionResult<QuestionnaireTemplateResponse>> CreateTemplate(
        CreateQuestionnaireTemplateCommand command)

    [HttpGet("{id}")]
    public async Task<ActionResult<QuestionnaireTemplateResponse>> GetTemplate(
        int id)

    [HttpGet("{id}/draft")]
    public async Task<ActionResult<QuestionnaireTemplateResponse>> GetDraft(
        int id)

    [HttpPut("{id}/auto-save")]
    public async Task<ActionResult> AutoSave(
        int id, SaveDraftCommand command)

    [HttpPost("{id}/sections")]
    public async Task<ActionResult<SectionResponse>> CreateSection(
        int id, CreateSectionCommand command)
}
```

### 2.2 Request/Response DTOs

**`api/SupplierPortal.API/DTOs/CreateQuestionnaireTemplateRequest.cs`**
**`api/SupplierPortal.API/DTOs/SaveDraftRequest.cs`**
**`api/SupplierPortal.API/DTOs/CreateSectionRequest.cs`**

---

## 💻 PHASE 3: Frontend State Management

### 3.1 Types Definition

**`front/src/types/questionnaireTemplate.ts`**
```typescript
export interface QuestionnaireTemplate {
  id?: number;
  title: string;
  description: string;
  targetEntityTypeId: number;
  primaryLanguage: string;
  expirationMonths: number;
  certificateType: CertificateType;
  status: TemplateStatus;
  sections: QuestionnaireSection[];
  questions: Question[];
  createdAt?: Date;
  lastModified?: Date;
}

export interface QuestionnaireSection {
  id?: number;
  title: string;
  description?: string;
  order: number;
  questions: Question[];
}

export interface Question {
  id?: number;
  text: string;
  type: QuestionType;
  isRequired: boolean;
  order: number;
  sectionId?: number;
  configuration?: any;
}

export enum CertificateType {
  SelfAssessment = 'self-assessment',
  InspectorRequired = 'inspector-required',
  Both = 'both'
}

export enum TemplateStatus {
  Draft = 'draft',
  Active = 'active',
  Archived = 'archived'
}

export enum QuestionType {
  NonConformity = 'non-conformity',
  YesNo = 'yes-no',
  MultipleChoice = 'multiple-choice',
  Text = 'text'
}
```

### 3.2 State Management

**`front/src/hooks/useTemplateBuilder.ts`**
```typescript
export interface TemplateBuilderState {
  templateData: QuestionnaireTemplate;
  currentStep: number;
  totalSteps: number;
  stepValidation: Record<number, boolean>;
  isDirty: boolean;
  isSaving: boolean;
  lastSaved?: Date;
  error?: string;
}

export const useTemplateBuilder = (templateId?: number) => {
  // State management logic
  // API calls
  // Validation logic
  // Auto-save logic
}
```

**`front/src/hooks/useAutoSave.ts`**
```typescript
export const useAutoSave = (
  templateData: QuestionnaireTemplate,
  onSave: (data: QuestionnaireTemplate) => Promise<void>,
  options: {
    interval?: number;
    debounceMs?: number;
    enabled?: boolean;
  } = {}
) => {
  // Auto-save implementation
  // Debouncing
  // Local storage backup
  // Error handling
}
```

### 3.3 API Services

**`front/src/services/questionnaireTemplateApi.ts`**
```typescript
export class QuestionnaireTemplateApi {
  static async createTemplate(data: CreateTemplateRequest): Promise<QuestionnaireTemplate> {}
  
  static async getDraft(id: number): Promise<QuestionnaireTemplate> {}
  
  static async saveDraft(id: number, data: SaveDraftRequest): Promise<void> {}
  
  static async createSection(templateId: number, section: CreateSectionRequest): Promise<QuestionnaireSection> {}
}
```

---

## 🎨 PHASE 4: Wizard UI Components

### 4.1 Main Wizard Component

**`front/src/pages/templates/TemplateBuilderWizard.tsx`**
```typescript
export const TemplateBuilderWizard: React.FC<{ templateId?: number }> = ({ templateId }) => {
  const {
    templateData,
    currentStep,
    totalSteps,
    stepValidation,
    isDirty,
    isSaving,
    goToStep,
    nextStep,
    previousStep,
    updateTemplateData
  } = useTemplateBuilder(templateId);

  const steps = useMemo(() => generateWizardSteps(templateData.sections), [templateData.sections]);

  return (
    <div className="template-builder-wizard">
      <WizardSidebar 
        steps={steps} 
        currentStep={currentStep}
        validation={stepValidation}
        onStepClick={goToStep}
      />
      <div className="wizard-content">
        <ProgressIndicator current={currentStep} total={totalSteps} />
        <StepRenderer step={steps[currentStep]} />
        <WizardNavigation 
          onPrevious={previousStep}
          onNext={nextStep}
          canGoNext={stepValidation[currentStep]}
          isFirst={currentStep === 0}
          isLast={currentStep === totalSteps - 1}
        />
      </div>
      <AutoSaveIndicator isSaving={isSaving} lastSaved={lastSaved} />
    </div>
  );
};
```

### 4.2 Step Components

**`front/src/components/templates/wizard/BasicInfoStep.tsx`**
```typescript
interface BasicInfoStepProps {
  data: QuestionnaireTemplate;
  onChange: (data: Partial<QuestionnaireTemplate>) => void;
  onValidationChange: (isValid: boolean) => void;
}

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ data, onChange, onValidationChange }) => {
  // Form fields for basic info
  // Sections management
  // Validation logic
  
  return (
    <div className="basic-info-step">
      <div className="template-info-section">
        {/* Title, Description, Target Entity Type */}
        {/* Expiration Months */}
        {/* Certificate Type */}
        {/* Primary Language */}
      </div>
      
      <div className="sections-management">
        <SectionsList 
          sections={data.sections}
          onSectionsChange={(sections) => onChange({ sections })}
        />
      </div>
    </div>
  );
};
```

**`front/src/components/templates/wizard/QuestionsStep.tsx`**
```typescript
interface QuestionsStepProps {
  sectionId: number;
  data: QuestionnaireTemplate;
  onChange: (data: Partial<QuestionnaireTemplate>) => void;
  onValidationChange: (isValid: boolean) => void;
}

export const QuestionsStep: React.FC<QuestionsStepProps> = ({ sectionId, data, onChange, onValidationChange }) => {
  const section = data.sections.find(s => s.id === sectionId);
  const sectionQuestions = data.questions.filter(q => q.sectionId === sectionId);
  
  return (
    <div className="questions-step">
      <div className="section-header">
        <h2>{section?.title}</h2>
        <p>{section?.description}</p>
      </div>
      
      <QuestionsList 
        questions={sectionQuestions}
        onQuestionsChange={(questions) => {
          // Update questions for this section
        }}
      />
      
      <AddQuestionButton onAddQuestion={handleAddQuestion} />
    </div>
  );
};
```

**`front/src/components/templates/wizard/ConditionsStep.tsx`**
**`front/src/components/templates/wizard/LanguagesStep.tsx`**
**`front/src/components/templates/wizard/PreviewStep.tsx`**

### 4.3 Shared Components

**`front/src/components/templates/wizard/WizardSidebar.tsx`**
```typescript
interface WizardSidebarProps {
  steps: WizardStep[];
  currentStep: number;
  validation: Record<number, boolean>;
  onStepClick: (step: number) => void;
}

export const WizardSidebar: React.FC<WizardSidebarProps> = ({ steps, currentStep, validation, onStepClick }) => {
  return (
    <div className="wizard-sidebar">
      {steps.map((step, index) => (
        <div 
          key={step.id}
          className={`step-item ${index === currentStep ? 'active' : ''} ${validation[index] ? 'valid' : 'invalid'}`}
          onClick={() => onStepClick(index)}
        >
          <div className="step-number">{index + 1}</div>
          <div className="step-title">{step.title}</div>
          <div className="step-status">
            {validation[index] ? '✓' : '⚠'}
          </div>
        </div>
      ))}
    </div>
  );
};
```

**`front/src/components/templates/wizard/ProgressIndicator.tsx`**
**`front/src/components/templates/wizard/WizardNavigation.tsx`**
**`front/src/components/templates/wizard/AutoSaveIndicator.tsx`**

### 4.4 Section Management Components

**`front/src/components/templates/sections/SectionsList.tsx`**
```typescript
interface SectionsListProps {
  sections: QuestionnaireSection[];
  onSectionsChange: (sections: QuestionnaireSection[]) => void;
}

export const SectionsList: React.FC<SectionsListProps> = ({ sections, onSectionsChange }) => {
  return (
    <div className="sections-list">
      <div className="sections-header">
        <h3>Questionnaire Sections</h3>
        <button onClick={handleAddSection}>Add Section</button>
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {sections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id!.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <SectionItem 
                        section={section}
                        onEdit={handleEditSection}
                        onDelete={handleDeleteSection}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
```

**`front/src/components/templates/sections/SectionItem.tsx`**
**`front/src/components/templates/sections/SectionEditor.tsx`**

---

## 💾 PHASE 5: Auto-save Implementation

### 5.1 Auto-save Hook Implementation

**`front/src/hooks/useAutoSave.ts`** (Detailed Implementation)
```typescript
export const useAutoSave = (
  templateData: QuestionnaireTemplate,
  onSave: (data: QuestionnaireTemplate) => Promise<void>,
  options: AutoSaveOptions = {}
) => {
  const {
    interval = 30000, // 30 seconds
    debounceMs = 2000, // 2 seconds
    enabled = true,
    localStorageKey
  } = options;

  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date>();
  const [error, setError] = useState<string>();

  // Debounced save function
  const debouncedSave = useMemo(
    () => debounce(async (data: QuestionnaireTemplate) => {
      if (!enabled) return;
      
      try {
        setIsSaving(true);
        setError(undefined);
        
        await onSave(data);
        setLastSaved(new Date());
        
        // Update local storage backup
        if (localStorageKey) {
          localStorage.setItem(localStorageKey, JSON.stringify(data));
        }
      } catch (err) {
        setError(err.message);
        console.error('Auto-save failed:', err);
      } finally {
        setIsSaving(false);
      }
    }, debounceMs),
    [onSave, enabled, debounceMs, localStorageKey]
  );

  // Interval-based auto-save
  useEffect(() => {
    if (!enabled) return;

    const intervalId = setInterval(() => {
      if (templateData && !isSaving) {
        debouncedSave(templateData);
      }
    }, interval);

    return () => clearInterval(intervalId);
  }, [templateData, debouncedSave, interval, enabled, isSaving]);

  // Save on data change (debounced)
  useEffect(() => {
    if (templateData && enabled) {
      debouncedSave(templateData);
    }
  }, [templateData, debouncedSave, enabled]);

  // Cleanup
  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, [debouncedSave]);

  return {
    isSaving,
    lastSaved,
    error,
    manualSave: () => debouncedSave.flush()
  };
};
```

### 5.2 Local Storage Backup

**`front/src/utils/localStorageBackup.ts`**
```typescript
export class LocalStorageBackup {
  static save(key: string, data: QuestionnaireTemplate): void {
    try {
      const backup = {
        data,
        timestamp: new Date().toISOString(),
        version: '1.0'
      };
      localStorage.setItem(key, JSON.stringify(backup));
    } catch (error) {
      console.warn('Failed to save backup to localStorage:', error);
    }
  }

  static restore(key: string): QuestionnaireTemplate | null {
    try {
      const backup = localStorage.getItem(key);
      if (!backup) return null;
      
      const parsed = JSON.parse(backup);
      return parsed.data;
    } catch (error) {
      console.warn('Failed to restore backup from localStorage:', error);
      return null;
    }
  }

  static clear(key: string): void {
    localStorage.removeItem(key);
  }
}
```

---

## 🧪 PHASE 6: Testing Suite

### 6.1 Backend Unit Tests

**`tests/SupplierPortal.Application.UnitTests/QuestionnaireTemplates/Commands/CreateTemplateCommandHandlerTests.cs`**
```csharp
public class CreateTemplateCommandHandlerTests
{
    [Test]
    public async Task Handle_ValidCommand_ShouldCreateTemplate()
    {
        // Arrange
        var command = new CreateQuestionnaireTemplateCommand
        {
            Title = "Test Template",
            Description = "Test Description",
            ExpirationMonths = 12,
            CertificateType = CertificateType.SelfAssessment,
            Sections = new List<CreateSectionDto>
            {
                new CreateSectionDto { Title = "Section 1", Order = 1 }
            }
        };

        // Act & Assert
    }
}
```

**`tests/SupplierPortal.Application.UnitTests/QuestionnaireTemplates/Commands/SaveDraftCommandHandlerTests.cs`**
**`tests/SupplierPortal.Application.UnitTests/QuestionnaireTemplates/Queries/GetDraftQueryHandlerTests.cs`**

### 6.2 Frontend Unit Tests

**`front/src/hooks/__tests__/useTemplateBuilder.test.ts`**
```typescript
describe('useTemplateBuilder', () => {
  test('should initialize with default state', () => {
    // Test implementation
  });

  test('should handle step navigation', () => {
    // Test implementation
  });

  test('should validate steps correctly', () => {
    // Test implementation
  });
});
```

**`front/src/hooks/__tests__/useAutoSave.test.ts`**
**`front/src/components/templates/wizard/__tests__/TemplateBuilderWizard.test.tsx`**

### 6.3 Integration Tests

**`tests/SupplierPortal.Application.IntegrationTests/QuestionnaireTemplates/TemplateBuilderWorkflowTests.cs`**
```csharp
public class TemplateBuilderWorkflowTests
{
    [Test]
    public async Task CreateTemplate_WithSections_ShouldPersistCorrectly()
    {
        // Full workflow test
    }
}
```

### 6.4 E2E Tests

**`front/src/test/e2e/templateBuilder.e2e.test.ts`**
```typescript
describe('Template Builder E2E', () => {
  test('should complete full template creation workflow', async () => {
    // E2E test implementation
  });

  test('should recover from browser refresh', async () => {
    // Browser refresh recovery test
  });
});
```

---

## 🔗 PHASE 7: Integration & Validation

### 7.1 Database Migration
**`api/SupplierPortal.Infrastructure/Migrations/AddQuestionnaireTemplates.cs`**

### 7.2 Dependency Injection Setup
**Update `api/SupplierPortal.Application/ConfigureServices.cs`**
**Update `api/SupplierPortal.Infrastructure/ConfigureServices.cs`**

### 7.3 Frontend Routing
**Update `front/src/routes/index.tsx`**
```typescript
{
  path: '/templates/builder/:id?',
  element: <TemplateBuilderWizard />
}
```

### 7.4 Navigation Integration
**Update main navigation to include template builder link**

---

## 📝 FINAL CHECKLIST

### Backend Completion
- [ ] All domain entities created and configured
- [ ] All MediatR commands and handlers implemented
- [ ] All queries implemented (including GetDraftQuestionnaireQuery)
- [ ] API controllers with all endpoints
- [ ] Database configurations and migrations
- [ ] Unit tests for all handlers
- [ ] Integration tests for workflows

### Frontend Completion
- [ ] All TypeScript types defined
- [ ] State management hooks implemented
- [ ] Auto-save functionality working
- [ ] All wizard step components created
- [ ] Sidebar navigation with step validation
- [ ] Section management components
- [ ] Local storage backup system
- [ ] Unit tests for all components and hooks
- [ ] E2E tests for critical workflows

### Integration
- [ ] API endpoints tested and working
- [ ] Frontend-backend integration verified
- [ ] Auto-save working with real API
- [ ] Error handling implemented
- [ ] Performance tested with large templates (20 steps)
- [ ] Browser refresh recovery working
- [ ] Documentation updated

---

## 🚀 IMPLEMENTATION NOTES

### Critical Success Factors:
1. **Dynamic Step Generation**: Ensure wizard steps are generated based on sections
2. **Auto-save Reliability**: Implement robust error handling and retry logic
3. **Performance**: Optimize for templates with many sections/questions
4. **Data Consistency**: Ensure data integrity during auto-save operations
5. **User Experience**: Smooth navigation between steps with proper validation

### Potential Challenges:
1. **Complex State Management**: Managing state across dynamic steps
2. **Auto-save Conflicts**: Handling concurrent saves and race conditions
3. **Validation Dependencies**: Step validation when data changes
4. **Memory Management**: Preventing memory leaks in long sessions
5. **Error Recovery**: Graceful handling of network issues and failures

### Priority Order:
1. Start with backend foundation (entities, commands, queries)
2. Implement basic wizard structure without auto-save
3. Add auto-save functionality
4. Implement section management
5. Add comprehensive testing
6. Polish UI/UX and error handling

---

*This plan should be executed in order, with each phase building upon the previous one. Each component should be tested as it's built, following TDD principles.*
