const User = require('../Models/User')
const Room = require('../Models/Room')
const Group = require('../Models/Group')
const Avatar = require('../Models/Avatar')

module.exports = async (req, res, next) => {
    //get current user based on session.userId
    let user = await User.findById(req.session.userId)

    //deep populating user
    await user.populate({
            path: 'rooms',
            model: Room,
            populate: {
                path: 'users',
                model: User,
                populate: {
                    path: 'avatar',
                    model: Avatar
                }
            }
        })
        .populate({
            path: 'groups',
            model: Group,
            populate: {
                path: 'avatar',
                model: Avatar
            }
        })
        .populate('avatar')
        .execPopulate()
        
    
    //getting all users except current user
    const users = (await User.find())
        .filter(user => {
            return user._id != req.session.userId
        })
    users.forEach(async(user) => {
        await user.populate('avatar').execPopulate()
    })
    req.session.users = users





    //passing on session
    req.session.user = user
    req.session.rooms = user.rooms
    req.session.groups = user.groups
    next()
}