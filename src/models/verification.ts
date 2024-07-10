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
  { timestamps: true }
);

dbClient.sequelize
  .sync()
  .then(() => {})
  .catch((error) => console.error(error));

// dbClient.sequelize
//   .query(`ALTER SEQUENCE \"verifications_id_seq\" RESTART WITH 3477879;`)
//   .then(() => {})
//   .catch((error) => console.error(error));

export default VerificationModel;
