import db from "../models";

// GET ALL Provinces
export const getProvincesService = async () => {
  try {
    const response = await db.Province.findAll({
      raw: true,
      attributes: [`code`, `value`],
    });

    return { response: response, message: "Fetch provinces success" };
  } catch (err) {
    throw err;
  }
};

// GET price via condition
