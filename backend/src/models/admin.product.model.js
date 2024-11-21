const mongoose = require('mongoose');



const productSchema = new mongoose.Schema({
    mainCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'MainCategory',
        required:true,
    },
    // subCategory:stringRequired,
    productCode:{
        type:String,
        required:[true,"Product code is required"],
        unique:true,
        index: true,
    },
    productName:{
    type:String,
    required:[true, "Product name is required"],
    trim:true
},
    productImage:{
        type: Array,
        required: [true,"Product image is required"],
    },
    // productDescription:stringRequired,
    productFeature:{
        type: Array,
        required: [true,"Product feature is required"],
        trim:true
    },
    brochure:{
        type:String,
        required:[true, "Brochure is required"]
    }
    // specificationsTable:stringRequired
},{
    collection:"ProductsList",
    timestamps:true
});

const products = mongoose.model("ProductsList",productSchema);

module.exports = products;




