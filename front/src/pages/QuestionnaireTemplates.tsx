import { Container, Grid } from "@remira/unifiedui";
import { PageHeader } from "../components/LayoutComponents";
import ListAltIcon from "@mui/icons-material/ListAlt";

export const QuestionnaireTemplates = () => {
  return (
    <Container type="page">
      <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
        <Grid item xs={12}>
          <PageHeader
            title="Gestione Template"
            subtitle="Gestione template questionari"
            icon={<ListAltIcon color="primary" />}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
