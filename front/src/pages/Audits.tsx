import { Container, Grid, Text } from "@remira/unifiedui";

export const Audits = () => {
  return (
    <Container type="page">
      <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
        <Grid item xs={12}>
          <Text variant="h3">Audit & Ispezioni</Text>
          <Text variant="body1">
            Gestione audit e ispezioni fornitori
          </Text>
        </Grid>
      </Grid>
    </Container>
  );
};
