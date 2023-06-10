import { createError } from "../helpers/error";
import * as services from "../services/price";

export const getPrices = async (req, res, next) => {
  try {
    const response = await services.getPricesService();
    return res.status(200).json(response.response);
  } catch (err) {
    next(err);
  }
};
