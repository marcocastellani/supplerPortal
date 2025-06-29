import { Container, Grid, RoutingTabs } from "@remira/unifiedui";
import { Box, CircularProgress } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { appMenu } from "../configs/menu";
import { useAuthorization } from "@/hooks/useAuthorization";

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
  const { canViewMenuItem, loading: authLoading } = useAuthorization();

  // Flatten del menu per creare tabs
  const flattenedTabs = useMemo(() => {
    const tabs: TabDefinition[] = [];
    let index = 0;

    appMenu.forEach((menuItem) => {
      if (menuItem.children) {
        // Se ha children, aggiungi ogni child come tab (se autorizzato)
        menuItem.children.forEach((child) => {
          if (canViewMenuItem(child.path)) {
            tabs.push({
              title: child.label,
              value: index++,
              path: child.path,
              call: () => navigate(child.path),
            });
          }
        });
      } else if (menuItem.path && canViewMenuItem(menuItem.path)) {
        // Se è un elemento semplice con path e autorizzato
        tabs.push({
          title: menuItem.label,
          value: index++,
          path: menuItem.path,
          call: () => navigate(menuItem.path),
        });
      }
    });

    // Aggiungi i tabs degli esempi esistenti (sempre visibili per ora)
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
  }, [t, navigate, canViewMenuItem]);

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

  // Don't render until authorization is loaded
  if (authLoading) {
    return (
      <Container type="page" maxWidth={false}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container type="page" maxWidth={false}>
      <RoutingTabs
        tabs={flattenedTabs.map((tab: TabDefinition) => ({
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
