const path = require('path')
const express = require('express')
module.exports = (app) => {
    //view engine
    const hbs = require('hbs')
    app.set('view engine','hbs')
    app.set('views',path.join(__dirname,'../resources/views'))
    app.use(express.static(path.join(__dirname,'../public')))
    
   
    /**
     * HANDLEBARS
     */

    //helpers
    require('../helpers/handlebars')(hbs)
    //partials
    hbs.registerPartials(path.join(__dirname,'../resources/components'))
    //chat
    hbs.registerPartial('chat/header',path.join(__dirname,'../resources/components/chat/header'))
    hbs.registerPartial('chat/footer',path.join(__dirname,'../resources/components/chat/footer'))
    hbs.registerPartial('chat/scripts',path.join(__dirname,'../resources/components/chat/scripts'))
    hbs.registerPartial('chat/sidebar',path.join(__dirname,'../resources/components/chat/sidebar'))
    //auth
    hbs.registerPartial('auth/header',path.join(__dirname,'../resources/components/auth/header'))
    hbs.registerPartial('auth/footer',path.join(__dirname,'../resources/components/auth/footer'))
    //modals partials
    hbs.registerPartial('chat/modals/inviteFriends',path.join(__dirname,'../resources/components/chat/modals/inviteFriends'))
    hbs.registerPartial('chat/modals/editAvatar',path.join(__dirname,'../resources/components/chat/modals/editAvatar'))
}