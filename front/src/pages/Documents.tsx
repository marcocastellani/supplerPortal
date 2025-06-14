import { Container, Grid, Text } from "@remira/unifiedui";

export const Documents = () => {
  return (
    <Container type="page">
      <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
        <Grid item xs={12}>
          <Text variant="h3">Documenti</Text>
          <Text variant="body1">
            Gestione documenti fornitori
          </Text>
        </Grid>
      </Grid>
    </Container>
  );
};
