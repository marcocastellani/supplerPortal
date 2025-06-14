import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  Container,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { DashboardFilters } from "./DashboardFilters";
import { QuestionnaireGrid } from "./QuestionnaireGrid";
import { getDashboardQuestionnaires } from "../../services/dashboardService";
import { UpcomingQuestionnaireDto } from "../../types/dashboard";

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
        console.log("Fetched questionnaires:", data);
        setQuestionnaires(data);
        setFilteredQuestionnaires(data);
      } catch (err) {
        console.error("Error fetching questionnaires:", err);
        setError(t("dashboard.error.fetch"));
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
      <Container className={className}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className={className}>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 3 }}>
      {/* Filters */}
      <Box sx={{ mb: 3 }}>
        <DashboardFilters
          suppliers={uniqueSuppliers}
          onFiltersChange={handleFiltersChange}
        />
      </Box>

      {/* Results count */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {t("dashboard.results", {
            count: filteredQuestionnaires.length,
            total: questionnaires.length,
          })}
        </Typography>
      </Box>

      {/* Questionnaires Grid */}
      {filteredQuestionnaires.length > 0 ? (
        <QuestionnaireGrid questionnaires={filteredQuestionnaires} />
      ) : (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            color: "text.secondary",
          }}
        >
          <Typography variant="h6" gutterBottom>
            {t("dashboard.noData.title")}
          </Typography>
          <Typography variant="body2">
            {t("dashboard.noData.subtitle")}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default DashboardQuestionnaires;
