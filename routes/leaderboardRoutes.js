import { Router } from "express";
import {
  getAllLeaderboards,
  updateLeaderboard,
} from "../controllers/leaderboardController.js";
import verifyToken from "../middlewares/verifyToken.js";
import leaderboardSchema from "../zod/leaderboardSchema.js";
import validateSchema from "../middlewares/validateSchema.js";

const leaderboardRouter = Router();

leaderboardRouter.route("/").get(getAllLeaderboards);

leaderboardRouter
  .route("/:id")
  .put(verifyToken, validateSchema(leaderboardSchema), updateLeaderboard);

export default leaderboardRouter;
