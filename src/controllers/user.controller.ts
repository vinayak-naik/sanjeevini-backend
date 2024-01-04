import { autoInjectable } from "tsyringe";
import UserService from "../services/user.service";
import BaseController from "./base.controller";
import sendResponse from "../utils/sendResponse";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { generateOTP } from "../utils/uniqueNumber";

@autoInjectable()
export default class UserController extends BaseController {
  service: UserService;
  constructor(service?: UserService) {
    super(service);
    this.service = service;
  }

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check existing user
      const user = await this.service.findOne({ email: req.body.email });
      if (user) {
        const message = "User already exists";
        sendResponse(res, 403, false, null, message);
        return;
      }
      // Generate OTP
      const otp = generateOTP();

      // Hash OTP
      const hashedOTP = await bcrypt.hash(otp, 10);

      // Add OTP-hash to user ddocument
      req.body.verificationCode = hashedOTP;
      // Hash OTP
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Add OTP-hash to user ddocument
      req.body.password = hashedPassword;
      const resource = await this.service.post(req.body);

      // Remove OTP-hash from user ddocument
      resource.verificationCode = null;
      const successMessage = "User created successfully";
      sendResponse(res, 200, true, resource, successMessage);
    } catch (error) {
      next(error);
    }
  };
  loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const failedMessage = "Invalid email or password";
      // Check existing user
      const user = await this.service.findOne({ email: req.body.email });
      if (!user) {
        sendResponse(res, 403, false, null, failedMessage);
        return;
      }

      const compare = await bcrypt.compare(req.body.password, user.password);
      if (!compare) {
        sendResponse(res, 403, false, null, failedMessage);
        return;
      }
      const accessToken = await this.service.signAccessToken(user);

      // sign a refresh token
      const refreshToken = await this.service.signRefreshToken(user);
      const successMessage = "Logged in successfully";
      sendResponse(res, 200, true, { accessToken, refreshToken }, successMessage);
    } catch (error) {
      next(error);
    }
  };
}
