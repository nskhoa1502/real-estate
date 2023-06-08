import { createError } from "../helpers/error";
import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
require("dotenv").config();

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const registerService = async ({ phone, password, name }) => {
  const hashedPassword = hashPassword(password);
  try {
    const response = await db.User.findOrCreate({
      where: { phone: phone },
      defaults: {
        phone: phone,
        name: name,
        password: hashedPassword,
        id: uuidv4(),
      },
    });

    const token =
      response[1] &&
      jwt.sign(
        { id: response[0].id, phone: response[0].phone },
        process.env.JWT_SECRET,
        { expiresIn: "2d" }
      );

    if (!token) return { status: 400, message: "User already exists" };
    return { status: 200, token: token, message: "Register successfully" };
  } catch (err) {
    throw createError(500, "Failed at register service");
  }
};

export const loginService = async ({ phone, password }) => {
  try {
    const response = await db.User.findOne({
      where: { phone: phone },
      raw: true,
    });

    if (!response) return { status: 404, message: "Invalid phone or password" };

    const isValidPassword = bcrypt.compareSync(password, response.password);

    if (!isValidPassword)
      return {
        status: 401,
        message: "Invalid phone or password",
      };

    const token = jwt.sign(
      { id: response.id, phone: response.phone },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    return { status: 200, token: token, message: "Login successfully" };
  } catch (err) {
    throw createError(500, "Failed at Login service");
  }
};
