import { createError } from "../helpers/error.js";
import * as authService from "../services/auth";

export const register = async (req, res, next) => {
  console.log("Gọi route ở register");
  const { name, phone, password } = req.body;
  try {
    if (!name || !phone || !password)
      return next(createError(400, "Bad Request"));

    const response = await authService.registerService(req.body);

    return res.status(response.status).json(response);
  } catch (err) {
    next(createError(400, "Failed at register controller"));
  }
};

export const login = async (req, res, next) => {
  console.log("Gọi route ở Login");
  const { phone, password } = req.body;
  console.log(phone, password);
  try {
    if (!phone || !password) return next(createError(400, "Bad Request"));

    const response = await authService.loginService(req.body);

    return res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};
