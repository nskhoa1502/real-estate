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
    next(createError(500, "Failed at register controller"));
  }
};
