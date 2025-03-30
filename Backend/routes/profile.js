const express = require("express");
const { userAuth } = require("../middlewares/authMiddleware");
const User= require("../models/user")
const { validateEditProfileData } = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, (req, res) => {
    res.json(req.user);
});

profileRouter.post("/profile/edit", userAuth, async (req, res) => {
    try {
      console.log("Request Body:", req.body); // Debugging
  
      if (!req.body) {
        return res.status(400).json({ error: "Invalid request body" });
      }
  
      const userId = req.user.id; // Ensure req.user exists
      const updateFields = req.body;
  
      const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.json({ message: "Profile updated successfully", data: updatedUser });
    } catch (error) {
      console.error("Profile update error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  




module.exports = profileRouter;
