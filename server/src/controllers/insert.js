import * as insertService from "../services/insert";
import { createError } from "../helpers/error.js";

export const insert = async (req, res, next) => {
  try {
    const response = await insertService.insertService();
    console.log(response);

    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
