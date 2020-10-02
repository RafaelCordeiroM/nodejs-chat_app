const mongoose = require('mongoose')
require('dotenv').config()

module.exports = () => {
    //connect to database
    mongoose.connect(process.env.MONGODB_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(() => console.log('connected to the database'))

}