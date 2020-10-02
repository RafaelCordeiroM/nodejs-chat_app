const express = require('express')
const path = require('path')
const xss = require('xss-clean')
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const app = express()


/**
 * 
 * SECURITY
 * 
 */
//cookie parser
app.use(cookieParser())
app.set('trust proxy',1)

//set helmet
app.use(helmet())

//Data Sanitization against XSS attacks (Cross Scripting)
app.use(xss())

//Data Sanitization against NoSQL Injection Attacks
app.use(mongoSanitize())


//setup view
require('./config/view')(app)

//default files directory
app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "storage", "uploads"))
  );

//setup database
require('./database/db')()

//setup routes
require('./config/session')(app)

//setup routes
require('./config/web')(app)

//setup server
const server = require('./config/server')(app)
//setup socket.io controller
require('./app/Controllers/socket.io/ChatRealTimeController')(server)


