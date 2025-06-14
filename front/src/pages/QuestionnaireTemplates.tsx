import { Container, Grid, Text } from "@remira/unifiedui";

export const QuestionnaireTemplates = () => {
  return (
    <Container type="page">
      <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
        <Grid item xs={12}>
          <Text variant="h3">Gestione Template</Text>
          <Text variant="body1">Gestione template questionari</Text>
        </Grid>
      </Grid>
    </Container>
  );
};
