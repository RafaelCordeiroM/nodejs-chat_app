const Room = require('../Models/Room')
const User = require('../Models/User')

const addRoomOnUser = async (userId, roomId) => {
    let user = await User.findById(userId)
    user.rooms.push(roomId)
    await user.save()
}

const checkIfRoomExists = async (users) => {
    let exists = false
    const rooms = await Room.find()
    //loop rooms
    rooms.forEach(room => {
        //sorting each array
        const usersRoom = room.users.sort()
        users = users.sort()

        if (`${usersRoom[0]}` == `${users[0]}`
            && `${usersRoom[1]}` == `${users[1]}`) {
            exists = room
        }
    })
    return exists

}

module.exports = {
    list: async (req, res) => {
        try {
            const rooms = await Room.find()
            rooms.forEach(async(room) => {
                await room.populate('messages').execPopulate()
            })
            res.json(rooms)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    get: async (req, res) => {
        try {
            const { id } = req.params
            const room = await Room.findById(id)
            await room.populate('messages').execPopulate()
            res.json(room)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    create: async (req) => {
        try {
            let room = new Room()
            room.users.push(req.session.userId)
            room.users.push(req.params.id)

            //check if room exists
            const roomThatExists = await checkIfRoomExists(room.users)
            if (roomThatExists) return roomThatExists

            //saving new room
            await room.save()

            //adding rooms on user 
            addRoomOnUser(
                req.session.userId,
                room._id
            )
            addRoomOnUser(
                req.params.id,
                room._id
            )

            return room
        } catch (error) {
            return false
        }
    },
}