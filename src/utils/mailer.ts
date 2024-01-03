import nodemailer, { SendMailOptions } from "nodemailer";
import config from "config";
import log from "./logger";

async function sendEmail(payload: SendMailOptions) {
  try {
    const senderEmail = config.get("senderEmail");
    const senderEmailPassword = config.get("senderEmailPassword");
    const transporter = nodemailer.createTransport(
      `smtp://${senderEmail}:${senderEmailPassword}@smtp-mail.outlook.com`,
    );
    await transporter.sendMail(payload);
    log.info("Email sent successfully");
    return;
  } catch (error) {
    log.error(error, "Error sending email");
    return;
  }
}

export default sendEmail;
