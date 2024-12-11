import express from "express";
import { checkLoggedIn } from "../middlewares/auth.middleware.js";

import {
  googleAuth,
  googleAuthCallback,
  getUser,
  logout,
  failure,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/google", googleAuth);
router.get("/google/callback", googleAuthCallback);
router.get("/user", checkLoggedIn, getUser);
router.get("/logout", checkLoggedIn, logout);
router.get("/failure", failure);

export default router;
