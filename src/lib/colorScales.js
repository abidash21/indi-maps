import * as d3 from 'd3';

// Reusable color scale for numeric range
// Uses d3.interpolateRgb, clamping between 0 and 100 for safety
const baseScale = d3.scaleSequential(d3.interpolateRgb("#ffffff", "#1a6b2a")).domain([0, 100]);

/**
 * Type 1a: Percentage
 * @param {number} value - A percentage (0-100)
 * @returns {string} - HEX/RGB color
 */
export function percentageColor(value) {
  if (value === null || value === undefined || isNaN(value)) return "#e8e8e8";
  return baseScale(Math.max(0, Math.min(100, Number(value))));
}

/**
 * Type 1b: Absolute Number
 * Normalizes by the max value, then uses percentageColor
 * @param {number} value - The state's value
 * @param {number[]} allValues - Array of all state values to compute max
 * @returns {string} - HEX/RGB color
 */
export function absoluteColor(value, allValues) {
  if (value === null || value === undefined || isNaN(value)) return "#e8e8e8";
  
  // Filter valid numbers
  const validValues = allValues.filter((v) => v !== null && v !== undefined && !isNaN(v)).map(Number);
  
  if (validValues.length === 0) return "#e8e8e8";
  
  const max = Math.max(...validValues);
  
  // If max is 0 or less, avoid division by zero (fallback to 0 percentage)
  if (max <= 0) return percentageColor(0);
  
  const normalized = (Number(value) / max) * 100;
  return percentageColor(normalized);
}

/**
 * Type 2: Binary
 * @param {string} value - The user's selection ("A", "B", or "Other")
 * @param {string} catA - Label for category A
 * @param {string} colorA - Color for category A
 * @param {string} catB - Label for category B
 * @param {string} colorB - Color for category B
 * @returns {string} - Selected color or light gray for "Other"
 */
export function binaryColor(value, catA, colorA, catB, colorB) {
  if (value === catA && catA) return colorA;
  if (value === catB && catB) return colorB;
  return "#f0f0f0"; // "Other" default
}

/**
 * Type 3: Multi-Category
 * @param {string} value - The user's selection
 * @param {Array<{name: string, color: string}>} categories - Up to 6 categories
 * @returns {string} - Matched color or light gray
 */
export function multiColor(value, categories = []) {
  if (!value) return "#f0f0f0";
  const match = categories.find((c) => c.name === value);
  return match ? match.color : "#f0f0f0";
}
