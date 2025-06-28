import { Container, Grid, RoutingTabs } from "@remira/unifiedui";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { appMenu } from "../configs/menu";

interface TabDefinition {
  title: string;
  value: number;
  path: string;
  call?: () => void;
}

export const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // Flatten del menu per creare tabs
  const flattenedTabs = useMemo(() => {
    const tabs: TabDefinition[] = [];
    let index = 0;

    appMenu.forEach((menuItem) => {
      if (menuItem.children) {
        // Se ha children, aggiungi ogni child come tab
        menuItem.children.forEach((child) => {
          tabs.push({
            title: child.label,
            value: index++,
            path: child.path,
            call: () => navigate(child.path),
          });
        });
      } else if (menuItem.path) {
        // Se è un elemento semplice con path
        tabs.push({
          title: menuItem.label,
          value: index++,
          path: menuItem.path,
          call: () => navigate(menuItem.path),
        });
      }
    });

    // Aggiungi i tabs degli esempi esistenti
    tabs.push(
      {
        title: t("tableExample"),
        value: index++,
        path: "/table-example",
        call: () => navigate("/table-example"),
      },
      {
        title: t("rbacExample"),
        value: index++,
        path: "/rbac-example",
        call: () => navigate("/rbac-example"),
      },
      {
        title: t("regionalSettingsExample"),
        value: index++,
        path: "/regional-settings-example",
        call: () => navigate("/regional-settings-example"),
      }
    );

    return tabs;
  }, [t, navigate]);

  // Calcola il tab attivo basato sull'URL corrente
  const activeTab = useMemo(() => {
    const currentPath = location.pathname;

    // Gestione speciale per le pagine di dettaglio entità
    if (currentPath.match(/^\/supply-network\/entity\/(.+)$/)) {
      return flattenedTabs.findIndex((tab) => tab.path === "/supply-network");
    }

    // Trova il tab che corrisponde esattamente al path corrente
    const exactMatch = flattenedTabs.findIndex(
      (tab) => tab.path === currentPath
    );

    if (exactMatch >= 0) {
      return exactMatch;
    }

    // Se non c'è match esatto, trova il tab che ha il path più lungo che corrisponde
    let bestMatch = -1;
    let bestMatchLength = 0;

    flattenedTabs.forEach((tab, index) => {
      if (
        currentPath.startsWith(tab.path) &&
        tab.path.length > bestMatchLength
      ) {
        bestMatch = index;
        bestMatchLength = tab.path.length;
      }
    });

    // Se non troviamo nessun match, default al dashboard (indice 0)
    return bestMatch >= 0 ? bestMatch : 0;
  }, [location.pathname, flattenedTabs]);

  const handleTabChange = (tabIndex: number) => {
    const targetTab = flattenedTabs[tabIndex];
    if (targetTab?.path) {
      navigate(targetTab.path);
    }
  };

  return (
    <Container type="page" maxWidth={false}>
      <RoutingTabs
        tabs={flattenedTabs.map((tab) => ({
          title: tab.title,
          value: tab.value,
          call: tab.call,
        }))}
        selectedTab={activeTab}
        setSelectedTab={handleTabChange}
      />
      <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
        {/* React Router renderizza il componente appropriato qui */}
        <Outlet />
      </Grid>
    </Container>
  );
};
