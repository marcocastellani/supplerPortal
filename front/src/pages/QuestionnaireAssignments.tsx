import { Container, Grid } from "@remira/unifiedui";
import { PageHeader } from "../components/LayoutComponents";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

export const QuestionnaireAssignments = () => {
  return (
    <Container type="page">
      <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
        <Grid item xs={12}>
          <PageHeader
            title="Compilazioni"
            subtitle="Gestione compilazioni questionari"
            icon={<AssignmentTurnedInIcon color="primary" />}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
