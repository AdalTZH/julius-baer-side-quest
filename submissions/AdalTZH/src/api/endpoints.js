/**
 * API Endpoint Constants
 * Centralizes all API endpoint paths for the Core Banking API
 */

export const ENDPOINTS = {
  AUTH_TOKEN: '/authToken',
  ACCOUNTS: '/accounts',
  ACCOUNT_VALIDATE: '/accounts/validate',
  ACCOUNT_BALANCE: '/accounts/balance',
  TRANSFER: '/transfer'
};

export const AUTH_CLAIMS = {
  ENQUIRY: 'enquiry',
  TRANSFER: 'transfer'
};

export const TEST_ACCOUNTS = {
  VALID: 'ACC1000',
  INVALID: 'ACC2000',
  NON_EXISTENT: 'ACC9999'
};
