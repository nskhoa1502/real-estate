import { createError } from "../helpers/error";
import * as services from "../services/area";

export const getAreas = async (req, res, next) => {
  try {
    const response = await services.getAreasService();
    return res.status(200).json(response.response);
  } catch (err) {
    next(err);
  }
};
