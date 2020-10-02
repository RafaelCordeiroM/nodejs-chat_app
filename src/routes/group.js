const express = require('express')
const router = express.Router()

const controller = require('../app/Controllers/GroupController')

/**
 * ROUTES
 */
//create
router.post('/', controller.create)
//add user to group
router.post('/addUser', controller.addUser)



//development purposes
if (process.env.ENV == 'local') {
    //update
    router.patch('/:id', controller.update)
    //list
    router.get('/', controller.list)
    //get single
    router.get('/:id', controller.get)
}


module.exports = router