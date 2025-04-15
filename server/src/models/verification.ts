import { DataTypes } from "sequelize";
import dbClient from "../config/dbClient";

const VerificationModel = dbClient.sequelize.define(
  "verification",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { timestamps: true, initialAutoIncrement: "239876" }
);

dbClient.sequelize
  .sync()
  .then(() => console.log("verification table"))
  .catch((error) => console.error(error));

export default VerificationModel;
