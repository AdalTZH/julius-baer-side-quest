/**
 * Formatting Utilities
 * Helper functions for formatting API responses and data for display
 */

/**
 * Format JSON response for pretty printing
 * @param {Object|string} data - JSON data to format
 * @returns {string} Formatted JSON string
 */
export function formatJSON(data) {
  try {
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }
    return JSON.stringify(data, null, 2);
  } catch (error) {
    return String(data);
  }
}

/**
 * Format a simple response value (for single-value responses like validation)
 * @param {string} value - The response value
 * @returns {string} Formatted value
 */
export function formatSimpleResponse(value) {
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (typeof parsed === 'object' && parsed !== null) {
        return formatJSON(parsed);
      }
      return String(parsed);
    } catch {
      return value;
    }
  }
  return String(value);
}
