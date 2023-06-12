// Importing Dependencies
const { Sequelize } = require("sequelize");

// Environment Variables
const HOST = process.env.DB_HOST;
const DATABASE = process.env.DB_DATABASE;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

if (!HOST || !DATABASE || !USERNAME || !PASSWORD) {
  throw new Error("Database configuration missing!");
}

exports.dbConnection = async () => {
  // Passing a connecting URI
  const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
    host: HOST,
    dialect: "mysql",
    logging: false,
  });

  try {
    // Authenticating Sequelizer
    await sequelize.authenticate();
    // Syncing the model
    await sequelize.sync();
    console.log("Connection with DB Successfully Created");
    return sequelize;
  } catch (error) {
    // Throwing error in case of DB Failure
    console.error(`Unable to connect to database ${error}`);
    throw error;
  }
};
