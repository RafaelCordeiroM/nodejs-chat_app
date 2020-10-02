const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true,
        trim: true,
        unique: true,
        minlength: 2,
        maxlength: 255,
        validate(value) {

        }
    },
    password: {
        type: String,
        trim: true,
        validate(value) {

        }

    },
    rooms: [{ 
            type:mongoose.Schema.Types.ObjectId,
            ref:'Room',
    }],
    groups: [{ 
            type:mongoose.Schema.Types.ObjectId,
            ref:'Group'
    }]
}, { timestamps: true })

//relationships
UserSchema.virtual('messages',{
    ref:'Message',
    foreignField:'user',
    localField:'_id',
})

UserSchema.virtual('avatar',{
    ref:'Avatar',
    foreignField:'owner',
    localField:'_id'
})

//hash password before save
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password,8)
    }
    next()
})

//authenticate
UserSchema.statics.authenticate = async(request)=>{
    const user = await User.findOne({username:request.username})
    if(!user) throw new Error('username not find')

    const isMatch = await bcrypt.compare(request.password,user.password)
    if(!isMatch) throw new Error('wrong password') 
    

    return user
}

const User = mongoose.model('User', UserSchema)

module.exports = User