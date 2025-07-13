import { Router } from "express";
import {
  createLeaderboard,
  deleteLeaderboard,
  getAllLeaderboards,
  getLeaderboardById,
  updateLeaderboard,
} from "../controllers/leaderboardController.js";
import leaderboardSchema from "../zod/leaderboardSchema.js";
import validateSchema from "../middlewares/validateSchema.js";

const leaderboardRouter = Router();

leaderboardRouter
  .route("/")
  .get(getAllLeaderboards)
  .post(validateSchema(leaderboardSchema), createLeaderboard);

leaderboardRouter
  .route("/:id")
  .get(getLeaderboardById)
  .put(validateSchema(leaderboardSchema), updateLeaderboard)
  .delete(deleteLeaderboard);

export default leaderboardRouter;
