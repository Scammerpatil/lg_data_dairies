/**
 * Formats a date in DD-MM-YYYY format.
 * @param {Date | string} date - The date to be formatted. Can be a Date object or a string that can be parsed into a Date.
 * @returns {string} - The formatted date in DD-MM-YYYY format.
 */
const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid date");
  }
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  return `${day}-${month}-${year}`;
};

export default formatDate;
