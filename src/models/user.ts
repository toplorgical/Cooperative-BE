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
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
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
    accountNumber: {
      type: DataTypes.VIRTUAL,
      get() {
        const _this: any = this;
        return _this.id;
      },
    },
    personalDetails: {
      type: DataTypes.TEXT,
      get() {
        const value = this.getDataValue("personalDetails");
        if (!value) return {};
        return JSON.parse(value);
      },
      set(value) {
        this.setDataValue("personalDetails", JSON.stringify(value));
      },
    },
    employmentDetails: {
      type: DataTypes.TEXT,
      get() {
        const value = this.getDataValue("employmentDetails");
        if (!value) return {};
        return JSON.parse(value);
      },
      set(value) {
        this.setDataValue("employmentDetails", JSON.stringify(value));
      },
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
    profileSetup: {
      type: DataTypes.ENUM,
      defaultValue: "personal-details",
      values: ["personal-details", "employment-details", "completed"],
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
  .sync({ alter: true })
  .then(() => {})
  .catch((error) => console.error(error));

// dbClient.sequelize
//   .query(`ALTER SEQUENCE \"users_id_seq\" RESTART WITH 1007897760;`)
//   .then(() => {})
//   .catch((error) => console.error(error));

export default User;
