import { DataTypes } from "sequelize";
import dbClient from "../config/dbClient";

const Wallet = dbClient.sequelize.define("wallet", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: false,
  },
  ref: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  loanId: {
    type: DataTypes.INTEGER,
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
});

dbClient.sequelize
  .sync()
  .then(() => console.log("wallet table"))
  .catch((error) => console.log(error));

export default Wallet;
