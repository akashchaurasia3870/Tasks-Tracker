import { Users } from "../schema/schema_mongodb/user_schema.js";
import bcrypt from 'bcryptjs';

const rp_addUser = async (username,email,hashedPassword,user_data)=>{
    try {

        let newUser = {
            username,
            email,
            password:hashedPassword,
        }

        console.log(user_data);
        

        if(user_data!==null){
            newUser.accessToken = user_data.accessToken;
            newUser.refreshToken = user_data.refreshToken;
            newUser.user_img = user_data.img_url
        }

        console.log(newUser);
        
    
        let result = await Users.create(newUser);    

        return {status:201,data:result};
        
    } catch (error) {
        console.log(error.message);
        return {status:400,data:error.message};

    }
}

const rp_deleteUser = async (user_id)=>{
    try {
    
        let result = await Users.deleteOne(
            {user_id},
            {$set:{ deleted:1}}
        );    

        return {status:200,data:result};
        
    } catch (error) {
        console.log(error.message);
        return {status:400,data:error.message};

    }
}

const rp_updateUserDetails = async (user_id,updated_field_obj)=>{
    try {

        // const updated_field_obj = [
        //     { field: 'name', value: 'John Doe' },
        //     { field: 'email', value: 'johndoe@example.com' },
        //     { field: 'age', value: 30 },
        //   ];

        let updateFields = {};

        updated_field_obj.forEach(({field,value}) => {
            updateFields[field]=value
        });
    
        let result = await Users.findByIdAndUpdate(
            {user_id,deleted:0},
            {$set:{ updateFields}}
        );    

        return {status:200,data:result};
        
    } catch (error) {
        console.log(error.message);
        return {status:400,data:error.message};

    }
}

const rp_resetUserPassword = async (user_id,password)=>{
    try {

        const hashedPassword = await bcrypt.hash(password,10)
    
        let result = await Users.updateOne(
            {user_id,deleted:0},
            {$set:{password:hashedPassword}}
        ); 
        
        let message = "";
        
        if(result.acknowledged && result.modifiedCount==1 && result.matchedCount==1)
        {
            message = "Password Updated Successfully";
        }else{
            message = "Password Not Updated Something Went Wrong";
        }

        return {status:200,data:{result,message}};
        
    } catch (error) {
        console.log(error.message);
        return {status:400,data:error.message};

    }
}

const rp_findUserByEmail = async (email)=>{
    try {        
    
        let result = await Users.findOne({email,deleted:0});  
        
        if(result!=null){
            return {status:200,data:result};
        }else{
            return {status:404,data:null};
        }
        

        
    } catch (error) {
        console.log(error.message);
        return {status:400,data:error.message};

    }
}

const rp_findUserByID = async (user_id)=>{
    try {
    
        let result = await Users.findOne({user_id,deleted:0});    

        return {status:200,data:result};
        
    } catch (error) {
        console.log(error.message);
        return {status:400,data:error.message};

    }
}

const rp_getAuthToken = async (user_id)=>{
    try {
    
        let result = await Users.findOne({user_id,deleted:0});    

        return {status:200,data:result};
        
    } catch (error) {
        console.log(error.message);
        return {status:400,data:error.message};

    }
}

const rp_updateAuthToken = async (user_id,accessToken,tokenExpiryDate)=>{
    try {

        let result = await Users.updateOne(
            {user_id,deleted:0},
            {$set:{accessToken,tokenExpiryDate}}
        ); 
        
        console.log("result ",result)

        return {status:200,data:result};
        
    } catch (error) {
        console.log(error.message);
        return {status:400,data:error.message};

    }
}


const rp_get_users = async (search,sortBy='created_at',sortOrder='asc',skip=0,limit=10)=>{
    try {

        const filter = {deleted:0};

        // search by keyword in title and tasks list
        if(search!==''){
            filter.$or = [
                {title:{$regex:keyword,$options:'i'}},
                {tasks_lists:{$regex:keyword,$options:'i'}},
            ]
        }
    
        let result = await Users.find(filter)
        .sort({[sortBy]:sortOrder==='asc'?1:-1})
        .limit(limit)
        .skip(skip);    

        return {status:200,data:result};
        
    } catch (error) {
        console.log(error.message);
        return {status:400,data:error.message};

    }
}

export {
    rp_addUser,
    rp_findUserByEmail,
    rp_resetUserPassword,
    rp_findUserByID,
    rp_get_users,
    rp_deleteUser,
    rp_updateUserDetails,
    rp_getAuthToken,
    rp_updateAuthToken
};