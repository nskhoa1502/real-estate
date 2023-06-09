export function formatVietnameseText(text) {
  // Normalised the character
  const normalized = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Convert to lowercase and replace spaces with hyphens
  const formatted = normalized.toLowerCase().replace(/\s+/g, "-");

  return formatted;
}

export function truncateString(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  } else {
    return str.slice(0, maxLength) + "...";
  }
}
