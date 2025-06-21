import { PageLayout } from "@/components/LayoutComponents/PageLayout/PageLayout";
import { Logo } from "@remira/unifiedui";
import image from "@remira/unifiedui/dist/assets/shared/REMIRA_logo_claim.png";
import { t } from "i18next";
import { Link } from "react-router-dom";
import { COMPONENT_SIZES } from "../constants/ui";

export const NotFound = () => {
  return (
    <PageLayout>
      <div
        className="d-flex flex-column gap-3 justify-content-center align-items-center"
        style={{ height: "90vh" }}
      >
        <Logo image={image} sx={{ width: COMPONENT_SIZES.LOGO_WIDTH, marginBottom: COMPONENT_SIZES.LOGO_MARGIN_BOTTOM }} />
        <h2>{t("notFound")}</h2>
        <h4>
          {t("notFoundDescription")}
          <Link to="/">{t("backHome")}</Link>.
        </h4>
      </div>
    </PageLayout>
  );
};
