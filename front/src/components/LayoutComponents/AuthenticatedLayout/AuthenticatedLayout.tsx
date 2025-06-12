import { Topbar } from "@/components/LayoutComponents/Topbar/Topbar";
import { PageLayout } from "@/components/LayoutComponents/PageLayout/PageLayout";
import { TUser } from "@remira/ucpaccelerator_unified_utils";
import { jwtDecode } from "jwt-decode";
import { FC, ReactNode } from "react";
import { useAuth } from "react-oidc-context";
import { Outlet } from "react-router-dom";

interface IAuthenticatedLayout {
  isMicrofrontend: boolean;
  children: ReactNode;
}

export const AuthenticatedLayout: FC<IAuthenticatedLayout> = ({
  isMicrofrontend,
}) => {
  const auth = useAuth();
  const token: TUser = jwtDecode(auth.user?.access_token!);
  return (
    <>
      {isMicrofrontend ? null : <Topbar user={token} />}
      <PageLayout isMicrofrontend={isMicrofrontend}>
        <Outlet />
      </PageLayout>
    </>
  );
};
