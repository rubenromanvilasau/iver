const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const sendEmail = async({ to, subject, html }) => {

    const data = { 
        from: process.env.GMAIL_USER,
        to,
        subject,
        html,
    }

   try {
    const oauth2Client = new OAuth2(
        process.env.OAUTH_CLIENT_ID,
        process.env.OAUTH_CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
    );
    
    oauth2Client.setCredentials({
        refresh_token: process.env.OAUTH_REFRESH_TOKEN,
    });

    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
          if (err) {
            console.log("ERR: ", err)
            reject();
          }
          resolve(token); 
        });
      });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.GMAIL_USER,
            accessToken,
            pass: process.env.GMAIL_PASSWORD,
            clientId: process.env.OAUTH_CLIENT_ID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        }
    });

    return new Promise( ( resolve, reject ) => {
        transporter.sendMail(data, (err, info ) => {
            if( err ) {
                console.log( 'Error sending email', err );
                reject( err );
                return;
            }
        
            console.log('Email sent', info);
            resolve( info );
        });
    
    });
   } catch (error) {
        console.log('Error when sending email: ');
        console.log(error);
        throw Error('Error when sending email');
   }

};

module.exports = { sendEmail };