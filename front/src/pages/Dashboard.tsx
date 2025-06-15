import React from "react";
import { useTranslation } from "react-i18next";
import { DashboardQuestionnaires } from "../components/Dashboard/DashboardQuestionnaires";
import { Container, Grid } from "@remira/unifiedui";
import { PageHeader } from "../components/LayoutComponents";
import DashboardIcon from "@mui/icons-material/Dashboard";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container type="page">
      <PageHeader
        title={t("dashboard.title", "Dashboard")}
        subtitle={t(
          "dashboard.subtitle",
          "Monitor your supplier questionnaires and compliance status"
        )}
        icon={<DashboardIcon color="primary" />}
      />

      <Grid item xs={12}>
        <DashboardQuestionnaires />
      </Grid>
      {/* Placeholder per futuri widget della dashboard */}
      <Grid item xs={12}>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Altri Widget Dashboard
          </h2>
          <p className="text-gray-600">
            Qui verranno aggiunti altri componenti della dashboard come
            statistiche, grafici di compliance, notifiche, ecc.
          </p>
        </div>
      </Grid>
    </Container>
  );
};

export default Dashboard;
