import { generateCode } from "./generateCode";

const prices = [
  { min: 0, max: 1, value: "Dưới 1 triệu" },
  { min: 1, max: 2, value: "Từ 1 - 2 triệu" },
  { min: 2, max: 3, value: "Từ 2 - 3 triệu" },
  { min: 3, max: 5, value: "Từ 3 - 5 triệu" },
  { min: 5, max: 7, value: "Từ 5 - 7 triệu" },
  { min: 7, max: 10, value: "Từ 7 - 10 triệu" },
  { min: 10, max: 15, value: "Từ 10 - 15 triệu" },
  { min: 15, max: 999999, value: "Trên 15 triệu" },
];

export const dataPrice = prices.map((item) => {
  return {
    code: generateCode(item.value),
    ...item,
  };
});

const areas = [
  { min: 0, max: 20, value: "Dưới 20m\u00B2" },
  { min: 20, max: 30, value: "Từ 20 - 30m\u00B2" },
  { min: 30, max: 50, value: "Từ 30 - 50m\u00B2" },
  { min: 50, max: 70, value: "Từ 50 - 70m\u00B2" },
  { min: 70, max: 90, value: "Từ 70 - 90m\u00B2" },
  { min: 90, max: 999999, value: "Trên 90m\u00B2" },
];

export const dataArea = areas.map((item) => {
  return {
    code: generateCode(item.value),
    ...item,
  };
});
