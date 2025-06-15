import { DefaultLayout } from "@/components/LayoutComponents/DefaultLayout/DefaultLayout";
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/NotFound";
import { RBACExample } from "@/pages/RBACExample";
import Dashboard from "@/pages/Dashboard";
import { SupplyNetwork } from "@/pages/SupplyNetwork";
import NewSupplyNetworkEntity from "@/pages/NewSupplyNetworkEntity";
import { QuestionnaireTemplates } from "@/pages/QuestionnaireTemplates";
import { QuestionnaireAssignments } from "@/pages/QuestionnaireAssignments";
import { KPIDashboard } from "@/pages/KPIDashboard";
import { KPIThresholds } from "@/pages/KPIThresholds";
import { Audits } from "@/pages/Audits";
import { Documents } from "@/pages/Documents";
import { Taxonomies } from "@/pages/Taxonomies";
import { Roles } from "@/pages/Roles";
import { AuthenticatedRoutes } from "@/routes/AuthenticatedRoutes";
import { Loader } from "@remira/unifiedui";
import { Suspense } from "react";
import { Route, Routes as Router } from "react-router-dom";
import EntityDetailPage from "@/pages/EntityDetailPage";

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
            <Route path="supply-network" element={<SupplyNetwork />} />
            <Route
              path="supply-network/new"
              element={<NewSupplyNetworkEntity />}
            />
            <Route
              path="questionnaires/templates"
              element={<QuestionnaireTemplates />}
            />
            <Route
              path="questionnaires/assignments"
              element={<QuestionnaireAssignments />}
            />
            <Route path="kpi/dashboard" element={<KPIDashboard />} />
            <Route path="kpi/thresholds" element={<KPIThresholds />} />
            <Route path="audits" element={<Audits />} />
            <Route path="documents" element={<Documents />} />
            <Route path="settings/taxonomies" element={<Taxonomies />} />
            <Route path="settings/roles" element={<Roles />} />
            <Route path="rbacexample" element={<RBACExample />} />
            <Route
              path="supply-network/entity/:id"
              element={<EntityDetailPage />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Router>
    </Suspense>
  );
};
