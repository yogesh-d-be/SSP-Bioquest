// const {google} = require('googleapis');
// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const config = require('../config/config');
// const app = express();

// const oauth2Client = new google.auth.OAuth2(
//     config.googleDrive.clientId,
//     config.googleDrive.clientSecret,
//     config.googleDrive.redirectUri
// );

// const SCOPES = ['https://www.googleapis.com/auth/drive'];

// const getAuthUrl = () => {
//     return oauth2Client.generateAuthUrl({
//       access_type: 'offline',
//       scope: SCOPES, 
//     });
//   };

// // const getToken = async (code) =>{
// //     const {tokens} = await oauth2Client.getToken(code);
// //     oauth2Client.setCredentials(tokens);
// //     return tokens;
// // }

  
//   const drive = google.drive({ version: 'v3', auth: oauth2Client });

// // File upload function
// const uploadFileToGoogleDrive = async (buffer, name, mimeType) => {
//   const fileMetadata = { name }; // Set file name
//   const media = { mimeType, body: buffer }; // Set file data

//   const response = await drive.files.create({
//     resource: fileMetadata,
//     media: media,
//     fields: 'id, webViewLink, webContentLink',
//   });

//   return response.data; // Return file details (e.g., ID, link)
// };

// module.exports ={
//     oauth2Client,
//  getAuthUrl,
//  uploadFileToGoogleDrive
// //  getToken
// };

