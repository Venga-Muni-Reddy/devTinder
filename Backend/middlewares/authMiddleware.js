const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) return res.status(401).json({ message: "Please Login" });

        const decoded = jwt.verify(token, "Dev@Tinder$790");
        const user = await User.findById(decoded._id);
        if (!user) return res.status(404).json({ message: "User not found" });

        req.user = user;
        next();
    } catch (error) {
        console.log("coming here")
        res.status(401).json({ message: "Unauthorized Person" });
    }
};

module.exports = { userAuth };
