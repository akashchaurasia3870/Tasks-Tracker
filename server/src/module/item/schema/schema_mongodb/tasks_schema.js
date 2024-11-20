import mongoose from  'mongoose';
import generateUniqueId from '../../../../utils/ustis.js'
const Schema = mongoose.Schema ;

const tasks_schema = new Schema({
    task_id :{
        type:String,
        required:true,
        default:generateUniqueId()
    },
    created_by :{
        type:String,
        required:true,
    },
    deleted_by :{
        type:String,
        default:""
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    title :{
        type:String,
        required:true,
    },
    task_lists :{
        type:Array,
        default:[]
    },
    status :{
        type:String,
        enum:['new','pending','completed'],
        default:'new'
    },
    type :{
        type:String,
        enum:['task','event'],
        default:'task'
    },
    priority:{
        type:String,
        enum:['1','2','3','4','5'],
        default:'1'
    },
    deleted: {
        type: String,
        default: 0
    }
})

let Tasks = mongoose.model('Tasks',tasks_schema);

export {Tasks} ;