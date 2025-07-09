import nodemailer from 'nodemailer';
import { EMAIL_HOST, EMAIL_PORT, EMAIL_SECURITY } from '../config/config.js';

const SendEmail=async(EmaileTo,EmaileText,EmaileSubject)=>{
let transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_SECURITY, // true for 465, false for other ports
    auth: {
        user:EMAIL_USER, // generated ethereal user
        pass:EMAIL_PASS, // generated ethereal password
    },
     tls: {
        rejectUnauthorized: false // Allow self-signed certificates
    }
})
let mailOptions = {
    from: `"No Reply" <info@teamrabbil.com>`, // sender address
    to: EmaileTo, // list of receivers
    subject: EmaileSubject, // Subject line
    text: EmaileText, // plain text body
     
};
   return await transporter.sendMail(mailOptions)
    .then(info => {
        console.log("Email sent: " + info.response);
        return { status: "success", message: "Email sent successfully" };
    })
    .catch(error => {
        console.error("Error sending email: ", error);
        return { status: "fail", message: "Failed to send email" };
    });
}