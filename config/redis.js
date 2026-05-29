const { createClient } = require("redis");
require("dotenv").config();


const redisOptions = process.env.REDIS_URL
  ? { url: process.env.REDIS_URL }
  : {
      socket: {
        host: process.env.REDIS_HOST || "localhost",
        port: process.env.REDIS_PORT || 6379,
      },
    };

const redisClient = createClient(redisOptions);


redisClient.on("error", (err) => {
  console.log("Redis error:", err.message);
});

redisClient.on("connect", () => {
  console.log("Connected to Redis!");
});


const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
  } catch (err) {
    console.log("Could not connect to Redis:", err.message);
  }
};

module.exports = { redisClient, connectRedis };
