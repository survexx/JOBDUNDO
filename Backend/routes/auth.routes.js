import express from "express";
import {
    register,
    login,
    logout,
    updateProfile,
    getProfile, 
    refreshAccessToken
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { tryCatchHandler } from "../utils/tryCatchHandler.js";


const router = express.Router();

router.post("/register", tryCatchHandler(register));
router.post("/login", tryCatchHandler(login));
router.post("/logout", tryCatchHandler(logout));
router.post("/refresh", tryCatchHandler(refreshAccessToken));

router.route("/profile")
.get(isAuthenticated, tryCatchHandler(getProfile))
.post(isAuthenticated, tryCatchHandler(updateProfile));

export default router;