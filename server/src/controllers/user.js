import { createError } from "../helpers/error";
import * as services from "../services/user";

export const getCurrentUser = async (req, res, next) => {
  const { id } = req.user;
  // console.log(id);
  try {
    const response = await services.getOneUserService(id);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
