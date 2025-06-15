import { Container, Grid } from "@remira/unifiedui";
import { PageHeader } from "../components/LayoutComponents";
import DescriptionIcon from "@mui/icons-material/Description";

export const Documents = () => {
  return (
    <Container type="page">
      <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
        <Grid item xs={12}>
          <PageHeader
            title="Documenti"
            subtitle="Gestione documenti fornitori"
            icon={<DescriptionIcon color="primary" />}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
