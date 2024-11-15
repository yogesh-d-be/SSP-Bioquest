const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AdminLogin = require('../models/admin.login.model');
const Product = require('../models/admin.product.model');
const config = require('../config/config');
const authentication = require('../middleware/auth');
const ApiError = require('../utils/apiError');
const sequence = require('../utils/sequence');
const supabase = require('../utils/uploadToSupabase');

const login = async (req) =>{
    const {email, password} = req. body;

    const { adminEmail, adminPassword } = config.adminCredentials;

    let admin = await AdminLogin.findOne({});
    if(!admin){
        const hashedPassword = await bcrypt.hash(adminPassword,10);
        admin = await AdminLogin.create({email:adminEmail, password:hashedPassword});
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password)
    if(email !== admin.email || !isPasswordValid){
        throw new ApiError(400, "Invalid credentails")
    }
    const adminData = {_id:admin._id, role:admin.role}
    const [accessToken, refreshToken] = await Promise.all([
        authentication.generateAccessToken(adminData),
        authentication.generateRefreshToken(adminData),
    ]);


    return {accessToken,refreshToken}
   
};

const refreshAccessToken = async (req) => {
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        throw new ApiError(401,"No refresh token provided")
    }

    const decoded = await new Promise((resolve, reject) => { 
        jwt.verify(refreshToken, config.token.refreshSecretKey, (err, decoded) =>{
        if(err){
          reject(new ApiError(403,"Invalid or expired refresh token"));
        }else{
            resolve(decoded)
        }
    });
});
    const newAccessToken  = await authentication.generateAccessToken({_id:decoded.id});

    return {accessToken:newAccessToken};
}

// const createProductService = async (req) => {
//     console.log("req", req.body, req.files);

//     // Generate product code
//     let productCode = await sequence.generateProductCode();

//     // const { productFeature, productDescription, productName, subCategory, mainCategory } = req.body;
//     let newProductImage = null;
//     let newSpecificationsTable = null;

//     // Check if both images are provided
//     if (req.files && req.files.productImage && req.files.specificationsTable) {
//       const productFile = req.files.productImage[0];
//       const specFile = req.files.specificationsTable[0];

//       const productExtension = productFile.originalname.split('.').pop();
//       const specExtension = specFile.originalname.split('.').pop();

//       try {
//         // Upload images to Supabase and get URLs
//         [newProductImage, newSpecificationsTable] = await Promise.all([
//           supabase.uploadImage(
//             'sspbioquest',
//             `SSPBioQuest/Product/${productCode}.${productExtension}`,
//             productFile.buffer // Use buffer since we're in memory storage
//           ),
//           supabase.uploadImage(
//             'sspbioquest',
//             `SSPBioQuest/Specifications/${productCode}.${specExtension}`,
//             specFile.buffer // Use buffer for memory storage
//           ),
//         ]);
//       } catch (error) {
//         console.error("Error uploading images:", error);
//         throw error;  // Handle the error as needed
//       }
//     }

//     // Check that image URLs were returned before proceeding
//     if (!newProductImage || !newSpecificationsTable) {
//       throw new Error("Product image or specifications table upload failed.");
//     }

//     // Create the product object with uploaded image URLs
//     const products = {
//       ...req.body,
//       productCode,
//       productImage: newProductImage,
//       specificationsTable: newSpecificationsTable,
//     };

//     const createProducts = new Product(products);
//     return await createProducts.save();
// };

const createProductService = async (req) => {
  // const { productFeature, productDescription, productName, subCategory, mainCategory } = req.body;


  const productImage = req.files?.productImage?.[0];
  const specificationsTable = req.files?.specificationsTable?.[0];
  if (!productImage || !specificationsTable) {
      throw new ApiError(400,"Both product image and specifications table are required.");
  }

  const productCode = await sequence.generateProductCode();

  const productExtension = productImage.originalname.split('.').pop();
  const specExtension = specificationsTable.originalname.split('.').pop();

      // Upload images to Supabase and get URLs
      const [newProductImage, newSpecificationsTable] = await Promise.all([
          supabase.uploadImage(
              'sspbioquest',
              `SSPBioQuest/Product/${productCode}.${productExtension}`,
              productImage.buffer
          ),
          supabase.uploadImage(
              'sspbioquest',
              `SSPBioQuest/Specifications/${productCode}.${specExtension}`,
              specificationsTable.buffer
          ),
      ]);

      if(!newProductImage || !newSpecificationsTable){
        throw new ApiError(400,"Images not created. please try again")
      }
    
      const productData = {
          ...req.body,
          productCode,
          productImage: newProductImage,
          specificationsTable: newSpecificationsTable,
      };

    
      const createdProduct = new Product(productData);
      return await createdProduct.save();


};

  

module.exports = {
    login,
    refreshAccessToken,
    createProductService
}