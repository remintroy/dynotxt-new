import dotenv from "dotenv";
dotenv.config();

function getConfig() {
  const configs: Configs = {
    server: {
      name: process.env.SERVER_NAME || "Dynotxt server",
      id: process.env.SERVER_ID || "1",
      port: Number(process.env.PORT) || 4501,
      baseUrl: "/",
      isProduction: process.env.NODE_ENV == "PRODUCTION",
      nodeEnv: process.env.NODE_ENV || "DEV",
    },
    mongodb: {
      url: process.env.MONGODB_URL || "mongodb://localhost:27017/dynotxt-db",
      db: process.env.MONGODB_DB || "dynotxt-db",
    },
    jwt: {
      accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "abfdc3843b403caf14cd1fe07658f7eb3c25be56",
    },
    cors: {
      origin: ["*"],
    },
  };

  return configs;
}

type getConfig = typeof getConfig;
export default getConfig;
