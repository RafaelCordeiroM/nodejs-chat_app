const Avatar = require('../Models/Avatar')
const {ObjectId} = require('mongoose').Types

const create = async(request,response,id)=>{
    //destruct request.file
    const { originalname: name, size, key, location: url = "" } = request.file;
    await Avatar.deleteMany({owner:new ObjectId(id)})
    avatar = new Avatar({
        name,
        size,
        key,
        url,
        owner: id
    });
    //save avatar
    await avatar.save()
    response.status(201).redirect('/chat?message=Avatar was Updated!')
}

module.exports = {
    /**
     * CREATE AVATAR
     */
    create: async(req,res)=>{
        try {
        let avatar
        const {id} = req.body
        
        //if id is passed, avatar is updated on group
        if(id) create(req,res,id)
        else create(req,res,req.session.userId)
        

        } catch (error) {
            res.status(400).send()
        }
    },
    /**
     * LIST ALL AVATAR,(dev purpose)
     */
     list:async(req,res) => {
        res.send(await Avatar.find())
    }
}