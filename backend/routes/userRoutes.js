import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
} from "../controllers/userController.js";

const router = express.Router();

//Admin Routes
router.route("/").post(registerUser).get(protect, admin, getUsers);

router.route("/login").post(authUser);
router.route("/register").post(registerUser);
router
    .route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);


router
    .route("/:id")
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);
export default router;
