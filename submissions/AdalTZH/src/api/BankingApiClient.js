/**
 * Banking API Client
 * Modern JavaScript client for Core Banking API using fetch API
 */

import { ENDPOINTS } from './endpoints.js';

export class BankingApiClient {
  /**
   * Create a new BankingApiClient instance
   * @param {string} baseUrl - Base URL for the API (defaults to http://localhost:8123)
   */
  constructor(baseUrl = 'http://localhost:8123') {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
  }

  /**
   * Make an HTTP request with error handling
   * @param {string} url - Full URL to request
   * @param {Object} options - Fetch options
   * @returns {Promise<Response>} Fetch response
   * @throws {Error} If request fails
   */
  async request(url, options = {}) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      });

      return response;
    } catch (error) {
      throw new Error(`Network error: ${error.message}`);
    }
  }

  /**
   * Get authentication token with specified claim scope
   * @param {string} claim - Token claim (enquiry or transfer)
   * @param {string} username - Username for authentication
   * @param {string} password - Password for authentication
   * @returns {Promise<string>} JSON response as string
   */
  async getAuthToken(claim, username, password) {
    const url = `${this.baseUrl}${ENDPOINTS.AUTH_TOKEN}?claim=${encodeURIComponent(claim)}`;
    
    const response = await this.request(url, {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });

    const text = await response.text();
    
    if (!response.ok) {
      throw new Error(`Auth failed: ${response.status} ${response.statusText} - ${text}`);
    }

    return text;
  }

  /**
   * List all accounts
   * @returns {Promise<string>} JSON response as string
   */
  async listAccounts() {
    const url = `${this.baseUrl}${ENDPOINTS.ACCOUNTS}`;
    
    const response = await this.request(url, {
      method: 'GET'
    });

    const text = await response.text();
    
    if (!response.ok) {
      throw new Error(`Failed to list accounts: ${response.status} ${response.statusText} - ${text}`);
    }

    return text;
  }

  /**
   * Validate an account ID
   * @param {string} accountId - Account ID to validate
   * @returns {Promise<string>} Validation response as string
   */
  async validateAccount(accountId) {
    const url = `${this.baseUrl}${ENDPOINTS.ACCOUNT_VALIDATE}/${encodeURIComponent(accountId)}`;
    
    const response = await this.request(url, {
      method: 'GET'
    });

    const text = await response.text();
    
    // Validation endpoint may return non-200 for invalid accounts, but that's okay
    return text;
  }

  /**
   * Get account balance
   * @param {string} accountId - Account ID
   * @returns {Promise<string>} Balance response as string
   */
  async getAccountBalance(accountId) {
    const url = `${this.baseUrl}${ENDPOINTS.ACCOUNT_BALANCE}/${encodeURIComponent(accountId)}`;
    
    const response = await this.request(url, {
      method: 'GET'
    });

    const text = await response.text();
    
    if (!response.ok) {
      throw new Error(`Failed to get balance: ${response.status} ${response.statusText} - ${text}`);
    }

    return text;
  }

  /**
   * Transfer funds between accounts
   * @param {string} fromAccount - Source account ID
   * @param {string} toAccount - Destination account ID
   * @param {number} amount - Transfer amount
   * @returns {Promise<string>} Transfer response as string
   */
  async transferFunds(fromAccount, toAccount, amount) {
    const url = `${this.baseUrl}${ENDPOINTS.TRANSFER}`;
    
    const response = await this.request(url, {
      method: 'POST',
      body: JSON.stringify({
        fromAccount,
        toAccount,
        amount
      })
    });

    const text = await response.text();
    
    // Transfer endpoint may return non-200 for invalid transfers, but that's expected behavior
    return text;
  }
}
