const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, emailId, password, age, gender,photoUrl,skills,about } = req.body;

        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
            age,
            gender,
            photoUrl,
            skills,
            about
        });
        await user.save();
        res.status(201).json({ message: "User added successfully" });
    } catch (error) {
        console.error("Error: " + error.message);
        res.status(500).json({ message: "Error adding user: " + error.message });
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        console.log(emailId+" == "+password)
        const user = await User.findOne({ emailId });

        if (!user) return res.status(400).json({ message: "Email not found" });

        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

        const token = await user.getJWT();
        res.cookie("token", token);
        res.json({ user, token });
        //res.send(user)

    } catch (error) {
        console.error("Error: " + error.message);
        res.status(500).json({ message: "Server error" });
    }
});

authRouter.post("/logout",async (req,res)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now())
    })

    res.send("Logout successfully")
})

module.exports = authRouter;
