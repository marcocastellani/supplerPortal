import { AuthProviderProps } from "react-oidc-context";

const CLIENT_ID = "ucp_platform_pub";
const KEYCLOAK_DEFAULT_URL = "https://test-auth.remira.com";
const KEYCLOAK_DEFAULT_REALM = "remiragroup_dev";

const keycloakConfig = {
  url: KEYCLOAK_DEFAULT_URL,
  realm: KEYCLOAK_DEFAULT_REALM,
  clientId: CLIENT_ID,
};

export const keycloak: AuthProviderProps = {
  authority: `${keycloakConfig.url}/realms/${keycloakConfig.realm}`,
  client_id: keycloakConfig.clientId,
  redirect_uri: "http://localhost:4280",
  automaticSilentRenew: true,
};
