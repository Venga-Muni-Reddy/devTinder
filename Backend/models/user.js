const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    emailId: 
    { 
        type: String, 
        unique: true, 
        required: true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid emailId")
            }
        } 
    },
    password: { 
        type: String, 
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Weak password your password must be strong")
            }
        }

     },
    age: { type: Number },
    gender: { type: String },
    photoUrl:{type: String},
    about:{
        type:String,
        default:"This is default about for me"
    },
    skills:{type: [String]}


}, { timestamps: true });

userSchema.methods.getJWT = async function () {
    return jwt.sign({ _id: this._id }, "Dev@Tinder$790", { expiresIn: '7d' });
};

userSchema.methods.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
