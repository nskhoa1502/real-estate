import { extractNumbers } from "./extractNumbers";

export const transformObj = (items) => {
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

/**
 *
 * (3.5 triệu - 9 triệu) => (3 - 5 triệu) + (5 - 7 triệu) + (7 - 10 triệu)
 *
 * 3.5 <= Start <= 9  =====> (5 - 7 triệu) , (7 - 10 triệu) ==> accept
 *
 * 3.5 <= end <= 9 =====> (3 - 5 triệu), (5 - 7 triệu) ===> accept
 *
 * ==> Final Output :  (3 - 5 triệu) + (5 - 7 triệu) + (7 - 10 triệu)
 */

export const getCode = (arrMinMax, priceOrAreaArr) => {
  const transformedPriceOrArea = transformObj(priceOrAreaArr);

  return (
    transformedPriceOrArea?.filter(
      (item) =>
        // Min condition:
        (item?.min >= arrMinMax[0] && item?.min <= arrMinMax[1]) ||
        (item?.max >= arrMinMax[0] && item?.max <= arrMinMax[1])
    ) || undefined
  );
};
