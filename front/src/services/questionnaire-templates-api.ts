import { httpClient } from "@/services/httpClient";
import {
  QuestionnaireTemplateResponse,
  SectionResponse,
  CreateTemplateRequest,
  CreateSectionRequest,
  SaveDraftRequest,
  TemplateStatus,
} from "../types/questionnaire-templates";

// L'URL base è già configurato da setAxiosDefaultBaseUrl in App.tsx

interface ApiError {
  message: string;
  details?: string[];
  statusCode: number;
}

class QuestionnaireTemplatesApi {
  private handleError(error: any): ApiError {
    if (error.response) {
      // Server responded with error status
      const data = error.response.data;
      return {
        message: data?.message || error.response.statusText || "Request failed",
        details:
          data?.details ||
          (data?.errors
            ? (Object.values(data.errors).flat() as string[])
            : undefined),
        statusCode: error.response.status,
      };
    } else if (error.request) {
      // Network error
      return {
        message: "Network error - please check your connection",
        statusCode: 0,
      };
    } else {
      // Other error
      return {
        message: error.message || "An unexpected error occurred",
        statusCode: 0,
      };
    }
  }

  // Create a new questionnaire template
  async createTemplate(
    data: CreateTemplateRequest
  ): Promise<QuestionnaireTemplateResponse> {
    try {
      return await httpClient.post<QuestionnaireTemplateResponse>(
        "/api/questionnairetemplates?api-version=2025-06-01",
        data
      );
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Get a questionnaire template by ID
  async getTemplate(id: string): Promise<QuestionnaireTemplateResponse> {
    try {
      return await httpClient.get<QuestionnaireTemplateResponse>(
        `/api/questionnairetemplates/${id}?api-version=2025-06-01`
      );
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Get all questionnaire templates with search, filtering, pagination and sorting
  async getTemplates(filters?: {
    searchTerm?: string;
    status?: TemplateStatus;
    language?: string;
    createdFrom?: string;
    createdTo?: string;
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortDirection?: "asc" | "desc";
  }): Promise<{
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
  }> {
    try {
      const params: any = {
        page: filters?.page || 1,
        pageSize: filters?.pageSize || 10,
        "api-version": "2025-06-01",
      };

      if (filters?.searchTerm) params.searchTerm = filters.searchTerm;
      if (filters?.status !== undefined) params.status = filters.status;
      if (filters?.language) params.language = filters.language;
      if (filters?.createdFrom) params.createdFrom = filters.createdFrom;
      if (filters?.createdTo) params.createdTo = filters.createdTo;
      if (filters?.sortBy) params.sortBy = filters.sortBy;
      if (filters?.sortDirection) params.sortDirection = filters.sortDirection;

      return await httpClient.get("/api/questionnairetemplates", { params });
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Update an existing questionnaire template
  async updateTemplate(
    id: string,
    data: Partial<CreateTemplateRequest>
  ): Promise<QuestionnaireTemplateResponse> {
    try {
      return await httpClient.put<QuestionnaireTemplateResponse>(
        `/api/questionnairetemplates/${id}?api-version=2025-06-01`,
        data
      );
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Delete a questionnaire template
  async deleteTemplate(id: string): Promise<void> {
    try {
      await httpClient.delete(
        `/api/questionnairetemplates/${id}?api-version=2025-06-01`
      );
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Save template as draft (auto-save functionality)
  async saveDraft(templateId: string, data: SaveDraftRequest): Promise<void> {
    try {
      await httpClient.put(
        `/api/questionnairetemplates/${templateId}/auto-save?api-version=2025-06-01`,
        data
      );
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Get draft template
  async getDraft(
    userId: string
  ): Promise<QuestionnaireTemplateResponse | null> {
    try {
      return await httpClient.get<QuestionnaireTemplateResponse>(
        `/api/questionnairetemplates/draft/${userId}?api-version=2025-06-01`
      );
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null; // No draft found
      }
      throw this.handleError(error);
    }
  }

  // Clear draft template
  async clearDraft(userId: string): Promise<void> {
    try {
      await httpClient.delete(
        `/api/questionnairetemplates/draft/${userId}?api-version=2025-06-01`
      );
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Create a new section in a template
  async addSection(
    templateId: string,
    data: CreateSectionRequest
  ): Promise<SectionResponse> {
    try {
      return await httpClient.post<SectionResponse>(
        `/api/questionnairetemplates/${templateId}/sections?api-version=2025-06-01`,
        data
      );
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Update a section
  async updateSection(
    templateId: string,
    sectionId: string,
    data: Partial<CreateSectionRequest>
  ): Promise<SectionResponse> {
    try {
      return await httpClient.put<SectionResponse>(
        `/api/questionnairetemplates/${templateId}/sections/${sectionId}?api-version=2025-06-01`,
        data
      );
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Delete a section
  async deleteSection(templateId: string, sectionId: string): Promise<void> {
    try {
      await httpClient.delete(
        `/api/questionnairetemplates/${templateId}/sections/${sectionId}?api-version=2025-06-01`
      );
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Publish template
  async publishTemplate(id: string): Promise<QuestionnaireTemplateResponse> {
    try {
      return await httpClient.post<QuestionnaireTemplateResponse>(
        `/api/questionnairetemplates/${id}/publish?api-version=2025-06-01`,
        {}
      );
    } catch (error: any) {
      // Add more specific error handling for publish endpoint
      if (error.response?.status === 404) {
        throw new Error(
          "Publish feature is not yet implemented. Please contact support for assistance."
        );
      }
      throw this.handleError(error);
    }
  }

  // Archive template
  async archiveTemplate(id: string): Promise<QuestionnaireTemplateResponse> {
    try {
      return await httpClient.post<QuestionnaireTemplateResponse>(
        `/api/questionnairetemplates/${id}/archive?api-version=2025-06-01`,
        {}
      );
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Clone template
  async cloneTemplate(
    id: string,
    newTitle: string
  ): Promise<QuestionnaireTemplateResponse> {
    try {
      return await httpClient.post<QuestionnaireTemplateResponse>(
        `/api/questionnairetemplates/${id}/clone?api-version=2025-06-01`,
        { title: newTitle }
      );
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Preview template
  async previewTemplate(id: string): Promise<QuestionnaireTemplateResponse> {
    try {
      return await httpClient.get<QuestionnaireTemplateResponse>(
        `/api/questionnairetemplates/${id}/preview?api-version=2025-06-01`
      );
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Validate template
  async validateTemplate(
    data: CreateTemplateRequest
  ): Promise<{ isValid: boolean; errors: string[] }> {
    try {
      return await httpClient.post<{ isValid: boolean; errors: string[] }>(
        "/api/questionnairetemplates/validate?api-version=2025-06-01",
        data
      );
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Export template
  async exportTemplate(
    id: string,
    format: "json" | "pdf" | "excel" = "json"
  ): Promise<Blob> {
    try {
      const params = new URLSearchParams();
      params.append("api-version", "2025-06-01");
      params.append("format", format);

      // Use raw axios instance for blob response
      const response = await httpClient
        .getInstance()
        .get(`/api/questionnairetemplates/${id}/export`, {
          params,
          responseType: "blob",
        });
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Import template
  async importTemplate(file: File): Promise<QuestionnaireTemplateResponse> {
    try {
      const formData = new FormData();
      formData.append("file", file);

      // Use raw axios instance for multipart/form-data
      const response = await httpClient
        .getInstance()
        .post(
          "/api/questionnairetemplates/import?api-version=2025-06-01",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Get template statistics
  async getTemplateStats(id: string): Promise<{
    totalResponses: number;
    completionRate: number;
    averageScore: number;
    lastUpdated: string;
  }> {
    try {
      return await httpClient.get<{
        totalResponses: number;
        completionRate: number;
        averageScore: number;
        lastUpdated: string;
      }>(`/api/questionnairetemplates/${id}/stats?api-version=2025-06-01`);
    } catch (error: any) {
      throw this.handleError(error);
    }
  }
}

// Export singleton instance
export const questionnaireTemplatesApi = new QuestionnaireTemplatesApi();

// Export types
export type { ApiError };
