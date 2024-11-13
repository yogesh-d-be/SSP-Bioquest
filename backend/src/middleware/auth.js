const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.login.model');
const config = require('../config/config');

const secretKey = config.token.secretKey;

const generateToken = async (data) =>{
    const {_id} = data;
    let token = jwt.sign({id:_id},secretKey,{expiresIn:'7d'});
    return token;
}


const verifyToken = async(req, res, next) =>{
    try {
        const authHeader = req.headers['authorization'];

        if(!authHeader){
            return res.status(401).json({message: "Access denied, no token provided"});
        }

        const tokenParts = authHeader.split(" ");
        if(tokenParts[0] !== "Bearer" || !tokenParts[1]){
            return res.status(401).json({message:"Access denied"})
        }

        const token = tokenParts[1];
        let decoded;
        try {
            decoded = jwt.verify(token, secretKey)
        } catch (error) {
            if(error.name === "TokenExpiredError"){
                return res.status(401).json({message:"Token expired"})
            }else{
                return res.status(401).json({message:"Invalid token"});
            }
        }


        const admin = await Admin.findById(decoded.adminId || decoded.id);
        if (!admin) {  
            return res.status(401).json({ message: "Access denied, invalid token" });
          }

          req.admin = admin;
          next();

    } catch (error) {
    res.status(500).json({ message: "Failed to authenticate admin" });
    
    }
}