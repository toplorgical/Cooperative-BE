import { Sequelize } from "sequelize";
import config from "./config";

const url = config.DATABASE.URL as string;

const sequelize = new Sequelize(url, {
  dialect: "postgres",
  protocol: "postgres",
  define: {
    timestamps: false,
  },
  pool: {
    max: 1,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
});

async function connect() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
}

export default { sequelize, connect };
