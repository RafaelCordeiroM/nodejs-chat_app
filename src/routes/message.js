const express = require('express')
const router = express.Router()
const controller = require('../app/Controllers/MessageController')

//setup middlewares
const redirectLogin = require('../app/Middlewares/redirectLogin')
const passData = require('../app/Middlewares/redirectLogin')

/**
 * ROUTES
 */
//id is passed to indicate the room/group
router.post('/:id',[redirectLogin,passData],controller.create)

module.exports = router