// Importing Dependencies
const { DataTypes } = require("sequelize");

// Creating DB Object
const db = require("../config/connection");

const Category = db.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "categories",
        key: "id",
      },
    },
  },
  {
    tableName: "Categories",
    timestamps: true,
  }
);

module.exports = Category;
