import { DefaultLayout } from "@/components/LayoutComponents/DefaultLayout/DefaultLayout";
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/NotFound";
import { RBACExample } from "@/pages/RBACExample";
import Dashboard from "@/pages/Dashboard";
import { AuthenticatedRoutes } from "@/routes/AuthenticatedRoutes";
import { Loader } from "@remira/unifiedui";
import { Suspense } from "react";
import { Route, Routes as Router } from "react-router-dom";

interface RoutesProps {
  isMicrofrontend: boolean;
}

export const Routes = ({ isMicrofrontend }: RoutesProps) => {
  return (
    <Suspense fallback={<Loader fullPage />}>
      <Router>
        <Route
          path="/"
          element={<DefaultLayout isMicrofrontend={isMicrofrontend} />}
        >
          <Route
            element={<AuthenticatedRoutes isMicrofrontend={isMicrofrontend} />}
          >
            <Route path="" element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="rbacexample" element={<RBACExample />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Router>
    </Suspense>
  );
};
