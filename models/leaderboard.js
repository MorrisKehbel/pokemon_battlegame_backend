import { Schema, model } from "mongoose";

const leaderboardSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  team: {
    type: [String],
    required: true,
  },
  enemy: {
    type: [String],
  },
  score: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default model("Leaderboard", leaderboardSchema);
