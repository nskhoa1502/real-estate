import express from "express";

const router = express.Router();

router.use("/", (req, res, next) => {
  res.status(200).send("ok");
});

export default router;
