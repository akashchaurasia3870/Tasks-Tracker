import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {rp_addUser,rp_findUserByEmail,rp_resetUserPassword,rp_get_users} from '../repository/repository.js';


const svc_signUp = async (username,email,password='',user_data=null)=>{
   try {

    const hashedPassword = await bcrypt.hash(password,10)
    const result = rp_addUser(username,email,hashedPassword,user_data);

    if(result.status==201){
        const token = jwt.sign({username,email},process.env.JWT_SECRET,{
            expiresIn:'15m'
        })
        return {status:200,data:token}
    }
    
    return result ;
   } catch (error) {
    return {status:400,data:error.message};
   }
}

const svc_signIn = async (email,password,google_auth_flag=false)=>{
    try {

        const user = await rp_findUserByEmail(email);

        console.log(user,"svc_signIn");
        

        if(!user){
            return {status:400,data:"user not exist with this email"};
        }

        if(!google_auth_flag){
            const checkPassword = await bcrypt.compare(password,user.data.password);
            if(!checkPassword){
                return {status:400,data:"incorrect password"};
            }
        }
        

        const token = jwt.sign({username:user.data.username,email},process.env.JWT_SECRET,{
            expiresIn:'15m'
        })

        return {status:200,data:token}
        
       } catch (error) {
        return {status:400,data:error.message};
       }
}

const svc_get_users = async (search,sortBy,sortOrder,skip,limit)=>{
    try {

        const result = await rp_get_users(search,sortBy,sortOrder,skip,limit);
        return result;
        
       } catch (error) {
        return {status:400,data:error.message};
       }
}

const svc_resetPassword = async (user_id,password)=>{
    try {

        const result = await rp_resetUserPassword(user_id,password);
        return result;
        
       } catch (error) {
        return {status:400,data:error.message};
       }
}

const svc_findUserByEmail = async (email)=>{
    try {

        const result = await rp_findUserByEmail(email);

        return result;
        
    } catch (error) {
        return {status:400,data:error.message};
    }
    
}


export {svc_signIn,svc_signUp,svc_resetPassword,svc_get_users,svc_findUserByEmail}