require("dotenv").config();
const cors = require("cors");

const express = require("express");
const app = new express();
app.use(cors());

const psqlClient = require("./psql.js");
const redisClient = require("./redis.js");
const REDIS_KEY = "countries";

app.get("/countries", async (req, res) => {
  try {
    let source;
    let data = await queryCache();
    if (data) {
      source = "cache";
      console.log("data came from the cache", source);
    } else {
      data = await queryDatabase();
      await writeCache(data);
      source = "database";
      console.log(source);
      console.log(data);
    }
    res.status(200).send({ source, data });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.post("/clear_cache", async (req, res) => {
  try {
    await clearCache();
    res.status(200).send("OK");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.listen(process.env.PORT || 8000, () => console.log(`listening on ...`));

const queryDatabase = async () => {
  psqlClient.connect();
  const sql = "SELECT name from countries order by name";
  const result = await psqlClient.query(sql);
  return result.rows.map((row) => row["name"]);
};

const queryCache = async () => {
  await redisClient.connect();
  const stringData = await redisClient.get(REDIS_KEY);
  console.log(stringData);
  console.log(typeof stringData);
  console.log("data came from querying the cache");
  await redisClient.disconnect();
  return stringData ? JSON.parse(stringData) : null;
};

const writeCache = async (data) => {
  await redisClient.connect();
  await redisClient.set(REDIS_KEY, JSON.stringify(data));
  await redisClient.disconnect();
  console.log("we wrote to the cache for future querying");
};

const clearCache = async () => {
  await redisClient.connect();
  await redisClient.del(REDIS_KEY);
  await redisClient.disconnect();
  console.log("we cleared the cache");
};
