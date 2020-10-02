const mongoose = require('mongoose')

const GroupSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim:true

    },
    description:{
        type:String,
        trim:true,

    },
    users: [{
            type: mongoose.Schema.Types.ObjectId,
            require:true,
            ref:'User'
    }]
}, { timestamps: true })

GroupSchema.virtual('messages',{
    ref:'Message',
    foreignField:'room',
    localField:'_id'
})
GroupSchema.virtual('avatar',{
    ref:'Avatar',
    foreignField:'owner',
    localField:'_id'
})

const Group = mongoose.model('Group',GroupSchema)
module.exports = Group

