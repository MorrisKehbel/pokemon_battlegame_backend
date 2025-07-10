import { Router } from "express";
import {
  createLeaderboard,
  deleteLeaderboard,
  getAllLeaderboards,
  getLeaderboardById,
  updateLeaderboard,
} from "../controllers/leaderboardController.js";
import validateBody from "../middlewares/validateSchema.js";
import leaderboardSchema from "../zod/leaderboardSchema.js";

const leaderboardRouter = Router();

leaderboardRouter
  .route("/")
  .get(getAllLeaderboards)
  .post(validateBody(leaderboardSchema), createLeaderboard);

leaderboardRouter
  .route("/:id")
  .get(getLeaderboardById)
  .put(validateBody(leaderboardSchema), updateLeaderboard)
  .delete(deleteLeaderboard);

export default leaderboardRouter;
