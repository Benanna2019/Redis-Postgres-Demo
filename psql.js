const { Client } = require("pg");
require("dotenv").config();

let client;

if (process.env.NODE_ENV !== "production") {
  client = new Client();
}

if (process.env.NODE_ENV === "production" && process.env.DATABASE_URL) {
  client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
}

module.exports = client;
