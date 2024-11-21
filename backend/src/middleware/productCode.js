const Product = require('../models/admin.product.model');

const getProductAndSetCode = async (req, res, next) => {
    try {
        const { productId } = req.params;

        // Fetch the existing product to get the productCode
        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
            return next(new ApiError(404, "Product not found."));
        }

        // Set productCode in the request object before file upload
        req.productCode = existingProduct.productCode;

        // Proceed with the next middleware
        next();
    } catch (error) {
        next(error);  // Pass any error to the error handler middleware
    }
};


module.exports = getProductAndSetCode;