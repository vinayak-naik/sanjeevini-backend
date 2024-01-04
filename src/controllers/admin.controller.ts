import { autoInjectable } from "tsyringe";
import bcrypt from "bcrypt";
import AdminService from "../services/admin.service";
import BaseController from "./base.controller";
import { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import sendEmail from "../utils/mailer";
import config from "config";
import { generateOTP } from "../utils/uniqueNumber";
import { generateEmailTemplateForOTP } from "../utils/emailTemplate";
import AdminSI from "../interfaces/admin.interface";

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

      // Generate OTP
      const otp = generateOTP();

      // Hash OTP
      const hash = await bcrypt.hash(otp, 10);

      // Add OTP-hash to admin ddocument
      req.body.verificationCode = hash;
      const resource = await this.service.post(req.body);

      // Remove OTP-hash from admin ddocument
      resource.verificationCode = null;
      const successMessage = "Admin created successfully";
      sendResponse(res, 200, true, resource, successMessage);
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
      // Generate OTP
      const otp = generateOTP();

      // Hash OTP
      const hash = await bcrypt.hash(otp, 10);

      // Add OTP to admin ddocument
      await this.service.findOneAndUpdate({ email: admin.email }, { verificationCode: hash });

      // Create email template for OTP
      const template = generateEmailTemplateForOTP(admin.firstName, admin.lastName, otp);
      // Send OTP to admin email
      const response = await sendEmail({
        to: admin.email,
        from: config.get("senderEmail"),
        subject: "Email Verification, Sanjeevini",
        html: template,
      });

      if (!response) {
        const failedEmailMessage = "Failed to send OTP";
        sendResponse(res, 400, false, null, failedEmailMessage);
      }

      // Send response
      const successMessage = "OTP sent successfully";
      sendResponse(res, 200, true, null, successMessage);
    } catch (error) {
      next(error);
    }
  };

  verifyOTP = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const admin = await this.service.findOne({ email: req.body.email });
      if (!admin) {
        const failedMessage = "Invalid email or password";
        sendResponse(res, 403, false, null, failedMessage);
        return;
      }

      const compare = await bcrypt.compare(req.body.verificationCode, admin.verificationCode);
      if (!compare) {
        const verificationFailedMessage = "Verification Failed";
        sendResponse(res, 403, false, null, verificationFailedMessage);
        return;
      }

      // sign a access token
      const accessToken = await this.service.signAccessToken(admin);

      // sign a refresh token
      const refreshToken = await this.service.signRefreshToken(admin);

      const successMessage = "Logged in successfully";
      sendResponse(res, 200, true, { accessToken, refreshToken }, successMessage);
    } catch (error) {
      next(error);
    }
  };

  addBalance = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const admin = (await this.service.findOne({
        email: res.locals.user.email,
      })) as AdminSI;
      if (!admin) {
        const failedMessage = "Admin not found";
        sendResponse(res, 403, false, null, failedMessage);
        return;
      }
      const finalBalance = req.body.balance + admin.balance;
      const updatedAdmin = (await this.service.findOneAndUpdate(
        { email: res.locals.user.email },
        { balance: finalBalance }
      )) as AdminSI;
      const successMessage = "Balance added successfully";
      sendResponse(res, 200, true, updatedAdmin, successMessage);
    } catch (error) {
      next(error);
    }
  };
}
