import Leaderboard from "../models/leaderboard.js";
import { isValidObjectId } from "mongoose";

export const getAllLeaderboards = async (req, res) => {
  const leaderboards = await Leaderboard.find().sort({ score: -1, date: 1 });

  if (!leaderboards || leaderboards.length === 0) {
    throw new Error("No leaderboard entries found", { cause: 404 });
  }

  return res.status(200).json(leaderboards);
};

export const getLeaderboardById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new Error("Invalid id", { cause: 400 });
  }

  const leaderboard = await Leaderboard.findById(id);

  if (!leaderboard) {
    throw new Error("Leaderboard entry not found", { cause: 404 });
  }

  return res.status(200).json(leaderboard);
};

export const createLeaderboard = async (req, res) => {
  const { username, score, date } = req.sanitizedBody;

  const newLeaderboard = await Leaderboard.create({ username, score, date });

  return res.status(201).json(newLeaderboard);
};

export const updateLeaderboard = async (req, res) => {
  const {
    sanitizedBody,
    params: { id },
  } = req;

  if (!isValidObjectId(id)) {
    throw new Error("Invalid id", { cause: 400 });
  }

  const updated = await Leaderboard.findByIdAndUpdate(id, sanitizedBody, {
    new: true,
  });

  if (!updated) {
    throw new Error("Leaderboard entry not found", { cause: 404 });
  }

  return res.status(200).json(updated);
};

export const deleteLeaderboard = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new Error("Invalid id", { cause: 400 });
  }

  const deleted = await Leaderboard.findByIdAndDelete(id);

  if (!deleted) {
    throw new Error("Leaderboard entry not found", { cause: 404 });
  }

  return res.status(200).json({ message: "Leaderboard entry deleted" });
};
