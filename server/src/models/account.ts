import { DataTypes } from "sequelize";
import dbClient from "../config/dbClient";
import User from "./user";

const Account = dbClient.sequelize.define(
  "account",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    balance: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0,
      get() {
        const value = this.getDataValue("balance");
        return value === null ? 0 : parseFloat(value);
      },
    },
  },
  { timestamps: true }
);

User.hasOne(Account);
Account.belongsTo(User, { foreignKey: "userId" });

dbClient.sequelize
  .sync()
  .then(() => console.log("account table"))
  .catch((error) => console.log(error));

export default Account;
