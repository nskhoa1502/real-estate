import { extractNumbers } from "./extractNumbers";

export const getCode = (items) => {
  return items.map((item) => {
    const numbers = extractNumbers(item.value);
    let min, max;

    if (item.value.startsWith("Dưới")) {
      min = 0;
      max = numbers[0];
    } else if (item.value.startsWith("Trên")) {
      min = numbers[0];
      max = 99999999;
    } else {
      min = numbers[0];
      max = numbers[1];
    }

    return {
      ...item,
      min,
      max,
    };
  });
};
