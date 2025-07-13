import { Router } from "express";

import verifyToken from "../middlewares/verifyToken.js";
import { signUp, me, signOut } from "../controllers/auth.js";
import validateSchema from "../middlewares/validateSchema.js";
import leaderboardSchema from "../zod/leaderboardSchema.js";

const authRouter = Router();

authRouter.route("/signup").post(validateSchema(leaderboardSchema), signUp);

authRouter.route("/me").get(verifyToken, me);

authRouter.route("/signout").delete(signOut);

export default authRouter;
