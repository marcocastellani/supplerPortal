import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../../services/dashboardService";
import {
  UpcomingQuestionnaireDto,
  DashboardFilters,
} from "../../types/dashboard";

interface DashboardQuestionnairesProps {
  className?: string;
}

const DashboardQuestionnaires: React.FC<DashboardQuestionnairesProps> = ({
  className,
}) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<DashboardFilters>({
    weeksAhead: 4,
  });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["upcomingQuestionnaires", filters],
    queryFn: () => dashboardApi.getUpcomingQuestionnaires(filters),
    refetchInterval: 5 * 60 * 1000, // Refresh every 5 minutes
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "text-red-600 bg-red-50";
      case "High":
        return "text-orange-600 bg-orange-50";
      case "Medium":
        return "text-yellow-600 bg-yellow-50";
      case "Low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NotStarted":
        return "text-gray-600 bg-gray-100";
      case "InProgress":
        return "text-blue-600 bg-blue-100";
      case "Completed":
        return "text-green-600 bg-green-100";
      case "Overdue":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const formatDueDate = (dueDate: string) => {
    return new Date(dueDate).toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getDaysToDeadlineText = (days: number) => {
    if (days < 0)
      return t("dashboardPage.questionnaires.overdue", {
        days: Math.abs(days),
      });
    if (days === 0) return t("dashboardPage.questionnaires.dueToday");
    if (days === 1) return t("dashboardPage.questionnaires.dueTomorrow");
    return t("dashboardPage.questionnaires.dueInDays", { days });
  };

  if (error) {
    return (
      <div
        className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}
      >
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              {t("dashboardPage.questionnaires.errorTitle")}
            </h3>
            <p className="mt-1 text-sm text-red-700">
              {t("dashboardPage.questionnaires.errorMessage")}
            </p>
          </div>
          <div className="ml-auto">
            <button
              onClick={() => refetch()}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              {t("common.retry")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}
    >
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {t("dashboardPage.questionnaires.title")}
            </h2>
            <p className="text-sm text-gray-600">
              {t("dashboardPage.questionnaires.subtitle")}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={filters.weeksAhead || 4}
              onChange={(e) =>
                setFilters({ ...filters, weeksAhead: parseInt(e.target.value) })
              }
              className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={1}>
                {t("dashboardPage.questionnaires.nextWeek")}
              </option>
              <option value={2}>
                {t("dashboardPage.questionnaires.next2Weeks")}
              </option>
              <option value={4}>
                {t("dashboardPage.questionnaires.next4Weeks")}
              </option>
              <option value={8}>
                {t("dashboardPage.questionnaires.next8Weeks")}
              </option>
            </select>
            <button
              onClick={() => refetch()}
              disabled={isLoading}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium disabled:opacity-50"
            >
              {isLoading ? t("common.loading") : t("common.refresh")}
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">{t("common.loading")}</span>
          </div>
        ) : data?.questionnaires?.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {t("dashboardPage.questionnaires.noData")}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {t("dashboardPage.questionnaires.noDataDescription")}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {data?.questionnaires?.map(
              (questionnaire: UpcomingQuestionnaireDto) => (
                <div
                  key={questionnaire.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-sm font-medium text-gray-900">
                          {questionnaire.title}
                        </h3>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                            questionnaire.priority
                          )}`}
                        >
                          {t(
                            `dashboardPage.questionnaires.priority.${questionnaire.priority.toLowerCase()}`
                          )}
                        </span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            questionnaire.status
                          )}`}
                        >
                          {t(
                            `dashboardPage.questionnaires.status.${questionnaire.status.toLowerCase()}`
                          )}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <span>
                          <strong>{questionnaire.supplierName}</strong> (
                          {questionnaire.supplierCode})
                        </span>
                        {questionnaire.assignedUserName && (
                          <span>
                            {t("dashboardPage.questionnaires.assignedTo")}:{" "}
                            {questionnaire.assignedUserName}
                          </span>
                        )}
                      </div>

                      {questionnaire.description && (
                        <p className="text-sm text-gray-600 mb-2">
                          {questionnaire.description}
                        </p>
                      )}
                    </div>

                    <div className="text-right ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {formatDueDate(questionnaire.dueDate)}
                      </div>
                      <div
                        className={`text-xs mt-1 ${
                          questionnaire.daysToDeadline < 0
                            ? "text-red-600"
                            : questionnaire.daysToDeadline <= 3
                            ? "text-orange-600"
                            : "text-gray-600"
                        }`}
                      >
                        {getDaysToDeadlineText(questionnaire.daysToDeadline)}
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {data?.totalCount && data.totalCount > 0 && (
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600">
            {t("dashboardPage.questionnaires.totalCount", {
              count: data.totalCount,
            })}
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardQuestionnaires;
