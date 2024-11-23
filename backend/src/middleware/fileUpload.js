const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ApiError = require('../utils/apiError');
const generateCode = require('../utils/sequence');


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
                req.productCode = await generateCode('productCode','SSPBQ');
                return cb(null,`${req.productCode}-${file.fieldname}-${Date.now()}${extension}`)
            }
            cb(null,`${productCode}-${file.fieldname}-${Date.now()}${extension}`)
           
        } catch (error) {
            cb(error)
        }
       
    }
});

const storageImage = (folderPath) => multer.diskStorage({
    destination: function(req, file, cb){
        const uploadDir = path.join(__dirname, '..', 'public', folderPath);
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: async function(req, file, cb){
        try {

            const extension = path.extname(file.originalname);
    //  console.log("f",file.originalname.split('.')[0])
            cb(null,`${file.fieldname}-${file.originalname.split('.')[0]}-${Date.now()}${extension}`)
           
        } catch (error) {
            cb(error)
        }
       
    }
});

const uploadImage = (folderPath) => multer({
    storage:storageImage(folderPath),
    fileFilter:fileFilter,
    limits: { fileSize: 500 * 1024 }
});

const uploads = multer({
    storage:storageCategoryFiles,
    fileFilter:fileFilter,
    limits: { fileSize: 200 * 1024 }
});


const removeFileFromStroage = async (filePath,folder) =>{
    try {
        console.log("file",filePath, folder)
        const file = path.join(__dirname,'..','public',folder,filePath);
        // const exists = fs.access(file).then(() => true).catch(()=> false);
        if (fs.existsSync(file)) {
            await fs.unlinkSync(file); 
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
    uploadImage,
    removeFileFromStroage
}