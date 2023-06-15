import * as insertService from "../services/insert";
import { createError } from "../helpers/error.js";

export const insert = async (req, res, next) => {
  try {
    const response = await insertService.insertService();
    // console.log(response);

    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
export const insertOne = async (req, res, next) => {
  try {
    const response = await insertService.insertOneService();
    // console.log(response);

    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const insertPriceAndAreas = async (req, res, next) => {
  try {
    const response = await insertService.createPricesAndAreas();
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
