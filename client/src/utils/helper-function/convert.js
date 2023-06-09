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

export function convertPageNumbertoArr(count, length) {
  let max = Math.floor(count / length);
  let arrNumber = [];
  for (let i = 1; i <= max; i++) {
    arrNumber.push(i);
  }

  if (arrNumber.length > 4) {
    const filteredNumber = arrNumber.filter((number) => number < 5);
    return filteredNumber;
  } else return arrNumber;
}
