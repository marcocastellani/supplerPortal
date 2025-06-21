import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Container, ThemeProvider } from "@remira/unifiedui";
import { useEffect, useState } from "react";
import { AuthProvider, AuthProviderProps } from "react-oidc-context";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./routes/AppRoutes";

interface MicrofrontendProps {
  keycloak: AuthProviderProps;
  queryClient: QueryClient;
}

function Microfrontend({ keycloak, queryClient }: MicrofrontendProps) {
  const [config, setConfig] = useState<AuthProviderProps>(keycloak);

  useEffect(() => {
    if (keycloak) {
      setConfig({
        authority: keycloak.userManager?.settings.authority as string,
        client_id: keycloak.userManager?.settings.client_id as string,
        redirect_uri: `${keycloak.userManager?.settings.redirect_uri}/mfeapp`,
        automaticSilentRenew:
          keycloak.userManager?.settings.automaticSilentRenew,
      });
    }
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider {...config}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter basename="/mfeapp">
            <Container
              type="page"
              className="vw-100 vh-100 m-0 p-0"
              maxWidth={false}
            >
              <Routes isMicrofrontend={true} />
            </Container>
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default Microfrontend;
