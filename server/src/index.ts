import "./global";
import http from "http";
import express from "express";
import notFoundMiddleware from "./middlewares/notFound";
import errorHandlingMiddleware from "./middlewares/errorHandler";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import userRouter from "./routers/user";

// creating servers
const expressApp = express();
const server = http.createServer(expressApp);
const app = express.Router();

// lib middlewares
expressApp.use(helmet());
expressApp.use(logger("dev"));
expressApp.use(express.json({ limit: "50mb" }));
expressApp.use(express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 }));
expressApp.use(cookieParser());
expressApp.use(cors(config.cors));

// custom middlewares
expressApp.use(config.server.baseUrl, app);
expressApp.use(notFoundMiddleware);
expressApp.use(errorHandlingMiddleware);

// staring server
server.listen(config.server.port, () => console.log(`Server is started and listening on port ${config.server.port}`));

// routes
app.use("/user", userRouter);
