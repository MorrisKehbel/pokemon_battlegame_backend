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
    default: [],
  },
  score: {
    type: Number,
    default: 0,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default model("Leaderboard", leaderboardSchema);
