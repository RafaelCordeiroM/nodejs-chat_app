const express = require('express')
const router = express.Router()
const controller = require('../app/Controllers/AvatarController')

//setup middelwares
const passData = require('../app/Middlewares/passData')
const redirectLogin = require('../app/Middlewares/redirectLogin')

//multer
const multer = require('multer')
const multerConfig = require('../config/multer')

/**
 * ROUTES
 */
//create
router.post('/',[redirectLogin,passData,multer(multerConfig).single("avatar")],controller.create)


//development purposes
if(process.env.ENV == 'local'){
    router.get('/',controller.list)
}


module.exports = router