import mongoose from "mongoose";

export interface AdminI {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  verificationCode: string;
}

export default interface AdminSI extends AdminI, mongoose.Document {}
