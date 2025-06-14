import axios from 'axios';
import { GetUpcomingQuestionnairesResponse, DashboardFilters, UpcomingQuestionnaireDto } from '../types/dashboard';

// L'URL base è già configurato da setAxiosDefaultBaseUrl in App.tsx
export const dashboardApi = {
  getUpcomingQuestionnaires: async (filters: DashboardFilters = {}): Promise<GetUpcomingQuestionnairesResponse> => {
    const params = new URLSearchParams();
    
    // Aggiungo la versione API richiesta
    params.append('api-version', '2024-10-01');
    
    if (filters.supplierId) {
      params.append('supplierId', filters.supplierId);
    }
    
    if (filters.status) {
      params.append('status', filters.status);
    }
    
    if (filters.weeksAhead !== undefined) {
      params.append('weeksAhead', filters.weeksAhead.toString());
    }

    const response = await axios.get('/api/dashboard/questionnaires', {
      params
    });

    return response.data;
  }
};

// Simplified function for the new component
export const getDashboardQuestionnaires = async (): Promise<UpcomingQuestionnaireDto[]> => {
  const result = await dashboardApi.getUpcomingQuestionnaires();
  return result.questionnaires;
};
