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
export const updateUser = async (req, res, next) => {
  const { id } = req.user;
  const payload = req.body;
  // console.log(id);
  // console.log(payload);

  if (!id) createError(400, "Missing id");
  if (!payload || Object.keys(payload).length === 0)
    createError(400, "Missing payload");
  try {
    const response = await services.updateUserService(id, payload);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
