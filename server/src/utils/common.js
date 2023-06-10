export function extractPrice(priceString) {
  // Remove all non-numeric characters except dot (.)
  const numericString = priceString.replace(/[^\d.]/g, "");

  // Parse the numeric string to float
  const numericValue = parseFloat(numericString);

  // Check if the numeric value is greater than 500
  if (numericValue > 500) {
    // Divide the numeric value by 1 million and round to 2 decimal places
    return parseFloat((numericValue / 1000000).toFixed(2));
  }

  return numericValue;
}

export function extractArea(areaString) {
  // Match the whole number before the dot or "m"
  const match = areaString.match(/(\d+)(?=\.|m)/);

  // Extract the matched number
  if (match) {
    return parseInt(match[0]);
  }

  return null; // Return null if no match is found
}
