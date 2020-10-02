const express = require('express')
const router = express.Router()
const controller = require('../app/Controllers/ChatController') 

//middlewares
const redirectLogin = require('../app/Middlewares/redirectLogin')
const passData = require('../app/Middlewares/passData')

/**
 * ROUTES
 */
//home page
router.get('/',[redirectLogin,passData],controller.index)
//room Page
router.get('/room/:id',[redirectLogin,passData],controller.room)
//group page
router.get('/group/:id',[redirectLogin,passData],controller.group)


module.exports = router