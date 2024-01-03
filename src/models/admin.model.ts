import { Schema, Model, model } from "mongoose";
import { singleton } from "tsyringe";
import AdminSI from "../interfaces/admin.interface";
import ModelI from "../interfaces/model.interface";

@singleton()
export default class AdminModel implements ModelI {
  schema: Schema<any> = new Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
    },
    verificationCode: {
      type: String,
    },
  });
  model: Model<any, any> = model<AdminSI>("admins", this.schema);
}
