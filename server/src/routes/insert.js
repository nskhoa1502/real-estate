import express from "express";
import * as insertController from "../controllers/insert";

const router = express.Router();

// post insert
router.post("/", insertController.insert);
router.post("/one", insertController.insertOne);

export default router;
