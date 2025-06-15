import { Container, Grid } from "@remira/unifiedui";
import { PageHeader } from "../components/LayoutComponents";
import SecurityIcon from "@mui/icons-material/Security";

export const Roles = () => {
  return (
    <Container type="page">
      <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
        <Grid item xs={12}>
          <PageHeader
            title="Ruoli & Permessi"
            subtitle="Gestione ruoli e permessi utenti"
            icon={<SecurityIcon color="primary" />}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
