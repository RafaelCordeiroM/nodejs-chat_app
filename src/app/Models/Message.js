const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({

    message:{
        type:String,
        required:true,
        trim:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    room:{
        type: mongoose.Schema.Types.ObjectId,
        require: true, // room can be either (room || group)
        ref: 'Room'
    },
     created_at:{
        type:Date,
        default:Date.now
    }

})

const Message = mongoose.model('Message', MessageSchema)
module.exports = Message

