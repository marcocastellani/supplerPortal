import axios from 'axios';
import { ucpVersions } from '@/utils/apiVersions';

/**
 * Service for handling authorization and permission checks
 */
class AuthorizationService {
  private baseUrl = '/api/authorization';
  private apiVersion = ucpVersions['2024-12-13-preview'];

  /**
   * Gets the current user's roles
   */
  async getUserRoles(): Promise<string[]> {
    try {
      const response = await axios.get<string[]>(
        `${this.baseUrl}/roles?api-version=${this.apiVersion}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching user roles:', error);
      return [];
    }
  }

  /**
   * Gets accessible menu items for the current user
   */
  async getAccessibleMenuItems(): Promise<string[]> {
    try {
      const response = await axios.get<string[]>(
        `${this.baseUrl}/menu-items?api-version=${this.apiVersion}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching accessible menu items:', error);
      return [];
    }
  }

  /**
   * Checks if the current user can view a specific menu item
   */
  async canViewMenuItem(menuItemId: string): Promise<boolean> {
    try {
      const response = await axios.get<boolean>(
        `${this.baseUrl}/menu-items/${menuItemId}/can-view?api-version=${this.apiVersion}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error checking menu item permission for ${menuItemId}:`, error);
      return false;
    }
  }

  /**
   * Gets accessible regions for the current user
   */
  async getAccessibleRegions(): Promise<string[]> {
    try {
      const response = await axios.get<string[]>(
        `${this.baseUrl}/regions?api-version=${this.apiVersion}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching accessible regions:', error);
      return [];
    }
  }

  /**
   * Checks permission for a specific resource
   */
  async checkPermission(
    relation: string,
    objectType: string,
    objectId: string
  ): Promise<boolean> {
    try {
      const response = await axios.post<boolean>(
        `${this.baseUrl}/check-permission?api-version=${this.apiVersion}`,
        {
          relation,
          objectType,
          objectId
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error checking permission:', error);
      return false;
    }
  }
}

export const authorizationService = new AuthorizationService();