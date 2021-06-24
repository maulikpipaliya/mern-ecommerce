import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

// desc   : Fetch all users
// route  : GET /api/users
// access : public

const authUser = asyncHandler(async (req, res) => {
    try {
        const userData = req.body;
        const { email, password } = userData;

        const user = await User.findOne({ email: email });

        if (user && (await user.matchPassword(password))) {
            console.log("[INFO] : user " + user.name + " has logged in");
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        }
    } catch (e) {
        res.status(401);
        throw new Error("Couldn't authenticate");
    }
});

const getUserProfile = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            });
        } else {
            res.status(404);
            throw new Error("User not valid");
        }
        res.status(200).json({ message: "success" });
    } catch (e) {
        throw new Error("Couldn't fetch profile");
    }
});

export { authUser, getUserProfile };
