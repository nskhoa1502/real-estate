import jwt from "jsonwebtoken";
import { createError } from "../helpers/error";
require("dotenv").config();

export const verifyToken = (req, res, next) => {
  let accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken) throw createError(401, "Missing access token");

  jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
    if (err) throw createError(401, "Access token expired");
    req.user = user;
    next();
  });
};
