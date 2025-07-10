import { z } from "zod/v4";

const leaderboardSchema = z.object({
  username: z.string().min(1, "Username is required"),
  score: z.number().int().nonnegative("Score must be a non-negative integer"),
  date: z.date().optional(),
});

export default leaderboardSchema;
