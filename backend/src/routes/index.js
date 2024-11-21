const express = require('express');
const app = express();
const router = express.Router();
const userRouter = require('../routes/user.routes');
const adminRouter = require('../routes/admin.routes');
const authRouter = require('../routes/auth.routes');
const { getAuthUrl, oauth2Client } = require('../utils/googleDrive');

const panel = [
    {
        path:'/user',
        router:userRouter
    },
    {
        path:'/admin',
        router:adminRouter
    },
 
]

panel.forEach((routing)=>{
    router.use(routing.path, routing.router)
});



module.exports = router;