const { Client } = require("pg");

let client;

if (process.env.NODE_ENV !== "production") {
  client = new Client();
}

if (process.env.NODE_ENV === "production") {
  client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
}

module.exports = client;
