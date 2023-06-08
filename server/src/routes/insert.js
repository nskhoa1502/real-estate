import express from "express";
import * as insertController from "../controllers/insert";

const router = express.Router();

// post insert
router.post("/", insertController.insert);

export default router;
