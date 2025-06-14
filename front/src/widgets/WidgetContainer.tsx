import { setAxiosDefaultBaseUrl } from "@remira/ucpaccelerator_unified_utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { AuthProvider, AuthProviderProps } from "react-oidc-context";
import DefaultWidgetLayout from "./DefaultWidgetLayout";

interface WidgetContainerProps {
  oidcConfig: AuthProviderProps;
  qclient: QueryClient;
  children: JSX.Element;
  col: number;
  row: number;
  colSpan: number;
  title: string;
}

const WidgetContainer = ({
  oidcConfig,
  qclient,
  children,
  title,
  row,
  col,
  colSpan,
}: WidgetContainerProps) => {
  useEffect(() => {
    setAxiosDefaultBaseUrl("hhttp://localhost:5257");
  }, []);

  return (
    <QueryClientProvider client={qclient}>
      <AuthProvider {...oidcConfig}>
        <DefaultWidgetLayout
          title={title}
          col={col}
          row={row}
          colSpan={colSpan}
        >
          {children}
        </DefaultWidgetLayout>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default WidgetContainer;
