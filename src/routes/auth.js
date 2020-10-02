const express = require('express')
const router = express.Router()
const controller = require('../app/Controllers/AuthController')

//middlewares
const redirectChat = require('../app/Middlewares/redirectChat')

/**
 * ROUTES
 */
//signin
router.get('/',redirectChat, (req, res) => {
    res.render('auth/signin')
})
router.post('/',redirectChat,controller.signin)

//signup
router.get('/signup',redirectChat, (req, res) => {
    res.render('auth/signup')
})
router.post('/signup',redirectChat, controller.signup)


//logout
router.get('/logout', controller.logout)


module.exports = router