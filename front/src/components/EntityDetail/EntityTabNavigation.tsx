import React from "react";
import { Paper, Tabs, Tab } from "@mui/material";
import { useTranslation } from "react-i18next";
import InfoIcon from "@mui/icons-material/Info";
import ContactsIcon from "@mui/icons-material/Contacts";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import SettingsIcon from "@mui/icons-material/Settings";

interface EntityTabNavigationProps {
  activeTab: number;
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

/**
 * Navigation tabs for entity detail sections [SF]
 */
export const EntityTabNavigation: React.FC<EntityTabNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  const { t } = useTranslation();

  return (
    <Paper elevation={1}>
      <Tabs
        value={activeTab}
        onChange={onTabChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab
          icon={<InfoIcon />}
          label={t("entityDetail.tabs.overview")}
          iconPosition="start"
        />
        <Tab
          icon={<ContactsIcon />}
          label={t("entityDetail.tabs.contacts")}
          iconPosition="start"
        />
        <Tab
          icon={<BusinessCenterIcon />}
          label={t("entityDetail.tabs.business")}
          iconPosition="start"
        />
        <Tab
          icon={<AccountTreeOutlinedIcon />}
          label={t("entityDetail.tabs.subEntities")}
          iconPosition="start"
        />
        <Tab
          icon={<SettingsIcon />}
          label={t("entityDetail.tabs.system")}
          iconPosition="start"
        />
      </Tabs>
    </Paper>
  );
};
