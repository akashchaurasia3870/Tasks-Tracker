import {svc_signIn,svc_signUp,svc_resetPassword,svc_get_users,svc_findUserByEmail} from '../service/service.js'

const signUp = async (req,res)=>{
   try {

    const {username,email,password} = req.body;
    const result = await svc_signUp(username,email,password);
    return result;
    
   } catch (error) {
    return {status:400,data:error.message};
   }
}

const signIn = async (req,res)=>{
    try {

        const {email,password} = req.body;
        const result = await svc_signIn(email,password);
        return result;
        
       } catch (error) {
        return {status:400,data:error.message};
       }
}

const resetPassword = async (req,res)=>{
    try {

        const {user_id,new_password} = req.body;
        const result = await svc_resetPassword(user_id,new_password);
        return result;
        
       } catch (error) {
        return {status:400,data:error.message};
       }
}
const getUsers = async (req,res)=>{
    try {

        const {search,sortBy,sortOrder,skip,limit} = req.body;
        const result = await svc_get_users(search,sortBy,sortOrder,skip,limit);
        return result;
        
       } catch (error) {
        return {status:400,data:error.message};
       }
}

const googleAuth = async (req,res)=>{

    try {
         
        let user_data = {
            email: req.user.profile.emails[0].value,
            name: req.user.profile.displayName,
            img_url: req.user.profile.photos[0].value,
            accessToken:req.user.accessToken,
            refreshToken:req.user.refreshToken
        }

        console.log(req.user.expires_in,"expires_in");
        

        console.log('Access Token:', req.user.accessToken);
        console.log('Refresh Token:', req.user.refreshToken);
        let result = await svc_findUserByEmail(user_data.email)
        
        let result_data = '';
        if(result.status==404){

             result_data = svc_signUp(user_data.name,user_data.email,'',user_data)
                
        }else{
             result_data = svc_signIn(user_data.email,'',true);
        }
        return result_data;

    } catch (error) {
        return {status:400,data:error.message};
    }

}

export {signIn,signUp,resetPassword,googleAuth,getUsers}