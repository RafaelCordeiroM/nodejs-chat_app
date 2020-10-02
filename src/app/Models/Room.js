const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    }],
    created_at: {
        type: Date,
        default: Date.now
    }
})

RoomSchema.virtual('messages',{
    ref:'Message',
    foreignField:'room',
    localField:'_id',
})

const Room = mongoose.model('Room', RoomSchema)
module.exports = Room

