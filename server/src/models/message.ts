import { DataTypes } from "sequelize";
import dbClient from "../config/dbClient";
import User from "./user";

const Message = dbClient.sequelize.define(
  "message",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    from: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    to: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      defaultValue: "READ",
      allowNull: false,
      values: ["UNREAD", "READ"],
    },
    metadata: {
      type: DataTypes.TEXT,
      get() {
        const value = this.getDataValue("metadata");
        if (!value) return {};
        return JSON.parse(value);
      },
      set(value) {
        this.setDataValue("metadata", JSON.stringify(value));
      },
    },
  },
  { timestamps: true }
);

User.hasMany(Message);
Message.belongsTo(User, { foreignKey: "from" });
Message.belongsTo(User, { foreignKey: "to" });

dbClient.sequelize
  .sync({ alter: true })
  .then(() => console.log("message table sync"))
  .catch((error) => console.error(error));

export default Message;
