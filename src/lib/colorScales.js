import * as d3 from 'd3';

/**
 * Type 1a: Percentage
 * @param {number} value - A percentage (0-100)
 * @param {string} baseColor - The target high-intensity color
 * @returns {string} - HEX/RGB color
 */
export function percentageColor(value, baseColor = "#1a6b2a") {
  if (value === null || value === undefined || isNaN(value)) return "#e8e8e8";
  const scale = d3.scaleSequential(d3.interpolateRgb("#ffffff", baseColor)).domain([0, 100]);
  return scale(Math.max(0, Math.min(100, Number(value))));
}

/**
 * Type 1b: Absolute Number
 * Normalizes by the max value, then uses percentageColor
 * @param {number} value - The state's value
 * @param {number[]} allValues - Array of all state values to compute max
 * @param {string} baseColor - The target high-intensity color
 * @returns {string} - HEX/RGB color
 */
export function absoluteColor(value, allValues, baseColor = "#1a6b2a") {
  if (value === null || value === undefined || isNaN(value)) return "#e8e8e8";
  
  // Filter valid numbers
  const validValues = allValues.filter((v) => v !== null && v !== undefined && !isNaN(v)).map(Number);
  
  if (validValues.length === 0) return "#e8e8e8";
  
  const max = Math.max(...validValues);
  
  // If max is 0 or less, avoid division by zero (fallback to 0 percentage)
  if (max <= 0) return percentageColor(0, baseColor);
  
  const normalized = (Number(value) / max) * 100;
  return percentageColor(normalized, baseColor);
}

/**
 * Type 2: Binary
 */
export function binaryColor(value, catA, colorA, catB, colorB) {
  if (value === catA && catA) return colorA;
  if (value === catB && catB) return colorB;
  return "#f0f0f0"; // "Other" default
}

/**
 * Type 3: Multi-Category
 */
export function multiColor(value, categories = []) {
  if (!value) return "#f0f0f0";
  const match = categories.find((c) => c.name === value);
  return match ? match.color : "#f0f0f0";
}
