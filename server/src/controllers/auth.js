import { createError } from "../helpers/error.js";
import * as authService from "../services/auth";

export const register = async (req, res, next) => {
  console.log("Gọi route ở register");
  const { name, phone, password } = req.body;
  try {
    // Check if missing inputs data
    if (!name || !phone || !password)
      return next(createError(400, "Bad request register controller"));

    // Send data to service
    const response = await authService.registerService(req.body);

    return res.status(200).json(response);
  } catch (err) {
    next(createError(400, "Failed at register controller"));
  }
};

export const login = async (req, res, next) => {
  console.log("Gọi route ở Login");
  const { phone, password } = req.body;
  console.log(phone, password);
  try {
    // Check if missing inputs data
    if (!phone || !password)
      return next(createError(400, "Bad request - missing inputs"));
    // return res.status(400).json("Bad request, missing inputs");

    // Send data to service
    const response = await authService.loginService(req.body);

    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
