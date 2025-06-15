// Enums
export enum EntityType {
  Supplier = 'Supplier',
  SubSupplier = 'SubSupplier',
  Site = 'Site',
  Person = 'Person',
  CompanyGroup = 'CompanyGroup'
}

export enum RoleInSupplyChain {
  Manufacturer = 'Manufacturer',
  Tannery = 'Tannery',
  Agent = 'Agent',
  Lab = 'Lab',
  QaManager = 'QaManager',
  Assembler = 'Assembler',
  Distributor = 'Distributor',
  Logistics = 'Logistics',
  ContactPerson = 'ContactPerson',
  TechnicalSupport = 'TechnicalSupport'
}

export enum AccreditationStatus {
  Draft = 'Draft',
  Submitted = 'Submitted',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Suspended = 'Suspended'
}

// DTOs
export interface SupplyNetworkEntityDto {
  id: string;
  externalCode: string;
  entityType: EntityType;
  parentId?: string;
  parentName?: string;
  legalName: string;
  shortName: string;
  vatCode: string;
  taxCode: string;
  country: string;
  region: string;
  city: string;
  address: string;
  zipCode: string;
  email: string;
  phoneNumber: string;
  contactPersonName: string;
  roleInSupplyChain: RoleInSupplyChain;
  tags: string[];
  active: boolean;
  accreditationStatus: AccreditationStatus;
  accreditationDate?: string;
  deactivationDate?: string;
  created: string;
  createdBy?: string;
  lastModified?: string;
  lastModifiedBy?: string;
}

// Commands
export interface CreateSupplyNetworkEntityCommand {
  externalCode: string;
  entityType: EntityType;
  parentId?: string;
  legalName: string;
  shortName: string;
  vatCode: string;
  taxCode: string;
  country: string;
  region: string;
  city: string;
  address: string;
  zipCode: string;
  email: string;
  phoneNumber: string;
  contactPersonName: string;
  roleInSupplyChain: RoleInSupplyChain;
  tags: string[];
  active: boolean;
  accreditationStatus: AccreditationStatus;
  accreditationDate?: string;
}

// Query Results
export interface GetSupplyNetworkEntitiesQueryResult {
  items: SupplyNetworkEntityDto[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

// Form Data Types
export interface SupplyNetworkEntityFormData {
  // Step 1: Entity Type & Role
  entityType: EntityType;
  roleInSupplyChain: RoleInSupplyChain;
  isSubEntity: boolean;
  parentId?: string;

  // Step 2: General Information
  legalName: string;
  shortName: string;
  externalCode: string;
  country: string;
  region: string;
  city: string;
  address: string;
  zipCode: string;
  email: string;
  phoneNumber: string;

  // Step 3: Status & Contact
  accreditationStatus: AccreditationStatus;
  tags: string[];
  contactPersonName: string;
  
  // Hidden fields
  vatCode: string;
  taxCode: string;
  active: boolean;
  accreditationDate?: string;
}

// Validation
export interface ValidateFieldResponse {
  isUnique: boolean;
}

// Enum Options for dropdowns
export interface EnumOption {
  value: string;
  display: string;
}

export interface EnumValues {
  entityTypes: EnumOption[];
  rolesInSupplyChain: EnumOption[];
  accreditationStatuses: EnumOption[];
}

// Search Result DTO (simplified for typeahead)
export interface SupplyNetworkEntitySearchResultDto {
  id: string;
  legalName: string;
  externalCode?: string;
  shortName?: string;
  entityType: string;
  vatCode?: string;
  email?: string;
  contactPersonName?: string;
  city?: string;
  country?: string;
  displayText: string;  // Computed field from backend
}

// Field Update DTO for inline editing
export interface UpdateEntityFieldRequest {
  fieldName: string;
  fieldValue: string | boolean | null;
}

// Document DTO for documents section
export interface EntityDocumentDto {
  id: string;
  entityId: string;
  fileName: string;
  fileSize: number;
  contentType: string;
  uploadedAt: string;
  uploadedBy: string;
  description?: string;
  documentType?: string;
}

// Query & Command DTOs
