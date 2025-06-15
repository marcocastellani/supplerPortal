import useHasPermission from "@/hooks/useHasPermission";
import { Container, Grid } from "@remira/unifiedui";
import { PageHeader } from "../components/LayoutComponents";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { t } from "i18next";

export const RBACExample = () => {
  const rbac = useHasPermission(["admin", "owner", "user", "whatever"]);
  console.log(rbac);
  return (
    <Container type="page">
      <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
        <Grid item xs={12}>
          <PageHeader
            title={t("rbacExample")}
            subtitle="Role-Based Access Control demonstration"
            icon={<AdminPanelSettingsIcon color="primary" />}
          />
          <ul>
            {Object.entries(rbac.permissions).map(([key, value]) => (
              <li
                key={key + value}
              >{`The permission ${key} is set to ${value}`}</li>
            ))}
          </ul>
        </Grid>
      </Grid>
    </Container>
  );
};
