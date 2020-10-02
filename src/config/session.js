const mongoose = require('mongoose')
require('dotenv').config()

module.exports = (app)=>{
    const session = require('express-session')
    const MongoStore = require('connect-mongo')(session);
    
    //destruct environment variables
    const {
        SESS_NAME = 'sid',
        SESS_LIFETIME = 2000000,
        NODE_ENV = 'development',
        SESS_SECRET='3280f6306bb9d02d0b56cb2427faeee9f9b5dae0417c3a6bc251edc038d945bd4bb735c0379a32c565bf35a7093b9e44',
    } = process.env
    const IN_PROD = NODE_ENV == 'production'

    //session-express middleware
    app.use(session({
        name: SESS_NAME,
        resave:false,
        saveUninitialized:false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        secret: SESS_SECRET,
        cookie:{
            maxAge: SESS_LIFETIME
        }
    }))

}