const express= require('express');
const cors = require('cors');
const http = require('http');
const bodyparser = require('body-parser');
const config = require('./src/config/config');
const  connect = require('./src/common/connection');
const router = require('./src/routes');
const ApiError = require('./src/utils/apiError');

const app =express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyparser.urlencoded({extended:false}))
app.use(cors('*'));

connect();

app.use(router);

const server = http.createServer(app);

app.use((req, res, next)=>{
    next(new ApiError(404,"Not found"))
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