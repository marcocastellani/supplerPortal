import { keycloak } from "@/configs/keycloak";
import i18n from "@/i18n";
import { languages } from "@/utils";
import { TUser } from "@remira/ucpaccelerator_unified_utils";
import {
  Avatar,
  Button,
  CountryFlag,
  MenuItemProps,
  Icon,
  IconButton,
  Menu,
  Navbar,
  useThemeContext,
} from "@remira/unifiedui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

export interface TopbarProps {
  user: TUser;
}

export const Topbar: FC<TopbarProps> = ({ user }) => {
  const auth = useAuth();

  const { t } = useTranslation();
  const { toggleMode, mode: theme } = useThemeContext();
  const navigate = useNavigate();

  const userMenu: MenuItemProps[] = [
    {
      element:
        theme === "light" ? (
          <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Icon name="moon" />
            {t("darkMode")}
          </span>
        ) : (
          <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Icon name="sun" />
            {t("lightMode")}
          </span>
        ),
      action: () => {
        toggleMode(theme === "light" ? "dark" : "light");
      },
      divider: true,
    },
    ...(Array.isArray(i18n.options.supportedLngs)
      ? (i18n.options.supportedLngs as string[])
          .filter((lng: string) => lng !== "cimode")
          .map((lng: string, index: number, arr: string[]) =>
            index === arr.length - 1
              ? {
                  element: (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <CountryFlag
                        style={{ width: "20px" }}
                        countryCode={lng}
                      />
                      {t(languages[lng as keyof typeof languages])}
                    </span>
                  ),
                  action: () => i18n.changeLanguage(lng),
                  divider: true,
                }
              : {
                  element: (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <CountryFlag sx={{ width: "20px" }} countryCode={lng} />
                      {t(languages[lng as keyof typeof languages])}
                    </span>
                  ),
                  action: () => i18n.changeLanguage(lng),
                  divider: false,
                }
          )
      : []),
    {
      element: (
        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Icon name="arrow-right-from-bracket" />
          {t("signOut")}
        </span>
      ),
      action: async () => {
        await auth.signoutRedirect({
          post_logout_redirect_uri: keycloak.userManager?.settings.redirect_uri,
        });
      },
      divider: false,
    },
  ];

  const leftMenu = [
    <Button
      variant="text"
      sx={{
        color: "#fff",
        textTransform: "uppercase",
        display: "inline-block",
        minWidth: "max-content",
      }}
      key={1}
      label={
        <span>
          <Icon name="house" /> {t("home")}
        </span>
      }
      onClick={() => navigate("/")}
    />,
  ];

  const rightMenu = [
    <Menu
      key={4}
      theme={theme}
      element={<Avatar avatarUrl={""}>{user.name}</Avatar>}
      menuItems={userMenu}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    />,
  ];

  const leftMobileMenuItems: MenuItemProps[] = [
    {
      element: (
        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Icon name="house" />
          {t("home")}
        </span>
      ),
      action: () => navigate("/"),
      divider: true,
    },
  ];

  const leftMobileMenu = [
    <Menu
      key={1}
      theme={theme}
      element={<IconButton icon={<Icon name="bars" />} />}
      menuItems={leftMobileMenuItems}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    />,
  ];

  const rightMobileMenu = [
    <Menu
      key={1}
      theme={theme}
      element={<Avatar avatarUrl={""}>{user.name}</Avatar>}
      menuItems={userMenu}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    />,
  ];

  return (
    <Navbar
      position="static"
      theme={theme}
      onClickLogo={() => navigate("/")}
      leftMenu={leftMenu}
      leftMobileMenu={leftMobileMenu}
      rightMenu={rightMenu}
      rightMobileMenu={rightMobileMenu}
    />
  );
};
