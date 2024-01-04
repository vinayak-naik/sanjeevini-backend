import { Schema, Model, model } from "mongoose";
import { singleton } from "tsyringe";
import ModelI from "../interfaces/model.interface";
import UserSI from "../interfaces/user.interface";

@singleton()
export default class UserModel implements ModelI {
  schema: Schema<any> = new Schema(
    {
      firstName: {
        type: String,
        required: true,
        lowercase: true,
      },
      lastName: {
        type: String,
        required: true,
        lowercase: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      verificationCode: {
        type: String,
      },
      balance: {
        type: Number,
        default: 0,
      },
      role: {
        type: String,
        value: "user",
      },
      disabled: {
        type: Boolean,
        value: false,
      },
    },
    {
      timestamps: true,
    }
  );
  model: Model<any, any> = model<UserSI>("users", this.schema);
}
