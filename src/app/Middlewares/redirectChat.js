
module.exports = (req,res,next) =>{

    const {userId:id} = req.session
    //if id is set, redirect to chat page
    if(id) return res.redirect('/chat')
    next()
    
}