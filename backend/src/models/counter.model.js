const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    count:{
        type:Number,
        default:0
    },
    maxLimit:{
        type:Number,
        default:999
    }
},{
    collection:"Counter",
    timestamps:true
});

const Counter = mongoose.model("Counter",counterSchema);

module.exports = Counter;