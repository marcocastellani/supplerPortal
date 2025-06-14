import { Container, Grid, Text } from "@remira/unifiedui";

export const Taxonomies = () => {
  return (
    <Container type="page">
      <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
        <Grid item xs={12}>
          <Text variant="h3">Tag & Tassonomie</Text>
          <Text variant="body1">
            Gestione tag e tassonomie
          </Text>
        </Grid>
      </Grid>
    </Container>
  );
};
