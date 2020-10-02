const express = require('express')
const RateLimit = require('express-rate-limit')
const limiter = new RateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100, //max requests per ip
  delayMs: 0 
})

module.exports = function(app){
    app.use(express.json({limit: '10kb'})) //body limit is 10
    app.use(express.urlencoded({extended:true}))

    app.use('/',require('../routes/auth'))
    app.use('/chat',require('../routes/chat'))
    app.use('/user',require('../routes/user'))
    app.use('/room',limiter,require('../routes/room'))
    app.use('/group',require('../routes/group'))
    app.use('/email',require('../routes/email'))
    app.use('/message',require('../routes/message'))
    app.use('/avatar',require('../routes/avatar'))
    //404 page
    app.use(function(req, res, next){
        res.status(404)
      
        // respond with html page
        if (req.accepts('html')) {
          
          return res.render('404', { url: req.url })
        }
      
        // respond with json
        if (req.accepts('json')) {
          return res.send({ error: 'Not found' })
        }
      
        // default to plain-text. send()
        res.type('txt').send('Not found')
      });

}