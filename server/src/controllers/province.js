import { createError } from "../helpers/error";
import * as services from "../services/province";

export const getProvinces = async (req, res, next) => {
  try {
    const response = await services.getProvincesService();
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
