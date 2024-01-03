export const generateEmailTemplateForOTP = (
  firstName: string,
  lastName: string,
  verificationCode: string,
) => {
  const template = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>One-Time Password (OTP)</title>
    </head>
    <body style="font-family: Arial, sans-serif;">
    
        <div style="max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd;">
    
            <h2 style="color: #333;">Your One-Time Password (OTP)</h2>
    
            <p>Dear ${firstName} ${lastName},</p>
    
            <p>To ensure the security of your account, we require you to verify your identity using the following One-Time Password (OTP):</p>
    
            <p style="font-size: 24px; font-weight: bold; color: #007BFF;">OTP: ${verificationCode}</p>
    
            <p>Please enter this OTP within the next  10 minutes to complete the verification process. If you did not initiate this request, please contact our support team immediately at mail@sanjeevini.com.</p>
    
            <p style="margin-top: 30px;">Best regards,<br>
            Sanjeevini<br>
            mail@sanjeevini.com</p>
    
        </div>
    
    </body>
    </html>
    `;
  return template;
};
