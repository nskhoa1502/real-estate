require("dotenv").config;

// export const generateCode = (length, secret) => {
//   let result = "";
//   let merge = value + process.env.SECRET_GENERATE;
//   const characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   const charactersLength = characters.length;
//   let counter = 0;
//   while (counter < length) {
//     let index = Math.floor(length / 2);
//     result += merge.charAt(index);
//     counter += 1;
//   }
//   return result;
// };

// Create a function that generate a certain value based on the value input
export const generateCode = (value) => {
  if (!value) return null;
  let output = "";
  value = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("");
  let merge = value + process.env.SECRET_GENERATE;
  let length = merge.length;
  for (let i = 0; i < 4; i++) {
    let index =
      1 === i
        ? Math.floor(merge.length / 2 + length / 2)
        : Math.floor(length / 2);
    output += merge.charAt(index);
    length = index;
  }
  return `${value.charAt(0)}${output}`.toUpperCase();
};
