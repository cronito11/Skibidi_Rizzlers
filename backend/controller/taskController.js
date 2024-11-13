import errorHandler from './error.controller.js'
import Task from '../model/task.js'
import Calendar from '../model/calendar.js';
import calendarController from './calendarController.js'
import extend from 'lodash/extend.js';

//import extend from 'lodash/extend.js'

//Creation Task
const create = async (req, res) => {
    const { calendarId } = req.params;
    const newTask = req.body;

    try {        
    const calendar = await Calendar.findByIdAndUpdate(
        calendarId,
        { $push: { task: newTask}, update: Date.now },
        { new: true }
    );
    res.json(calendar);
    } catch (error) {
    console.error("Error adding task:", error);
    }
}

const list = async (req, res) => {

    const { calendarId } = req.params;
  try {
      let calendar = await calendarController.calendarByID(req, res,()=>{
      }, calendarId)

    //In case the error show error response
    if(calendar.status == 400)
        return res; 
    res.json(calendar.task)
     
  } catch (err) {
      return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
      })
  }
}

const update = async (req, res) => {
    const { calendarId, taskId } = req.params;
    const taskInfo = req.body;
  try {
    //Take object info
    let calendar = await calendarController.calendarByID(req, res,()=>{
    }, calendarId)

    //In case the error show error response
    if(calendar.status == 400)
        return res; 
    
    let task = calendar.task.id(taskId);

    if(!task)
        return res.status(400).json(
    {
        error: `Task ${taskId} not found in calendar ${calendarId}`
    })
      //Update task info
    task = extend(task, taskInfo);      
      //Save in data base
      await calendar.save()
      res.json(calendar);
  } catch (err) {
      return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
      })
  }
}
const remove = async (req, res) => {
    const { calendarId, taskId } = req.params;

    try {        
        await calendarController.calendarByID(req, res,()=>{
        }, calendarId)
    
        let calendar = req.profile;
        //In case the error show error response
        if(!calendar)
            return res;

        const taskIndex = calendar.task.findIndex(task => task._id.toString() === taskId);

        if (taskIndex === -1) {
            return res.status("400")
            .json({ error: 'Task not found' });
          }

        calendar.task.splice(taskIndex, 1);
        await calendar.save()        
        res.json(calendar);
    } catch (error) {
        console.error("Error removing task:", error);
    }
}

const deleteAll = async (req, res) => {
    const { calendarId} = req.params;
    try {        
        await calendarController.calendarByID(req, res,()=>{
        }, calendarId)
    
        let calendar = req.profile;
        //In case the error show error response
        if(!calendar)
            return res;

        calendar.task = [];
        await calendar.save()        
        res.json(calendar);
    } catch (error) {
        console.error("Error removing task:", error);
    }
};


const calendarByID = async (req, res, next, id) => {
    try {
        //find element by id in data bas
        let calendar = await Task.findById(id)
        //If product doesn't exist show message en response
        if (!calendar)
            return res.status('400').json({
                error: "Calendar not found"
            })
        req.profile = calendar
        next()
        //Try to catch error in case that happend
    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve calendar"
        })
    }
  }
export default { create, calendarByID: calendarByID, list, remove, update, deleteAll}

