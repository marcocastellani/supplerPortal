import React from "react";
import { TemplateWizard } from "./TemplateWizard";
import { log } from "@/utils/logger";

export const TemplateWizardPage: React.FC = () => {
  const handleComplete = (templateId: string) => {
    log.info("Template completed:", {
      component: "TemplateWizardPage",
      templateId,
    });
    // Navigate to the completed template or show success message
  };

  const handleCancel = () => {
    log.info("Template creation cancelled", {
      component: "TemplateWizardPage",
    });
    // Navigate back or show cancellation message
  };

  return <TemplateWizard onComplete={handleComplete} onCancel={handleCancel} />;
};
