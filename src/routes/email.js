const express = require('express')
const router = express.Router()
const controller = require('../app/Controllers/EmailController')

//setup middlewares
const redirectLogin = require('../app/Middlewares/redirectLogin')
const passData = require('../app/Middlewares/passData')

/**
 * ROUTES
 */
//send invitation
router.post('/send',[redirectLogin,passData],controller.sendEmail)

module.exports = router