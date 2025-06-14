import React from "react";
import { useTranslation } from "react-i18next";
import { DashboardQuestionnaires } from "../components/Dashboard/DashboardQuestionnaires";
import { Container, Grid, Text } from "@remira/unifiedui";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container type="page">
      <Grid item xs={12}>
        <Text variant="h3">
          {t(
            "dashboard.subtitle",
            "Monitor your supplier questionnaires and compliance status"
          )}
        </Text>
      </Grid>

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
