import { injectable } from "tsyringe";
import UserSI from "../interfaces/user.interface";
import UserModel from "../models/user.model";
import BaseService from "./base.service";
import { signJwt } from "../utils/jwt";
import config from "config";

@injectable()
export default class UserService extends BaseService<UserSI> {
  constructor(modelI?: UserModel) {
    super(modelI);
  }
  signAccessToken = async (user: UserSI) => {
    // const payload = omit(user.toJSON(), ["password"]);

    const accessTokenPayload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    const accessToken = signJwt(accessTokenPayload, "accessTokenPrivateKey", {
      expiresIn: config.get("accessTokenExpiration"),
    });

    return accessToken;
  };
  signRefreshToken = async (user: UserSI) => {
    const refreshTokenPayload = {
      userId: user._id,
    };
    const refreshToken = signJwt(refreshTokenPayload, "refreshTokenPrivateKey", {
      expiresIn: config.get("refreshTokenExpiration"),
    });
    return refreshToken;
  };
}
