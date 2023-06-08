import { createError } from "../helpers/error";
import * as services from "../services/category";

export const getCategories = async (req, res, next) => {
  try {
    const response = await services.getCategoriesService();
    return res.status(200).json(response.response);
  } catch (err) {
    next(err);
  }
};
