// Utility functions for the APPHEALTH application

/**
 * Creates a page URL based on the page name
 * @param {string} pageName - The name of the page
 * @returns {string} - The formatted URL path
 */
export function createPageUrl(pageName) {
  const pageMap = {
    'Dashboard': '/',
    'Profile': '/profile',
    'Goals': '/goals',
    'History': '/history',
    'BMI': '/bmi',
    'Nutrition': '/nutrition'
  };
  
  return pageMap[pageName] || '/';
}

/**
 * Formats a date string to a readable format
 * @param {string|Date} date - The date to format
 * @returns {string} - The formatted date string
 */
export function formatDate(date) {
  if (!date) return '';
  
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

/**
 * Calculates BMI from weight and height
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @returns {number|null} - BMI value or null if invalid inputs
 */
export function calculateBMI(weight, height) {
  if (!weight || !height || weight <= 0 || height <= 0) {
    return null;
  }
  
  const heightInMeters = height / 100;
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
}

/**
 * Gets BMI category based on BMI value
 * @param {number} bmi - BMI value
 * @returns {string} - BMI category
 */
export function getBMICategory(bmi) {
  if (!bmi) return '';
  
  if (bmi < 18.5) return 'Abaixo do peso';
  if (bmi < 25) return 'Peso normal';
  if (bmi < 30) return 'Sobrepeso';
  return 'Obesidade';
}

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email format
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Formats numbers with proper locale
 * @param {number} number - Number to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted number string
 */
export function formatNumber(number, decimals = 0) {
  if (typeof number !== 'number') return '0';
  
  return number.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
