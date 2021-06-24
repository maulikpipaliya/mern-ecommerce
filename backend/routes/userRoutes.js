import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
    authUser,
    getUserProfile,
    registerUser,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/login").post(authUser);
router.route("/profile").get(protect, getUserProfile);
router.route("/register").post(registerUser);

export default router;
