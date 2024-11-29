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

const adminLogoutController = catchAsync(async (req, res) => {
     await adminService.logoutService(req);
    res.clearCookie('refreshToken', {
        path: '/',
        secure: true,
        httpOnly: true,
        sameSite: 'Strict',
      });
    res.status(200).json({ success:true, message:"Logout successfully"});
});

const adminDashboardController = catchAsync(async (req, res) => {
    const dashboard = await adminService.dashboardService(req);
    res.status(200).json({ success:true, message:"Dashboard data listed successfully", data:dashboard});
});



const createCategoryController = catchAsync(async (req, res) => {
    const createCategory = await adminService.createCategoryService(req);
    res.status(201).json({success:true, message:"Category created successfully", data:createCategory})
})
const listCategoryController = catchAsync(async (req, res) => {
    const listCategory = await adminService.listCategoryService(req);
    res.status(200).json({success:true, message:"Category listed successfully", data:listCategory})
})
const updateCategoryController = catchAsync(async (req, res) => {
    const updateCategory = await adminService.updateCategoryService(req);
    res.status(200).json({success:true, message:"Category updated successfully", data:updateCategory})
})
const removeCategoryController = catchAsync(async (req, res) => {
    const removeCategory = await adminService.removeCategoryService(req);
    res.status(200).json({success:true, message:"Category removed successfully", data:removeCategory})
})

const createProductController = catchAsync(async (req, res) => {
    // console.time("createProductController");
    const createProduct = await adminService.createProductService(req);
    res.status(201).json({success:true, message:"Product create successfully", data:createProduct});
    // console.timeEnd("createProductController");
});

const listProductController = catchAsync(async (req, res) => {
    const listProduct = await adminService.listProductService(req);
    res.status(200).json({success:true, message:"Product listed successfully", data:listProduct});
});

const updateProductController = catchAsync(async (req, res) => {
    const listProduct = await adminService.updateProductService(req);
    res.status(200).json({success:true, message:"Product updated successfully", data:listProduct});
});

const removeProductController = catchAsync(async (req, res) => {
    const listProduct = await adminService.removeProductService(req);
    res.status(200).json({success:true, message:"Product deleted successfully", data:listProduct});
});

const createPartnerCompanyController = catchAsync(async (req, res) => {
    const createPartnerCompany = await adminService.createPartnerCompanyService(req);
    res.status(createPartnerCompany.statusCode).json({success:true, message:createPartnerCompany.message, data:createPartnerCompany.savedPartnerCompany});
});
const listPartnerCompanyController = catchAsync(async (req, res) => {
    const listPartnerCompany = await adminService.listPartnerCompanyService(req);
    res.status(200).json({success:true, message:"Company listed successfully", data:listPartnerCompany});
});
// const updatePartnerCompanyController = catchAsync(async (req, res) => {
//     const updatePartnerCompany = await adminService.updatePartnerCompanyService(req);
//     res.status(200).json({success:true, message:"Product deleted successfully", data:updatePartnerCompany});
// });
// const removePartnerCompanyController = catchAsync(async (req, res) => {
//     const removePartnerCompany = await adminService.removePartnerCompanyService(req);
//     res.status(200).json({success:true, message:"Product deleted successfully", data:removePartnerCompany});
// });

const listContactUsController = catchAsync(async (req, res) => {
    const  listContactUs = await adminService.listContactUsService(req);
    res.status(200).json({success:true, message:"User contact us listed successfully", data:listContactUs});
})

module.exports = {
    adminLoginController,
    adminRefreshAccessTokenController,
    adminLogoutController,

    adminDashboardController,

    createCategoryController,
    listCategoryController,
    updateCategoryController,
    removeCategoryController,

    createProductController,
    listProductController,
    updateProductController,
    removeProductController,

    createPartnerCompanyController,
    listPartnerCompanyController,

    listContactUsController
}