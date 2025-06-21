import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Container, Text, Loader, Card } from "@remira/unifiedui";
import { DashboardFilters } from "./DashboardFilters";
import { QuestionnaireGrid } from "./QuestionnaireGrid";
import { getDashboardQuestionnaires } from "../../services/dashboardService";
import { UpcomingQuestionnaireDto } from "../../types/dashboard";
import { log } from "@/utils/logger";

export interface DashboardQuestionnairesProps {
  className?: string;
}

export const DashboardQuestionnaires: React.FC<
  DashboardQuestionnairesProps
> = ({ className }) => {
  const { t } = useTranslation();
  const [questionnaires, setQuestionnaires] = useState<
    UpcomingQuestionnaireDto[]
  >([]);
  const [filteredQuestionnaires, setFilteredQuestionnaires] = useState<
    UpcomingQuestionnaireDto[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data
  useEffect(() => {
    const fetchQuestionnaires = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getDashboardQuestionnaires();
        log.info("Fetched questionnaires:", {
          component: "DashboardQuestionnaires",
          data,
        });
        setQuestionnaires(data);
        setFilteredQuestionnaires(data);
      } catch (err) {
        log.error("Error fetching questionnaires:", {
          component: "DashboardQuestionnaires",
          error: err,
        });
        // Edge case: Connection problems
        if (axios.isAxiosError(err)) {
          if (err.code === "ECONNABORTED" || err.code === "ERR_NETWORK") {
            setError(t("dashboardData.error.network"));
          } else if (err.response?.status === 401) {
            setError(t("dashboardData.error.unauthorized"));
          } else if (err.response?.status === 403) {
            setError(t("dashboardData.error.forbidden"));
          } else {
            setError(t("dashboardData.error.fetch"));
          }
        } else {
          setError(t("dashboardData.error.generic"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionnaires();
  }, [t]);

  // Handle filters
  const handleFiltersChange = (filters: {
    status?: string;
    priority?: string;
    supplier?: string;
    search?: string;
  }) => {
    let filtered = [...questionnaires];

    // Filter by status
    if (filters.status && filters.status !== "all") {
      filtered = filtered.filter((q) => q.status === filters.status);
    }

    // Filter by priority
    if (filters.priority && filters.priority !== "all") {
      filtered = filtered.filter((q) => q.priority === filters.priority);
    }

    // Filter by supplier
    if (filters.supplier && filters.supplier !== "all") {
      filtered = filtered.filter((q) => q.supplierName === filters.supplier);
    }

    // Filter by search text
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (q) =>
          q.title.toLowerCase().includes(searchLower) ||
          q.supplierName.toLowerCase().includes(searchLower)
      );
    }

    setFilteredQuestionnaires(filtered);
  };

  // Get unique suppliers for filter
  const uniqueSuppliers = Array.from(
    new Set(questionnaires.map((q) => q.supplierName))
  ).sort();

  if (loading) {
    return (
      <Container type="page" className={className}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <Loader />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container type="page" className={className}>
        <Card
          style={{
            marginTop: "16px",
            backgroundColor: "#ffebee",
            border: "1px solid #f44336",
          }}
        >
          <Text style={{ color: "#d32f2f" }}>{error}</Text>
        </Card>
      </Container>
    );
  }

  return (
    <div style={{ padding: "24px 0" }}>
      {/* Filters */}
      <div style={{ marginBottom: "24px" }}>
        <DashboardFilters
          suppliers={uniqueSuppliers}
          onFiltersChange={handleFiltersChange}
        />
      </div>

      {/* Results count */}
      <div style={{ marginBottom: "16px" }}>
        <Text variant="body2" color="secondary">
          {t("dashboardData.results", {
            count: filteredQuestionnaires.length,
            total: questionnaires.length,
          })}
        </Text>
      </div>

      {/* Questionnaires Grid */}
      {filteredQuestionnaires.length > 0 ? (
        <QuestionnaireGrid questionnaires={filteredQuestionnaires} />
      ) : questionnaires.length === 0 ? (
        // Edge case: User with no assigned suppliers
        <div
          style={{
            textAlign: "center",
            padding: "64px 0",
            color: "#666",
          }}
        >
          <Text variant="h6" style={{ marginBottom: "8px" }}>
            {t("dashboardData.noSuppliers.title")}
          </Text>
          <Text variant="body2">{t("dashboardData.noSuppliers.subtitle")}</Text>
        </div>
      ) : (
        // No results after filtering
        <div
          style={{
            textAlign: "center",
            padding: "64px 0",
            color: "#666",
          }}
        >
          <Text variant="h6" style={{ marginBottom: "8px" }}>
            {t("dashboardData.noData.title")}
          </Text>
          <Text variant="body2">{t("dashboardData.noData.subtitle")}</Text>
        </div>
      )}
    </div>
  );
};

export default DashboardQuestionnaires;
