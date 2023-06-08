import express from "express";
import * as authController from "../controllers/auth";

const router = express.Router();

// post register
router.post("/register", authController.register);

// post login
router.post("/login", authController.login);

export default router;
