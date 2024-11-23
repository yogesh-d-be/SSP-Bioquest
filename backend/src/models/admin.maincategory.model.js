const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryCode:{
        type:String,
        required:[true,"Category code is required"],
        unique:true
    },
    mainCategoryImage:{
        type:String,
        required:[true,"Category Image is required"],
    },
    mainCategoryName:{
        type:String,
        required:[true,"Category name is required"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Category description is required"],
        trim:true
    }
},{
    collection:"MainCategory",
    timestamps:true

})

const category = mongoose.model("MainCategory",categorySchema);

module.exports = category;