const dotenv = require('dotenv');
const path = require('path');
dotenv.config({path: path.join(__dirname,"../../.env")});
const Joi = require("joi");
// const { default: mongoose } = require('mongoose');


const envVarSchema = Joi.object().keys({
    PORT: Joi.number().default(3333),
    MONGODB_URL: Joi.string().required().description("MongoDB URL")
}).unknown();


const {value:envVars, error} = envVarSchema
.prefs({errors:{label:"key"}})
.validate(process.env);

if(error){
    throw new Error(`Config validation error: ${error.message}`);
}


module.exports = {
    env:envVars.NODE_ENV,
    PORT:envVars.PORT,
    mongoose:{
        url: envVars.MONGODB_URL
    }
}