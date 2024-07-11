import { DataTypes } from "sequelize";
import dbClient from "../config/dbClient";
import User from "./user"
import { duration } from "moment";



 const Loan = dbClient.sequelize.define('loan', {
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

  
});


 const LoanPayment = dbClient.sequelize.define('LoanPayment', {
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
  
  
});

// Define relationships
User.hasMany(Loan)
Loan.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(LoanPayment)
LoanPayment.belongsTo(User, { foreignKey: 'userId' });

Loan.hasMany(LoanPayment)
LoanPayment.belongsTo(Loan, { foreignKey: 'loanId' });





dbClient.sequelize
  .sync()
  .then(() => {console.log('loans table sync')})
  .catch((error) => console.error(error));


  export {Loan,LoanPayment}







