import { DataTypes } from "sequelize";
import dbClient from "../config/dbClient";

const User = dbClient.sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    publicId: {
      type: DataTypes.UUID,
    },
    registrationId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middleName: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      unique: true,
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    lga: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    contactAddress: {
      type: DataTypes.STRING,
    },
    postalCode: {
      type: DataTypes.STRING,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
    },
    registrationStatus: {
      type: DataTypes.ENUM,
      defaultValue: "PENDING",
      values: ["PENDING", "APPROVED", "REJECTED"],
    },
    profileSetup: {
      type: DataTypes.ENUM,
      defaultValue: "PERSONAL_INFO",
      values: ["PERSONAL_INFO", "WORK_INFO", "COMPLETED"],
    },
    companyName: {
      type: DataTypes.STRING,
    },
    jobTitle: {
      type: DataTypes.STRING,
    },
    employmentStartDate: {
      type: DataTypes.STRING,
    },
    employmentType: {
      type: DataTypes.STRING,
    },
    employmentLocation: {
      type: DataTypes.STRING,
    },
    documents: {
      type: DataTypes.TEXT,
      get() {
        const value = this.getDataValue("documents");
        if (!value) return [];
        return JSON.parse(value);
      },
      set(value) {
        this.setDataValue("documents", JSON.stringify(value));
      },
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    isBanned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  { timestamps: true }
);

dbClient.sequelize
  .sync()
  .then(() => console.log("users table"))
  .catch((error) => console.error(error));

export default User;
