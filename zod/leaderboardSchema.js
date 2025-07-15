import { z } from "zod/v4";

const leaderboardSchema = z.object({
  username: z.string().min(1, "Username is required"),
  team: z
    .array(z.string().min(1, "Pokemon name cant be empty"))
    .length(6, "Team needs to have 6 Pokemons"),
  enemy: z
    .array(z.string().min(1, "Pokemon name cant be empty"))
    .length(6, "Enemy needs to have 6 Pokemons"),
  score: z.number().int().nonnegative("Score must be a non-negative integer"),
  date: z.date().optional(),
});

export default leaderboardSchema;
