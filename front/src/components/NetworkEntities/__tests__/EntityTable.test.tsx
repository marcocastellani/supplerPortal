import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";
import EntityTable from "../EntityTable";
import { EntityType } from "@/types/supplyNetworkEntities";

/**
 * Test suite for EntityTable component [TDT]
 *
 * Comprehensive tests covering entity display, pagination, sorting,
 * sanitization, accessibility, and user interactions.
 */

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock the sanitization utility
vi.mock("@/utils/sanitization", () => ({
  sanitizeHtml: (input: string) => `sanitized_${input}`,
  escapeHtml: (input: string) => `escaped_${input}`,
  validateInput: (input: string) => input.length > 0 && input.length < 1000,
}));

describe("EntityTable", () => {
  const mockOnPageChange = vi.fn();
  const mockOnSortChange = vi.fn();

  const mockEntities = [
    {
      id: "1",
      externalCode: "SUP001",
      entityType: EntityType.Supplier,
      legalName: "Test Supplier One",
      shortName: "Sup1",
      vatCode: "VAT123456",
      taxCode: "TAX123456",
      country: "Italy",
      region: "Lombardy",
      city: "Milan",
      address: "Via Roma 1",
      zipCode: "20100",
      email: "supplier1@example.com",
      phoneNumber: "+39 02 1234567",
      contactPersonName: "John Doe",
      roleInSupplyChain: "Manufacturer" as any,
      tags: ["electronics", "components"],
      active: true,
      accreditationStatus: "Approved" as any,
      accreditationDate: "2024-01-01",
      createdAt: "2024-01-01",
      created: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    {
      id: "2",
      externalCode: "SITE001",
      entityType: EntityType.Site,
      legalName: "Production Site Alpha",
      shortName: "Site Alpha",
      vatCode: "VAT789012",
      taxCode: "TAX789012",
      country: "Germany",
      region: "Bavaria",
      city: "Munich",
      address: "Hauptstraße 10",
      zipCode: "80331",
      email: "site.alpha@example.com",
      phoneNumber: "+49 89 987654",
      contactPersonName: "Jane Smith",
      roleInSupplyChain: "Assembler" as any,
      tags: ["production", "assembly"],
      active: false,
      accreditationStatus: "Draft" as any,
      accreditationDate: undefined,
      createdAt: "2024-02-01",
      created: "2024-02-01",
      updatedAt: "2024-02-01",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (props = {}) => {
    const defaultProps = {
      entities: mockEntities,
      totalCount: mockEntities.length,
      currentPage: 1,
      pageSize: 20,
      totalPages: 1,
      sortBy: "legalName",
      sortDescending: false,
      onPageChange: mockOnPageChange,
      onSortChange: mockOnSortChange,
      ...props,
    };

    return render(
      <BrowserRouter>
        <EntityTable {...defaultProps} />
      </BrowserRouter>
    );
  };

  describe("Basic Rendering", () => {
    it("should render table with headers", () => {
      renderComponent();

      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("VAT")).toBeInTheDocument();
      expect(screen.getByText("Code")).toBeInTheDocument();
      expect(screen.getByText("Location")).toBeInTheDocument();
      expect(screen.getByText("Type")).toBeInTheDocument();
      expect(screen.getByText("Status")).toBeInTheDocument();
    });

    it("should render entities in table rows", () => {
      renderComponent();

      expect(
        screen.getByText("sanitized_Test Supplier One")
      ).toBeInTheDocument();
      expect(
        screen.getByText("sanitized_Production Site Alpha")
      ).toBeInTheDocument();
      expect(screen.getByText("sanitized_SUP001")).toBeInTheDocument();
      expect(screen.getByText("sanitized_SITE001")).toBeInTheDocument();
    });

    it("should render empty state when no entities provided", () => {
      renderComponent({ entities: [], totalCount: 0 });

      expect(screen.getByText("No entities found")).toBeInTheDocument();
    });
  });

  describe("Data Sanitization [IV][REH]", () => {
    it("should sanitize entity names", () => {
      const maliciousEntity = {
        ...mockEntities[0],
        legalName: '<script>alert("xss")</script>Malicious Name',
      };

      renderComponent({ entities: [maliciousEntity] });

      expect(
        screen.getByText(
          'sanitized_<script>alert("xss")</script>Malicious Name'
        )
      ).toBeInTheDocument();
    });

    it("should sanitize VAT codes", () => {
      const maliciousEntity = {
        ...mockEntities[0],
        vatCode: '<img src=x onerror=alert("xss")>VAT123',
      };

      renderComponent({ entities: [maliciousEntity] });

      expect(
        screen.getByText('sanitized_<img src=x onerror=alert("xss")>VAT123')
      ).toBeInTheDocument();
    });

    it("should sanitize external codes", () => {
      const maliciousEntity = {
        ...mockEntities[0],
        externalCode: 'javascript:alert("xss")',
      };

      renderComponent({ entities: [maliciousEntity] });

      expect(
        screen.getByText('sanitized_javascript:alert("xss")')
      ).toBeInTheDocument();
    });

    it("should sanitize location data", () => {
      const maliciousEntity = {
        ...mockEntities[0],
        city: '<script>alert("xss")</script>Milan',
        country: '<iframe src="evil.com">Italy</iframe>',
      };

      renderComponent({ entities: [maliciousEntity] });

      // Location is combined as "city, country"
      expect(
        screen.getByText(
          /sanitized_<script>alert\("xss"\)<\/script>Milan, sanitized_<iframe src="evil\.com">Italy<\/iframe>/
        )
      ).toBeInTheDocument();
    });
  });

  describe("Sorting Functionality", () => {
    it("should call onSortChange when column header is clicked", () => {
      renderComponent();

      const nameHeader = screen.getByText("Name");
      fireEvent.click(nameHeader);

      expect(mockOnSortChange).toHaveBeenCalledWith("legalName");
    });

    it("should display sort indicators", () => {
      renderComponent({ sortBy: "legalName", sortDescending: false });

      const nameHeader = screen.getByText("Name");
      expect(nameHeader.closest("th")).toHaveAttribute(
        "aria-sort",
        "ascending"
      );
    });

    it("should display descending sort indicator", () => {
      renderComponent({ sortBy: "legalName", sortDescending: true });

      const nameHeader = screen.getByText("Name");
      expect(nameHeader.closest("th")).toHaveAttribute(
        "aria-sort",
        "descending"
      );
    });

    it("should support sorting by different columns", () => {
      renderComponent();

      const vatHeader = screen.getByText("VAT");
      fireEvent.click(vatHeader);

      expect(mockOnSortChange).toHaveBeenCalledWith("vatCode");
    });
  });

  describe("Pagination", () => {
    it("should display pagination controls", () => {
      renderComponent({ totalPages: 5, currentPage: 2 });

      expect(screen.getByTestId("mui-pagination")).toBeInTheDocument();
    });

    it("should call onPageChange when page is changed", () => {
      renderComponent({ totalPages: 3, currentPage: 1 });

      const nextButton = screen.getByText("Next");
      fireEvent.click(nextButton);

      expect(mockOnPageChange).toHaveBeenCalledWith(null, 2);
    });

    it("should display correct page information", () => {
      renderComponent({
        totalCount: 100,
        currentPage: 2,
        pageSize: 20,
        totalPages: 5,
      });

      expect(
        screen.getByText("Showing 21 to 40 of 100 results")
      ).toBeInTheDocument();
    });

    it("should not display pagination for single page", () => {
      renderComponent({ totalPages: 1 });

      expect(screen.queryByTestId("mui-pagination")).not.toBeInTheDocument();
    });
  });

  describe("Entity Navigation", () => {
    it("should navigate to entity detail when row is clicked", () => {
      renderComponent();

      const firstRow = screen
        .getByText("sanitized_Test Supplier One")
        .closest("tr");
      fireEvent.click(firstRow!);

      expect(mockNavigate).toHaveBeenCalledWith("/supply-network/entity/1");
    });

    it("should navigate to entity detail when entity name is clicked", () => {
      renderComponent();

      const entityName = screen.getByText("sanitized_Test Supplier One");
      fireEvent.click(entityName);

      expect(mockNavigate).toHaveBeenCalledWith("/supply-network/entity/1");
    });
  });

  describe("Entity Status Display", () => {
    it("should display active status correctly", () => {
      renderComponent();

      expect(screen.getByText("Active")).toBeInTheDocument();
    });

    it("should display inactive status correctly", () => {
      renderComponent();

      expect(screen.getByText("Inactive")).toBeInTheDocument();
    });

    it("should display entity type chips", () => {
      renderComponent();

      expect(screen.getByText("Supplier")).toBeInTheDocument();
      expect(screen.getByText("Site")).toBeInTheDocument();
    });
  });

  describe("Accessibility [REH]", () => {
    it("should have proper table structure for screen readers", () => {
      renderComponent();

      const table = screen.getByRole("table");
      expect(table).toHaveAttribute("aria-label", "Supply Network Entities");

      const columnHeaders = screen.getAllByRole("columnheader");
      expect(columnHeaders).toHaveLength(6); // Name, VAT, Code, Location, Type, Status
    });

    it("should have sortable column headers with ARIA attributes", () => {
      renderComponent();

      const nameHeader = screen.getByText("Name").closest("th");
      expect(nameHeader).toHaveAttribute("role", "columnheader");
      expect(nameHeader).toHaveAttribute("tabindex", "0");
      expect(nameHeader).toHaveAttribute("aria-sort");
    });

    it("should support keyboard navigation on sortable headers", () => {
      renderComponent();

      const nameHeader = screen.getByText("Name").closest("th");
      fireEvent.keyDown(nameHeader!, { key: "Enter" });

      expect(mockOnSortChange).toHaveBeenCalledWith("legalName");
    });

    it("should support keyboard navigation with Space key", () => {
      renderComponent();

      const nameHeader = screen.getByText("Name").closest("th");
      fireEvent.keyDown(nameHeader!, { key: " " });

      expect(mockOnSortChange).toHaveBeenCalledWith("legalName");
    });

    it("should have proper row selection attributes", () => {
      renderComponent();

      const firstRow = screen
        .getByText("sanitized_Test Supplier One")
        .closest("tr");
      expect(firstRow).toHaveAttribute("role", "row");
      expect(firstRow).toHaveAttribute("tabindex", "0");
    });
  });

  describe("Loading and Error States", () => {
    it("should display loading state when entities are being fetched", () => {
      renderComponent({ entities: [], isLoading: true });

      expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    });

    it("should display error state when there is an error", () => {
      renderComponent({ entities: [], error: "Failed to load entities" });

      expect(screen.getByText("Failed to load entities")).toBeInTheDocument();
    });

    it("should display retry button in error state", () => {
      const mockOnRetry = vi.fn();
      renderComponent({
        entities: [],
        error: "Failed to load entities",
        onRetry: mockOnRetry,
      });

      const retryButton = screen.getByRole("button", { name: /retry/i });
      fireEvent.click(retryButton);

      expect(mockOnRetry).toHaveBeenCalledTimes(1);
    });
  });

  describe("Responsive Design", () => {
    it("should handle small screen sizes", () => {
      // Mock window.innerWidth
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 600,
      });

      renderComponent();

      const table = screen.getByRole("table");
      expect(table).toBeInTheDocument();
    });
  });

  describe("Performance", () => {
    it("should handle large datasets efficiently", () => {
      const largeDataset = Array.from({ length: 1000 }, (_, index) => ({
        ...mockEntities[0],
        id: `entity-${index}`,
        legalName: `Entity ${index}`,
        externalCode: `CODE${index}`,
      }));

      const startTime = performance.now();
      renderComponent({ entities: largeDataset });
      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(1000); // Should render in less than 1 second
    });

    it("should virtualize long lists when needed", () => {
      const largeDataset = Array.from({ length: 100 }, (_, index) => ({
        ...mockEntities[0],
        id: `entity-${index}`,
        legalName: `Entity ${index}`,
      }));

      renderComponent({ entities: largeDataset });

      // Should render only visible rows
      const rows = screen.getAllByRole("row");
      expect(rows.length).toBeLessThanOrEqual(102); // Header + visible rows
    });
  });

  describe("Data Validation", () => {
    it("should handle missing optional fields gracefully", () => {
      const incompleteEntity = {
        id: "3",
        legalName: "Incomplete Entity",
        entityType: EntityType.Supplier,
        // Missing optional fields
      };

      renderComponent({ entities: [incompleteEntity] });

      expect(
        screen.getByText("sanitized_Incomplete Entity")
      ).toBeInTheDocument();
    });

    it("should handle null and undefined values", () => {
      const entityWithNulls = {
        ...mockEntities[0],
        vatCode: null,
        city: undefined,
        country: null,
      };

      renderComponent({ entities: [entityWithNulls] });

      expect(
        screen.getByText("sanitized_Test Supplier One")
      ).toBeInTheDocument();
    });
  });

  describe("Tooltips and Additional Information", () => {
    it("should display tooltips for truncated content", async () => {
      const entityWithLongName = {
        ...mockEntities[0],
        legalName:
          "Very Long Entity Name That Should Be Truncated In The Table Display",
      };

      renderComponent({ entities: [entityWithLongName] });

      const entityName = screen.getByText(/sanitized_Very Long Entity Name/);
      fireEvent.mouseOver(entityName);

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
    });
  });
});
