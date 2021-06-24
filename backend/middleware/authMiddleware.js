import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
    console.log("In middleware");
    let reqAuth = req.headers.authorization;

    let token;

    if (reqAuth && reqAuth.startsWith("Bearer")) {
        try {
            token = reqAuth.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_PASSWORD);
            console.log(decoded);

            //does not include password
            req.user = await User.findById(decoded.userId).select("-password");
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

export { protect };
