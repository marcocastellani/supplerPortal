import { EntityType } from "./supplyNetworkEntities";

// Enums that match the backend C# enums
export enum TemplateStatus {
  Draft = 1,
  Active = 2,
  Archived = 3,
}

export enum CertificateType {
  SelfAssessment = "SelfAssessment",
  InspectorRequired = "InspectorRequired",
  Both = "Both",
}

export enum QuestionType {
  Text = 1,
  Number = 2,
  Boolean = 3,
  SingleChoice = 4,
  MultiChoice = 5,
  Date = 6,
  FileUpload = 7,
}

// Base interfaces
export interface BaseEntity {
  id: string;
  createdAt: string;
  lastModified?: string;
  createdBy?: string;
}

// Translation support
export interface TranslationData {
  [languageCode: string]: {
    [key: string]: any;
  };
}

// Core Domain Types
export interface QuestionnaireTemplate extends BaseEntity {
  title: string;
  description: string;
  /** @deprecated Use targetEntityTypes instead */
  targetEntityTypeId: number;
  targetEntityTypes: EntityType[];
  primaryLanguage: string;
  expirationMonths: number;
  certificateType: CertificateType;
  status: TemplateStatus;
  version: string;
  sections: QuestionnaireSection[];
  questions: TemplateQuestion[];
  conditions: QuestionCondition[];
}

export interface QuestionnaireSection extends BaseEntity {
  title: string;
  description?: string;
  order: number;
  questionnaireTemplateId: string;
  translations?: TranslationData;
  questions: TemplateQuestion[];
}

export interface TemplateQuestion extends BaseEntity {
  title: string;
  description?: string;
  questionType: QuestionType;
  isRequired: boolean;
  order: number;
  sectionId: string;
  questionnaireTemplateId: string;
  translations?: TranslationData;
  configuration?: QuestionConfiguration;
  conditions: QuestionCondition[];
}

export interface QuestionCondition extends BaseEntity {
  sourceQuestionId: string;
  targetQuestionId: string;
  conditionType: string;
  expectedValue: string;
  questionnaireTemplateId: string;
}

// Configuration for different question types
export interface QuestionConfiguration {
  // For Single/Multi Choice questions
  options?: ChoiceOption[];
  // For Text questions
  maxLength?: number;
  minLength?: number;
  // For Number questions
  minValue?: number;
  maxValue?: number;
  // For File Upload questions
  allowedFileTypes?: string[];
  maxFileSize?: number;
  // For all questions
  placeholder?: string;
  helpText?: string;
}

export interface ChoiceOption {
  id: string;
  label: string;
  value: string;
  order: number;
  translations?: TranslationData;
}

// DTOs for API communication
export interface CreateTemplateRequest {
  title: string;
  description: string;
  /** @deprecated Use targetEntityTypes instead */
  targetEntityTypeId: number;
  targetEntityTypes: EntityType[];
  primaryLanguage: string;
  expirationMonths: number;
  certificateType: CertificateType;
  sections?: CreateSectionRequest[];
}

export interface CreateSectionRequest {
  title: string;
  description?: string;
  order: number;
  translations?: TranslationData;
}

export interface SaveDraftRequest {
  templateId: string;
  title?: string;
  description?: string;
  targetEntityTypes?: EntityType[];
  expirationMonths?: number;
  certificateType?: CertificateType;
  sections?: UpdateSectionRequest[];
  questions?: UpdateQuestionRequest[];
}

export interface UpdateSectionRequest {
  id?: string;
  title: string; // Required in backend
  description?: string;
  order: number; // Required in backend
  translations?: TranslationData;
  isDeleted?: boolean; // Added to match backend
}

export interface UpdateQuestionRequest {
  id?: string;
  text: string; // Backend expects 'text' not 'title' and it's required
  type: QuestionType; // Backend expects 'type' not 'questionType' and it's required
  isRequired: boolean; // Required in backend
  order: number; // Required in backend
  helpText?: string; // Backend expects 'helpText' not 'description'
  allowDocumentUpload?: boolean; // Added to match backend
  maxDocuments?: number; // Added to match backend
  requireDocuments?: boolean; // Added to match backend
  configuration?: QuestionConfiguration;
  sectionId?: string;
  translations?: TranslationData;
  isDeleted?: boolean; // Added to match backend
}

// Response DTOs
export interface QuestionnaireTemplateResponse {
  id: string;
  title: string;
  description: string;
  /** @deprecated Use targetEntityTypes instead */
  targetEntityTypeId: number;
  targetEntityTypes: EntityType[];
  primaryLanguage: string;
  expirationMonths: number;
  certificateType: CertificateType;
  status: TemplateStatus;
  version: string;
  createdAt: string;
  lastModified?: string;
  createdBy?: string;
  sections: SectionResponse[];
  questions: QuestionResponse[];
  conditions: QuestionConditionResponse[];
}

export interface SectionResponse {
  id: string;
  title: string;
  description?: string;
  order: number;
  questionnaireTemplateId: string;
  translations?: TranslationData;
  questions: QuestionResponse[];
}

export interface QuestionResponse {
  id: string;
  title: string;
  description?: string;
  questionType: QuestionType;
  isRequired: boolean;
  order: number;
  sectionId: string;
  questionnaireTemplateId: string;
  translations?: TranslationData;
  configuration?: QuestionConfiguration;
  conditions: QuestionConditionResponse[];
}

export interface QuestionConditionResponse {
  id: string;
  triggerQuestionId: string;
  targetQuestionId: string;
  conditionType: string;
  triggerValue?: string;
  action?: string;
  description?: string;
}

// UI State types for the wizard
export interface TemplateWizardState {
  currentStep: WizardStep;
  templateData: Partial<QuestionnaireTemplate>;
  sections: QuestionnaireSection[];
  questions: TemplateQuestion[];
  conditions: QuestionCondition[];
  isDirty: boolean;
  isAutoSaving: boolean;
  lastSaved?: string;
  validationErrors: ValidationErrors;
}

export enum WizardStep {
  BasicInfo = "basic-info",
  Sections = "sections",
  Questions = "questions",
  Conditions = "conditions",
  Review = "review",
}

export interface ValidationErrors {
  [field: string]: string[];
}

// Auto-save configuration
export interface AutoSaveConfig {
  enabled: boolean;
  intervalMs: number;
  debounceMs: number;
}

// Template Listing & Search Types
export interface TemplateFilters {
  searchTerm?: string;
  status?: TemplateStatus;
  language?: string;
  createdFrom?: string;
  createdTo?: string;
  page?: number;
  pageSize?: number;
  sortBy?: "title" | "created" | "lastmodified" | "usagecount" | "status";
  sortDirection?: "asc" | "desc";
}

export interface PaginatedTemplatesResponse {
  templates: QuestionnaireTemplateResponse[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  searchTerm?: string;
  statusFilter?: TemplateStatus;
  languageFilter?: string;
  sortBy?: string;
  sortDirection?: string;
}
