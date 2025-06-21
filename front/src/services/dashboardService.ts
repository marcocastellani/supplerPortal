import axios from 'axios';
import { DashboardFilters, UpcomingQuestionnaireDto } from '../types/dashboard';
import { log } from '../utils/logger';

// L'URL base è già configurato da setAxiosDefaultBaseUrl in App.tsx
export const dashboardApi = {
  getUpcomingQuestionnaires: async (filters: DashboardFilters = {}): Promise<UpcomingQuestionnaireDto[]> => {
    const params = new URLSearchParams();
    
    // Aggiungo la versione API richiesta
    params.append('api-version', '2025-06-01');
    
    // Parametri per autorizzazione utente
    if (filters.userId) {
      params.append('userId', filters.userId);
    }
    
    if (filters.userRole) {
      params.append('userRole', filters.userRole);
    }
    
    if (filters.supplierId) {
      params.append('supplierId', filters.supplierId);
    }
    
    if (filters.status) {
      params.append('status', filters.status);
    }
    
    if (filters.weeksAhead !== undefined) {
      params.append('weeksAhead', filters.weeksAhead.toString());
    }

    log.api('GET', '/api/dashboard/questionnaires', { 
      service: 'dashboardApi',
      filters: Object.keys(filters).length > 0 ? filters : undefined
    });

    const response = await axios.get('/api/dashboard/questionnaires', {
      params
    });
    
    log.apiResponse('GET', '/api/dashboard/questionnaires', response.status, {
      service: 'dashboardApi',
      itemCount: response.data?.length || 0
    });
    
    return response.data;
  }
};

// Function that gets user context and calls API with proper authorization
export const getDashboardQuestionnaires = async (): Promise<UpcomingQuestionnaireDto[]> => {
  // TODO: Get user context from auth provider (Keycloak)
  // For now using default values - should be replaced with actual user context
  const filters: DashboardFilters = {
    userRole: 'User', // Default role, should come from auth context
    weeksAhead: 4
  };
  
  const result = await dashboardApi.getUpcomingQuestionnaires(filters);
  return result;
};
