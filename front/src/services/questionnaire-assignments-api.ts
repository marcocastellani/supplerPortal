import axios from "axios";
import { log } from "../utils/logger";

// Types for assignments
export interface AssignQuestionnaireCommand {
  templateId: string;
  entityTypeFilter?: string[];
  entityIds?: string[];
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  assignedUserId?: string;
  assignedAgentId?: string;
  notes?: string;
  sendNotifications: boolean;
}

export interface AssignedEntity {
  entityId: string;
  entityName: string;
  entityType: string;
  location: string;
  questionnaireId: string;
}

export interface SkippedEntity {
  entityId: string;
  entityName: string;
  entityType: string;
  reason: string;
}

export interface AssignQuestionnaireResult {
  assignedCount: number;
  skippedCount: number;
  assignedQuestionnaireIds: string[];
  assignedEntities: AssignedEntity[];
  skippedEntities: SkippedEntity[];
}

export interface ActiveTemplateResponse {
  id: string;
  title: string;
  description: string;
  version: string;
  targetEntityTypes: string[];
  primaryLanguage: string;
  supportedLanguages: string[];
  questionCount: number;
  created: string;
  lastModified?: string;
}

/**
 * Service for questionnaire assignment operations
 */
export class QuestionnaireAssignmentsService {
  private static readonly API_VERSION = "2025-06-01";

  /**
   * Assign a questionnaire template to multiple entities
   */
  static async assignQuestionnaire(
    command: AssignQuestionnaireCommand
  ): Promise<AssignQuestionnaireResult> {
    try {
      log.info("Assigning questionnaire", { templateId: command.templateId });

      const response = await axios.post<AssignQuestionnaireResult>(
        "/api/questionnaire-assignments",
        command,
        {
          params: {
            "api-version": this.API_VERSION,
          },
        }
      );

      log.info("Assignment completed", {
        assigned: response.data.assignedCount,
        skipped: response.data.skippedCount,
      });

      return response.data;
    } catch (error) {
      log.error("Failed to assign questionnaire", { error: String(error) });
      throw error;
    }
  }

  /**
   * Get all active questionnaire templates (latest versions only)
   */
  static async getActiveTemplates(
    searchTerm?: string
  ): Promise<ActiveTemplateResponse[]> {
    try {
      log.info("Fetching active templates", { searchTerm });

      const params = new URLSearchParams({
        "api-version": this.API_VERSION,
      });

      if (searchTerm) {
        params.append("searchTerm", searchTerm);
      }

      const response = await axios.get<ActiveTemplateResponse[]>(
        "/api/questionnaire-assignments/templates/active",
        { params }
      );

      log.info("Active templates fetched", { count: response.data.length });

      return response.data;
    } catch (error) {
      log.error("Failed to fetch active templates", { error: String(error) });
      throw error;
    }
  }

  /**
   * Generate CSV content from assignment results
   */
  static generateAssignmentResultsCSV(result: AssignQuestionnaireResult): string {
    const csvLines: string[] = [];

    // Header
    csvLines.push("Assignment Results");
    csvLines.push(`Total Assigned: ${result.assignedCount}`);
    csvLines.push(`Total Skipped: ${result.skippedCount}`);
    csvLines.push("");

    // Assigned entities
    csvLines.push("ASSIGNED ENTITIES");
    csvLines.push("Entity ID,Entity Name,Entity Type,Location,Questionnaire ID");
    result.assignedEntities.forEach((entity) => {
      csvLines.push(
        `${entity.entityId},"${entity.entityName}",${entity.entityType},"${entity.location}",${entity.questionnaireId}`
      );
    });

    csvLines.push("");

    // Skipped entities
    csvLines.push("SKIPPED ENTITIES");
    csvLines.push("Entity ID,Entity Name,Entity Type,Reason");
    result.skippedEntities.forEach((entity) => {
      csvLines.push(
        `${entity.entityId},"${entity.entityName}",${entity.entityType},"${entity.reason}"`
      );
    });

    return csvLines.join("\n");
  }

  /**
   * Download CSV file with assignment results
   */
  static downloadAssignmentResultsCSV(
    result: AssignQuestionnaireResult,
    filename?: string
  ): void {
    const csv = this.generateAssignmentResultsCSV(result);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      filename || `assignment-results-${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}