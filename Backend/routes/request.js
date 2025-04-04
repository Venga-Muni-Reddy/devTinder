const express = require("express");
const { userAuth } = require("../middlewares/authMiddleware");
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user")

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
    const user = req.user;
    res.json({ message: `${user.firstName} sent a connection request` });
});

requestRouter.post("/request/send/:status/:toUserId",userAuth,async (req,res)=>{
    try{
        const fromUserId = req.user._id
        const toUserId = req.params.toUserId
        const status = req.params.status

        const allowedStatus = ["interested","ignored"]
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"Invalid status type "+status})
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {
                    fromUserId:toUserId,
                    toUserId:fromUserId
                }
            ],
        })

        const toUser = await User.findById(toUserId)
        if(!toUser){
            return res.status(404).json({message : "User not found"})
        }

        if(existingConnectionRequest){
            return res.status(400).send({message:"Connection request already existed"})
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        })

        const data = await connectionRequest.save()

        res.json({
            message:"Connection request sent successfully",
            data
        })


    }catch(error){
        res.status(404).send("ERROR : "+error.message)
    }
})

requestRouter.post("/request/review/:status/:requestId",
    userAuth,async (req,res)=>{
    try{
        const loggedInUser = req.user
        const {status,requestId} = req.params

        const allowedStatus = ["accepted","rejected"]
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"Status not allowed!"})
        }

        const connectionRequest = await ConnectionRequest.findOne(
            {
                _id:requestId,
                toUserId:loggedInUser._id,
                status:"interested",
            }
        )

        if(!connectionRequest){
            return res.status(404).json({
                message:"Connection request not found"
            })
        }
        connectionRequest.status = status

        const data = await connectionRequest.save()

        res.json({message:"Connection request "+status})
    }catch(error){
        res.status(400).send("ERROR : "+error.message)
    }
})

module.exports = requestRouter;
