const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sequence = require('../utils/sequence');
const ApiError = require('../utils/apiError');


// const storageMulter = multer.diskStorage();

const fileFilter = function( req, file, cb){
    // console.log(req)
    const allowedMimes = [
        'image/png',
        'image/jpg',
        'image/jpeg',
        'application/pdf'
    ];
    if(allowedMimes.includes(file.mimetype)){
        cb(null, true);
    }
    else{
        cb(new Error('unspported filetype'),false)
    }
};

const storageCategoryFiles = multer.diskStorage({
    destination: function(req, file, cb){
        const uploadDir = path.join(__dirname, '..', 'public', 'categoryFiles');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: async function(req, file, cb){
        try {

        
            const productCode = req.productCode || req.body.productCode;
            const extension = path.extname(file.originalname);
            if (!req.productCode) {
                req.productCode = await sequence.generateProductCode();
                return cb(null,`${req.productCode}-${file.fieldname}-${Date.now()}${extension}`)
            }
            cb(null,`${productCode}-${file.fieldname}-${Date.now()}${extension}`)
           
        } catch (error) {
            cb(error)
        }
       
    }
});



const uploads = multer({
    storage:storageCategoryFiles,
    fileFilter:fileFilter,
    limits: { fileSize: 200 * 1024 }
});


const removeFileFromStroage = (filePath) =>{
    try {
        const file = path.join(__dirname,'..','public','categoryFiles',filePath);
      
        if (fs.existsSync(file)) {
            fs.unlinkSync(file); // Use synchronous version for simplicity in small-scale use
            console.log(`File removed: ${file}`);
        } else {
                console.warn(`File not found: ${file}`);
            }
        
        
    } catch (error) {
        throw new ApiError(500, `Error removing file: ${error.message}`);
    }
};


module.exports = {
    uploads,
    removeFileFromStroage
}