import { AuthenticatedLayout } from "@/components/LayoutComponents/AuthenticatedLayout/AuthenticatedLayout";
import { ErrorPage, Loader } from "@remira/unifiedui";
import { FC, useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { Outlet, useNavigate } from "react-router-dom";
import image from "@remira/unifiedui/dist/assets/shared/REMIRA_logo.png";
import { useTranslation } from "react-i18next";

export interface AuthenticatedRoutesProps {
  isMicrofrontend: boolean;
  children?: JSX.Element;
}

export const AuthenticatedRoutes: FC<AuthenticatedRoutesProps> = ({
  isMicrofrontend,
  children,
}) => {
  const auth = useAuth();
  const [expired, setExpired] = useState<boolean>(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (auth.user && auth.user.expired) {
      setExpired(true);
      auth.signoutSilent({ id_token_hint: auth.user?.id_token });
    }
  }, [auth.user?.expired]);

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated && !expired) {
      auth.signinRedirect();
    }
  }, [auth.isLoading, auth.isAuthenticated, expired]);

  if (auth.isLoading || !auth.user?.access_token) {
    return <Loader fullPage message={t("loadingAuthenticationState")} />;
  }

  if (expired)
    return (
      <ErrorPage
        logoImage={image}
        navigateDashboard={() => navigate("")}
        navigateDashboardMessage={t("landingPage")}
        navigateMessage={t("signIn")}
        navigate={() => auth.signinRedirect()}
        errorCode={401}
        errorMessage={t("sessionExpired")}
      />
    );

  return (
    <AuthenticatedLayout isMicrofrontend={isMicrofrontend}>
      {children ? children : <Outlet />}
    </AuthenticatedLayout>
  );
};
