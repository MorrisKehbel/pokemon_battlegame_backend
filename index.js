import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import "./db/index.js";
import leaderboardRouter from "./routes/leaderboardRoutes.js";
import authRouter from "./routes/authRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const CLIENT = process.env.CLIENT_URL;

app.use(
  cors({
    origin: CLIENT,
    credentials: true,
  })
);

app.use(express.json());

app.use("/leaderboard", leaderboardRouter);
app.use("/auth", authRouter);

app.get("/", (_req, res) => {
  res.send("Running");
});

app.use("/*splat", (req, res) => {
  throw new Error("Page not found", { cause: 404 });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
