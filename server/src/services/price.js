import db from "../models";

// GET ALL Price
export const getPricesService = async () => {
  try {
    const response = await db.Price.findAll({
      raw: true,
      attributes: [`code`, `value`, `order`],
    });

    return { response: response, message: "Fetch prices success" };
  } catch (err) {
    throw err;
  }
};


// GET price via condition
