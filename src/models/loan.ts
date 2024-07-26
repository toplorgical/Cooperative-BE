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
      allowNull: false,
      defaultValue: 0,
      get() {
        const value = this.getDataValue("amount");
        return value === null ? 0 : parseFloat(value);
      },
    },
    loanTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    disbursedAt: {
      type: DataTypes.DATE,
    },
    approveAt: {
      type: DataTypes.DATE,
    },
    monthlyRepayment: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
      get() {
        const value = this.getDataValue("monthlyRepayment");
        return value === null ? 0 : parseFloat(value);
      },
    },
    totalInterest: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
      get() {
        const value = this.getDataValue("totalInterest");
        return value === null ? 0 : parseFloat(value);
      },
    },
    totalRepayments: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
      get() {
        const value = this.getDataValue("totalRepayments");
        return value === null ? 0 : parseFloat(value);
      },
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
    status: {
      type: DataTypes.ENUM,
      defaultValue: "PENDING",
      allowNull: false,
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
      allowNull: false,
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

const LoanGuarantor = dbClient.sequelize.define(
  "guarantor",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    registrationId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

User.hasMany(Loan);
Loan.belongsTo(User, { foreignKey: "userId" });

Loan.hasMany(LoanGuarantor);
LoanGuarantor.belongsTo(Loan, { foreignKey: "loanId" });

User.hasMany(LoanGuarantor);
LoanGuarantor.belongsTo(User, { foreignKey: "userId" });

LoanType.hasMany(Loan);
Loan.belongsTo(LoanType, { foreignKey: "loanTypeId" });

dbClient.sequelize
  .sync()
  .then(() => console.log("loans table sync"))
  .catch((error) => console.error(error));

export { Loan, LoanType, LoanGuarantor };
