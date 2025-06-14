import { Routes } from "@/routes/AppRoutes";
import { setAxiosDefaultBaseUrl } from "@remira/ucpaccelerator_unified_utils";
import {
  Container,
  CssBaseline,
  colors,
  useThemeContext,
} from "@remira/unifiedui";
import bgDark from "@remira/unifiedui/dist/assets/shared/REMIRA_bg_dark.png";
import bgLight from "@remira/unifiedui/dist/assets/shared/REMIRA_bg_light.png";
import { useAuthentication } from "./hooks/useAuthentication";

function App() {
  setAxiosDefaultBaseUrl("http://localhost:5257");
  const isAuthenticated = useAuthentication();
  const { mode: theme } = useThemeContext();

  return (
    <Container
      type="variable"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${theme === "dark" ? bgDark : bgLight})`,
        ...(isAuthenticated && {
          backgroundImage: "none",
          backgroundColor:
            theme === "dark" ? "rgb(22, 28, 36)" : colors.blueGrey[50],
        }),
      }}
    >
      <CssBaseline />
      <Routes isMicrofrontend={false} />
    </Container>
  );
}

export default App;
