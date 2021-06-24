import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_PASSWORD, {
        expiresIn: "30d",
    });
};

export default generateToken ;
