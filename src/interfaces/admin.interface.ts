import mongoose from "mongoose";

export interface AdminI {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  verificationCode: string;
  balance: number;
}

export default interface AdminSI extends AdminI, mongoose.Document {}
