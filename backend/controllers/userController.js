import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

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
        } else {
            res.status(401);
            throw new Error("Invalid username or password");
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
                contact: user.contact,
                address: {
                    pincode: user.address.pincode,
                    city: user.address.city,
                    state: user.address.state,
                },
                isAdmin: user.isAdmin,
            });
        }
        // res.status(200).json({ message: "success" });
    } catch (e) {
        throw new Error("Couldn't fetch profile");
    }
});

const registerUser = asyncHandler(async (req, res) => {
    try {
        const userData = req.body;
        const { name, email, contact, password, address } = userData;

        const userExists = await User.findOne({ email: email });

        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        }

        const user = await User.create({
            name,
            email,
            password,
            address,
            contact,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            throw new Error("Invalid user data");
        }
    } catch (e) {
        res.status(401);
        throw new Error(e);
    }
});

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            address: {
                pincode: updatedUser.address.pincode,
                city: updatedUser.address.city,
                state: updatedUser.address.state,
            },
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});
export { authUser, getUserProfile, registerUser, updateUserProfile };
