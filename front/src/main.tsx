import App from "@/App";
import { keycloak } from "@/configs/keycloak";
import { store } from "@/redux/store";
import { ThemeProvider } from "@remira/unifiedui";
import "@remira/unifiedui/dist/styles/shared/design.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "react-oidc-context";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import { mfeEventManager } from "./utils/mfeEventManager";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider
    onThemeChanged={(mode: "dark" | "light") =>
      mfeEventManager.emitThemeChanged(mode)
    }
  >
    <Provider store={store}>
      <AuthProvider
        {...keycloak}
        onSigninCallback={() => {
          queryClient.removeQueries();
          window.history.pushState(
            {},
            document.title,
            window.location.pathname
          );
        }}
      >
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  wordBreak: "break-all",
                },
              }}
            />
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>
    </Provider>
  </ThemeProvider>
);
