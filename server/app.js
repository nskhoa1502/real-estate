import express from "express";
const helmet = require("helmet");

const app = express();

app.listen(5000, () => {
  console.log("App is running at port 5000");
});
