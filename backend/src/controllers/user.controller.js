const userService = require('../services/user.service');

const userContactUsController = async (req, res) => {
    const userContactUs = await userService.userContactUsService(req);
    res.status(201).json({success:true, message:"Contact us form posted successfully", data: userContactUs});
};


module.exports = {
    userContactUsController
}