import { Container, Grid, RoutingTabs, Table, Text } from "@remira/unifiedui";
import { TFunction } from "i18next";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { appMenu } from "../configs/menu";
import Dashboard from "./Dashboard";
import { RBACExample } from "./RBACExample";
import { RegionalSettingsExample } from "./RegionalSettingsExample";
import { NewSupplyNetworkEntity } from "./NewSupplyNetworkEntity";
import { QuestionnaireTemplates } from "./QuestionnaireTemplates";
import { TemplateWizard } from "../components/questionnaire-templates/TemplateWizard";
import { QuestionnaireAssignments } from "./QuestionnaireAssignments";
import { KPIDashboard } from "./KPIDashboard";
import { KPIThresholds } from "./KPIThresholds";
import { Audits } from "./Audits";
import { Documents } from "./Documents";
import { Taxonomies } from "./Taxonomies";
import { Roles } from "./Roles";
import EntityDetailPage from "./EntityDetailPage";
import { SupplyNetwork } from "./SupplyNetwork";

interface TabDefinition {
  title: string;
  value: number;
  path: string;
  component: React.ComponentType;
  call?: () => void;
}

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

export const Home = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState<number>(0);

  // Mappa path -> componente
  const componentMap: Record<string, React.ComponentType> = {
    "/dashboard": Dashboard,
    "/supply-network": SupplyNetwork,
    "/supply-network/new": NewSupplyNetworkEntity,
    "/questionnaires/templates": QuestionnaireTemplates,
    "/questionnaires/templates/new": TemplateWizard,
    "/questionnaires/assignments": QuestionnaireAssignments,
    "/kpi/dashboard": KPIDashboard,
    "/kpi/thresholds": KPIThresholds,
    "/audits": Audits,
    "/documents": Documents,
    "/settings/taxonomies": Taxonomies,
    "/settings/roles": Roles,
  };

  // Flatten del menu per creare tabs
  const flattenedTabs = useMemo(() => {
    const tabs: TabDefinition[] = [];

    let index = 0;

    appMenu.forEach((menuItem) => {
      if (menuItem.children) {
        // Se ha children, aggiungi ogni child come tab
        menuItem.children.forEach((child) => {
          const Component = componentMap[child.path];
          if (Component) {
            tabs.push({
              title: child.label,
              value: index++,
              path: child.path,
              component: Component,
              call: () => navigate(child.path),
            });
          }
        });
      } else if (menuItem.path) {
        // Se è un elemento semplice con path
        const Component = componentMap[menuItem.path];
        if (Component) {
          tabs.push({
            title: menuItem.label,
            value: index++,
            path: menuItem.path,
            component: Component,
            call: () => navigate(menuItem.path),
          });
        }
      }
    });

    // Aggiungi i tabs degli esempi esistenti
    tabs.push(
      {
        title: t("tableExample"),
        value: index++,
        path: "/table-example",
        component: () => (
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
        ),
      },
      {
        title: t("rbacExample"),
        value: index++,
        path: "/rbac-example",
        component: RBACExample,
      },
      {
        title: t("regionalSettingsExample"),
        value: index++,
        path: "/regional-settings-example",
        component: RegionalSettingsExample,
      }
    );

    return tabs;
  }, [t, i18n.language, navigate]);

  // Verifica se siamo su una pagina di dettaglio entità
  const isEntityDetailPage = location.pathname.match(
    /^\/supply-network\/entity\/(.+)$/
  );

  // Se siamo su dettaglio entità, ritorna il componente direttamente con il menu
  if (isEntityDetailPage) {
    // Trova il tab della supply network per mantenerlo selezionato
    const supplyNetworkTabIndex = flattenedTabs.findIndex(
      (tab) => tab.path === "/supply-network"
    );

    return (
      <Container type="page" maxWidth={false}>
        <RoutingTabs
          tabs={flattenedTabs.map((tab) => ({
            title: tab.title,
            value: tab.value,
            call: tab.call,
          }))}
          selectedTab={
            supplyNetworkTabIndex >= 0 ? supplyNetworkTabIndex : selectedTab
          }
          setSelectedTab={setSelectedTab}
        />
        <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
          <EntityDetailPage />
        </Grid>
      </Container>
    );
  }

  // Trova il componente corrente da renderizzare per le altre pagine
  const currentTab = flattenedTabs.find((tab) => tab.value === selectedTab);
  const CurrentComponent = currentTab?.component;

  return (
    <Container type="page" maxWidth={false}>
      <RoutingTabs
        tabs={flattenedTabs.map((tab) => ({
          title: tab.title,
          value: tab.value,
          call: tab.call,
        }))}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
        {CurrentComponent && <CurrentComponent />}
      </Grid>
    </Container>
  );
};
