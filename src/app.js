import express from "express";
import dotenv from "dotenv";
import simulateRouter from "./routes/simulate.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(
  cors({
    origin:
      process.env.MODE === "development"
        ? "http://localhost:5173"
        : "https://landingpage-adtech-api.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/simulate", simulateRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
