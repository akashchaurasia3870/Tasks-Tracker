import { google } from 'googleapis';
import dotenv from 'dotenv';
import { rp_getAuthToken,rp_updateAuthToken } from '../../auth/repository/repository.js';

dotenv.config();

export const getAccessToken = async (userId) => {
  const userToken =await rp_getAuthToken(userId);

  // console.log(userToken.data.accessToken);
  // console.log(userToken.data.tokenExpiryDate);
  if (userToken.data && new Date(userToken.data.tokenExpiryDate) > new Date()) {
    return userToken.data.accessToken;
  }
  let token = await refreshAccessToken(userId,userToken.data.refreshToken);
  console.log("token",token);

  return token ;
};

const refreshAccessToken = async (user_id,refreshToken) => {
  
  const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
  );

  oAuth2Client.setCredentials({ refresh_token: refreshToken });


  const credentials = await oAuth2Client.getAccessToken();

  // console.log(credentials)
  const access_token = credentials.res.data.access_token ;
  const expiry_date  = credentials.res.data.expiry_date;

  console.log('-----------------------')
  console.log(access_token, expiry_date);
  console.log('-----------------------')

  

  // Update token storage
  let result =await rp_updateAuthToken(user_id,access_token,expiry_date);
  // console.log(result)

  return access_token;
};
