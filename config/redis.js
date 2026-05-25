const { createClient } = require("redis");
require("dotenv").config();

// create redis client
const redisOptions = process.env.REDIS_URL
  ? { url: process.env.REDIS_URL }
  : {
      socket: {
        host: process.env.REDIS_HOST || "localhost",
        port: process.env.REDIS_PORT || 6379,
      },
    };

const redisClient = createClient(redisOptions);

// log errors
redisClient.on("error", (err) => {
  console.log("Redis error:", err.message);
});

redisClient.on("connect", () => {
  console.log("Connected to Redis!");
});

// connect to redis
const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.log("Could not connect to Redis:", err.message);
  }
};

module.exports = { redisClient, connectRedis };
