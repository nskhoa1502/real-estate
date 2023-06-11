import db from "../models";

// GET ALL CATEGORY
export const getCategoriesService = async () => {
  try {
    const response = await db.Category.findAll({
      raw: true,
      // attributes: [`code`, `value`],
    });

    return { response: response, message: "Fetch categories success" };
  } catch (err) {
    throw err;
  }
};
export const getCategory = async () => {
  try {
  } catch (err) {
    throw err;
  }
};
// export const getCategories = async () => {
//   try {
//   } catch (err) {
//     next(err);
//   }
// };
// export const getCategories = async () => {
//   try {
//   } catch (err) {
//     next(err);
//   }
// };
