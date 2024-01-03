import { autoInjectable } from "tsyringe";
import bcrypt from "bcrypt";
import AdminService from "../services/admin.service";
import BaseController from "./base.controller";
import { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import AdminSI, { AdminI } from "../interfaces/admin.interface";
import sendEmail from "../utils/mailer";
import config from "config";
import { nanoid } from "nanoid";
import { generateOTP } from "../utils/uniqueNumber";
import { generateEmailTemplateForOTP } from "../utils/emailTemplate";

@autoInjectable()
export default class AdminController extends BaseController {
  service: AdminService;
  constructor(service?: AdminService) {
    super(service);
    this.service = service;
  }
  createAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check existing admin
      const adminList = await this.service.get();
      if (adminList.length > 0) {
        const message = "Admin already exists";
        sendResponse(res, 403, false, null, message);

        return;
      }
      // req.body.password = hash;
      
      const otp = generateOTP();
      const hash = await bcrypt.hash(otp, 10);
      req.body.verificationCode = hash;
      const resource = await this.service.post(req.body);
      resource.password = null;
      res.send(resource);
    } catch (error) {
      next(error);
    }
  };

  loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const failedMessage = "Invalid email or password";
      // Check existing admin
      const admin = await this.service.findOne({ email: req.body.email });
      if (!admin) {
        sendResponse(res, 403, false, null, failedMessage);
        return;
      }
      // const compare = await bcrypt.compare(req.body.password, admin.password);
      // if (!compare) {
      //   sendResponse(res, 403, false, null, failedMessage);
      //   return;
      // }

      const otp = generateOTP();
      const hash = await bcrypt.hash(otp, 10);

      await this.service.findOneAndUpdate(
        { email: admin.email },
        { verificationCode:hash }
      );

      const template = generateEmailTemplateForOTP(
        admin.firstName,
        admin.lastName,
        otp
      );

      await sendEmail({
        to: admin.email,
        from: config.get("senderEmail"),
        subject: "Email Verification, Sanjeevini",
        html: template,
      });

      const successMessage = "OTP sent successfully";
      sendResponse(res, 200, true, null, successMessage);
    } catch (error) {
      next(error);
    }
  };

  verifyOTP = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const failedMessage = "Invalid email or password";
      const verificationFailedMessage = "Verification Failed";
      const successMessage = "Logged in successfully";
      const admin = await this.service.findOne({ email: req.body.email });
      if (!admin) {
        sendResponse(res, 403, false, null, failedMessage);
        return;
      }

      const compare = await bcrypt.compare(req.body.verificationCode, admin.verificationCode);
      if (!compare) {
        sendResponse(res, 403, false, null, verificationFailedMessage);
        return;
      }

      // if (admin.verificationCode !== req.body.verificationCode) {
      //   sendResponse(res, 403, false, null, verificationFailedMessage);
      //   return;
      // }
      // sign a access token
      const accessToken = await this.service.signAccessToken(admin);

      // sign a refresh token
      const refreshToken = await this.service.signRefreshToken(admin);
      sendResponse(
        res,
        200,
        true,
        { accessToken, refreshToken },
        successMessage
      );
    } catch (error) {
      next(error);
    }
  };
}
