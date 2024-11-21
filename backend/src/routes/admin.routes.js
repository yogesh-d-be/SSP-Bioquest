const express = require('express');
const adminRouter = express.Router();
const path = require('path');
const adminController = require('../controllers/admin.controller');
const {uploads} = require('../middleware/fileUpload');
const {verifyAccessToken} = require('../middleware/auth');
const getProductAndSetCode = require('../middleware/productCode');

adminRouter.post('/login',adminController.adminLoginController);
adminRouter.post('/refreshaccesstoken',adminController.adminRefreshAccessTokenController);

adminRouter.post('/createproduct',verifyAccessToken("admin"),
uploads.fields([
{ name: 'productImage', maxCount: 2 },
{ name: 'brochure', maxCount: 1 }]),adminController.createProductController);

adminRouter.get('/listproduct',verifyAccessToken("admin"),adminController.listProductController);
adminRouter.put('/updateproduct/:productId',verifyAccessToken("admin"),getProductAndSetCode,
uploads.fields([
    { name: 'productImage', maxCount: 2 },
    { name: 'brochure', maxCount: 1 }]),adminController.updateProductController);
adminRouter.delete('/removeproduct/:productId',verifyAccessToken("admin"),adminController.removeProductController);

adminRouter.use('/categoryFiles', express.static(path.join(__dirname,"..","public","categoryFiles")));


module.exports = adminRouter;