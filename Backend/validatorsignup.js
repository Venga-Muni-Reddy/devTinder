const  validator = require("validator")
const validateSignUp = (req)=>{
    const {firstName,lastName,emailId} = req.body
    if(!firstName || !lastName){
        throw new Error("Name not valid")
    }
    else if(!validator.isEmail(emailId))
        throw new Error("Email not valid")
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is too weak")
    }
}

module.exports = {
    validateSignUp
}