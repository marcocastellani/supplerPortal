import { Container, Grid, Table, Text } from "@remira/unifiedui";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

const sampleData: Array<any> = [
  {
    id: 1,
    name: "John Doe",
    dob: "23-12-1990",
    status: "Married",
  },
  {
    id: 2,
    name: "Mariah Carey",
    dob: "03-10-1980",
    status: "Married",
  },
];

const getColumns = (t: TFunction<"translation", undefined>) => [
  {
    field: "name",
    headerName: t("name"),
  },
  {
    field: "dob",
    headerName: t("dob"),
  },
  {
    field: "status",
    headerName: t("status"),
  },
];

export const TableExample = () => {
  const { t, i18n } = useTranslation();

  return (
    <Container type="page">
      <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
        <Grid item xs={12}>
          <Text variant="h3">{t("tableExample")}</Text>
          <Grid item xs={12}>
            <Table
              key={i18n.language}
              columns={getColumns(t)}
              rows={sampleData}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
