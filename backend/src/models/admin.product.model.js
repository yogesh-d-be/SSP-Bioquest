const mongoose = require('mongoose');

const stringRequired = {
    type:String,
    required:true
}

const productSchema = new mongoose.Schema({
    mainCategory:stringRequired,
    subCategory:stringRequired,
    productName:stringRequired,
    productImage:stringRequired,
    productDescription:stringRequired,
    productFeature:stringRequired,
    specificationsTable:stringRequired
},{
    collection:"ProductsList"
});

const products = mongoose.model("ProductsList",productSchema);

module.exports = products;




