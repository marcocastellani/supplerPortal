export interface UpcomingQuestionnaireDto {
  id: string;
  title: string;
  description?: string;
  supplierName: string;
  supplierCode: string;
  dueDate: string;
  daysToDeadline: number;
  status: 'NotStarted' | 'InProgress' | 'Completed' | 'Overdue';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  assignedUserName?: string;
  assignedAgentName?: string;
}

export interface GetUpcomingQuestionnairesResponse {
  questionnaires: UpcomingQuestionnaireDto[];
  totalCount: number;
}

export interface DashboardFilters {
  supplierId?: string;
  status?: string;
  weeksAhead?: number;
}
