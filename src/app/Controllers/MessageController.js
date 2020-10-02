const Message = require('../Models/Message')
const { ObjectId } = require('mongoose').Types

module.exports = {
    /**
     * CREATE MESSAGE
     */
    create: async (req, res) => {
        try {
            // (room||group) id
            const { id } = req.params
            const user = req.session.user

            //check if user is in the room
            if (!user.rooms.includes(new ObjectId(id))
                && !user.groups.includes(new ObjectId(id))) {
                res.redirect('/chat?error=A problem occured while sending the message! ')
            }

            //creating new message
            const message = await new Message({
                ...req.body, // req.body contains: -message
                user: req.session.userId,
                room: id
            })
            await message.save()
            await message.populate('user').execPopulate()

            return res.status(201).send(message)

        } catch (error) {
            res.status(400).send(error)
        }
    }
}