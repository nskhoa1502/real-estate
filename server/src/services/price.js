import db from "../models";

// GET ALL Price
export const getPricesService = async () => {
  try {
    const response = await db.Price.findAll({
      raw: true,
      attributes: [`code`, `value`],
    });

    return { response: response, message: "Fetch prices success" };
  } catch (err) {
    throw err;
  }
};
