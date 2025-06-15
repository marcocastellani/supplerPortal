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
      const response = await axios.post('/questionnaire-templates', data);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Get a questionnaire template by ID
  async getTemplate(id: string): Promise<QuestionnaireTemplateResponse> {
    try {
      const response = await axios.get(`/questionnaire-templates/${id}`);
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
      
      const response = await axios.get('/questionnaire-templates', { params });
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Update a questionnaire template
  async updateTemplate(
    id: string,
    data: Partial<CreateTemplateRequest>
  ): Promise<QuestionnaireTemplateResponse> {
    try {
      const response = await axios.put(`/questionnaire-templates/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Delete a questionnaire template
  async deleteTemplate(id: string): Promise<void> {
    try {
      await axios.delete(`/questionnaire-templates/${id}`);
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Save template as draft
  async saveDraft(data: SaveDraftRequest): Promise<QuestionnaireTemplateResponse> {
    try {
      const response = await axios.post('/questionnaire-templates/draft', data);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Get draft template
  async getDraft(userId: string): Promise<QuestionnaireTemplateResponse | null> {
    try {
      const response = await axios.get(`/questionnaire-templates/draft/${userId}`);
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
      await axios.delete(`/questionnaire-templates/draft/${userId}`);
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Add section to template
  async addSection(
    templateId: string,
    data: CreateSectionRequest
  ): Promise<SectionResponse> {
    try {
      const response = await axios.post(`/questionnaire-templates/${templateId}/sections`, data);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Update section
  async updateSection(
    templateId: string,
    sectionId: string,
    data: Partial<CreateSectionRequest>
  ): Promise<SectionResponse> {
    try {
      const response = await axios.put(`/questionnaire-templates/${templateId}/sections/${sectionId}`, data);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Delete section
  async deleteSection(templateId: string, sectionId: string): Promise<void> {
    try {
      await axios.delete(`/questionnaire-templates/${templateId}/sections/${sectionId}`);
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Publish template
  async publishTemplate(id: string): Promise<QuestionnaireTemplateResponse> {
    try {
      const response = await axios.post(`/questionnaire-templates/${id}/publish`);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Archive template
  async archiveTemplate(id: string): Promise<QuestionnaireTemplateResponse> {
    try {
      const response = await axios.post(`/questionnaire-templates/${id}/archive`);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Clone template
  async cloneTemplate(id: string, newTitle: string): Promise<QuestionnaireTemplateResponse> {
    try {
      const response = await axios.post(`/questionnaire-templates/${id}/clone`, { title: newTitle });
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Preview template
  async previewTemplate(id: string): Promise<QuestionnaireTemplateResponse> {
    try {
      const response = await axios.get(`/questionnaire-templates/${id}/preview`);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Validate template
  async validateTemplate(data: CreateTemplateRequest): Promise<{ isValid: boolean; errors: string[] }> {
    try {
      const response = await axios.post('/questionnaire-templates/validate', data);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Export template
  async exportTemplate(id: string, format: 'json' | 'pdf' | 'excel' = 'json'): Promise<Blob> {
    try {
      const response = await axios.get(`/questionnaire-templates/${id}/export`, {
        params: { format },
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
      
      const response = await axios.post('/questionnaire-templates/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
      const response = await axios.get(`/questionnaire-templates/${id}/stats`);
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
