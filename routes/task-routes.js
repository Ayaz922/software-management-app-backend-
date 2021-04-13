const express = require('express')
const router = express.Router()
const TaskModel = require('../models/task')
const enums = require('../utils/enums')

//Get all the post
router.get('/',async (req,res)=>{
    try{
        const allTasks = await TaskModel.find()
        res.json(allTasks)

    } catch(err) {
        sendError(400,{message:err}, res)
    }
    
})

// Need to implement some validation to avoid crash, need to implement the situation in which no id is matched
router.get('/:id',async (req,res)=>{
    if(!req.params.id)
        return sendError(400,'Error: Please provide id', res);

    try{
        const taskById = await TaskModel.findById(req.params.id)
        res.json(taskById)

    } catch(err) {
        sendError(404,{message:err}, res)
    }
})

//Add new task
router.post('/',async (req,res)=>{
    console.log('Post: ')
    console.log(req.body)
    if(!req.body.title || !req.body.taskType)
        return sendError(400,'Error: Please provide body', res)

    if(req.body.status && !enums.TASK_STATUS.hasOwnProperty(req.body.status)){
        return sendError(400,'Please provide valid Status', res)
    }    

    const task = new TaskModel({
        ...req.body,
        status:enums.TASK_STATUS[req.body.status]
    })

    try{
        const savedPost = await task.save()
        res.json(savedPost)
    } catch(err) {
        sendError(404,{message:err}, res)
    }

})

//Update task's title and description
router.put('/:id',async (req,res)=>{
    if(!req.params.id)
        return sendError(400,'Error: Please provide id', res);
    
    if(!req.body.title || !req.body.taskType)
        return sendError(400,'Error: Please provide body', res)

    try{
        const updatedTask = await TaskModel.updateOne({_id: req.params.id}, {$set:{
            ...req.body
        }})
        res.json(updatedTask)

    } catch(err) {
        sendError(404,{message:err}, res)
    }
   
})

//Update status of the task (Should use enum, need to search internet)
router.patch('/:id',async (req,res)=>{
    if(!req.params.id)
        return sendError(400,'Error: Please provide id', res)

    if(!req.body.status)
        return sendError(400,'Error: Please provide status code ', res)

    try{
        const updatedTask = await TaskModel.updateOne({_id: req.params.id}, {$set:{
            status:req.body.status,
            lastStatusUpdateDate:Date.now()
        }})
        res.json(updatedTask)

    } catch(err) {
        sendError(404,{message:err}, res)
    }
   
})

//Delete task
router.delete('/:id',async (req,res)=>{
    if(!req.params.id){
        return sendError(400,'Error: Please provide id', res);
    }

    try{
        const deleteMessage = await TaskModel.remove({_id: req.params.id})
        res.json(deleteMessage)

    } catch(err) {
        sendError(404,{message:err}, res)
    }
})

function sendError(statusCode, message, res){
    console.log(message)
    res.status(statusCode)
    return res.send(message)
}


module.exports = router