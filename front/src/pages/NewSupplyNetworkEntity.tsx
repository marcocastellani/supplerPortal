import { Container, Grid, Text } from "@remira/unifiedui";

export const NewSupplyNetworkEntity = () => {
  return (
    <Container type="page">
      <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
        <Grid item xs={12}>
          <Text variant="h3">Nuova entità</Text>
          <Text variant="body1">
            Inserisci un nuovo fornitore o subfornitore
          </Text>
        </Grid>
      </Grid>
    </Container>
  );
};
