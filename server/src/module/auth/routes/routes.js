import express from 'express';
import {signIn,signUp,resetPassword,googleAuth,getUsers} from '../controller/controller.js';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
const authRouter  = express.Router();

dotenv.config();


authRouter.post('/signup',async (req,res)=>{
  const result =await signUp(req,res);
  console.log(result);
  
  res.status(result.status).send({"data":result.data});
})

authRouter.post('/signin',async (req,res)=>{
 const result =await signIn(req,res);
 res.status(result.status).send({"data":result.data});
})

authRouter.post('/signout',async (req,res)=>{
  res.status(200).send({"message":"SignOut Successfully"});
 })

authRouter.post('/reset_creds',async (req,res)=>{
 const result =await resetPassword(req,res);
 res.status(result.status).send({"data":result.data});
})

authRouter.post('/get_users',async (req,res)=>{
 const result =await getUsers(req,res);
 res.status(result.status).send({"data":result.data});
})

authRouter.get('/google_auth',async (req,res)=>{
 const result =await googleAuth(req,res);
 console.log(result);
 
 res.status(result.status).send({"data":result.data});
})

passport.use(new GoogleStrategy({
  clientID:process.env.CLIENT_ID,
  clientSecret:process.env.CLIENT_SECRET,
  callbackURL:"http://localhost:5000/auth/google/callback",
  scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/tasks',
      'openid'
    ],
    accessType: 'offline',
    prompt: 'consent'
},(accessToken,refreshToken,profile,done)=>{
  return done(null,{profile,accessToken,refreshToken})
}));

passport.serializeUser((user,done)=>done(null,user));
passport.deserializeUser((user,done)=>done(null,user));

authRouter.get('/google', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',  // Access to user's email
    'https://www.googleapis.com/auth/userinfo.profile', // Access to user's profile
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/tasks'
  ],
  accessType: 'offline',  // This ensures the refresh token is returned
  prompt: 'consent'      // Forces the consent screen to show even if the user has already granted permission
}));


authRouter.get('/google/callback', 
  passport.authenticate('google', {
    failureRedirect: '/',
    successRedirect: '/auth/google_auth'
  })
);

export {authRouter};



