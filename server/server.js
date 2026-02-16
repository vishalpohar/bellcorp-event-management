import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import eventRoutes from "./routes/events.route.js";
import authRoutes from "./routes/auth.route.js";
import eventRegistrationsRoutes from "./routes/eventRegistrations.route.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/event-registrations", eventRegistrationsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Running at http://localhost:${PORT}`);
  connectDB();
});
