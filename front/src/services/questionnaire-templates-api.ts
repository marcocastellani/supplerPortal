import axios from 'axios';
import {
  QuestionnaireTemplateResponse,
  SectionResponse,
  CreateTemplateRequest,
  CreateSectionRequest,
  SaveDraftRequest,
  TemplateStatus
} from '../types/questionnaire-templates';

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
        message: data?.message || error.response.statusText || 'Request failed',
        details: data?.details || (data?.errors ? Object.values(data.errors).flat() as string[] : undefined),
        statusCode: error.response.status,
      };
    } else if (error.request) {
      // Network error
      return {
        message: 'Network error - please check your connection',
        statusCode: 0,
      };
    } else {
      // Other error
      return {
        message: error.message || 'An unexpected error occurred',
        statusCode: 0,
      };
    }
  }

  // Create a new questionnaire template
  async createTemplate(data: CreateTemplateRequest): Promise<QuestionnaireTemplateResponse> {
    try {
      const params = new URLSearchParams();
      params.append('api-version', '2025-06-01');
      
      const response = await axios.post('/api/questionnairetemplates', data, { params });
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Get a questionnaire template by ID
  async getTemplate(id: string): Promise<QuestionnaireTemplateResponse> {
    try {
      const params = new URLSearchParams();
      params.append('api-version', '2025-06-01');
      
      const response = await axios.get(`/api/questionnairetemplates/${id}`, { params });
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Get all questionnaire templates
  async getTemplates(
    status?: TemplateStatus,
    page: number = 1,
    pageSize: number = 10
  ): Promise<{
    data: QuestionnaireTemplateResponse[];
    total: number;
    page: number;
    pageSize: number;
  }> {
    try {
      const params: any = { page, pageSize };
      if (status) params.status = status;
      params['api-version'] = '2025-06-01';
      
      const response = await axios.get('/api/questionnairetemplates', { params });
      return response.data;
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
      const params = new URLSearchParams();
      params.append('api-version', '2025-06-01');
      
      const response = await axios.put(`/api/questionnairetemplates/${id}`, data, { params });
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Delete a questionnaire template
  async deleteTemplate(id: string): Promise<void> {
    try {
      const params = new URLSearchParams();
      params.append('api-version', '2025-06-01');
      
      await axios.delete(`/api/questionnairetemplates/${id}`, { params });
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Save template as draft
  async saveDraft(data: SaveDraftRequest): Promise<QuestionnaireTemplateResponse> {
    try {
      const params = new URLSearchParams();
      params.append('api-version', '2025-06-01');
      
      const response = await axios.post('/api/questionnairetemplates/draft', data, { params });
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Get draft template
  async getDraft(userId: string): Promise<QuestionnaireTemplateResponse | null> {
    try {
      const params = new URLSearchParams();
      params.append('api-version', '2025-06-01');
      
      const response = await axios.get(`/api/questionnairetemplates/draft/${userId}`, { params });
      return response.data;
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
      const params = new URLSearchParams();
      params.append('api-version', '2025-06-01');
      
      await axios.delete(`/api/questionnairetemplates/draft/${userId}`, { params });
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
      const params = new URLSearchParams();
      params.append('api-version', '2025-06-01');
      
      const response = await axios.post(`/api/questionnairetemplates/${templateId}/sections`, data, { params });
      return response.data;
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
      const params = new URLSearchParams();
      params.append('api-version', '2025-06-01');
      
      const response = await axios.put(`/api/questionnairetemplates/${templateId}/sections/${sectionId}`, data, { params });
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Delete a section
  async deleteSection(templateId: string, sectionId: string): Promise<void> {
    try {
      const params = new URLSearchParams();
      params.append('api-version', '2025-06-01');
      
      await axios.delete(`/api/questionnairetemplates/${templateId}/sections/${sectionId}`, { params });
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Publish template
  async publishTemplate(id: string): Promise<QuestionnaireTemplateResponse> {
    try {
      const params = new URLSearchParams();
      params.append('api-version', '2025-06-01');
      
      const response = await axios.post(`/api/questionnairetemplates/${id}/publish`, {}, { params });
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Archive template
  async archiveTemplate(id: string): Promise<QuestionnaireTemplateResponse> {
    try {
      const params = new URLSearchParams();
      params.append('api-version', '2025-06-01');
      
      const response = await axios.post(`/api/questionnairetemplates/${id}/archive`, {}, { params });
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Clone template
  async cloneTemplate(id: string, newTitle: string): Promise<QuestionnaireTemplateResponse> {
    try {
      const params = new URLSearchParams();
      params.append('api-version', '2025-06-01');
      
      const response = await axios.post(`/api/questionnairetemplates/${id}/clone`, { title: newTitle }, { params });
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Preview template
  async previewTemplate(id: string): Promise<QuestionnaireTemplateResponse> {
    try {
      const params = new URLSearchParams();
      params.append('api-version', '2025-06-01');
      
      const response = await axios.get(`/api/questionnairetemplates/${id}/preview`, { params });
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Validate template
  async validateTemplate(data: CreateTemplateRequest): Promise<{ isValid: boolean; errors: string[] }> {
    try {
      const params = new URLSearchParams();
      params.append('api-version', '2025-06-01');
      
      const response = await axios.post('/api/questionnairetemplates/validate', data, { params });
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Export template
  async exportTemplate(id: string, format: 'json' | 'pdf' | 'excel' = 'json'): Promise<Blob> {
    try {
      const params = new URLSearchParams();
      params.append('api-version', '2025-06-01');
      params.append('format', format);
      
      const response = await axios.get(`/api/questionnairetemplates/${id}/export`, {
        params,
        responseType: 'blob'
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
      formData.append('file', file);
      
      const params = new URLSearchParams();
      params.append('api-version', '2025-06-01');
      
      const response = await axios.post('/api/questionnairetemplates/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params
      });
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
      const params = new URLSearchParams();
      params.append('api-version', '2025-06-01');
      
      const response = await axios.get(`/api/questionnairetemplates/${id}/stats`, { params });
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }
}

// Export singleton instance
export const questionnaireTemplatesApi = new QuestionnaireTemplatesApi();

// Export types
export type { ApiError };
