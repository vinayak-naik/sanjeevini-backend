import mongoose from "mongoose";

export interface UserI {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  disabled: boolean;
  balance: number;
  verificationCode: string;
}

export default interface UserSI extends UserI, mongoose.Document {}
