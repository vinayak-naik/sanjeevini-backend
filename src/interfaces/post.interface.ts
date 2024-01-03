import mongoose from "mongoose";

export interface PostI {
  title: string;
  description: string;
}

export default interface PostSI extends PostI, mongoose.Document {}
