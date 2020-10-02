const User = require('../Models/User')
module.exports = async(req,res,next) =>{
    const {userId:id} = req.session
    //if session.userId is not set, redirect to login page
    if(!id)return res.redirect('/')
    
    req.session.user = await User.findById(id)
    next()

}