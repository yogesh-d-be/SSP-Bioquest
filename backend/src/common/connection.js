const mongoose = require('mongoose');
const config = require('../config/config');

const connect = () =>{
    mongoose.connect(config.mongoose.url,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log('MongoDB connected.....');
    })
    .catch((err)=>{
        console.error('MongoDB connection error:', err);
    })
}


module.exports = connect;
