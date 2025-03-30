const express = require("express");
const mongoose = require("mongoose");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/authMiddleware");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

// ✅ API to Get Received Connection Requests
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        console.log("User Name:", loggedInUser);

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId", ["firstName", "lastName"]);

        res.json({
            message: "Data fetched successfully",
            data: connectionRequests,
        });
    } catch (error) {
        console.error("Error in Received Requests:", error);
        res.status(400).json({ message: error.message });
    }
});

// ✅ API to Get Accepted Connections
// ✅ API to Get Accepted Connections
userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" },
            ],
        }).populate(["fromUserId", "toUserId"]); // Populate both users

        const connectionsData = connectionRequests.map(row => 
            row.fromUserId._id.equals(loggedInUser._id) ? row.toUserId : row.fromUserId
        );

        res.json({
            message: "Connections fetched successfully!!",
            data: connectionsData,
        });
    } catch (error) {
        console.error("Error in Connections API:", error);
        res.status(400).json({ message: error.message });
    }
});


// ✅ API to Fetch Users for Feed (Excluding Connected Users)
userRouter.get("/feed", userAuth, async (req, res) => {

    const page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10
    limit = limit>50?50:limit

    const skip = (page-1)*limit;
    try {
        const loggedInUser = req.user;
        if (!loggedInUser) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Fetch connection requests where the logged-in user is involved
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id},
                { toUserId: loggedInUser._id}
            ]
        }).select("fromUserId toUserId"); // Select only necessary fields


        // Store IDs of connected users in a Set
        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });

        // Also exclude the logged-in user
        hideUsersFromFeed.add(loggedInUser._id.toString());

        // Convert to ObjectId for querying
        const filteredUserIds = Array.from(hideUsersFromFeed).map(id => new mongoose.Types.ObjectId(id));

        // Fetch users excluding the connected ones
        const users = await User.find({
            _id: { $nin: filteredUserIds }
        }).select("firstName lastName emailId gender age createdAt")
        .skip(skip).limit(limit);
        // Select only necessary fields
        res.json({
            message: "Feed users fetched successfully",
            data: users
        });
    } catch (error) {
        console.error("Feed API Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

module.exports = userRouter;
