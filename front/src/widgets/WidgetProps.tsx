import { QueryClient } from "@tanstack/react-query";
import { AuthProviderProps } from "react-oidc-context";

export interface WidgetProps {
    oidcConfig : AuthProviderProps,
    qclient : QueryClient
  }