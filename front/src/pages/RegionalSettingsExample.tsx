import { apis, ucpVersions } from "@/utils/apiVersions";
import {
  getPatternFromLocaleAndStyle,
  getProfileProperty,
  getTimeFormat,
  RegionalSettings,
  saveProfileProperty,
} from "@remira/ucpaccelerator_unified_utils";
import { Container, Grid, Text } from "@remira/unifiedui";
import { t } from "i18next";
import { useEffect, useState } from "react";

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
    console.log("Regional settings saved successfully:", settings);
  } catch (error) {
    console.error("Error saving regional settings:", error);
  }
};

export const RegionalSettingsExample = () => {
  const [regionalSettings, setRegionalSettings] =
    useState<RegionalSettings | null>(null);
  const [dateFormat, setDateFormat] = useState<string>("");
  const [timeFormat, setTimeFormat] = useState<string>("");

  console.log(`Regional settings: ${regionalSettings}`);
  useEffect(() => {
    const fetchRegionalSettings = async () => {
      const regionalSettingsData = await getProfileProperty(
        "regionalSettings",
        apis["ucp"],
        ucpVersions["2024-10-01"]
      );

      if (regionalSettingsData) {
        // Save settings to state and localStorage
        const settings = JSON.parse(regionalSettingsData.content as string);
        setRegionalSettings(settings);
        localStorage.setItem("regionalSettings", JSON.stringify(settings));

        // Load date and time formats after fetching settings
        setDateFormat(getPatternFromLocaleAndStyle());
        setTimeFormat(getTimeFormat());
      } else {
        // Fallback to localStorage if API fails
        const savedSettings = localStorage.getItem("regionalSettings");
        if (savedSettings) {
          try {
            const parsedSettings = JSON.parse(
              savedSettings
            ) as RegionalSettings;
            setRegionalSettings(parsedSettings);
            setDateFormat(getPatternFromLocaleAndStyle());
            setTimeFormat(getTimeFormat());
          } catch (error) {
            console.error("Error parsing localStorage data:", error);
          }
        }
      }
    };

    fetchRegionalSettings();
  }, []);

  return (
    <Container type="page">
      <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
        <Grid item xs={12}>
          <Text variant="h3">{t("regionalSettingsExample")}</Text>
          <div>
            <Text>{`Date Format: ${dateFormat || "Loading..."}`}</Text>
            <Text>{`Time Format: ${timeFormat || "Loading..."}`}</Text>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};
