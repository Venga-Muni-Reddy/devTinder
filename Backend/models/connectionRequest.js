const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",//reference to user collection
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is not valid`
        }
    }
},
{
    timestamps:true,
}
)

connectionRequestSchema.pre("save",function(next){
    const connectionRequest=this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId))
        throw new Error("Cannot send request to yourself")

    next()
})

const ConnectionRequest = mongoose.model("ConnectionRequest",connectionRequestSchema)

module.exports = ConnectionRequest