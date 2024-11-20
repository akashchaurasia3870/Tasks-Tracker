import { Tasks } from "../schema/schema_mongodb/tasks_schema.js";

const rp_addTask = async (title,task_lists,type,user_id,task_id=null)=>{

    try {

        let newTask = {
            title,
            task_lists,
            type,
            created_by:user_id
        }

        if(task_id!==null){
            newTask.task_id = task_id;
        }
    
        let result = await Tasks.create(newTask);    

        return {status:201,data:result};
        
    } catch (error) {
        console.log(error.message);
        return {status:400,data:error.message};

    }
}

const rp_deleteTask = async (task_id,user_id)=>{
    try {

        console.log(user_id);
        
    
        let result = await Tasks.updateOne(
            {task_id},
            {$set:{ deleted:1,deleted_by:user_id}}
        );    

        let message = "";
        
        if(result.acknowledged && result.modifiedCount==1 && result.matchedCount==1)
        {
            message = "Tasks Deleted Successfully";
        }else{
            message = "Tasks Not Deelted Something Went Wrong";
        }

        return {status:200,data:{result,message}};
                
    } catch (error) {
        console.log(error.message);
        return {status:400,data:error.message};

    }
}

const rp_updateTaskDetails = async (task_id,updated_field_obj,user_id)=>{
    try {

        let updateFields = {};

        updated_field_obj.forEach(({updated_field,updated_field_value}) => {
            console.log(updated_field,updated_field_value);
            
            updateFields[updated_field]=updated_field_value
        });
    
        let result = await Tasks.updateOne({task_id,deleted:0},{$set:updateFields});    

        console.log(result);
        
        let message = "";
        
        if(result.acknowledged && result.modifiedCount==1 && result.matchedCount==1)
        {
            message = "Data Updated Successfully";
        }else{
            message = "Data Not Updated Something Went Wrong";
        }

        return {status:200,data:{result,message}};
        
    } catch (error) {
        console.log(error.message);
        return {status:400,data:error.message};

    }
}

const rp_findTaskByUserID = async (user_id)=>{
    try {
    
        let result = await Tasks.find({created_by:user_id,deleted:0});    

        return {status:200,data:result};
        
    } catch (error) {
        console.log(error.message);
        return {status:400,data:error.message};

    }
}

const rp_findTaskByTaskID = async (task_id)=>{
    try {
    
        let result = await Tasks.findOne({task_id,deleted:0});    

        return {status:200,data:result};
        
    } catch (error) {
        console.log(error.message);
        return {status:400,data:error.message};

    }
}

const rp_getTasksData = async (search,sortBy,sortOrder='asc',skip=0,limit=10)=>{
    try {

        const filter = {deleted:0};

        // search by keyword in title and tasks list
        if(search!==''){
            filter.$or = [
                {title:{$regex:keyword,$options:'i'}},
                {tasks_lists:{$regex:keyword,$options:'i'}},
            ]
        }
    
        let result = await Tasks.find(filter)
        .sort({[sortBy]:sortOrder==='asc'?1:-1})
        .limit(limit)
        .skip(skip);    

        return {status:200,data:result};
        
    } catch (error) {
        console.log(error.message);
        return {status:400,data:error.message};

    }
}

export {rp_addTask,rp_findTaskByUserID,rp_findTaskByTaskID,rp_getTasksData,rp_deleteTask,rp_updateTaskDetails};