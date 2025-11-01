/**
 * Logging Utility
 * Provides structured logging functions matching the original bash script output format
 */

/**
 * Print a section header with decorative separators
 * @param {string} title - The section title to display
 */
export function printSection(title) {
  console.log('');
  console.log('==========================================');
  console.log(title);
  console.log('==========================================');
}

/**
 * Print a test case header
 * @param {string} name - The test case name
 */
export function printTest(name) {
  console.log('');
  console.log(`--- ${name} ---`);
}

/**
 * General logging function
 * @param {string} message - Message to log
 */
export function log(message) {
  console.log(message);
}

/**
 * Log an empty line for spacing
 */
export function logEmpty() {
  console.log('');
}
