const Group = require('../Models/Group')
const User = require('../Models/User')
const Message = require('../Models/Message')
const Avatar = require('../Models/Avatar')
const RoomController = require('./RoomController')

module.exports = {
    /**
     * INDEX
     */
    index: async (req, res) => {
        //--- response ---///
        res.render('chat/index', {
            user: req.session.user,
            users: req.session.users,
            groups: req.session.groups,
            rooms: req.session.rooms,
        })
    },
    /**
     * ROOM
     */
    room: async (req, res) => {

        //if chat is single redirect
        if (req.params.id != req.session.userId) {

            const room = await RoomController.create(req)
            await room.populate('users')
                .populate('messages')
                .execPopulate()


            //get friend's data
            const friend = room.users.find(user => user._id != req.session.userId)
            await friend.populate('avatar').execPopulate()


            //--- response ---///
            res.render('chat/room', {
                user: req.session.user,
                users: req.session.users,
                groups: req.session.groups,
                rooms: req.session.rooms,
                room,
                friend
            })
        } else {
            res.redirect('/chat?error=ops..')
        }
    },

    /**
     * GROUP
     */
    group: async (req, res) => {
        try {
            const { id } = req.params
            const group = await Group.findOne({ _id: id, 'users': req.session.userId })
            //deep populating
            await group
            .populate('users')
            .populate('avatar')
            .populate({
                path: 'messages',
                model: Message,
                populate: {
                    path: 'user',
                    model: User,
                    populate: {
                        path: 'avatar',
                        model: Avatar
                    }
                }
            })
            .execPopulate()
            
            //getting users left
            const usersLeft = await User.find({ 'groups': { $ne: group._id } })
            usersLeft.forEach(async (user) => {
                await user.populate('avatar').execPopulate()
            })
            
            //--- response ---///
            res.render('chat/group', {
                user: req.session.user,
                users: req.session.users,
                groups: req.session.groups,
                rooms: req.session.rooms,
                usersLeft,
                group
            })
        } catch (error) {
            res.redirect('/chat')
        }
    },

}