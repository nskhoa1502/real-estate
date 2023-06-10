import db from "../models";

// GET ALL Price
export const getAreasService = async () => {
  try {
    const response = await db.Area.findAll({
      raw: true,
      attributes: [`code`, `value`, `order`],
    });

    return { response: response, message: "Fetch areas success" };
  } catch (err) {
    throw err;
  }
};
