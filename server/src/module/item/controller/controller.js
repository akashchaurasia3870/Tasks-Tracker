
import {svc_addTask,svc_updateTask,svc_deleteTask,svc_findTaskByUserID,svc_getTasksData,svc_findTaskByTaskID} from '../service/service.js'

const addTask = async (req,res)=>{
    try {
 
     const {title,task_lists,user_id} = req.body;
     const result = await svc_addTask(title,task_lists,user_id);
     return result;
     
    } catch (error) {
     return {status:400,data:error.message};
    }
}

const updateTask = async (req,res)=>{
    try {
 
     const {task_id,updated_field_obj,user_id} = req.body;
     const result = await svc_updateTask(task_id,updated_field_obj,user_id);
     return result;
     
    } catch (error) {
     return {status:400,data:error.message};
    }
}

const deleteTask = async (req,res)=>{
    try {
 
     const {task_id,user_id} = req.body;
     const result = await svc_deleteTask(task_id,user_id);
     return result;
     
    } catch (error) {
     return {status:400,data:error.message};
    }
}

const getUsersTasks = async (req,res)=>{
    try {
 
     const {user_id} = req.body;
     const result = await svc_findTaskByUserID(user_id);
     return result;
     
    } catch (error) {
     return {status:400,data:error.message};
    }
}

const getTaskById = async (req,res)=>{
    try {
 
     const {task_id} = req.body;
     const result = await svc_findTaskByTaskID(task_id);
     return result;
     
    } catch (error) {
     return {status:400,data:error.message};
    }
}

const getTasksData = async (req,res)=>{
    try {
 
     const {search,sortBy,sortOrder,skip,limit} = req.body;
     const result = await svc_getTasksData(search,sortBy,sortOrder,skip,limit);
     return result;
     
    } catch (error) {
     return {status:400,data:error.message};
    }
}

export {addTask,updateTask,deleteTask,getUsersTasks,getTasksData,getTaskById} ;