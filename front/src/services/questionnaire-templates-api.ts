import {
  QuestionnaireTemplateResponse,
  SectionResponse,
  CreateTemplateRequest,
  CreateSectionRequest,
  SaveDraftRequest,
  TemplateStatus
} from '../types/questionnaire-templates';

// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

interface ApiError {
  message: string;
  details?: string[];
  statusCode: number;
}

class QuestionnaireTemplatesApi {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const error: ApiError = {
          message: `HTTP Error ${response.status}: ${response.statusText}`,
          statusCode: response.status,
        };

        try {
          const errorData = await response.json();
          error.message = errorData.message || error.message;
          error.details = errorData.details || errorData.errors;
        } catch {
          // If error response is not JSON, keep default message
        }

        throw error;
      }

      // Handle empty responses (204 No Content)
      if (response.status === 204) {
        return {} as T;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error && 'statusCode' in error) {
        throw error; // Re-throw ApiError
      }
      
      throw {
        message: 'Network error or unexpected response',
        details: [error instanceof Error ? error.message : 'Unknown error'],
        statusCode: 0,
      } as ApiError;
    }
  }

  // Template CRUD operations
  async createTemplate(
    request: CreateTemplateRequest
  ): Promise<QuestionnaireTemplateResponse> {
    return this.request<QuestionnaireTemplateResponse>('/questionnaire-templates', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async getTemplate(id: string): Promise<QuestionnaireTemplateResponse> {
    return this.request<QuestionnaireTemplateResponse>(`/questionnaire-templates/${id}`);
  }

  async getDraftTemplate(id: string): Promise<QuestionnaireTemplateResponse> {
    return this.request<QuestionnaireTemplateResponse>(`/questionnaire-templates/${id}/draft`);
  }

  async saveDraft(request: SaveDraftRequest): Promise<void> {
    return this.request<void>('/questionnaire-templates/save-draft', {
      method: 'PUT',
      body: JSON.stringify(request),
    });
  }

  async publishTemplate(id: string): Promise<QuestionnaireTemplateResponse> {
    return this.request<QuestionnaireTemplateResponse>(`/questionnaire-templates/${id}/publish`, {
      method: 'POST',
    });
  }

  async archiveTemplate(id: string): Promise<void> {
    return this.request<void>(`/questionnaire-templates/${id}/archive`, {
      method: 'POST',
    });
  }

  async duplicateTemplate(id: string, newTitle: string): Promise<QuestionnaireTemplateResponse> {
    return this.request<QuestionnaireTemplateResponse>(`/questionnaire-templates/${id}/duplicate`, {
      method: 'POST',
      body: JSON.stringify({ title: newTitle }),
    });
  }

  // Section operations
  async createSection(
    templateId: string,
    request: CreateSectionRequest
  ): Promise<SectionResponse> {
    return this.request<SectionResponse>(`/questionnaire-templates/${templateId}/sections`, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async updateSection(
    templateId: string,
    sectionId: string,
    request: Partial<CreateSectionRequest>
  ): Promise<SectionResponse> {
    return this.request<SectionResponse>(`/questionnaire-templates/${templateId}/sections/${sectionId}`, {
      method: 'PUT',
      body: JSON.stringify(request),
    });
  }

  async deleteSection(templateId: string, sectionId: string): Promise<void> {
    return this.request<void>(`/questionnaire-templates/${templateId}/sections/${sectionId}`, {
      method: 'DELETE',
    });
  }

  async reorderSections(
    templateId: string,
    sectionIds: string[]
  ): Promise<void> {
    return this.request<void>(`/questionnaire-templates/${templateId}/sections/reorder`, {
      method: 'POST',
      body: JSON.stringify({ sectionIds }),
    });
  }

  // List operations
  async getTemplates(
    page: number = 1,
    pageSize: number = 20,
    status?: TemplateStatus,
    search?: string
  ): Promise<{
    items: QuestionnaireTemplateResponse[];
    totalCount: number;
    pageCount: number;
  }> {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    if (status !== undefined) {
      params.append('status', status.toString());
    }

    if (search) {
      params.append('search', search);
    }

    return this.request<{
      items: QuestionnaireTemplateResponse[];
      totalCount: number;
      pageCount: number;
    }>(`/questionnaire-templates?${params.toString()}`);
  }

  // Validation operations
  async validateTemplate(id: string): Promise<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
  }> {
    return this.request<{
      isValid: boolean;
      errors: string[];
      warnings: string[];
    }>(`/questionnaire-templates/${id}/validate`);
  }

  // Export/Import operations
  async exportTemplate(id: string, format: 'json' | 'excel'): Promise<Blob> {
    const response = await fetch(`${API_BASE_URL}/questionnaire-templates/${id}/export?format=${format}`, {
      method: 'GET',
      headers: {
        'Accept': format === 'json' ? 'application/json' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
    });

    if (!response.ok) {
      throw new Error(`Export failed: ${response.statusText}`);
    }

    return response.blob();
  }

  async importTemplate(file: File): Promise<QuestionnaireTemplateResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return this.request<QuestionnaireTemplateResponse>('/questionnaire-templates/import', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  }
}

// Create singleton instance
export const questionnaireTemplatesApi = new QuestionnaireTemplatesApi();

// Export error type for use in components
export type { ApiError };
