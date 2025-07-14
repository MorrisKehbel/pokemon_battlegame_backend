import Leaderboard from "../models/leaderboard.js";
import { isValidObjectId } from "mongoose";

export const getAllLeaderboards = async (req, res) => {
  try {
    const leaderboards = await Leaderboard.find().sort({ score: -1, date: 1 });
    res.status(200).json(leaderboards);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getLeaderboardById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const leaderboard = await Leaderboard.findById(id);
    if (!leaderboard) {
      return res.status(404).json({ error: "Leaderboard entry not found" });
    }
    res.status(200).json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const createLeaderboard = async (req, res) => {
  const { username, team, score, date } = req.body;

  try {
    const newEntry = await Leaderboard.create({ username, team, score, date });
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ error: "Invalid data", details: err.message });
  }
};

export const updateLeaderboard = async (req, res) => {
  const { id } = req.params;
  const { username, team, score, date } = req.body;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const updated = await Leaderboard.findByIdAndUpdate(
      id,
      { username, team, score, date },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Entry not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: "Update failed", details: err.message });
  }
};

export const deleteLeaderboard = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const deleted = await Leaderboard.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Entry not found" });
    }
    res.status(200).json({ message: "Entry deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
