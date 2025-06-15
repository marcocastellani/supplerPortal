import { Container, Grid } from "@remira/unifiedui";
import { PageHeader } from "../components/LayoutComponents";
import TuneIcon from "@mui/icons-material/Tune";

export const KPIThresholds = () => {
  return (
    <Container type="page">
      <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
        <Grid item xs={12}>
          <PageHeader
            title="Gestione soglie"
            subtitle="Configurazione soglie KPI"
            icon={<TuneIcon color="primary" />}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
