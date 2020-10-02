const dateFormat = require('dateformat')

module.exports = function (hbs) {
    /**
     * IF MESSAGE IS MINE
     */
    hbs.registerHelper('ifMessageIsMine', function (message, user, options) {
        //compare string
        if (`${message.user._id}` == `${user._id}`) {
            return options.fn(this)
        } else {
            return options.inverse(this)
        }
    })
    /**
     * CONVERT_TIMESTAMP
     */
    hbs.registerHelper('covertTimestamp', function (timestamp) {
        return dateFormat(new Date(timestamp), `h:MM TT | dd/mm/yyyy`)
    })
    /**
     * SET AVATAR
     */
    hbs.registerHelper('setAvatar', function (avatars,type) {
        if(avatars && avatars[0]){
            return avatars[0].url
        }else{
            let url
            if(process.env.ENV == 'local'){
                url = `${process.env.APP_URL}:${process.env.PORT}/files/default_${type}.png`
            }else if(process.env.ENV == 'production'){
                url = `${process.env.APP_URL}/files/default_${type}.png`
            }
            return url
        }
    })
    /**
     * DISPLAY ROOM
     */
    hbs.registerHelper('displayRoom', function (room,user,options) {
    
       room.users.forEach(u =>{
           // u -> user
           if(`${u._id}` != `${user._id}`){
            room.user = u
           }
       })
       return options.fn(room)
    })
}