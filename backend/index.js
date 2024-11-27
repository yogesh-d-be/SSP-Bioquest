const express= require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');
const bodyparser = require('body-parser');
const config = require('./src/config/config');
const  connect = require('./src/common/connection');
const router = require('./src/routes');
const ApiError = require('./src/utils/apiError');

const app =express();
// Add cookie-parser middleware
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyparser.urlencoded({extended:false}))

//cookie
app.use(cors({
    origin: "http://localhost:5173", // frontend URL. it must because we stored refresh token in cookies. cors policy
    credentials: true, // Enable cookies if required
}));

connect();

app.use(router);

const server = http.createServer(app);

app.use((req, res, next)=>{
    next(new ApiError(404,"Not found API"))
});

app.use((err, req, res, next) =>{
    if(err instanceof ApiError){
        res.status(err.statusCode).json({
            success:false,
            message:err.message
        });
        console.log("err",err.message)
    }else{
        console.log("err:500",err)
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
})

server.listen(config.PORT,()=>{
    console.log("server in runnung on",config.PORT);
})