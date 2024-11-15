const dotenv = require('dotenv');
const path = require('path');
dotenv.config({path: path.join(__dirname,"../../.env")});
const Joi = require("joi");
// const { default: mongoose } = require('mongoose');


const envVarSchema = Joi.object().keys({
    PORT: Joi.number().default(3333),
    MONGODB_URL: Joi.string().required().description("MongoDB URL"),

    ACCESS_TOKEN_SECRET: Joi.string().description("Jwt access secret key"),
    REFRESH_TOKEN_SECRET: Joi.string().description("Jwt refresh secret key"),

    ADMIN_EMAIL: Joi.string().description("Admin Email"),
    ADMIN_PASSWORD: Joi.string().description("Admin Password"),

    SUPABASE_URL: Joi.string().description("supabase url"),
    SUPABASE_ANON_KEY: Joi.string().description("supabase key"),
    SUPABASE_SERVICE_ROLE_KEY: Joi.string().description("supabase service key"),

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
    },
    token:{
        accessSecretKey: envVars.ACCESS_TOKEN_SECRET,
        refreshSecretKey: envVars.REFRESH_TOKEN_SECRET,
        accessTokenExpiry: '15m',
        refreshTokenExpiry: '7d'
    },
    adminCredentials:{
        adminEmail: envVars.ADMIN_EMAIL,
        adminPassword: envVars.ADMIN_PASSWORD
    },
    supabase:{
        supabaseUrl: envVars.SUPABASE_URL,
        supabaseKey: envVars.SUPABASE_ANON_KEY,
        supabaseServiceKey: envVars.SUPABASE_SERVICE_ROLE_KEY
    }
}