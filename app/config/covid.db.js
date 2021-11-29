const mysql = require("mysql");
const colors = require("colors");

const dotenv = require('dotenv');

dotenv.config();

const credentials = {
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DB
}

// Create a connection to the database
const db = mysql.createConnection(credentials);

db.connect(error => {
  if (error) throw error;
  console.log("Conectado a la base de datos exitosamente.".yellow);
});

module.exports = db;
