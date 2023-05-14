import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import { config } from "dotenv";

/**
 * Import routes
 */
import contact from "./routes";
import company from "./routes/company";

const app = express();

/**
 * Initialize dotenv
 */
config();

/**
 * Express configuration (compression, logging, body-parser,methodoverride)
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("tiny"));

/**
 * Set express variables
 * @param {string} host - Hostname
 * @param {number} port - Port
 */
app.set("host", process.env.HOST || "localhost");
app.set("port", process.env.PORT || 8080);

/**
 * Initialize routes
 */
app.use("/contact", contact);
app.use("/company", company);

export default app;
