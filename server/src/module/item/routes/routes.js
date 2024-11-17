import express from 'express';
import {addTask,updateTask,deleteTask,getUsersTasks,getTasksData,getTaskById} from '../controller/controller.js';

const taskRouter  = express.Router();

taskRouter.post('/add_task',async (req,res)=>{
  const result =await addTask(req,res);
  res.status(result.status).send(result.data);
})

taskRouter.post('/update_task',async(req,res)=>{
 const result =await updateTask(req,res);
 res.status(result.status).send(result.data);
})

taskRouter.post('/delete_task',async(req,res)=>{
 const result =await deleteTask(req,res);
 res.status(result.status).send(result.data);
})

taskRouter.post('/get_users_tasks',async (req,res)=>{
 const result =await getUsersTasks(req,res);
 res.status(result.status).send(result.data);
})

taskRouter.post('/get_task',async (req,res)=>{
 const result =await getTaskById(req,res);
 res.status(result.status).send(result.data);
})

taskRouter.post('/get_tasks',async (req,res)=>{
 const result =await getTasksData(req,res);
 res.status(result.status).send(result.data);
})

export {taskRouter};



