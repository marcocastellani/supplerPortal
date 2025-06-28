import { DefaultLayout } from "@/components/LayoutComponents/DefaultLayout/DefaultLayout";
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/NotFound";
import { RBACExample } from "@/pages/RBACExample";
import Dashboard from "@/pages/Dashboard";
import { SupplyNetwork } from "@/pages/SupplyNetwork";
import NewSupplyNetworkEntity from "@/pages/NewSupplyNetworkEntity";
import { QuestionnaireTemplates } from "@/pages/QuestionnaireTemplates";
import { TemplateWizard } from "@/components/questionnaire-templates/TemplateWizard";
import { QuestionnaireAssignments } from "@/pages/QuestionnaireAssignments";
import { KPIDashboard } from "@/pages/KPIDashboard";
import { KPIThresholds } from "@/pages/KPIThresholds";
import { Audits } from "@/pages/Audits";
import { Documents } from "@/pages/Documents";
import { Taxonomies } from "@/pages/Taxonomies";
import { Roles } from "@/pages/Roles";
import { RegionalSettingsExample } from "@/pages/RegionalSettingsExample";
import { TableExample } from "@/pages/TableExample";

import { AuthenticatedRoutes } from "@/routes/AuthenticatedRoutes";
import { Loader } from "@remira/unifiedui";
import { Suspense } from "react";
import { Route, Routes as Router, useParams } from "react-router-dom";
import EntityDetailPage from "@/pages/EntityDetailPage";

interface RoutesProps {
  isMicrofrontend: boolean;
}

// Wrapper component for editing templates
const TemplateEditor = () => {
  const { id } = useParams<{ id: string }>();
  return <TemplateWizard templateId={id} />;
};

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
            <Route path="" element={<Home />}>
              {/* Redirect root to dashboard */}
              <Route index element={<Dashboard />} />

              {/* Main application routes */}
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="supply-network" element={<SupplyNetwork />} />
              <Route
                path="supply-network/new"
                element={<NewSupplyNetworkEntity />}
              />
              <Route
                path="supply-network/entity/:id"
                element={<EntityDetailPage />}
              />
              <Route
                path="questionnaires/templates"
                element={<QuestionnaireTemplates />}
              />
              <Route
                path="questionnaires/templates/new"
                element={<TemplateWizard />}
              />
              <Route
                path="questionnaires/templates/:id"
                element={<div>Template Details View - TODO</div>}
              />
              <Route
                path="questionnaires/templates/:id/edit"
                element={<TemplateEditor />}
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

              {/* Example routes */}
              <Route path="table-example" element={<TableExample />} />
              <Route path="rbac-example" element={<RBACExample />} />
              <Route
                path="regional-settings-example"
                element={<RegionalSettingsExample />}
              />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Router>
    </Suspense>
  );
};
