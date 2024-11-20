import {rp_addTask,rp_findTaskByUserID,rp_getTasksData,rp_deleteTask,rp_updateTaskDetails,rp_findTaskByTaskID} from '../repository/repository.js'
import { google } from 'googleapis';
import { getAccessToken } from '../middleware/middleware.js';
 
const svc_addTask = async (title,task_lists,type,user_id)=>{
    try {
      let task_id = '';
      
      if(type!='task'){
          console.log("addCalendarEvent started")
          task_id  = await addCalendarEvent(user_id,title,task_lists);
          console.log("addCalendarEvent started end")
        }else{
          console.log("addCalendarTask started end")
          task_id = await addTask(title,task_lists,'',user_id);
          console.log("addCalendarTask started end")
        }
        console.log(task_id);
        const result = await rp_addTask(title,task_lists,type,user_id,task_id);
        return result; 
       } catch (error) {
        return {status:400,data:error.message};
       }
}

const svc_updateTask = async (task_id,updated_field_obj,type,user_id)=>{
    try {

        let title, tasks_list;

        updated_field_obj.forEach(item => {
        if (item.updated_field === "title") {
            title = item.updated_field_value;
        } else if (item.updated_field === "task_lists") {
            tasks_list = item.updated_field_value;
        }
        });

        if(type=='task'){
         let result = await updateTask(task_id,user_id,title,tasks_list)
        }else{
          const data = await updateCalendarEvent(user_id,task_id,title,tasks_list)
        }


        const result = await rp_updateTaskDetails(task_id,updated_field_obj,user_id);
        return result;
        
       } catch (error) {
        return {status:400,data:error.message};
       }
}

const svc_deleteTask = async (task_id,user_id,type)=>{
    try {

      if(type=='task')
      {
        const data = await deleteTask(task_id,user_id);
      }else{
        const data = await cancelEvent(user_id,task_id)
      }


        const result = await rp_deleteTask(task_id,user_id);
        return result;
        
       } catch (error) {
        return {status:400,data:error.message};
       }
}

const svc_findTaskByUserID = async (user_id)=>{
    try {

        const result = await rp_findTaskByUserID(user_id);
        return result;
        
       } catch (error) {
        return {status:400,data:error.message};
       }
}

const svc_findTaskByTaskID = async (task_id)=>{
    try {

        const result = await rp_findTaskByTaskID(task_id);
        return result;
        
       } catch (error) {
        return {status:400,data:error.message};
       }
}

const svc_getTasksData = async (search,sortBy,sortOrder,skip,limit)=>{
    try {

        const result = await rp_getTasksData(search,sortBy,sortOrder,skip,limit);
        return result;
        
       } catch (error) {
        return {status:400,data:error.message};
       }
}

const fetchCalendarEvents = async (userId) => {
    const accessToken = await getAccessToken(userId);
  
    const oAuth2Client = new google.auth.OAuth2();
    oAuth2Client.setCredentials({ access_token: accessToken });
  
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
  
    const { data } = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
  
    return data.items;
};

const addCalendarEvent = async (userId,title, eventDetailList) => {
    const accessToken = await getAccessToken(userId);
  
    const oAuth2Client = new google.auth.OAuth2();
    oAuth2Client.setCredentials({ access_token: accessToken });    
  
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
  
    const formattedString = eventDetailList
    .map((phrase, index) => `${index + 1}. ${phrase}.`) // Add numbering and period
    .join("\n"); // Join with a space between

    console.log(formattedString);

    const taskEvent = {
        summary: title,
        description: formattedString, // Details
        start: {
          date: '2024-11-18', // Task start date (all-day event)
        },
        end: {
          date: '2024-11-18', // Task end date (same as start for one-day tasks)
        },
        status: 'confirmed', // Status can be 'confirmed' or 'tentative'
    };
  
      // Insert the task event into the primary calendar
    const result = await calendar.events.insert({
        calendarId: 'primary', // Use 'primary' for the main calendar
        requestBody: taskEvent,
    });
    
    return result.data.id;
};

const updateCalendarEvent = async (userId, eventId, title,eventDetailList) => {
    const accessToken = await getAccessToken(userId);
  
    const oAuth2Client = new google.auth.OAuth2();
    oAuth2Client.setCredentials({ access_token: accessToken });
  
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

    const formattedString = eventDetailList
    .map((phrase, index) => `${index + 1}. ${phrase}.`) // Add numbering and period
    .join("\n"); // Join with a space between

    console.log(formattedString);

    const taskEvent = {
        summary: title,
        description: formattedString, // Details
        start: {
          date: '2024-11-18', // Task start date (all-day event)
        },
        end: {
          date: '2024-11-19', // Task end date (same as start for one-day tasks)
        },
        status: 'confirmed', // Status can be 'confirmed' or 'tentative'
    };

    console.log(eventId);
    
  
    const { data } = await calendar.events.update({
      calendarId: 'primary',
      eventId:eventId,
      requestBody: taskEvent,
    });

    console.log("updated task :",data);
    
  
    return data;
};

const cancelEvent = async (userId,eventId)=>{
    try {

        const accessToken = await getAccessToken(userId);
  
        const oAuth2Client = new google.auth.OAuth2();
        oAuth2Client.setCredentials({ access_token: accessToken });
      
      const calendar = google.calendar({ version: 'v3', auth : oAuth2Client });
  
      const updatedEvent = {
        status: 'cancelled',
        start: {
            date: '2024-11-18', // Task start date (all-day event)
          },
        end: {
            date: '2024-11-19', // Task end date (same as start for one-day tasks)
          },
      };
  
      // Update the event in the calendar to mark it as canceled
      const response = await calendar.events.update({
        calendarId: 'primary', // Use 'primary' for the user's main calendar
        eventId: eventId, // The ID of the event you want to cancel
        requestBody: updatedEvent,
      });
  
      console.log('Event canceled:', response.data);
    } catch (error) {
      console.error('Error canceling event:', error.message);
    }
}

async function addTask(title, task_lists, due,userId) {
  try {

    const accessToken = await getAccessToken(userId);
  
    const oAuth2Client = new google.auth.OAuth2();
    oAuth2Client.setCredentials({ access_token: accessToken });

    const formattedString = task_lists
    .map((phrase, index) => `${index + 1}. ${phrase}.`) // Add numbering and period
    .join("\n"); // Join with a space between

    console.log(formattedString);

  
    const tasks = google.tasks({ version: 'v1', auth: oAuth2Client });

    const taskListId = '@default'; // Use '@default' for the default task list
    const task = {
      title, 
      notes:formattedString,
      due:'', 
    };

    console.log(task);
    

    const response = await tasks.tasks.insert({
      tasklist: taskListId,
      requestBody: task,
    });

    console.log('Task added:', response.data);

    return response.data.id ;
  } catch (error) {
    console.error('Error adding task:', error.message);
  }
}

async function deleteTask(taskId,userId) {
  try {

    const accessToken = await getAccessToken(userId);
  
    const oAuth2Client = new google.auth.OAuth2();
    oAuth2Client.setCredentials({ access_token: accessToken });
  
    const tasks = google.tasks({ version: 'v1', auth: oAuth2Client });

    const taskListId = '@default'; // Default task list

    await tasks.tasks.delete({
      tasklist: taskListId,
      task: taskId,
    });

    console.log('Task deleted:', taskId);
  } catch (error) {
    console.error('Error deleting task:', error.message);
  }
}

async function updateTask(taskId,userId,title, task_lists) {
  try {

        const accessToken = await getAccessToken(userId);
      
        const oAuth2Client = new google.auth.OAuth2();
        oAuth2Client.setCredentials({ access_token: accessToken });

        const formattedString = task_lists
        .map((phrase, index) => `${index + 1}. ${phrase}.`) 
        .join("\n");

        console.log(formattedString);

        const tasks = google.tasks({ version: 'v1', auth: oAuth2Client });

    const taskListId = '@default';

    const new_task = {
      title, 
      notes:formattedString,
      due:'', 
    };

    const taskResponse = await tasks.tasks.update({
      tasklist: taskListId,
      task: taskId,
      requestBody: new_task,
    });

    const old_task = taskResponse.data;

    console.log("old_task :",old_task);

    console.log('Task updated:', response.data);
  } catch (error) {
    console.log(error);
    
    console.error('Error updating task:', error.message);
  }
}

export {svc_addTask,svc_updateTask,svc_deleteTask,svc_findTaskByUserID,svc_getTasksData,svc_findTaskByTaskID}