import express from "express";
import * as insertController from "../controllers/insert";

const router = express.Router();

// post insert
router.post("/", insertController.insert);
router.post("/one", insertController.insertOne);
router.post("/paa", insertController.insertPriceAndAreas);

export default router;
