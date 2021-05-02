const express = require('express')
const { adminAccessRequired } = require('../authMiddlewares')
const { update } = require('../models/users')
const router = express.Router()
const UserModel = require('../models/users')
const { userCRUDPermission } = require('../permissions/user-permissions')
const enums = require('../utils/enums')

//Get all the users || Need to add a middleware that makes sure other than admin and project manager, all the othe people are only able to see the people who are assigned to same project
router.get('/', async (req,res)=>{
    try{
        const allUsers = await UserModel.find()
        res.json(allUsers)

    } catch(err) {
        sendError(400,{message:err}, res)
    }
})

// Need to implement some validation to avoid crash, need to implement the situation in which no id is matched
router.get('/:id',async (req,res)=>{
    if(!req.params.id)
        return sendError(400,'Error: Please provide id', res);

    try{
        const userById = await UserModel.findById(req.params.id)
        res.json(userById)

    } catch(err) {
        sendError(404,{message:err}, res)
    }
})

//Add new user
router.post('/',userCRUDPermission, async (req,res)=>{
    if(!req.body.email || !req.body.name || !req.body.userType)
        return sendError(400,'Error: Please provide valid body', res)


    const alreadyExist = await UserModel.find({email:req.body.email})
    if(!alreadyExist.length == 0){
        return res.status(401).send('Email already exists')
    }
    const user = new UserModel({
        ...req.body
    })

    try{
        const saveduser = await user.save()
        res.json(saveduser)
    } catch(err) {
        sendError(404,{message:err}, res)
    }

})

//Update task's title and description
router.put('/:id',userCRUDPermission ,async (req,res)=>{
    if(!req.params.id)
        return sendError(400,'Error: Please provide id', res);
    
    if(!req.body)
        return sendError(400,'Error: Please provide body', res)

    try{
        const updateUserDetail = await UserModel.updateOne({_id: req.params.id}, {$set:{
            ...req.body
        }})
        if(updateUserDetail.nModified == 0)
            sendError(404, "User with given id not found",res)
        else 
            res.json(updateUserDetail)

    } catch(err) {
        sendError(404,{message:err}, res)
    }
   
})

//Delete task
router.delete('/:id',userCRUDPermission, async (req,res)=>{
    if(!req.params.id){
        return sendError(400,'Error: Please provide id', res);
    }

    try{
        await UserModel.remove({_id: req.params.id}, function(err, result) {
            if (err) {
              res.err(err);
            } else {
              if(result.deletedCount == 0)
                sendError(404,"User with given id not found",res)
              else 
                res.send(result);
            }
          });

    } catch(err) {
        sendError(404,{message:err}, res)
    }
})

function sendError(statusCode, message, res){
    res.status(statusCode)
    return res.send({"status_code": statusCode,"message":message})
}


module.exports = router