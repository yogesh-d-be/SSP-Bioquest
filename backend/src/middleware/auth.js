const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.login.model');
const config = require('../config/config');



const generateAccessToken = async (data) =>{
    const {_id, role} = data;
    let token = jwt.sign({id:_id, role:role},config.token.accessSecretKey,{expiresIn:config.token.accessTokenExpiry});
    return token;
}

const generateRefreshToken = async (data) =>{
    const {_id} = data;
    let token = jwt.sign({id:_id},config.token.refreshSecretKey,{expiresIn:config.token.refreshTokenExpiry});
    return token;
}


const verifyAccessToken= (role) => async(req, res, next) =>{
    // console.time("verifyAccessToken");

        const authHeader = req.headers['authorization'];
    
        if(!authHeader?.startsWith('Bearer ')){
            return res.status(401).json({message: "Access denied, no token provided"});
        }

        const token = authHeader.split(' ')[1];
        // console.log("token",authHeader.split(' ')[0], authHeader.split(' ')[1]);
        try {
            const decoded = jwt.verify(token, config.token.accessSecretKey);
         
            if (!decoded.role || decoded.role !== role) {
                return res.status(403).json({ message: "Access denied, insufficient permissions" });
            }
            const admin = await Admin.findById(decoded.id).lean().select('_id role');
            if (!admin) return res.status(401).json({ message: "Access denied, invalid token" });
        
            req.admin = decoded;
            // console.timeEnd("verifyAccessToken");
            next();
          } catch (error) {
            console.log("error", error)
            return res.status(401).json({ message: error.name === "TokenExpiredError" ? "Token expired" : "Invalid token" });
          }
};



module.exports ={
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken
}