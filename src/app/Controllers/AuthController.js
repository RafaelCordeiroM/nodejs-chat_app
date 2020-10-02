const User = require("../Models/User")
const UserController = require('./UserController')
module.exports = {
    /**
     * SIGNIN
     */
    signin: async(req,res)=>{
        try {
            const user = await User.authenticate(req.body)
            //if user was not authenticated
            if(!user) return res.redirect("?error=user doesn't exist or password is incorrect")

            //if user was authenticated set session.userId
            req.session.userId = user._id

            res.redirect('/chat')

        } catch (error) {
            res.redirect("?error=user doesn't exist or password is incorrect")
        }
    },
    /**
     * SIGNUP
     */
    signup: UserController.signup,

    /**
     * LOGOUT
     */
    logout:(req,res)=>{
        //destroy session
        req.session.destroy(err =>{
            return {error:'not possible to logout'}
        })
        res.redirect('/')
    }
}