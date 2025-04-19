



import { google } from 'googleapis';

/**
 * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI
 * from the client_secret.json file. To get these credentials for your application, visit
 * https://console.cloud.google.com/apis/credentials.
 */
const GOOGLE_CLIENT_ID = '188177420369-4euf5cq0dhcc8pl18t8ghe284rka9b6f.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

 export const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    'postmessage'
);