import { format, parseISO } from "date-fns";

/**
 * Formats an ISO date-time string to a human-readable format.
 * @param {string} isoDate The ISO date-time string to format.
 * @param {string} formatStr The string format to use.
 * @returns {string} The formatted date-time string.
 */
export const formatDate = (isoDate, formatStr = "dd-MM-yyyy HH:mm") => {
  if (!isoDate) return ""; // return empty string if no date provided

  const date = parseISO(isoDate);
  return format(date, formatStr);
};

//Made by ChatGPT-4
