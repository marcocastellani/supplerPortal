import { 
  SupplyNetworkEntityDto, 
  CreateSupplyNetworkEntityCommand, 
  GetSupplyNetworkEntitiesQueryResult,
  ValidateFieldResponse,
  EnumValues,
  EntityType,
  AccreditationStatus
} from '../types/supplyNetworkEntities';

const API_BASE_URL = '/api/supplynetworkentities';

export class SupplyNetworkEntitiesService {
  
  /**
   * Get paginated list of supply network entities
   */
  static async getSupplyNetworkEntities(params: {
    page?: number;
    pageSize?: number;
    searchTerm?: string;
    entityType?: EntityType;
    accreditationStatus?: AccreditationStatus;
    active?: boolean;
    country?: string;
    tags?: string;
    sortBy?: string;
    sortDescending?: boolean;
  } = {}): Promise<GetSupplyNetworkEntitiesQueryResult> {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString());
      }
    });

    const response = await fetch(`${API_BASE_URL}?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch supply network entities: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Create a new supply network entity
   */
  static async createSupplyNetworkEntity(command: CreateSupplyNetworkEntityCommand): Promise<SupplyNetworkEntityDto> {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(command),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to create supply network entity: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get a single supply network entity by ID
   */
  static async getSupplyNetworkEntity(id: string): Promise<SupplyNetworkEntityDto> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch supply network entity: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get enum values for dropdowns
   */
  static async getEnumValues(): Promise<EnumValues> {
    const response = await fetch(`${API_BASE_URL}/enums`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch enum values: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Validate if external code is unique
   */
  static async validateExternalCode(externalCode: string): Promise<ValidateFieldResponse> {
    const response = await fetch(`${API_BASE_URL}/validate/external-code/${encodeURIComponent(externalCode)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to validate external code: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Validate if VAT code is unique
   */
  static async validateVatCode(vatCode: string): Promise<ValidateFieldResponse> {
    const response = await fetch(`${API_BASE_URL}/validate/vat-code/${encodeURIComponent(vatCode)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to validate VAT code: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get entities that can be used as parents (for sub-entities)
   */
  static async getPotentialParents(): Promise<SupplyNetworkEntityDto[]> {
    const result = await this.getSupplyNetworkEntities({
      pageSize: 100,
      active: true,
      sortBy: 'LegalName'
    });
    
    return result.items;
  }
}
