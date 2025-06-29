import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  QuestionnaireTemplate,
  QuestionnaireSection,
  TemplateQuestion,
  QuestionCondition,
  QuestionType,
} from "@/types/questionnaire-templates";

interface QuestionnaireTemplateState {
  // Current template being edited
  template: QuestionnaireTemplate | null;
  sections: QuestionnaireSection[];
  questions: TemplateQuestion[];
  conditions: QuestionCondition[];

  // UI state
  isDirty: boolean;
  isSaving: boolean;
  errors: Record<string, string[]>;

  // Actions
  setTemplate: (template: QuestionnaireTemplate) => void;
  setSections: (sections: QuestionnaireSection[]) => void;
  setQuestions: (questions: TemplateQuestion[]) => void;
  setConditions: (conditions: QuestionCondition[]) => void;

  // Section actions
  addSection: (section: QuestionnaireSection) => void;
  updateSection: (id: string, updates: Partial<QuestionnaireSection>) => void;
  deleteSection: (id: string) => void;
  reorderSections: (sections: QuestionnaireSection[]) => void;

  // Question actions
  addQuestion: (question: TemplateQuestion) => void;
  updateQuestion: (id: string, updates: Partial<TemplateQuestion>) => void;
  deleteQuestion: (id: string) => void;
  reorderQuestions: (questions: TemplateQuestion[]) => void;

  // Condition actions
  addCondition: (condition: QuestionCondition) => void;
  updateCondition: (id: string, updates: Partial<QuestionCondition>) => void;
  deleteCondition: (id: string) => void;

  // Utility actions
  setIsDirty: (isDirty: boolean) => void;
  setIsSaving: (isSaving: boolean) => void;
  setErrors: (errors: Record<string, string[]>) => void;
  reset: () => void;
}

const initialState = {
  template: null,
  sections: [],
  questions: [],
  conditions: [],
  isDirty: false,
  isSaving: false,
  errors: {},
};

export const useQuestionnaireTemplateStore =
  create<QuestionnaireTemplateState>()(
    devtools(
      (set) => ({
        ...initialState,

        // Basic setters
        setTemplate: (template) => set({ template, isDirty: false }),
        setSections: (sections) => set({ sections }),
        setQuestions: (questions) => set({ questions }),
        setConditions: (conditions) => set({ conditions }),

        // Section actions
        addSection: (section) =>
          set((state) => ({
            sections: [...state.sections, section],
            isDirty: true,
          })),

        updateSection: (id, updates) =>
          set((state) => ({
            sections: state.sections.map((s) =>
              s.id === id ? { ...s, ...updates } : s
            ),
            isDirty: true,
          })),

        deleteSection: (id) =>
          set((state) => ({
            sections: state.sections.filter((s) => s.id !== id),
            questions: state.questions.filter((q) => q.sectionId !== id),
            isDirty: true,
          })),

        reorderSections: (sections) => set({ sections, isDirty: true }),

        // Question actions
        addQuestion: (question) =>
          set((state) => ({
            questions: [...state.questions, question],
            isDirty: true,
          })),

        updateQuestion: (id, updates) =>
          set((state) => ({
            questions: state.questions.map((q) =>
              q.id === id ? { ...q, ...updates } : q
            ),
            isDirty: true,
          })),

        deleteQuestion: (id) =>
          set((state) => ({
            questions: state.questions.filter((q) => q.id !== id),
            conditions: state.conditions.filter(
              (c) => c.sourceQuestionId !== id && c.targetQuestionId !== id
            ),
            isDirty: true,
          })),

        reorderQuestions: (questions) => set({ questions, isDirty: true }),

        // Condition actions
        addCondition: (condition) =>
          set((state) => ({
            conditions: [...state.conditions, condition],
            isDirty: true,
          })),

        updateCondition: (id, updates) =>
          set((state) => ({
            conditions: state.conditions.map((c) =>
              c.id === id ? { ...c, ...updates } : c
            ),
            isDirty: true,
          })),

        deleteCondition: (id) =>
          set((state) => ({
            conditions: state.conditions.filter((c) => c.id !== id),
            isDirty: true,
          })),

        // Utility actions
        setIsDirty: (isDirty) => set({ isDirty }),
        setIsSaving: (isSaving) => set({ isSaving }),
        setErrors: (errors) => set({ errors }),
        reset: () => set(initialState),
      }),
      {
        name: "questionnaire-template-store",
      }
    )
  );
