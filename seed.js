const fs = require("fs");
const psqlClient = require("./psql.js");
require("dotenv").config();

const postToDatabase = async () => {
  if (process.env.NODE_ENV !== "production") {
    const seedQuery = fs.readFileSync("./seed.data.sql", { encoding: "utf8" });
    psqlClient.connect();
    const result = await psqlClient.query(seedQuery, (err, res) => {
      if (err) {
        console.log(err, err.message);
      }
      console.log("Seeding Completed!", res);

      psqlClient.end();
    });
  }
};

postToDatabase();

// const queryDatabase = async () => {
//   psqlClient.connect();
//   const sql = "SELECT name from countries order by name";
//   const result = await psqlClient.query(sql);
//   psqlClient.end();
//   return console.log(result.rows.map((row) => row["name"]));
// };

// queryDatabase();

// const deleteFromDatabase = async () => {
//   psqlClient.connect();
//   const sql = "DROP TABLE IF EXISTS countries;"
//   const result = await psqlClient.query(sql);
//   psqlClient.end()
//   console.log(result)
// }

// deleteFromDatabase()
