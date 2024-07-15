import { DataTypes } from "sequelize";
import dbClient from "../config/dbClient";
import User from "./user";

const Loan = dbClient.sequelize.define(
  "loan",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    loanTypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    disbursedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    approveAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM,
      defaultValue: "PENDING",
      allowNull: true,
      values: ["PENDING", "APPROVED", "REJECTED", "CANCELED"],
    },
  },
  { timestamps: true }
);

const LoanType = dbClient.sequelize.define(
  "loanType",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rate: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
      get() {
        const value = this.getDataValue("rate");
        return value === null ? 0 : parseFloat(value);
      },
    },
  },
  { timestamps: true }
);

User.hasMany(Loan);
Loan.belongsTo(User, { foreignKey: "userId" });

LoanType.hasMany(Loan);
Loan.belongsTo(LoanType, { foreignKey: "loanTypeId" });

dbClient.sequelize
  .sync()
  .then(() => console.log("loans table sync"))
  .catch((error) => console.error(error));

export { Loan, LoanType };
