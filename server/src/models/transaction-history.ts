import { DataTypes } from "sequelize";
import dbClient from "../config/dbClient";
import User from "./user";

const TransactionHistory = dbClient.sequelize.define(
  "transactionHistory",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0,
      get() {
        const value = this.getDataValue("amount");
        return value === null ? 0 : parseFloat(value);
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: Date.now(),
    },

    metadata: {
      type: DataTypes.TEXT,
      get() {
        const value = this.getDataValue("metadata");
        if (!value) return [];
        return JSON.parse(value);
      },
      set(value) {
        this.setDataValue("metadata", JSON.stringify(value));
      },
    },
  },
  { timestamps: true }
);

User.hasMany(TransactionHistory);
TransactionHistory.belongsTo(User, { foreignKey: "userId" });

dbClient.sequelize
  .sync()
  .then(() => console.log("transaction history table"))
  .catch((error) => console.log(error));

export default TransactionHistory;
