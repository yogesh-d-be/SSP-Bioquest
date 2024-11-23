const express = require('express');
const adminRouter = express.Router();
const path = require('path');
const adminController = require('../controllers/admin.controller');
const fileUpload  = require('../middleware/fileUpload');
const {verifyAccessToken} = require('../middleware/auth');
const getProductAndSetCode = require('../middleware/productCode');


//authentication
adminRouter.post('/login',adminController.adminLoginController);
adminRouter.post('/refreshaccesstoken',adminController.adminRefreshAccessTokenController);


//admin main category
adminRouter.post('/createcategory', verifyAccessToken("admin"),fileUpload.uploadImage('categoryImages').single('mainCategoryImage'), adminController.createCategoryController);
adminRouter.get('/listcategory', verifyAccessToken("admin"), adminController.listCategoryController);
adminRouter.put('/updatecategory/:categoryId', verifyAccessToken("admin"),fileUpload.uploadImage('categoryImages').single('mainCategoryImage'), adminController.updateCategoryController);
adminRouter.delete('/removecategory/:categoryId', verifyAccessToken("admin"), adminController.removeCategoryController);

adminRouter.use('/categoryImages', express.static(path.join(__dirname,"..","public","categoryImages")));


//admin product
adminRouter.post('/createproduct',verifyAccessToken("admin"),
fileUpload.uploads.fields([
{ name: 'productImage', maxCount: 2 },
{ name: 'brochure', maxCount: 1 }]),adminController.createProductController);

adminRouter.get('/listproduct',verifyAccessToken("admin"),adminController.listProductController);
adminRouter.put('/updateproduct/:productId',verifyAccessToken("admin"),getProductAndSetCode,
fileUpload.uploads.fields([
    { name: 'productImage', maxCount: 2 },
    { name: 'brochure', maxCount: 1 }]),adminController.updateProductController);
adminRouter.delete('/removeproduct/:productId',verifyAccessToken("admin"),adminController.removeProductController);

adminRouter.use('/categoryFiles', express.static(path.join(__dirname,"..","public","categoryFiles")));


//admin partner company
adminRouter.post('/createpartnercompany', verifyAccessToken("admin"), fileUpload.uploadImage('partnerCompany').fields([{name:'companyImage',maxCount:10}]),adminController.createPartnerCompanyController)
adminRouter.get('/listpartnercompany', verifyAccessToken("admin"), adminController.listPartnerCompanyController)
// adminRouter.put('/updatepartnercompany/:companyId', verifyAccessToken("admin"), fileUpload.uploadImage('partnerCompany').fields([{name:'companyImage',maxCount:10}]),adminController.updatePartnerCompanyController)
// adminRouter.delete('/removepartnercompany', verifyAccessToken("admin"),adminController.removePartnerCompanyController)

adminRouter.get('/listcontactus', verifyAccessToken("admin"), adminController.listContactUsController)

module.exports = adminRouter;