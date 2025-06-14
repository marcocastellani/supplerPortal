import { Container, Grid, Text } from "@remira/unifiedui";

export const SupplyNetwork = () => {
  return (
    <Container type="page">
      <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
        <Grid item xs={12}>
          <Text variant="h3">Entità Supply Network</Text>
          <Text variant="body1">
            Gestione fornitori, subfornitori, sedi e referenti
          </Text>
        </Grid>
      </Grid>
    </Container>
  );
};
