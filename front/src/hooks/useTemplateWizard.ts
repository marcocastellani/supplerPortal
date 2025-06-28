import { useState, useEffect, useCallback, useRef } from "react";
import {
  TemplateWizardState,
  WizardStep,
  QuestionnaireTemplate,
  QuestionnaireSection,
  TemplateQuestion,
  QuestionCondition,
  ValidationErrors,
  SaveDraftRequest,
  AutoSaveConfig,
  TemplateStatus,
  QuestionnaireTemplateResponse,
  SectionResponse,
  QuestionResponse,
  QuestionConditionResponse,
} from "../types/questionnaire-templates";
import {
  questionnaireTemplatesApi,
  ApiError,
} from "../services/questionnaire-templates-api";
import { log } from "@/utils/logger";

// Mapping functions to convert API responses to domain types
const mapResponseToTemplate = (
  response: QuestionnaireTemplateResponse
): Partial<QuestionnaireTemplate> => ({
  id: response.id,
  title: response.title,
  description: response.description,
  targetEntityTypeId: response.targetEntityTypeId,
  targetEntityTypes: response.targetEntityTypes || [],
  primaryLanguage: response.primaryLanguage,
  expirationMonths: response.expirationMonths,
  certificateType: response.certificateType,
  status: response.status,
  version: response.version,
  createdAt: response.createdAt,
  lastModified: response.lastModified,
  createdBy: response.createdBy,
});

const mapResponseToSection = (
  response: SectionResponse
): QuestionnaireSection => ({
  id: response.id,
  title: response.title,
  description: response.description,
  order: response.order,
  questionnaireTemplateId: response.questionnaireTemplateId,
  translations: response.translations,
  createdAt: new Date().toISOString(), // Use current time as fallback
  questions: response.questions?.map(mapResponseToQuestion) || [],
});

const mapResponseToQuestion = (
  response: QuestionResponse
): TemplateQuestion => ({
  id: response.id,
  title: response.title,
  description: response.description,
  questionType: response.questionType,
  isRequired: response.isRequired,
  order: response.order,
  sectionId: response.sectionId,
  questionnaireTemplateId: response.questionnaireTemplateId,
  translations: response.translations,
  configuration: response.configuration,
  createdAt: new Date().toISOString(), // Use current time as fallback
  conditions: response.conditions?.map(mapResponseToCondition) || [],
});

const mapResponseToCondition = (
  response: QuestionConditionResponse
): QuestionCondition => ({
  id: response.id,
  sourceQuestionId: response.triggerQuestionId,
  targetQuestionId: response.targetQuestionId,
  conditionType: response.conditionType,
  expectedValue: response.triggerValue || "",
  questionnaireTemplateId: "", // Not available in response, will be set by context
  createdAt: new Date().toISOString(), // Use current time as fallback
});

// Default auto-save configuration
const DEFAULT_AUTO_SAVE_CONFIG: AutoSaveConfig = {
  enabled: true,
  intervalMs: 30000, // 30 seconds
  debounceMs: 2000, // 2 seconds debounce
};

// Initial state
const INITIAL_STATE: TemplateWizardState = {
  currentStep: WizardStep.BasicInfo,
  templateData: {
    title: "",
    description: "",
    primaryLanguage: "en",
    expirationMonths: 12,
    targetEntityTypeId: 1,
    targetEntityTypes: [],
  },
  sections: [],
  questions: [],
  conditions: [],
  isDirty: false,
  isAutoSaving: false,
  validationErrors: {},
};

export interface UseTemplateWizardOptions {
  templateId?: string;
  autoSave?: Partial<AutoSaveConfig>;
  onSave?: (templateId: string) => void;
  onError?: (error: ApiError) => void;
}

export interface UseTemplateWizardReturn {
  // State
  state: TemplateWizardState;
  isLoading: boolean;
  currentTemplateId?: string;

  // Navigation
  currentStep: WizardStep;
  canGoNext: boolean;
  canGoPrevious: boolean;
  goToStep: (step: WizardStep) => void;
  nextStep: () => void;
  previousStep: () => void;

  // Template data management
  updateTemplateData: (data: Partial<QuestionnaireTemplate>) => void;

  // Section management
  addSection: (
    section: Omit<
      QuestionnaireSection,
      "id" | "createdAt" | "questionnaireTemplateId"
    >
  ) => void;
  updateSection: (id: string, data: Partial<QuestionnaireSection>) => void;
  deleteSection: (id: string) => void;
  reorderSections: (fromIndex: number, toIndex: number) => void;

  // Question management
  addQuestion: (
    question: Omit<
      TemplateQuestion,
      "id" | "createdAt" | "questionnaireTemplateId"
    >
  ) => void;
  updateQuestion: (id: string, data: Partial<TemplateQuestion>) => void;
  deleteQuestion: (id: string) => void;
  reorderQuestions: (
    sectionId: string,
    fromIndex: number,
    toIndex: number
  ) => void;

  // Condition management
  addCondition: (
    condition: Omit<
      QuestionCondition,
      "id" | "createdAt" | "questionnaireTemplateId"
    >
  ) => void;
  updateCondition: (id: string, data: Partial<QuestionCondition>) => void;
  deleteCondition: (id: string) => void;

  // Actions
  saveDraft: () => Promise<void>;
  publishTemplate: () => Promise<void>;
  validateTemplate: () => Promise<boolean>;
  resetTemplate: () => void;

  // Validation
  validateCurrentStep: () => boolean;
  getStepErrors: (step: WizardStep) => string[];
}

export const useTemplateWizard = (
  options: UseTemplateWizardOptions = {}
): UseTemplateWizardReturn => {
  const { templateId, autoSave = {}, onSave, onError } = options;
  const autoSaveConfig = { ...DEFAULT_AUTO_SAVE_CONFIG, ...autoSave };

  const [state, setState] = useState<TemplateWizardState>(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(false);

  // Auto-save refs
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout>();
  const lastSaveDataRef = useRef<string>("");

  // State ref for accessing latest state in callbacks
  const stateRef = useRef(state);
  stateRef.current = state;

  // Load template if templateId is provided
  useEffect(() => {
    if (templateId) {
      loadTemplate(templateId);
    }
  }, [templateId]);

  // Auto-save effect
  useEffect(() => {
    const currentTemplateId = state.templateData.id || templateId;
    if (!autoSaveConfig.enabled || !state.isDirty || !currentTemplateId) {
      return;
    }

    const currentDataStr = JSON.stringify({
      templateData: state.templateData,
      sections: state.sections,
      questions: state.questions,
      conditions: state.conditions,
    });

    // Only auto-save if data actually changed
    if (currentDataStr === lastSaveDataRef.current) {
      return;
    }

    // Clear existing timeout
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    // Set new timeout for auto-save
    autoSaveTimeoutRef.current = setTimeout(() => {
      handleAutoSave();
    }, autoSaveConfig.debounceMs);

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [
    state.templateData,
    state.sections,
    state.questions,
    state.conditions,
    state.isDirty,
    autoSaveConfig.enabled,
    autoSaveConfig.debounceMs,
    templateId,
  ]);

  const loadTemplate = useCallback(
    async (id: string) => {
      setIsLoading(true);
      try {
        const template = await questionnaireTemplatesApi.getTemplate(id);

        // Process sections and questions from the response
        const sections = template.sections?.map(mapResponseToSection) || [];
        const questions = template.questions?.map(mapResponseToQuestion) || [];
        const conditions =
          template.conditions?.map(mapResponseToCondition) || [];

        setState((prev) => ({
          ...prev,
          templateData: mapResponseToTemplate(template),
          sections,
          questions,
          conditions,
          isDirty: false,
          lastSaved: template.lastModified,
        }));

        lastSaveDataRef.current = JSON.stringify({
          templateData: mapResponseToTemplate(template),
          sections,
          questions,
          conditions,
        });
      } catch (error) {
        onError?.(error as ApiError);
      } finally {
        setIsLoading(false);
      }
    },
    [onError]
  );

  const handleAutoSave = useCallback(async () => {
    // Use the template ID from state if it exists, otherwise fall back to the prop
    const currentTemplateId = state.templateData.id || templateId;
    if (!currentTemplateId) return;

    setState((prev) => ({ ...prev, isAutoSaving: true }));

    try {
      const saveRequest: SaveDraftRequest = {
        templateId: currentTemplateId,
        title: state.templateData.title || "",
        description: state.templateData.description || "",
        expirationMonths: state.templateData.expirationMonths || 12,
        certificateType: state.templateData.certificateType,
      };

      await questionnaireTemplatesApi.saveDraft(currentTemplateId, saveRequest);

      const now = new Date().toISOString();
      setState((prev) => ({
        ...prev,
        isDirty: false,
        isAutoSaving: false,
        lastSaved: now,
      }));

      lastSaveDataRef.current = JSON.stringify({
        templateData: state.templateData,
        sections: state.sections,
        questions: state.questions,
        conditions: state.conditions,
      });
    } catch (error) {
      setState((prev) => ({ ...prev, isAutoSaving: false }));
      onError?.(error as ApiError);
    }
  }, [
    templateId,
    state.templateData,
    state.sections,
    state.questions,
    state.conditions,
    onError,
  ]);

  // Trigger autosave immediately when enabled with existing unsaved changes
  useEffect(() => {
    if (autoSaveConfig.enabled && state.isDirty) {
      const currentTemplateId = state.templateData.id || templateId;
      if (currentTemplateId) {
        const timeoutId = setTimeout(() => {
          handleAutoSave();
        }, 1000); // 1 second delay when enabling autosave

        return () => clearTimeout(timeoutId);
      }
    }
  }, [
    autoSaveConfig.enabled,
    state.isDirty,
    state.templateData.id,
    templateId,
    handleAutoSave,
  ]);

  // Navigation functions
  const goToStep = useCallback((step: WizardStep) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  }, []);

  const nextStep = useCallback(() => {
    const steps = Object.values(WizardStep);
    const currentIndex = steps.indexOf(stateRef.current.currentStep);

    // Use setTimeout to ensure state is fully updated before validation
    setTimeout(() => {
      if (currentIndex < steps.length - 1 && validateCurrentStep()) {
        goToStep(steps[currentIndex + 1]);
      }
    }, 0);
  }, [goToStep]);

  const previousStep = useCallback(() => {
    const steps = Object.values(WizardStep);
    const currentIndex = steps.indexOf(state.currentStep);
    if (currentIndex > 0) {
      goToStep(steps[currentIndex - 1]);
    }
  }, [state.currentStep, goToStep]);

  // Template data management
  const updateTemplateData = useCallback(
    (data: Partial<QuestionnaireTemplate>) => {
      setState((prev) => ({
        ...prev,
        templateData: { ...prev.templateData, ...data },
        isDirty: true,
      }));

      // Trigger validation after state update to clear stale errors
      setTimeout(() => {
        validateCurrentStep();
      }, 0);
    },
    []
  );

  // Section management
  const addSection = useCallback(
    (
      section: Omit<
        QuestionnaireSection,
        "id" | "createdAt" | "questionnaireTemplateId"
      >
    ) => {
      const newSection: QuestionnaireSection = {
        ...section,
        id: `temp-${Date.now()}-${Math.random()}`,
        createdAt: new Date().toISOString(),
        questionnaireTemplateId: templateId || "",
        questions: [],
      };

      setState((prev) => ({
        ...prev,
        sections: [...prev.sections, newSection],
        isDirty: true,
      }));

      // Trigger validation after state update
      setTimeout(() => {
        validateCurrentStep();
      }, 0);
    },
    [templateId]
  );

  const updateSection = useCallback(
    (id: string, data: Partial<QuestionnaireSection>) => {
      setState((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.id === id ? { ...section, ...data } : section
        ),
        isDirty: true,
      }));

      // Trigger validation after state update
      setTimeout(() => {
        validateCurrentStep();
      }, 0);
    },
    []
  );

  const deleteSection = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      sections: prev.sections.filter((section) => section.id !== id),
      questions: prev.questions.filter((question) => question.sectionId !== id),
      conditions: prev.conditions.filter(
        (condition) =>
          !prev.questions.some(
            (q) =>
              q.sectionId === id &&
              (q.id === condition.sourceQuestionId ||
                q.id === condition.targetQuestionId)
          )
      ),
      isDirty: true,
    }));

    // Trigger validation after state update
    setTimeout(() => {
      validateCurrentStep();
    }, 0);
  }, []);

  const reorderSections = useCallback((fromIndex: number, toIndex: number) => {
    setState((prev) => {
      const newSections = [...prev.sections];
      const [moved] = newSections.splice(fromIndex, 1);
      newSections.splice(toIndex, 0, moved);

      // Update order indices
      const updatedSections = newSections.map((section, index) => ({
        ...section,
        order: index + 1,
      }));

      return {
        ...prev,
        sections: updatedSections,
        isDirty: true,
      };
    });
  }, []);

  // Question management
  const addQuestion = useCallback(
    (
      question: Omit<
        TemplateQuestion,
        "id" | "createdAt" | "questionnaireTemplateId"
      >
    ) => {
      const newQuestion: TemplateQuestion = {
        ...question,
        id: `temp-${Date.now()}-${Math.random()}`,
        createdAt: new Date().toISOString(),
        questionnaireTemplateId: templateId || "",
        conditions: [],
      };

      setState((prev) => ({
        ...prev,
        questions: [...prev.questions, newQuestion],
        isDirty: true,
      }));

      // Trigger validation after state update
      setTimeout(() => {
        validateCurrentStep();
      }, 0);
    },
    [templateId]
  );

  const updateQuestion = useCallback(
    (id: string, data: Partial<TemplateQuestion>) => {
      setState((prev) => ({
        ...prev,
        questions: prev.questions.map((question) =>
          question.id === id ? { ...question, ...data } : question
        ),
        isDirty: true,
      }));

      // Trigger validation after state update
      setTimeout(() => {
        validateCurrentStep();
      }, 0);
    },
    []
  );

  const deleteQuestion = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      questions: prev.questions.filter((question) => question.id !== id),
      conditions: prev.conditions.filter(
        (condition) =>
          condition.sourceQuestionId !== id && condition.targetQuestionId !== id
      ),
      isDirty: true,
    }));
  }, []);

  const reorderQuestions = useCallback(
    (sectionId: string, fromIndex: number, toIndex: number) => {
      setState((prev) => {
        const sectionQuestions = prev.questions.filter(
          (q) => q.sectionId === sectionId
        );
        const otherQuestions = prev.questions.filter(
          (q) => q.sectionId !== sectionId
        );

        const [moved] = sectionQuestions.splice(fromIndex, 1);
        sectionQuestions.splice(toIndex, 0, moved);

        // Update order indices
        const updatedSectionQuestions = sectionQuestions.map(
          (question, index) => ({
            ...question,
            order: index + 1,
          })
        );

        return {
          ...prev,
          questions: [...otherQuestions, ...updatedSectionQuestions],
          isDirty: true,
        };
      });
    },
    []
  );

  // Condition management
  const addCondition = useCallback(
    (
      condition: Omit<
        QuestionCondition,
        "id" | "createdAt" | "questionnaireTemplateId"
      >
    ) => {
      const newCondition: QuestionCondition = {
        ...condition,
        id: `temp-${Date.now()}-${Math.random()}`,
        createdAt: new Date().toISOString(),
        questionnaireTemplateId: templateId || "",
      };

      setState((prev) => ({
        ...prev,
        conditions: [...prev.conditions, newCondition],
        isDirty: true,
      }));
    },
    [templateId]
  );

  const updateCondition = useCallback(
    (id: string, data: Partial<QuestionCondition>) => {
      setState((prev) => ({
        ...prev,
        conditions: prev.conditions.map((condition) =>
          condition.id === id ? { ...condition, ...data } : condition
        ),
        isDirty: true,
      }));
    },
    []
  );

  const deleteCondition = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      conditions: prev.conditions.filter((condition) => condition.id !== id),
      isDirty: true,
    }));
  }, []);

  // Actions
  const saveDraft = useCallback(async () => {
    try {
      // Use the template ID from state if it exists, otherwise fall back to the prop
      let currentTemplateId = state.templateData.id || templateId;

      // If no templateId exists, create the template first
      if (!currentTemplateId) {
        log.debug("saveDraft: No templateId, creating template first...", {
          hook: "useTemplateWizard",
        });

        const templateRequest = {
          title: state.templateData.title || "",
          description: state.templateData.description || "",
          targetEntityTypeId: state.templateData.targetEntityTypeId || 1,
          targetEntityTypes: state.templateData.targetEntityTypes || [],
          primaryLanguage: state.templateData.primaryLanguage || "en",
          expirationMonths: state.templateData.expirationMonths || 12,
          certificateType:
            state.templateData.certificateType || ("SelfAssessment" as any),
          sections: state.sections.map((section) => ({
            title: section.title,
            description: section.description || "",
            order: section.order,
            translations: section.translations,
          })),
        };

        log.debug("saveDraft: Creating template with data:", {
          hook: "useTemplateWizard",
          templateRequest,
        });

        const createdTemplate = await questionnaireTemplatesApi.createTemplate(
          templateRequest
        );
        currentTemplateId = createdTemplate.id;

        // Update state with the new template ID
        setState((prev) => ({
          ...prev,
          templateData: { ...prev.templateData, id: currentTemplateId },
        }));

        log.debug("saveDraft: Template created with ID:", {
          hook: "useTemplateWizard",
          currentTemplateId,
        });

        // Now save questions using saveDraft API if we have any
        if (state.questions.length > 0) {
          log.debug("saveDraft: Saving questions after template creation:", {
            hook: "useTemplateWizard",
            questionsCount: state.questions.length,
          });

          const saveRequest: SaveDraftRequest = {
            templateId: currentTemplateId,
            sections: state.sections.map((section) => ({
              id: section.id,
              title: section.title,
              description: section.description || "",
              order: section.order,
              translations: section.translations,
              isDeleted: false,
            })),
            questions: state.questions.map((question) => ({
              id: question.id.startsWith("temp-") ? undefined : question.id, // Send undefined for temporary IDs
              text: question.title, // Backend expects 'text' not 'title'
              type: question.questionType, // Backend expects 'type' not 'questionType'
              isRequired: question.isRequired,
              order: question.order,
              helpText: question.description, // Backend expects 'helpText' not 'description'
              sectionId: question.sectionId,
              translations: question.translations,
              configuration: question.configuration,
              allowDocumentUpload: false, // Default values for backend
              maxDocuments: 5,
              requireDocuments: false,
              isDeleted: false,
            })),
          };

          await questionnaireTemplatesApi.saveDraft(
            currentTemplateId,
            saveRequest
          );

          log.debug(
            "saveDraft: Questions saved successfully after template creation",
            {
              hook: "useTemplateWizard",
            }
          );
        }
      } else {
        // If template exists, use the auto-save API
        const saveRequest: SaveDraftRequest = {
          templateId: currentTemplateId,
          title: state.templateData.title || "",
          description: state.templateData.description || "",
          expirationMonths: state.templateData.expirationMonths || 12,
          certificateType: state.templateData.certificateType,
          sections: state.sections.map((section) => ({
            id: section.id,
            title: section.title,
            description: section.description || "",
            order: section.order,
            translations: section.translations,
            isDeleted: false,
          })),
          questions: state.questions.map((question) => ({
            id: question.id.startsWith("temp-") ? undefined : question.id, // Send undefined for temporary IDs
            text: question.title, // Backend expects 'text' not 'title'
            type: question.questionType, // Backend expects 'type' not 'questionType'
            isRequired: question.isRequired,
            order: question.order,
            helpText: question.description, // Backend expects 'helpText' not 'description'
            sectionId: question.sectionId,
            translations: question.translations,
            configuration: question.configuration,
            allowDocumentUpload: false, // Default values for backend
            maxDocuments: 5,
            requireDocuments: false,
            isDeleted: false,
          })),
        };

        log.debug("saveDraft: Auto-saving existing template:", {
          hook: "useTemplateWizard",
          currentTemplateId,
        });

        await questionnaireTemplatesApi.saveDraft(
          currentTemplateId,
          saveRequest
        );
      }

      setState((prev) => ({
        ...prev,
        isDirty: false,
        lastSaved: new Date().toISOString(),
      }));

      onSave?.(currentTemplateId);

      log.info("saveDraft: Draft saved successfully", {
        hook: "useTemplateWizard",
        currentTemplateId,
      });
    } catch (error) {
      log.error("saveDraft: Error:", {
        hook: "useTemplateWizard",
        error,
      });
      throw error;
    }
  }, [
    templateId,
    state.templateData,
    state.sections,
    questionnaireTemplatesApi,
    onSave,
  ]);

  const publishTemplate = useCallback(async () => {
    try {
      // Use the template ID from state if it exists, otherwise fall back to the prop
      let currentTemplateId = state.templateData.id || templateId;

      // If no templateId exists, create the template first
      if (!currentTemplateId) {
        log.debug(
          "publishTemplate: No templateId, creating template first...",
          { hook: "useTemplateWizard" }
        );

        const templateRequest = {
          title: state.templateData.title || "",
          description: state.templateData.description || "",
          targetEntityTypeId: state.templateData.targetEntityTypeId || 1,
          targetEntityTypes: state.templateData.targetEntityTypes || [],
          primaryLanguage: state.templateData.primaryLanguage || "en",
          expirationMonths: state.templateData.expirationMonths || 12,
          certificateType:
            state.templateData.certificateType || ("SelfAssessment" as any),
          sections: state.sections.map((section) => ({
            title: section.title,
            description: section.description || "",
            order: section.order,
            translations: section.translations,
          })),
        };

        log.debug("publishTemplate: Creating template with data:", {
          hook: "useTemplateWizard",
          templateRequest,
        });

        const createdTemplate = await questionnaireTemplatesApi.createTemplate(
          templateRequest
        );
        currentTemplateId = createdTemplate.id;

        // Update state with the new template ID
        setState((prev) => ({
          ...prev,
          templateData: { ...prev.templateData, id: currentTemplateId },
        }));

        log.debug("publishTemplate: Template created with ID:", {
          hook: "useTemplateWizard",
          currentTemplateId,
        });

        // Now save questions using saveDraft API
        if (state.questions.length > 0) {
          log.debug(
            "publishTemplate: Saving questions after template creation:",
            {
              hook: "useTemplateWizard",
              questionsCount: state.questions.length,
            }
          );

          const saveRequest: SaveDraftRequest = {
            templateId: currentTemplateId,
            sections: state.sections.map((section) => ({
              id: section.id,
              title: section.title,
              description: section.description || "",
              order: section.order,
              translations: section.translations,
              isDeleted: false,
            })),
            questions: state.questions.map((question) => ({
              id: question.id.startsWith("temp-") ? undefined : question.id, // Send undefined for temporary IDs
              text: question.title, // Backend expects 'text' not 'title'
              type: question.questionType, // Backend expects 'type' not 'questionType'
              isRequired: question.isRequired,
              order: question.order,
              helpText: question.description, // Backend expects 'helpText' not 'description'
              sectionId: question.sectionId,
              translations: question.translations,
              configuration: question.configuration,
              allowDocumentUpload: false, // Default values for backend
              maxDocuments: 5,
              requireDocuments: false,
              isDeleted: false,
            })),
          };

          await questionnaireTemplatesApi.saveDraft(
            currentTemplateId,
            saveRequest
          );

          log.debug("publishTemplate: Questions saved successfully", {
            hook: "useTemplateWizard",
          });
        }
      }

      // Now publish the template
      log.debug("publishTemplate: Publishing template with ID:", {
        hook: "useTemplateWizard",
        currentTemplateId,
      });
      await questionnaireTemplatesApi.publishTemplate(currentTemplateId);

      setState((prev) => ({
        ...prev,
        templateData: { ...prev.templateData, status: TemplateStatus.Active },
        isDirty: false,
      }));

      log.info("publishTemplate: Template published successfully", {
        hook: "useTemplateWizard",
      });
    } catch (error) {
      log.error("publishTemplate: Error:", {
        hook: "useTemplateWizard",
        error,
      });
      throw error;
    }
  }, [
    templateId,
    state.templateData,
    state.sections,
    questionnaireTemplatesApi,
  ]);

  const validateTemplate = useCallback(async (): Promise<boolean> => {
    if (!state.templateData.title || !state.templateData.description) {
      return false;
    }

    const templateRequest = {
      title: state.templateData.title,
      description: state.templateData.description,
      targetEntityTypeId: state.templateData.targetEntityTypeId || 1,
      targetEntityTypes: state.templateData.targetEntityTypes || [],
      primaryLanguage: state.templateData.primaryLanguage || "en",
      expirationMonths: state.templateData.expirationMonths || 12,
      certificateType:
        state.templateData.certificateType || ("SelfAssessment" as any),
      sections: state.sections.map((section) => ({
        title: section.title,
        description: section.description || "",
        order: section.order,
        translations: section.translations,
      })),
    };

    const result = await questionnaireTemplatesApi.validateTemplate(
      templateRequest
    );

    if (!result.isValid) {
      setState((prev) => ({
        ...prev,
        validationErrors: {
          general: result.errors,
        },
      }));
    }

    return result.isValid;
  }, [templateId]);

  const resetTemplate = useCallback(() => {
    setState(INITIAL_STATE);
    lastSaveDataRef.current = "";
  }, []);

  // Validation functions
  const validateCurrentStep = useCallback((): boolean => {
    // Get the current state from ref to avoid stale closures
    const currentState = stateRef.current;

    const errors: ValidationErrors = {};

    switch (currentState.currentStep) {
      case WizardStep.BasicInfo:
        if (!currentState.templateData.title?.trim()) {
          errors.title = ["Title is required"];
        }
        if (
          currentState.templateData.title &&
          currentState.templateData.title.length > 200
        ) {
          errors.title = [
            ...(errors.title || []),
            "Title must be less than 200 characters",
          ];
        }
        if (!currentState.templateData.description?.trim()) {
          errors.description = ["Description is required"];
        }
        if (
          currentState.templateData.description &&
          currentState.templateData.description.length > 1000
        ) {
          errors.description = [
            ...(errors.description || []),
            "Description must be less than 1000 characters",
          ];
        }
        if (
          !currentState.templateData.expirationMonths ||
          currentState.templateData.expirationMonths < 1 ||
          currentState.templateData.expirationMonths > 120
        ) {
          errors.expirationMonths = [
            "Expiration months must be between 1 and 120",
          ];
        }
        if (
          !currentState.templateData.targetEntityTypes ||
          currentState.templateData.targetEntityTypes.length === 0
        ) {
          errors.targetEntityTypes = [
            "At least one target entity type must be selected",
          ];
        }
        break;

      case WizardStep.Sections:
        if (currentState.sections.length === 0) {
          errors.sections = ["At least one section is required"];
        }
        currentState.sections.forEach((section, index) => {
          if (!section.title?.trim()) {
            errors[`section_${index}_title`] = ["Section title is required"];
          }
        });
        break;

      case WizardStep.Questions:
        if (currentState.questions.length === 0) {
          errors.questions = ["At least one question is required"];
        }
        currentState.questions.forEach((question, index) => {
          if (!question.title?.trim()) {
            errors[`question_${index}_title`] = ["Question title is required"];
          }
          if (!question.sectionId) {
            errors[`question_${index}_section`] = [
              "Question must belong to a section",
            ];
          }
        });
        break;

      case WizardStep.Conditions: {
        // Validate conditions if any exist
        currentState.conditions.forEach((condition, index) => {
          const sourceQuestion = currentState.questions.find(
            (q) => q.id === condition.sourceQuestionId
          );
          const targetQuestion = currentState.questions.find(
            (q) => q.id === condition.targetQuestionId
          );

          if (!sourceQuestion) {
            errors[`condition_${index}_source`] = ["Source question not found"];
          }
          if (!targetQuestion) {
            errors[`condition_${index}_target`] = ["Target question not found"];
          }
          if (!condition.expectedValue?.trim()) {
            errors[`condition_${index}_value`] = ["Expected value is required"];
          }
        });
        break;
      }

      case WizardStep.Review: {
        // Final validation - all previous steps must be valid
        // For this step, just validate that all data is present
        if (!currentState.templateData.title?.trim()) {
          errors.title = ["Title is required"];
        }
        if (!currentState.templateData.description?.trim()) {
          errors.description = ["Description is required"];
        }
        if (currentState.sections.length === 0) {
          errors.sections = ["At least one section is required"];
        }
        if (currentState.questions.length === 0) {
          errors.questions = ["At least one question is required"];
        }
        break;
      }
    }

    setState((prev) => ({ ...prev, validationErrors: errors }));
    return Object.keys(errors).length === 0;
  }, []); // Remove all dependencies to avoid stale closures

  const getStepErrors = useCallback(
    (step: WizardStep): string[] => {
      const stepErrors: string[] = [];
      const errors = state.validationErrors;

      // Collect errors related to the specific step
      Object.keys(errors).forEach((key) => {
        if (
          key.startsWith(`step_${step}`) ||
          (step === WizardStep.BasicInfo &&
            [
              "title",
              "description",
              "expirationMonths",
              "targetEntityTypes",
            ].includes(key)) ||
          (step === WizardStep.Sections && key.startsWith("section_")) ||
          (step === WizardStep.Questions && key.startsWith("question_")) ||
          (step === WizardStep.Conditions && key.startsWith("condition_"))
        ) {
          stepErrors.push(...errors[key]);
        }
      });

      return stepErrors;
    },
    [state.validationErrors]
  );

  // Computed properties
  const steps = Object.values(WizardStep);
  const currentStepIndex = steps.indexOf(state.currentStep);
  const canGoNext = currentStepIndex < steps.length - 1;
  const canGoPrevious = currentStepIndex > 0;

  return {
    // State
    state,
    isLoading,
    currentTemplateId: state.templateData.id || templateId,

    // Navigation
    currentStep: state.currentStep,
    canGoNext,
    canGoPrevious,
    goToStep,
    nextStep,
    previousStep,

    // Data management
    updateTemplateData,
    addSection,
    updateSection,
    deleteSection,
    reorderSections,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    reorderQuestions,
    addCondition,
    updateCondition,
    deleteCondition,

    // Actions
    saveDraft,
    publishTemplate,
    validateTemplate,
    resetTemplate,

    // Validation
    validateCurrentStep,
    getStepErrors,
  };
};
