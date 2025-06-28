import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Home } from "../Home";
import { vi } from "vitest";

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: "/dashboard" }),
    Outlet: () => <div data-testid="outlet">Outlet Content</div>,
  };
});

// Mock i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock UnifiedUI components
vi.mock("@remira/unifiedui", () => ({
  Container: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="container">{children}</div>
  ),
  Grid: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="grid">{children}</div>
  ),
  RoutingTabs: ({
    tabs,
    selectedTab,
    setSelectedTab,
  }: {
    tabs: any[];
    selectedTab: number;
    setSelectedTab: (index: number) => void;
  }) => (
    <div data-testid="routing-tabs">
      {tabs.map((tab, index) => (
        <button
          key={index}
          data-testid={`tab-${index}`}
          onClick={() => setSelectedTab(index)}
          className={selectedTab === index ? "active" : ""}
        >
          {tab.title}
        </button>
      ))}
    </div>
  ),
}));

describe("Home Component - Navigation Refactoring", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it("renders with tabs and outlet", () => {
    renderWithRouter(<Home />);

    expect(screen.getByTestId("container")).toBeInTheDocument();
    expect(screen.getByTestId("routing-tabs")).toBeInTheDocument();
    expect(screen.getByTestId("outlet")).toBeInTheDocument();
  });

  it("renders dashboard tab as active when on dashboard path", () => {
    renderWithRouter(<Home />);

    const dashboardTab = screen.getByTestId("tab-0");
    expect(dashboardTab).toHaveClass("active");
  });

  it("calls navigate when tab is clicked", () => {
    renderWithRouter(<Home />);

    const supplyNetworkTab = screen.getByTestId("tab-1"); // Supply Network is second tab
    fireEvent.click(supplyNetworkTab);

    expect(mockNavigate).toHaveBeenCalledWith("/supply-network");
  });

  it("calculates correct active tab based on location", () => {
    // This test verifies that the activeTab calculation works correctly
    renderWithRouter(<Home />);

    // The mock returns /dashboard path, so dashboard tab (index 0) should be active
    const dashboardTab = screen.getByTestId("tab-0");
    expect(dashboardTab).toHaveClass("active");
  });

  it("renders all expected tabs from menu config", () => {
    renderWithRouter(<Home />);

    // Check that we have tabs for main menu items
    expect(screen.getByTestId("tab-0")).toBeInTheDocument(); // Dashboard
    expect(screen.getByTestId("tab-1")).toBeInTheDocument(); // Supply Network
    expect(screen.getByTestId("tab-2")).toBeInTheDocument(); // New Entity
    expect(screen.getByTestId("tab-3")).toBeInTheDocument(); // Templates
    // ... more tabs
  });
});
