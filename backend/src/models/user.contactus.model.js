const mongoose = require('mongoose');
const Joi = require('joi');
const userContactUsValidation = require('../validation/userContactUs.joi');
const ApiError = require('../utils/apiError');

const userContactUsSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"UserName is required"],
        trim:true
    },
    mobileNumber:{
        type:String,
        required:[true, "MobileNumber is required"]
    },
    emailAddress:{
        type:String,
        required:[true,"Email address is required"],
        trim:true
    },
    message:{
        type:String,
        required:[true,"Message field is required"],
        trim:true
    }
},{
    collection:"UserContactUs",
    timestamps:true
});


// userContactUsSchema.pre('save', async function(next){
//    try {
//         const {error} = userContactUsValidation.validate(this.toObject(), {abortEarly: false});
//         if(error){
//             const errorMessages = error.details.map(err => err.message).join(',');
//             throw new ApiError(400, errorMessages);
//         }
//         next();
//    } catch (error) {
//         next(error);
//    }
// })

const userContactUs = mongoose.model("UserContactUs", userContactUsSchema);

module.exports = userContactUs;