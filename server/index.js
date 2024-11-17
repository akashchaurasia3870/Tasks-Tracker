import express from 'express';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';

import { authRouter } from './src/module/auth/routes/routes.js';
import { taskRouter } from './src/module/item/routes/routes.js';
import { getConnection } from './src/middleware/connection/connection_mongodb.js';
import { Users } from './src/module/auth/schema/schema_mongodb/user_schema.js';
import { svc_signUp } from './src/module/auth/service/service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// created server
const server  = express();
await getConnection();

server.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:true
}))

const corsOptions = {
    origin:"*",
    credential:true,
    openSuccessStatus:200
}

server.use(cors(corsOptions))
server.use(bodyParser.json());

server.use(passport.initialize());
server.use(passport.session())

server.get('/logout',(req,res)=>{
    req.logout(()=>{
        res.redirect('/')
    });
})

server.use('/auth',authRouter)

server.use('/tasks',taskRouter)

server.use((req,res)=>{
   console.log(req.url);
   
   console.log("Invalid Request");
   res.status(404).send('invalid request route not found')
})

const PORT = process.env.PORT || 5000 ;
server.listen(PORT,async ()=>{
    console.log('SERVER START LISTENING ON PORT ',PORT);
})




























// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:5000/auth/google/callback"
//   },
//   async (accessToken, refreshToken, profile, cb) => {
//     try {

//         console.log("Profile : ",profile);

//         let user  = await Users.findOne({ email:profile.__json.email})

//         console.log(user);
        

//         if(!user){
//           let result  = await svc_signUp(username,email,password)

//           return result
//         }

//         return user ;
        
//     } catch (error) {
//         return null;
//     }
//     // User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     //   return cb(err, user);
//     // });
//   }
// ));

// server.get('/auth/google',passport.authenticate('google', { session:false, scope: ['profile','email'] }));
  
// server.get('/auth/google/callback', 
//     passport.authenticate('google', { session:false, failureRedirect: `${process.env.CLIENT_HOST}/signin`}),
//     (req, res) => {

//         console.log(req);
        
//       // access user object
//       // Successful authentication, redirect home.
//       res.redirect('/');
// });
  