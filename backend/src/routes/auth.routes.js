// const express = require('express');
// const { getAuthUrl, oauth2Client } = require('../utils/googleDrive');
// const authRouter = express.Router();

// authRouter.get('/auth', (req, res) => {
//     console.log('test')
//     const authUrl = getAuthUrl();
//     res.redirect(authUrl);  // Redirect the user to Google's OAuth authorization page
//   });
  
//   // OAuth2 callback route
//   authRouter.get('/oauth2callback', async (req, res) => {
//     const code = req.query.code;
  
//     if (!code) {
//       return res.status(400).send('Missing authorization code');
//     }
  
//     try {
//       // Exchange the authorization code for tokens
//       const { tokens } = await oauth2Client.getToken(code);
//       oauth2Client.setCredentials(tokens);
  
//       // Optionally, save these tokens in a secure place (e.g., database or session)
//       console.log('Access Token:', tokens.access_token);
//       console.log('Refresh Token:', tokens.refresh_token);
  
//       res.send('Authentication successful! You can now use the Google Drive API.');
//     } catch (error) {
//       console.error('Error exchanging authorization code:', error);
//       res.status(500).send('Authentication failed.');
//     }
//   });


//   module.exports = authRouter;