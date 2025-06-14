import { Container, Grid, Text } from "@remira/unifiedui";

export const Roles = () => {
  return (
    <Container type="page">
      <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
        <Grid item xs={12}>
          <Text variant="h3">Ruoli & Permessi</Text>
          <Text variant="body1">
            Gestione ruoli e permessi utenti
          </Text>
        </Grid>
      </Grid>
    </Container>
  );
};
