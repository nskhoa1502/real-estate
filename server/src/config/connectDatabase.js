const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "dpg-ckbupimct0pc738hg3b0-a.singapore-postgres.render.com",
    dialect: "postgres",
    logging: false,
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
  }
);

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

connectDatabase();
