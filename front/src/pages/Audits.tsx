import { Container, Grid } from "@remira/unifiedui";
import { PageHeader } from "../components/LayoutComponents";
import AssignmentIcon from "@mui/icons-material/Assignment";

export const Audits = () => {
  return (
    <Container type="page">
      <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
        <Grid item xs={12}>
          <PageHeader
            title="Audit & Ispezioni"
            subtitle="Gestione audit e ispezioni fornitori"
            icon={<AssignmentIcon color="primary" />}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
