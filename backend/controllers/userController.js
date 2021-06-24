import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

// desc   : Fetch all users
// route  : GET /api/users
// access : public

const authUser = asyncHandler(async (req, res) => {
    try {
        const userData = req.body;
        const { email, password } = userData;

        const user = await User.findOne({ email: email });
        
        
        if (user && (await user.matchPassword(password))) {
            console.log("[INFO] : user " + user.name + " has logged in")
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: null,
            });
        }
    } catch (e) {
        res.status(401);
        throw new Error("Couldn't authenticate");
    }
});

const getUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (e) {
        throw new Error("Couldn't fetch all users list");
    }
});

export { authUser };
