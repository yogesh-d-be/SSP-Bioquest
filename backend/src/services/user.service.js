const userContactUs = require('../models/user.contactus.model');
const ApiError = require('../utils/apiError');
const userContactUsValidation = require('../validation/userContactUs.joi');

const userContactUsService = async (req) => {
    const {error} = userContactUsValidation.validate(req.body);
    if (error) {
        throw new ApiError(400, error.details.map(err => err.message).join(', '));
    }
    const userContact = new userContactUs(req.body);
    return await userContact.save()

};


module.exports = {
    userContactUsService
}