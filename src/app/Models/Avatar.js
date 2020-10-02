const mongoose = require('mongoose')
require('dotenv').config()
const AvatarSchema = new mongoose.Schema({
    size:String,
    url:String,
    key:String,
    owner:{
        type: mongoose.Schema.Types.ObjectId,
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
})
AvatarSchema.pre("save", function() {
    if (!this.url) {
      if(process.env.ENV == 'local'){
        this.url = `${process.env.APP_URL}:${process.env.PORT}/files/${this.key}`;
      }
      else if(process.env.ENV == 'production'){
        this.url = `${process.env.APP_URL}/files/${this.key}`;
      }
    }
  });

const Avatar = mongoose.model('Avatar',AvatarSchema)
module.exports = Avatar

