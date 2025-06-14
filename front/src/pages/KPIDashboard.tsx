import { Container, Grid, Text } from "@remira/unifiedui";

export const KPIDashboard = () => {
  return (
    <Container type="page">
      <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
        <Grid item xs={12}>
          <Text variant="h3">Cruscotto KPI</Text>
          <Text variant="body1">
            Dashboard KPI e metriche di performance
          </Text>
        </Grid>
      </Grid>
    </Container>
  );
};
