import { Container, Grid } from "@remira/unifiedui";
import { PageHeader } from "../components/LayoutComponents";
import LabelIcon from "@mui/icons-material/Label";

export const Taxonomies = () => {
  return (
    <Container type="page">
      <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
        <Grid item xs={12}>
          <PageHeader
            title="Tag & Tassonomie"
            subtitle="Gestione tag e tassonomie"
            icon={<LabelIcon color="primary" />}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
