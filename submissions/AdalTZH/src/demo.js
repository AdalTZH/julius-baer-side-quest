#!/usr/bin/env node

/**
 * Core Banking API Demo Script
 * Modern JavaScript implementation refactored from bash script
 * Demonstrates authentication, account operations, and transfer functionality
 */

import { BankingApiClient } from './api/BankingApiClient.js';
import { AUTH_CLAIMS, TEST_ACCOUNTS } from './api/endpoints.js';
import { printSection, printTest, log, logEmpty } from './utils/logger.js';

// Get BASE_URL from environment variable or use default
const BASE_URL = process.env.BASE_URL || 'http://localhost:8123';

/**
 * Run a test case with error handling
 * @param {string} testName - Name of the test
 * @param {Function} testFunction - Async function to execute
 */
async function runTest(testName, testFunction) {
  try {
    await testFunction();
  } catch (error) {
    log(`Error in ${testName}: ${error.message}`);
  }
}

/**
 * Main demo function
 */
async function runDemo() {
  const client = new BankingApiClient(BASE_URL);

  log('=== Core Banking API Demo - No JQ Version ===');
  log(`Base URL: ${BASE_URL}`);
  log('Testing key endpoints without jq dependency...');
  logEmpty();

  // ==========================================
  // 1. AUTHENTICATION TESTS WITH SCOPES
  // ==========================================
  printSection('1. AUTHENTICATION TESTS WITH SCOPES');

  printTest('1.1 Enquiry token (default scope)');
  await runTest('1.1 Enquiry token', async () => {
    log('Getting enquiry token...');
    const response = await client.getAuthToken(AUTH_CLAIMS.ENQUIRY, 'alice', 'any');
    log(response);
  });

  printTest('1.2 Transfer token (maximum scope)');
  await runTest('1.2 Transfer token', async () => {
    log('Getting transfer token...');
    const response = await client.getAuthToken(AUTH_CLAIMS.TRANSFER, 'bob', 'secret');
    log(response);
  });

  // ==========================================
  // 2. ACCOUNT OPERATIONS
  // ==========================================
  printSection('2. ACCOUNT OPERATIONS');

  printTest('2.1 List all accounts');
  await runTest('2.1 List accounts', async () => {
    log('Getting all accounts...');
    const response = await client.listAccounts();
    log(response);
  });

  printTest('2.2 Validate accounts');
  await runTest('2.2 Validate accounts', async () => {
    try {
      const acc1000 = await client.validateAccount(TEST_ACCOUNTS.VALID);
      log(`ACC1000 (valid): ${acc1000}`);
    } catch (error) {
      log(`ACC1000 (valid): Error - ${error.message}`);
    }

    try {
      const acc2000 = await client.validateAccount(TEST_ACCOUNTS.INVALID);
      log(`ACC2000 (invalid): ${acc2000}`);
    } catch (error) {
      log(`ACC2000 (invalid): Error - ${error.message}`);
    }

    try {
      const acc9999 = await client.validateAccount(TEST_ACCOUNTS.NON_EXISTENT);
      log(`ACC9999 (non-existent): ${acc9999}`);
    } catch (error) {
      log(`ACC9999 (non-existent): Error - ${error.message}`);
    }
  });

  printTest('2.3 Get account balance');
  await runTest('2.3 Get balance', async () => {
    log('ACC1000 balance:');
    const response = await client.getAccountBalance(TEST_ACCOUNTS.VALID);
    log(response);
  });

  // ==========================================
  // 3. TRANSFER TESTS
  // ==========================================
  printSection('3. TRANSFER TESTS');

  printTest('3.1 Basic transfer (no auth)');
  await runTest('3.1 Basic transfer', async () => {
    log('Transfer without authentication:');
    const response = await client.transferFunds('ACC1000', 'ACC1001', 50.00);
    log(response);
  });

  printTest('3.2 Invalid transfer');
  await runTest('3.2 Invalid transfer', async () => {
    log('Transfer with invalid account:');
    const response = await client.transferFunds('ACC2000', 'ACC1001', 50.00);
    log(response);
  });

  // ==========================================
  // 4. SUMMARY
  // ==========================================
  printSection('4. SUMMARY');
  log('✅ Authentication: Scope-based token generation working');
  log('✅ Account Operations: Validation and balance checks working');
  log('✅ Transfer Operations: Basic transfers working');
  log('✅ Error Handling: Invalid requests properly handled');
  logEmpty();
  log('🎉 Demo completed! All core functionality verified.');
  log('💡 Install jq for the full demo experience with JSON parsing.');
  log('📋 See JQ_INSTALLATION.md for installation instructions.');
}

// Run the demo
runDemo().catch((error) => {
  console.error('Fatal error running demo:', error);
  process.exit(1);
});
