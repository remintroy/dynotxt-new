declare const config: ReturnType<import("../config").default>;
declare const utils: import("../utils/index").default;

interface Configs {
  server: {
    name: string;
    id: string;
    port: number;
    baseUrl: string;
    isProduction: boolean;
    nodeEnv?: string;
  };
  mongodb: {
    url: string;
    db: string;
  };
  jwt: {
    accessTokenSecret: string;
  };
  cors: import("cors").CorsOptions; // types from cors library
}
