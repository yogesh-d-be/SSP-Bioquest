const express = require('express');
const router = express.Router();
const userRouter = require('../routes/user.routes');
const adminRouter = require('../routes/admin.routes');

const panel = [
    {
        path:'/user',
        router:userRouter
    },
    {
        path:'/admin',
        router:adminRouter
    }
]

panel.forEach((routing)=>{
    router.use(routing.path, routing.router)
});

module.exports = router;