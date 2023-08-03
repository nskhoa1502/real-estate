import express from "express";
require("dotenv").config();
import initRoutes from "./src/routes";
import cors from "cors";
// import { dataPrice } from "./src/utils/data";
// import { dataArea } from "./src/utils/data";
import { getNumberFromString } from "./src/utils/common";
import chothuephongtro from "./src/data/cho-thue-can-ho.json";
import generateDate from "./src/utils/generateDate";

// console.log(chothuephongtro[1]);

// console.log(getNumberFromString(`123123hdfasdfa`));

// console.log(dataPrice);
// console.log(dataArea);

require("./src/config/connectDatabase");

const app = express();

// middlewares
app.use(
  cors({
    origin: "https://khoa-phongtro.netlify.app/",
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));

// initroutes
initRoutes(app);

// Error handling
app.use((err, req, res, next) => {
  // console.log("Error:", err);
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  const stack = err.stack || "";
  return res.status(status).json({
    success: false,
    status: status,
    message: message,
    stack: stack,
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is running at port ${port}`);
});
