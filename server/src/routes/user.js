import express from "express";
import * as userController from "../controllers/user";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.use(verifyToken);

router.get("/get-current", userController.getCurrentUser);
router.put("/update", userController.updateUser);

export default router;
