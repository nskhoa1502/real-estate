export const extractNumbers = (string) => {
  const matches = string.match(/\d+/g);
  if (matches) {
    return matches.map((match) => parseInt(match));
  }
  return null;
};

/**
 * const string1 = 'Dưới 1 triệu';
 * const string2 = 'Từ 1 - 2 triệu';
 *
 *const numbers1 = extractNumbers(string1); --> [1]
 const numbers2 = extractNumbers(string2); --> [1,2]
 */
