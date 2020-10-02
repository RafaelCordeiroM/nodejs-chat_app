const Group = require('../Models/Group')
const User = require('../Models/User')
const { ObjectId } = require('mongoose').Types

// helper function, add group on user relationship
const addGroupOnUser = async (userId, groupId) => {
    //get user by id
    let user = await User.findById(userId)
    //push the groupId to users' group column
    user.groups.push(groupId)
    await user.save()
}


module.exports = {
    /**
     * Get all Groups 
     */
    list: async (req, res) => {
        try {
            const groups = await Group.find()
            res.json(groups)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    /**
     * Get a single group
     */
    get: async (req, res) => {
        try {
            const { id } = req.params
            const group = await Group.findById(id)
            if (!group) return res.status(404).send()
            res.json(group)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    /**
     * Create Group
     */
    create: async (req, res) => {
        try {
            //including current user to array, based on session userId
            req.body.users.push(req.session.userId)

            const group = new Group(req.body)
            await group.save()

            const { users } = req.body
            //adding group on each user 
            users.forEach(user => addGroupOnUser(user, group._id))

            res.status(201).redirect(`/chat/group/${group._id}?message=Group Created!`)
        } catch (error) {
            res.status(400).redirect('/chat')
        }
    },
    /**
     * Update group
     */
    update: async (req, res) => {

        //algorith of matching keys allowed
        const keys = Object.keys(req.body)
        const allowedUpdates = ['name', 'description']
        const verifyKeys = keys.every(key => allowedUpdates.includes(key))
        if (!verifyKeys) return res.status(400).json({ error: 'keys not valid' })

        try {
            const { id } = req.params
            const group = await Group.findById(id)
            //check if group exists
            if (!group) return res.status(404).send()
            //updating params
            keys.forEach(key => group[key] = req.body[key])
            await group.save()
            res.status(200).send(group)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    /**
     * ADD USER TO GROUP
     */
    addUser: async (req, res) => {
        try {
            const { users, group: groupId } = req.body
            //getting group base on id passed
            const group = await Group.findById(groupId)
            if (!group) return res.status(200).send()
            //return false if user is already on group
            const userAlreadyOnGroup = users.every(user => !group.users.includes(new ObjectId(user)))
            if (!userAlreadyOnGroup)return res.redirect(`/chat/group/${groupId}?error=User Already on Group`)
            users.forEach(user =>{
                group.users.push(user)
                addGroupOnUser(user,groupId)
            }) 
            await group.save()
            res.redirect(`/chat/group/${groupId}?message=User(s) Added`)

        } catch (error) {
            res.redirect('/chat')
        }
    }
}