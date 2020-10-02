const express = require('express')
const router = express.Router()
const controller = require('../app/Controllers/RoomController')
const csrf = require('csurf')

let csrfProtection = csrf({ cookie: true }) //cross site request

//middlewares
const redirectLogin = require('../app/Middlewares/redirectLogin')

/**
 * ROUTES
 */
//create room
router.post('/', [redirectLogin,csrfProtection], controller.create)


//development purposes
if (process.env.ENV == 'local') {
    router.get('/', controller.list)
    router.get('/:id', controller.get)
}

module.exports = router