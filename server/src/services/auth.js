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
    // Find or create will return a array
    // 1. [userData, true] ==> new user has been created
    // 2. [userData, false] ==> user has already existed
    const response = await db.User.findOrCreate({
      where: { phone: phone },
      defaults: {
        phone: phone,
        name: name,
        password: hashedPassword,
        id: uuidv4(),
      },
    });

    // If new user is created =>
    const token =
      response[1] &&
      jwt.sign(
        { id: response[0].id, phone: response[0].phone },
        process.env.JWT_SECRET,
        { expiresIn: "2d" }
      );

    if (!token) return createError(500, "User already exists");
    return { token: token, message: "Register succesfully" };
  } catch (err) {
    throw createError(500, "Failed at register service");
  }
};
