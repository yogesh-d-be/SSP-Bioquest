const sanitizeHtml = require('sanitize-html');

exports.sendMailToAdmin = (mailData) => {
  const sanitizedUserName = sanitizeHtml(mailData.userName);
  const sanitizedEmail = sanitizeHtml(mailData.emailAddress);
  const sanitizedPhoneNumber = sanitizeHtml(mailData.mobileNumber);
  const sanitizedMessage = sanitizeHtml(mailData.message);

  return `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 20px auto; border: 1px solid #ddd; border-radius: 8px; background-color: #ffffff; overflow: hidden; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
    <!-- Header -->
    <div style="background-color: #0056b3; padding: 20px; text-align: center;">
      <img src="https://qttjzliixjrkwcmgtjxo.supabase.co/storage/v1/object/public/sspbioquest/SSPBioQuest/Product/SSP%20Bioquest.jpg" alt="Startup Logo" style="width:80%; height:150px;"/>
      <h1 style="color: #ffffff; font-size: 24px; margin: 0;">Help & Support Form Submission</h1>
    </div>

    <!-- Body -->
    <div style="padding: 20px;">
      <p style="font-size: 16px; color: #555; text-align: center; margin-bottom: 30px;">
        A new support request has been submitted. Here are the details:
      </p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 0 auto; font-size: 16px;">
        <tr style="background-color: #f4f4f4;">
          <th style="text-align: left; padding: 12px; border: 1px solid #ddd;">Field</th>
          <th style="text-align: left; padding: 12px; border: 1px solid #ddd;">Details</th>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Name</td>
          <td style="padding: 12px; border: 1px solid #ddd;">${sanitizedUserName}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Email</td>
          <td style="padding: 12px; border: 1px solid #ddd;">${sanitizedEmail}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Mobile Number</td>
          <td style="padding: 12px; border: 1px solid #ddd;">${sanitizedPhoneNumber}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Message</td>
          <td style="padding: 12px; border: 1px solid #ddd;">${sanitizedMessage}</td>
        </tr>
      </table>
    </div>

    <!-- Footer -->
    <div style="background-color: #0056b3; color: #ffffff; padding: 15px; text-align: center; font-size: 14px;">
      <p style="margin: 0;">&copy; ${new Date().getFullYear()} SSP BioQuest. All rights reserved.</p>
      <p style="margin: 5px 0;">This is an automated email. Please do not reply directly to this message.</p>
    </div>
  </div>
  `;
};
