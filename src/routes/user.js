const express = require('express')
const router = express.Router()

const controller = require('../app/Controllers/UserController')

/**
 * ROUTES
 */

//development purposes
if (process.env.ENV == 'local') {
    //list
    router.get('/', controller.list)
    //get single
    router.get('/:id', controller.get)
    //create
    router.post('/', controller.signup)
    //update
    router.patch('/:id', controller.update)
    //delete
    router.delete('/:id', controller.cancel)
}
module.exports = router