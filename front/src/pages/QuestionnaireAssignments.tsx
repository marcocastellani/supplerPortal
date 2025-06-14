import { Container, Grid, Text } from "@remira/unifiedui";

export const QuestionnaireAssignments = () => {
  return (
    <Container type="page">
      <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
        <Grid item xs={12}>
          <Text variant="h3">Compilazioni</Text>
          <Text variant="body1">Gestione compilazioni questionari</Text>
        </Grid>
      </Grid>
    </Container>
  );
};
