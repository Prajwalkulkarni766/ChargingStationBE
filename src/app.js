import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { verifyJWT } from "./middlewares/auth.middleware.js";

const app = express();

// setting up middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

// import routes
import userRoute from "./routes/user.route.js";
import chargingStationRoute from "./routes/chargingStation.route.js";

// routes declaration
app.use("/api/v1/users", userRoute);
app.use(verifyJWT);
app.use("/api/v1/charging-stations", chargingStationRoute);

export default app;