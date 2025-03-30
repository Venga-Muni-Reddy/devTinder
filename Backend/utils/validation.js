const vaildator = require("validator")

const validateEditProfileData = (req) =>{
    const allowedEditFields = ["gender","age","photoUrl","skills","about"]
    const isEditAllowed = Object.keys(req.body)
                        .every(field => allowedEditFields.includes(field))
    return isEditAllowed
}

module.exports={
    validateEditProfileData
}