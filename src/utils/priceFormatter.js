/**
 * Adds commas to a number using Intl.NumberFormat
 * @param {number} number - The number to format
 * @returns {string} Number with commas
 */
export const formatNumber = (number) => {
	return new Intl.NumberFormat("en-US").format(number);
};
