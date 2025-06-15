import { apis, ucpVersions } from "@/utils/apiVersions";
import {
  getPatternFromLocaleAndStyle,
  getProfileProperty,
  getTimeFormat,
  RegionalSettings,
  saveProfileProperty,
} from "@remira/ucpaccelerator_unified_utils";
import { Container, Grid, Text } from "@remira/unifiedui";
import { PageHeader } from "../components/LayoutComponents";
import LanguageIcon from "@mui/icons-material/Language";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { log } from "../utils/logger";
import { useTranslation } from 'react-i18next';

//Example of a function to save the current user's regional settings
export const SaveRegionalSettings = async (
  settings: RegionalSettings,
  userId: string,
  tenantId: string
) => {
  try {
    // Save settings to the backend
    await saveProfileProperty(
      "regionalSettings",
      JSON.stringify(settings),
      userId,
      tenantId,
      apis["ucp"],
      ucpVersions["2024-10-01"]
    );

    // Save settings to localStorage
    localStorage.setItem("regionalSettings", JSON.stringify(settings));
    log.info("Regional settings saved successfully", { component: 'SaveRegionalSettings', settings });
  } catch (error) {
    log.error("Error saving regional settings", { component: 'SaveRegionalSettings', error });
  }
};

export const RegionalSettingsExample = () => {
  const [dateFormat, setDateFormat] = useState<string>("");
  const [timeFormat, setTimeFormat] = useState<string>("");

  const { t } = useTranslation();

  log.debug("Regional settings component initialized", { component: 'RegionalSettingsExample' });
  useEffect(() => {
    const fetchRegionalSettings = async () => {
      const regionalSettingsData = await getProfileProperty(
        "regionalSettings",
        apis["ucp"],
        ucpVersions["2024-10-01"]
      );

      if (regionalSettingsData) {
        setDateFormat(regionalSettingsData.dateFormat || "DD/MM/YYYY");
        setTimeFormat(regionalSettingsData.timeFormat || "HH:mm");
        log.info("Regional settings loaded", { 
          component: 'RegionalSettingsExample',
          dateFormat: regionalSettingsData.dateFormat,
          timeFormat: regionalSettingsData.timeFormat
        });
      } else {
        setDateFormat("DD/MM/YYYY");
        setTimeFormat("HH:mm");
        log.warn("No regional settings found, using defaults", { component: 'RegionalSettingsExample' });
      }
    };

    fetchRegionalSettings();
  }, []);

  return (
    <Container type="page">
      <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
        <Grid item xs={12}>
          <PageHeader
            title={t("regionalSettingsExample")}
            subtitle="Regional settings and localization demonstration"
            icon={<LanguageIcon color="primary" />}
          />
          <div>
            <Text>{`Date Format: ${dateFormat || "Loading..."}`}</Text>
            <Text>{`Time Format: ${timeFormat || "Loading..."}`}</Text>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};
