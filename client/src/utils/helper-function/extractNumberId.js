export const extractNumbersFromId = (idString) => {
  return idString?.match(/\d/g).join("").slice(0, 6);
};
