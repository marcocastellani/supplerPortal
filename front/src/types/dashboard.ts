export interface UpcomingQuestionnaireDto {
  id: string;
  title: string;
  type: string;
  status: string;
  priority: string;
  dueDate: string;
  supplierName: string;
  supplierCode: string;
  daysToDeadline: number;
  isOverdue: boolean;
}

export interface GetUpcomingQuestionnairesResponse {
  questionnaires: UpcomingQuestionnaireDto[];
  totalCount: number;
}

export interface DashboardFilters {
  userId?: string;
  userRole?: string;
  supplierId?: string;
  status?: string;
  weeksAhead?: number;
}
