import express from "express";
import dotenv from "dotenv";
import simulateRouter from "./routes/simulate.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://landingtest-adtech-ui.onrender.com",
      ];
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
  })
);

app.use(express.json());
app.use("/simulate", simulateRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
