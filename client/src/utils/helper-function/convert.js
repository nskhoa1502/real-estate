export function formatVietnameseText(text) {
  // Normalise the characters and remove diacritics
  const normalized = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Replace forward slashes ("/") with hyphens ("-")
  const replaced = normalized.replace(/\//g, "-");

  // Convert to lowercase and replace spaces with hyphens
  const formatted = replaced.toLowerCase().replace(/\s+/g, "-");

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

export const formatContent = (content) => {
  const oddEl = content?.filter((item, index) => index % 2 !== 0);
  const evenEl = content?.filter((item, index) => index % 2 === 0);

  const formatCont = evenEl?.map((item, index) => {
    return {
      left: item,
      right: oddEl?.map((item2, index2) => item2)[index],
    };
  });

  return formatCont;
};
