const catchAsync = require('../utils/catchAsync');
const adminService = require('../services/admin.service');

const adminLoginController = catchAsync(async (req, res) => {
    const {accessToken, refreshToken} = await adminService.login(req);
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite:'Strict',
        maxAge: 7*24*60*60*1000 //for 7 days
    })
    res.status(200).json({ success:true, message:"Login successfully", data:{accessToken}});
});

const adminRefreshAccessTokenController = catchAsync(async (req, res) => {
    const {accessToken} = await adminService.refreshAccessToken(req);
    res.status(200).json({ success:true, message:"New Access token created successfully", data:{accessToken}});
});


const createProductController = catchAsync(async (req, res) => {
    const createProduct = await adminService.createProductService(req);
    res.status(201).json({success:true, message:"Product create successfully", data:createProduct});
})



module.exports = {
    adminLoginController,
    adminRefreshAccessTokenController,
    createProductController
}