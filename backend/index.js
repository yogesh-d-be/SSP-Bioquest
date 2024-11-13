const express= require('express');
const cors = require('cors');
const http = require('http');
const bodyparser = require('body-parser');
const config = require('./src/config/config');
const  connect = require('./src/common/connection');
const router = require('./src/routes');

const app =express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyparser.urlencoded({extended:false}))
app.use(cors('*'));

connect();

app.use(router);

const server = http.createServer(app);

server.listen(config.PORT,()=>{
    console.log("server in runnung on",config.PORT);
})