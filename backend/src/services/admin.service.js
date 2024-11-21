const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AdminLogin = require('../models/admin.login.model');
const Product = require('../models/admin.product.model');
const config = require('../config/config');
const authentication = require('../middleware/auth');
const ApiError = require('../utils/apiError');
const sequence = require('../utils/sequence');
const supabase = require('../utils/uploadToSupabase');
const { createClient } = require('@supabase/supabase-js');
const { removeFileFromStroage } = require('../middleware/fileUpload');


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

// const createProductService = async (req) => {

//   // const { productFeature, productDescription, productName, subCategory, mainCategory } = req.body;
//   const { productImage, brochure } = req.files || {};
//     if (!productImage?.[0] || !brochure?.[0]) {
//         throw new ApiError(400, "Both product image and brochure are required.");
//     }
      


//   const productCode = await sequence.generateProductCode();
//   const bucketName = 'sspbioquest';
//   const imagePath = `SSPBioQuest/Product/${productCode}.${productImage[0].originalname.split('.').pop()}`;
//   const brochurePath = `SSPBioQuest/Brochure/${productCode}.${brochure[0].originalname.split('.').pop()}`;
//   console.time("supabaseUpload");
//   console.time('bufferTime');
// const imageBuffer = productImage[0].buffer;
// console.timeEnd('bufferTime');
// console.time('bufferTime br');
// const pdfBuffer = brochure[0].buffer;
// console.timeEnd('bufferTime br');
//       const [newProductImage, newBrochurePDF] = await Promise.all([
//           supabase.uploadFile(
//               bucketName,
//               imagePath,
//              imageBuffer,

//           ),
//           supabase.uploadFile(
//               bucketName,
//               brochurePath,
//              pdfBuffer,
              
//           ),
//       ]);
//       console.timeEnd("supabaseUpload");
//       if(!newProductImage || !newBrochurePDF ){
//         throw new ApiError(500, "Failed to upload files.");
//       }
    
//       const productData = {
//           ...req.body,
//           productCode,
//           productImage: newProductImage,
//           brochure: newBrochurePDF,
//       };
    
   
//       const savedProduct = await new Product(productData).save();
//       console.timeEnd("createProductService"); // End the product creation timer
//       return savedProduct;
     
// };

const createProductService = async (req) => {


    const { productImage, brochure } = req.files || {};
      if (!productImage?.length || !brochure?.[0]) {
          throw new ApiError(400, "Both product image and brochure are required.");
      }
        

    const productCode = req.productCode;
    // console.log("product",productImage, "br",brochure)
    const productImagePath = productImage.map((file)=>file.filename);
    const brochurePath = brochure[0]?.filename || null;

    if (!productImagePath|| !brochurePath) {
        throw new ApiError(404, "File name not found");
    }
        const productData = {
            ...req.body,
            productCode,
            productImage: productImagePath,
            brochure: brochurePath,
        };
      
     
       let savedProduct;
       try{
        savedProduct = await new Product(productData).save();
       }
       catch(error){
        if(productImagePath.length){
            productImagePath.forEach((filePath)=>removeFileFromStroage(filePath));
        }
        if(brochurePath){
            removeFileFromStroage(brochure)
        }
         throw new ApiError(500, "Error saving product and cleaning up files");
       }
       
        return savedProduct;
       
  };

  const listProductService = async (req) => {
    const {page = 1, limit = 10} = req.query;
    const skip = (page - 1)*limit;
    const productList = await Product.find({}).skip(skip).limit(limit,10).lean();
    if(!productList){
        throw new ApiError(404,"Product not found")
    }

    return productList;
  };

  const updateProductService = async (req) => {
    console.log("r",req.body)
    const {productId} = req.params;
    const { productImage, brochure } = req.files || {};
    const updateData = {...req.body};

    const existingProduct = await Product.findById(productId);
    
    const productCode = existingProduct.productCode;
    console.log("pr",productCode)
    if (!existingProduct) {
        throw new ApiError(404, "Product not found.");
    }

    if(productImage?.length){
        const updateProductImage = productImage.map((file)=> file.filename);
        if(existingProduct.productImage?.length){
            existingProduct.productImage.forEach((imagePath)=>{
                removeFileFromStroage(imagePath)
            })
        }
        updateData.productImage = updateProductImage;
    }
    if(brochure?.[0]){
        const updateBrochure = brochure[0].filename;
        if(existingProduct.brochure?.[0]){
            removeFileFromStroage(existingProduct.brochure)
        }
        updateData.brochure = updateBrochure;
    }

    updateData.productCode = productCode;
    const updateProduct = await Product.findByIdAndUpdate(productId, updateData, {new:true})
    return updateProduct;
  }

  const removeProductService = async (req) => {
    const { productId } = req.params;

    const existingProduct = await Product.findById(productId);
    
    if (!existingProduct) {
        throw new ApiError(404, 'Product not found, could not delete.');
    }

    const productImagePath = existingProduct.productImage?.map((file) => file) || [];
    const brochurePath = existingProduct.brochure || null;

    if (productImagePath.length > 0) {
        productImagePath.forEach((file) => removeFileFromStroage(file));
    }

    if (brochurePath) {
        removeFileFromStroage(brochurePath);
    }


    const removedProduct = await Product.findByIdAndDelete(productId);

    if (!removedProduct) {
        throw new ApiError(404, 'Product not found, could not delete.');
    }

    return removedProduct;
};


// const listProductService = async (req) => {
//     const listProduct = await Product.find({});
//     // console.log('lis',listProduct)
//     if(!listProduct || listProduct.length === 0){
//         throw new ApiError(404,"Product not found!")
//     }
//     const supabase = createClient(config.supabase.supabaseUrl, config.supabase.supabaseServiceKey);

//     const { data, error } = supabase
//     .storage
//     .from('sspbioquest')
//     .getPublicUrl('Brochure/SSPBQ092.pdf');
// if (error) {
//     console.error('Error generating public URL:', error.message);
// } else {
//     console.log('Public URL:', data.publicUrl);
// }

//     const allProducts = 
//         listProduct.map((product)=>{
//             const productImageURL = `${config.supabase.supabaseUrl}/storage/v1/object/public/sspbioquest/${product.productImage}`;
//             const brochureURL = `${config.supabase.supabaseUrl}/storage/v1/object/public/sspbioquest/${product.brochure}`;
//             // console.log(productImageURL, product.productImage)
//             return{
//                 ...product.toObject(),
//                 productImageURL,
//                 brochureURL
//             }
//         })
//     // const allProducts = await supabase.generateFilePathURL();
//     console.log("all",allProducts)
//     return allProducts;
 
// }
  

module.exports = {
    login,
    refreshAccessToken,
    createProductService,
    listProductService,
    updateProductService,
    removeProductService
}