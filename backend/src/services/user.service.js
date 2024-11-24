const userContactUs = require('../models/user.contactus.model');
const ApiError = require('../utils/apiError');
const userContactUsValidation = require('../validation/userContactUs.joi');
const sendMail = require('../utils/sendmail.service');


const userContactUsService = async (req) => {
    const {error} = userContactUsValidation.validate(req.body);
    if (error) {
        throw new ApiError(400, error.details.map(err => err.message).join(', '));
    }
    const { userName, mobileNumber, emailAddress, message} =req.body;

    const userContact = new userContactUs(req.body);
    let mailData ={
        userName, mobileNumber, emailAddress, message
    }
    sendMail.sendMailToAdmin(mailData);
    return await userContact.save()

};


module.exports = {
    userContactUsService
}