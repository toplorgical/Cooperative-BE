import { DataTypes } from "sequelize";
import dbClient from "../config/dbClient";
import User from "./user";
import { LoanPaymentProps } from "../types";

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
    totalAmount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0,
      get() {
        const value = this.getDataValue("totalAmount");
        return value === null ? 0 : parseFloat(value);
      },
    },
    amountPaid: {
      type: DataTypes.VIRTUAL,
      get() {
        const _this: any = this;
        const successfulPayments = _this?.loanPayments?.filter((item: LoanPaymentProps) => {
          return item?.status === "COMPLETED";
        }) as LoanPaymentProps[];
        return successfulPayments?.reduce((a, c) => a + c?.amount, 0);
      },
    },
    balance: {
      type: DataTypes.VIRTUAL,
      get() {
        const _this: any = this;
        const successfulPayments = _this?.loanPayments?.filter((item: LoanPaymentProps) => {
          return item?.status === "COMPLETED";
        }) as LoanPaymentProps[];
        const pendingPayments = _this?.loanPayments?.filter((item: LoanPaymentProps) => {
          return item?.status === "PENDING";
        }) as LoanPaymentProps[];

        const _pendingPayment = pendingPayments?.reduce((a, c) => a + c?.amount, 0);
        const _successfulPayment = successfulPayments?.reduce((a, c) => a + c?.amount, 0);
        return _successfulPayment - _pendingPayment;
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

const LoanPayment = dbClient.sequelize.define(
  "loanPayment",
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
    satus: {
      type: DataTypes.ENUM,
      defaultValue: "PENDING",
      allowNull: true,
      values: ["PENDING", "COMPLETED"],
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

// Define relationships
User.hasMany(Loan);
Loan.belongsTo(User, { foreignKey: "userId" });

User.hasMany(LoanPayment);
LoanPayment.belongsTo(User, { foreignKey: "userId" });

Loan.hasMany(LoanPayment);
LoanPayment.belongsTo(Loan, { foreignKey: "loanId" });

LoanType.hasMany(Loan);
Loan.belongsTo(LoanType, { foreignKey: "loanTypeId" });

dbClient.sequelize
  .sync()
  .then(() => {
    console.log("loans table sync");
  })
  .catch((error) => console.error(error));

export { Loan, LoanPayment, LoanType };
