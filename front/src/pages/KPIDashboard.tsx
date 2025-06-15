import { Container, Grid } from "@remira/unifiedui";
import { PageHeader } from "../components/LayoutComponents";
import AnalyticsIcon from "@mui/icons-material/Analytics";

export const KPIDashboard = () => {
  return (
    <Container type="page">
      <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
        <Grid item xs={12}>
          <PageHeader
            title="Cruscotto KPI"
            subtitle="Dashboard KPI e metriche di performance"
            icon={<AnalyticsIcon color="primary" />}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
