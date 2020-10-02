const Room = require('../../Models/Room')
const Group = require('../../Models/Group')
const User = require('../../Models/User')
const Message = require('../../Models/Message')
const MessageController = require('../../Controllers/MessageController')

module.exports = (server) => {
    const io = require('socket.io')(server)

    let onlineUsers = []

    io.on('connection',socket => {
        /**
         * JOIN ROOMS
         */


        socket.on('join',data=>{
            socket.join(data)
        })


        /**
         * SEND MESSAGE
         */

        socket.on('sendMessage',async(data,cb) => {
            try {
                let room,group

                //detect if data correspond to database
                //check if user sending message is in the correspondent room || group 
                switch(data.type){
                    case 'room':
                         room = await Room.findOne({_id:data.room,'users':data.userId})
                        break;
                    case 'group':
                         group = await Group.findOne({_id:data.room,'users':data.userId})
                        break;
                }
                //return false if data is invalid
                if(!room && !group) return cb(false)

                //getting user who emit this message
                const user = await User.findById(data.userId)
                await user.populate('avatar').execPopulate()
                console.log(user.avatar)

                //inserting new message on database
                const message = new Message({
                    message:data.message,
                    room:data.room,
                    user:data.userId,
                })
                await message.save()

                //return true to callback
                cb(true)

                //emit message to everyone in the group/room
                socket.broadcast.to(data.room).emit('message',{
                    ...data,
                    user,
                    //will return either one (group:undefined,room:{}) || (group:{},room:undefined)
                    group,
                    room
                })


            } catch (error) {
                console.log(error)
            }
        })
    })
}