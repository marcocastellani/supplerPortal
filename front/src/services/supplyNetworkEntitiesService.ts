import axios from 'axios';
import { 
  SupplyNetworkEntityDto, 
  CreateSupplyNetworkEntityCommand, 
  GetSupplyNetworkEntitiesQueryResult,
  ValidateFieldResponse,
  EnumValues,
  EntityType,
  AccreditationStatus,
  SupplyNetworkEntitySearchResultDto
} from '../types/supplyNetworkEntities';

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
    
    // Aggiungi la versione API richiesta
    queryParams.append('api-version', '2025-06-01');
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString());
      }
    });

    const response = await axios.get('/api/supplynetworkentities', {
      params: queryParams
    });

    return response.data;
  }

  /**
   * Create a new supply network entity
   */
  static async createSupplyNetworkEntity(command: CreateSupplyNetworkEntityCommand): Promise<SupplyNetworkEntityDto> {
    const params = new URLSearchParams();
    params.append('api-version', '2025-06-01');
    
    const response = await axios.post('/api/supplynetworkentities', command, {
      params
    });

    return response.data;
  }

  /**
   * Get a single supply network entity by ID
   */
  static async getSupplyNetworkEntity(id: string): Promise<SupplyNetworkEntityDto> {
    const params = new URLSearchParams();
    params.append('api-version', '2025-06-01');
    
    const response = await axios.get(`/api/supplynetworkentities/${id}`, {
      params
    });

    return response.data;
  }

  /**
   * Get enum values for dropdowns
   */
  static async getEnumValues(): Promise<EnumValues> {
    const params = new URLSearchParams();
    params.append('api-version', '2025-06-01');
    
    const response = await axios.get('/api/supplynetworkentities/enums', {
      params
    });

    return response.data;
  }

  /**
   * Validate if external code is unique
   */
  static async validateExternalCode(externalCode: string): Promise<ValidateFieldResponse> {
    const params = new URLSearchParams();
    params.append('api-version', '2025-06-01');
    
    const response = await axios.get(`/api/supplynetworkentities/validate/external-code/${encodeURIComponent(externalCode)}`, {
      params
    });

    return response.data;
  }

  /**
   * Validate if VAT code is unique
   */
  static async validateVatCode(vatCode: string): Promise<ValidateFieldResponse> {
    const params = new URLSearchParams();
    params.append('api-version', '2025-06-01');
    
    const response = await axios.get(`/api/supplynetworkentities/validate/vat-code/${encodeURIComponent(vatCode)}`, {
      params
    });

    return response.data;
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

  /**
   * Search for supply network entities (typeahead)
   */
  static async searchSupplyNetworkEntities(params: {
    searchTerm: string;
    entityType?: EntityType;
    maxResults?: number;
    activeOnly?: boolean;
  }): Promise<SupplyNetworkEntitySearchResultDto[]> {
    const queryParams = new URLSearchParams();
    queryParams.append('api-version', '2025-06-01');
    queryParams.append('searchTerm', params.searchTerm);
    
    if (params.entityType) {
      queryParams.append('entityType', params.entityType);
    }
    if (params.maxResults) {
      queryParams.append('maxResults', params.maxResults.toString());
    }
    if (params.activeOnly !== undefined) {
      queryParams.append('activeOnly', params.activeOnly.toString());
    }

    const response = await axios.get('/api/supplynetworkentities/search', {
      params: queryParams
    });

    return response.data;
  }
}
