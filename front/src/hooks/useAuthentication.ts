import { httpClient } from "@/services/httpClient";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

export function useAuthentication() {
  const auth = useAuth();

  useEffect(() => {
    if (
      !auth.isAuthenticated &&
      !auth.activeNavigator &&
      !auth.isLoading &&
      !window.location.pathname.includes("systemError")
    ) {
      auth.signinRedirect();
    }
  }, [
    auth.isAuthenticated,
    auth.activeNavigator,
    auth.isLoading,
    auth.signinRedirect,
  ]);

  useEffect(() => {
    if (auth.user?.access_token) {
      auth.events.addAccessTokenExpiring(() => {
        auth.startSilentRenew();
      });
    }
  }, [auth]);

  useEffect(() => {
    if (auth.isAuthenticated && auth.user && auth.user.access_token) {
      httpClient.setAuthToken(auth.user.access_token);
    } else {
      httpClient.setAuthToken(null);
    }
  }, [auth.isAuthenticated, auth.user, auth.user?.access_token]);

  return auth.isAuthenticated;
}
