const { createClient } = require("redis");
require("dotenv").config();
const redisAuthString =
  process.env.REDIS_USER && process.env.REDIS_PASSWORD
    ? `${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@`
    : "";
const redisClient = createClient({
  url:
    process.env.REDIS_URL ||
    `redis://${redisAuthString}${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});
console.log(redisAuthString);

redisClient.on("error", (err) => console.log("Redis Client Error", err));

module.exports = redisClient;
