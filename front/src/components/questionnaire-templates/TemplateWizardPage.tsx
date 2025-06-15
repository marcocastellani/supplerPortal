import React from "react";
import { TemplateWizard } from "./TemplateWizard";

export const TemplateWizardPage: React.FC = () => {
  const handleComplete = (templateId: string) => {
    console.log("Template completed:", templateId);
    // Here you would typically navigate to a success page or template list
  };

  const handleCancel = () => {
    console.log("Template creation cancelled");
    // Here you would typically navigate back to template list
  };

  return <TemplateWizard onComplete={handleComplete} onCancel={handleCancel} />;
};
