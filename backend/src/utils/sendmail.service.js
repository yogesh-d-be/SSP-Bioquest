const nodemailer = require('nodemailer');
const sanitizeHtml = require('sanitize-html');
const config = require('../config/config');
const ApiError = require('./apiError');
const htmlData = require('./htmlDataForemail')

const mailService = async (sendTo, subject, htmlDataForEmail) => {
    if(!sendTo){
        return {status: false, message: "Recipients not provided"}
    }
    if(!htmlData){
        return {status:false, message: "htmlData is not provided"}
    }
    const transporter = nodemailer.createTransport({
        ...config.email.smtp
    });

    const sanitizeEmail = sanitizeHtml(sendTo);

    const mailOption = {
        from: config.email.from,
        to:sanitizeEmail,
        subject: subject || "Mail From SSP BioQuest",
        html: htmlDataForEmail
    }

    const isMailSent = transporter.sendMail(mailOption);
    if (!isMailSent) {
        return {success:false, message: `Unable to sent the ${subject} Email` };
      }
    
      return {success:true, message: "mail sent successfully"};

}

exports.sendMailToAdmin = async (mailData) =>{
    const htmlDataForEmail = htmlData.sendMailToAdmin(mailData);
    const recipients = `${mailData.emailAddress}, ${config.adminCredentials.adminEmail}`
    let email = await mailService(
        recipients,
        "User Contact Us Form",
        htmlDataForEmail
    );

    if(!email.success){
        throw new ApiError(500, "Unable to send email. please try again.");
    }

    return { success: true, message: "send To admin Email successfully"};
}