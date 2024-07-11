import { DataTypes } from "sequelize";
import dbClient from "../config/dbClient";
import User from "./user"
import { duration } from "moment";



export const Loan = dbClient.sequelize.define('loan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: true,
    defaultValue : 0
  },
  duration: {
    type: DataTypes.STRING,
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
    defaultValue: 'PENDING',
    allowNull: true,
    values:["PENDING","APPROVED","REJECTED","CANCELED"]
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
});


export const LoanPayment = dbClient.sequelize.define('LoanPayment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: true,
  },
satus: {
    type: DataTypes.ENUM,
    defaultValue: 'PENDING',
    allowNull: true,
    values:["PENDING", "COMPLETED", ]
  },
  loanId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Define relationships
User.hasMany(Loan)
Loan.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(LoanPayment)
LoanPayment.belongsTo(User, { foreignKey: 'userId' });

Loan.hasMany(LoanPayment)
LoanPayment.belongsTo(Loan, { foreignKey: 'loanId' });





dbClient.sequelize
  .sync({ alter: true })
  .then(() => {})
  .catch((error) => console.error(error));







