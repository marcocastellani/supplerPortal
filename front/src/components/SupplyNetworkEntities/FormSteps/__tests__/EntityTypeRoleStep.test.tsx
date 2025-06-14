import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { EntityTypeRoleStep } from "../EntityTypeRoleStep";
import {
  EntityType,
  RoleInSupplyChain,
} from "../../../../types/supplyNetworkEntities";

const mockEnumValues = {
  entityTypes: [
    { value: "Supplier", display: "Supplier" },
    { value: "Manufacturer", display: "Manufacturer" },
  ],
  rolesInSupplyChain: [
    { value: "Manufacturer", display: "Manufacturer" },
    { value: "Tannery", display: "Tannery" },
  ],
  accreditationStatuses: [
    { value: "Approved", display: "Approved" },
    { value: "Pending", display: "Pending" },
  ],
};

const mockFormData = {
  entityType: EntityType.Supplier,
  roleInSupplyChain: RoleInSupplyChain.Manufacturer,
  isSubEntity: false,
  legalName: "",
  shortName: "",
  externalCode: "",
  country: "",
  region: "",
  city: "",
  address: "",
  zipCode: "",
  email: "",
  phoneNumber: "",
  accreditationStatus: "Approved" as any,
  tags: [],
  contactPersonName: "",
  vatCode: "",
  taxCode: "",
  active: true,
};

const mockOnInputChange = vi.fn();
const mockOnParentChange = vi.fn();

describe("EntityTypeRoleStep", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render all required fields", () => {
    render(
      <EntityTypeRoleStep
        formData={mockFormData}
        enumValues={mockEnumValues}
        selectedParent={null}
        onInputChange={mockOnInputChange}
        onParentChange={mockOnParentChange}
      />
    );

    expect(screen.getByText("Entity Configuration")).toBeInTheDocument();
    expect(screen.getByText("Entity Type")).toBeInTheDocument();
    expect(screen.getByText("Role in Supply Chain")).toBeInTheDocument();
    expect(
      screen.getByText("This is a sub-entity (linked to a parent)")
    ).toBeInTheDocument();
  });

  it("should show parent selector when isSubEntity is true", () => {
    const formDataWithSubEntity = {
      ...mockFormData,
      isSubEntity: true,
    };

    render(
      <EntityTypeRoleStep
        formData={formDataWithSubEntity}
        enumValues={mockEnumValues}
        selectedParent={null}
        onInputChange={mockOnInputChange}
        onParentChange={mockOnParentChange}
      />
    );

    expect(screen.getByText("Parent Entity")).toBeInTheDocument();
  });

  it("should not show parent selector when isSubEntity is false", () => {
    render(
      <EntityTypeRoleStep
        formData={mockFormData}
        enumValues={mockEnumValues}
        selectedParent={null}
        onInputChange={mockOnInputChange}
        onParentChange={mockOnParentChange}
      />
    );

    expect(screen.queryByText("Parent Entity")).not.toBeInTheDocument();
  });

  it("should call onInputChange when checkbox is toggled", () => {
    render(
      <EntityTypeRoleStep
        formData={mockFormData}
        enumValues={mockEnumValues}
        selectedParent={null}
        onInputChange={mockOnInputChange}
        onParentChange={mockOnParentChange}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(mockOnInputChange).toHaveBeenCalledWith("isSubEntity", true);
  });

  it("should display the required fields legend", () => {
    render(
      <EntityTypeRoleStep
        formData={mockFormData}
        enumValues={mockEnumValues}
        selectedParent={null}
        onInputChange={mockOnInputChange}
        onParentChange={mockOnParentChange}
      />
    );

    expect(screen.getByText("* Required fields")).toBeInTheDocument();
  });
});
