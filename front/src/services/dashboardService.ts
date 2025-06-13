import axios from 'axios';
import { GetUpcomingQuestionnairesResponse, DashboardFilters } from '../types/dashboard';

// L'URL base è già configurato da setAxiosDefaultBaseUrl in App.tsx
export const dashboardApi = {
  getUpcomingQuestionnaires: async (filters: DashboardFilters = {}): Promise<GetUpcomingQuestionnairesResponse> => {
    const params = new URLSearchParams();
    
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
