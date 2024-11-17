import mongoose from  'mongoose';
import generateUniqueId from '../../../../utils/ustis.js'

const Schema = mongoose.Schema ;

const users_schema = new Schema({
    user_id:{
        default:generateUniqueId(),
        type:String,
        required:true
    },
    username: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        default: 'dd-mm-yyyy'
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        default: ''
    },
    address: {
        country: {
            type: String,
            default: 'India'
        },
        state: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        },
        street: {
            type: String,
            default: ''
        },
        landmark: {
            type: String,
            default: ''
        }

    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    user_img: {
        type: String,
        default: ''
    },

    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },   
    deleted: {
        type: String,
        default: 0
    },
    varified: {
        type: Boolean,
        default: false
    },
    accessToken: {
        type: String,
        default: ''
    },
    refreshToken: {
        type: String,
        default: ''
    },
    tokenExpiryDate: {
        type: String,
        default:  new Date().getTime() + 3600 * 1000
    },
})

let Users = mongoose.model('Users',users_schema);

export {Users} ;