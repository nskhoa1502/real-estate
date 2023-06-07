import express from "express";

const app = express();

// Error handling
app.use("/", (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal server error";
  const stack = err.stack;

  res.status(status).json({
    success: false,
    status: status,
    message: message,
    stack: stack,
  });
});

app.listen(5000, () => {
  console.log("App is running at port 5000");
});
