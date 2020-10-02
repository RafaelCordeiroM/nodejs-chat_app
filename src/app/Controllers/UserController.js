const User = require('../Models/User')
module.exports = {
    /**
     * GET ALL USERS
     */
    list: async (req, res) => {
        try {
            const users = await User.find()
            res.json(users)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    /**
     * GET SINGLE USER
     */
    get: async (req, res) => {
        try {
            const { id } = req.params
            const user = await User.findById(id)
            if (!user) return res.status(404).send()
            res.json(user)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    /**
     * SIGNUP USER
     */
    signup: async (req, res) => {
        try {
            const user = new User(req.body)
            console.log(user)
            await user.save()

            //set session userId
            req.session.userId = user._id

            res.redirect('/chat')
        } catch (error) {
            res.redirect('/signup?error=User already exists')
        }
    },
    /**
     * UPDATE USER
     */
    update: async (req, res) => {

        //algorith of matching keys allowed
        const keys = Object.keys(req.body)
        const allowedUpdates = ['username', 'password']
        const verifyKeys = keys.every(key => allowedUpdates.includes(key))
        if (!verifyKeys) return res.status(400).json({ error: 'keys not valid' })

        try {
            const { id } = req.params
            const user = await User.findById(id)
            //check if user exists
            if (!user) return res.status(404).send()
            //updating params
            keys.forEach(key => user[key] = req.body[key])
            await user.save()
            res.status(200).send(user)
        } catch (error) {
            res.status(400).send(error)
        }
    }, cancel: async (req, res) => {
        try {
            const { id } = req.params
            const user = await User.findById(id)
            //check if user exists
            if (!user) return res.status(404).send()
            await user.delete()
            res.status(200).send(user)
        } catch (error) {
            res.status(400).send()
        }
    }
}