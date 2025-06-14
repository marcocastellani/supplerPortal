import { Container, Grid, Text } from "@remira/unifiedui";

export const KPIThresholds = () => {
  return (
    <Container type="page">
      <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
        <Grid item xs={12}>
          <Text variant="h3">Gestione soglie</Text>
          <Text variant="body1">Configurazione soglie KPI</Text>
        </Grid>
      </Grid>
    </Container>
  );
};
