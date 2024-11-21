const { required } = require('joi');
const mongoose = require('mongoose');

const stringRequired ={
    type:String,
    require: true
}
const AdminLoginSchema = new mongoose.Schema({
    email:stringRequired,
    password:stringRequired,
    role: { type: String, default: 'admin' }
},{
    collection:"AdminLogin",
    timestamps:true
})


const adminLogin = mongoose.model("AdminLogin",AdminLoginSchema);

module.exports = adminLogin;