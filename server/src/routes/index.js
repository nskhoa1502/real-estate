import authRouter from "./auth";
import insertRouter from "./insert";

const initRoutes = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/insert", insertRouter);

  return app.use("/", (req, res) => {
    res.send("SERVER ON");
  });
};

export default initRoutes;
