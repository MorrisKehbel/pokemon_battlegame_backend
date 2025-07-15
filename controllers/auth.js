import { isValidObjectId } from "mongoose";
import jwt from "jsonwebtoken";
import Leaderboard from "../models/leaderboard.js";

const secret = process.env.JWT_SECRET;
const tokenOptions = { expiresIn: "6d" };
const isProduction = process.env.NODE_ENV === "production";
const cookieOptions = {
  httpOnly: true,
  sameSite: isProduction ? "None" : "Lax",
  secure: isProduction,
  maxAge: 6 * 24 * 60 * 60 * 1000,
};

const signUp = async (req, res) => {
  const { username, team, enemy, score, date } = req.sanitizedBody;

  const user = await Leaderboard.create({ username, team, enemy, score, date });

  if (!isValidObjectId(user._id)) {
    throw new Error("Invalid id", { cause: 400 });
  }

  const payload = { userId: user._id };

  const token = jwt.sign(payload, secret, tokenOptions);

  res.cookie("token", token, cookieOptions);

  res.status(201).json({ message: "Welcome" });
};

const me = async (req, res) => {
  const { userId } = req;

  if (!isValidObjectId(userId)) throw new Error("Invalid id", { cause: 400 });

  const user = await Leaderboard.findById(userId).lean();

  if (!user) throw new Error("User not found", { cause: 404 });

  res.json(user);
};

const signOut = async (req, res) => {
  res.clearCookie("token", cookieOptions);

  res.json({ message: "You have signed out." });
};

export { signUp, me, signOut };
