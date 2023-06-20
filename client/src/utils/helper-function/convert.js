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
  if (str?.length <= maxLength) {
    return str;
  } else {
    return str?.slice(0, maxLength) + "...";
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

export const mapPercentagesToRange = (
  input,
  targetRangeStart,
  targetRangeEnd,
  targetIncrement = 1
) => {
  // Calculate the percentage value
  const percentage = input / 100;
  // console.log(`percentage `, percentage);

  // Calculate the size of the target range
  const targetRangeSize = targetRangeEnd - targetRangeStart;
  // console.log(`Range `, targetRangeSize);

  // Map the percentage to the target range
  let mappedValue = percentage * targetRangeSize;
  // console.log(`map value with incremental of 1 `, mappedValue);

  // Round the mapped value to the nearest increment
  mappedValue = Math.round(mappedValue / targetIncrement) * targetIncrement;
  // console.log(
  //   // `adjust map value due to incremental size of ${targetIncrement} `,
  //   mappedValue
  // );

  return mappedValue;
};

export const mapRangeToPercentage = (
  input,
  targetRangeStart,
  targetRangeEnd,
  targetIncrement = 1
) => {
  // Calculate the size of the target range
  const targetRangeSize = targetRangeEnd - targetRangeStart;

  // Calculate the ratio of the input value within the target range
  const ratio = input / targetRangeSize;

  // Calculate the percentage value
  let percentage = ratio * 100;

  // Round the percentage to the nearest increment
  percentage = Math.round(percentage / targetIncrement) * targetIncrement;

  return percentage;
};

export const extractCategoryCode = (category) => {
  return category
    ?.split(" ")
    ?.map((word) => word[0].toUpperCase())
    .join("");
};

export const convertDate = (dateString) => {
  const [day, month, year] = dateString.split("/");
  const date = new Date(`${+month}/${+day}/${+year}`).getTime();
  return date;
};

export const convertObjToArr = (object) => {
  const arr = Object.entries(object)?.map((item) => ({ [item[0]]: item[1] }));
  return arr;
};
