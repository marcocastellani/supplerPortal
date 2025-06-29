import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { log } from "@/utils/logger";

/**
 * Centralized HTTP client with authentication and error handling [SF] [REH]
 */
class HttpClient {
  private axiosInstance: AxiosInstance;
  private currentToken: string | null = null;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:5257", // Default base URL - can be overridden
      timeout: 30000, // 30 second timeout
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  /**
   * Set up request and response interceptors [REH]
   */
  private setupInterceptors(): void {
    // Request interceptor - adds authentication token
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Add Bearer token if available
        if (this.currentToken) {
          config.headers.Authorization = `Bearer ${this.currentToken}`;
        }

        // Log API request
        log.api(config.method?.toUpperCase() || "REQUEST", config.url || "", {
          service: "httpClient",
          hasAuth: !!this.currentToken,
          params: config.params,
        });

        return config;
      },
      (error) => {
        log.error(
          "Request interceptor error",
          { service: "httpClient" },
          error
        );
        return Promise.reject(error);
      }
    );

    // Response interceptor - handles common errors
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log successful responses
        log.apiResponse(
          response.config.method?.toUpperCase() || "RESPONSE",
          response.config.url || "",
          response.status,
          {
            service: "httpClient",
            dataSize: response.data ? JSON.stringify(response.data).length : 0,
          }
        );

        return response;
      },
      (error) => {
        // Log error responses
        const status = error.response?.status;
        const url = error.config?.url || "unknown";

        log.error(
          `HTTP ${status} error`,
          {
            service: "httpClient",
            url,
            status,
            method: error.config?.method,
          },
          error
        );

        // Handle specific error cases
        if (status === 401) {
          // Token expired or invalid - could trigger re-authentication
          log.warn("Authentication required - token may be expired", {
            service: "httpClient",
            url,
          });

          // Optional: Emit event for global auth handling
          window.dispatchEvent(new CustomEvent("auth:token-expired"));
        } else if (status === 403) {
          log.warn("Access forbidden - insufficient permissions", {
            service: "httpClient",
            url,
          });
        } else if (status >= 500) {
          log.error("Server error encountered", {
            service: "httpClient",
            url,
            status,
          });
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * Set the authentication token for all requests [SF]
   */
  setAuthToken(token: string | null): void {
    this.currentToken = token;

    if (token) {
      this.axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      log.debug("Authentication token set", {
        service: "httpClient",
        tokenLength: token.length,
        tokenPrefix: token.substring(0, 10) + "...",
      });
    } else {
      delete this.axiosInstance.defaults.headers.common["Authorization"];
      log.debug("Authentication token cleared", { service: "httpClient" });
    }
  }

  /**
   * Get current authentication token
   */
  getAuthToken(): string | null {
    return this.currentToken;
  }

  /**
   * Check if client is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.currentToken;
  }

  /**
   * Set base URL for all requests
   */
  setBaseUrl(baseUrl: string): void {
    this.axiosInstance.defaults.baseURL = baseUrl;
    log.debug("Base URL updated", { service: "httpClient", baseUrl });
  }

  /**
   * GET request
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  /**
   * POST request
   */
  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  /**
   * PUT request
   */
  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  /**
   * PATCH request
   */
  async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.patch<T>(url, data, config);
    return response.data;
  }

  /**
   * DELETE request
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }

  /**
   * Get the raw axios instance for advanced usage
   */
  getInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

// Export singleton instance
export const httpClient = new HttpClient();

// Export default for convenience
export default httpClient;
