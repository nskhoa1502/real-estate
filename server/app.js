import express from "express";
require("dotenv").config();
import initRoutes from "./src/routes";
import cors from "cors";
require("./src/config/connectDatabase");

const app = express();

// middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// initroutes
initRoutes(app);

// Error handling
app.use((err, req, res, next) => {
  console.log("Error:", err);
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
