import { injectable } from "tsyringe";
import AdminSI from "../interfaces/admin.interface";
import AdminModel from "../models/admin.model";
import BaseService from "./base.service";

import { signJwt } from "../utils/jwt";
import config from "config";

@injectable()
export default class AdminService extends BaseService<AdminSI> {
  constructor(modelI?: AdminModel) {
    super(modelI);
  }

  signAccessToken = async (admin: AdminSI) => {
    // const payload = omit(admin.toJSON(), ["password"]);

    const accessTokenPayload = {
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
    };

    const accessToken = signJwt(accessTokenPayload, "accessTokenPrivateKey", {
      expiresIn: config.get("accessTokenExpiration"),
    });

    return accessToken;
  };
  signRefreshToken = async (admin: AdminSI) => {
    const refreshTokenPayload = {
      adminId: admin._id,
    };
    const refreshToken = signJwt(
      refreshTokenPayload,
      "refreshTokenPrivateKey",
      {
        expiresIn: config.get("refreshTokenExpiration"),
      },
    );
    return refreshToken;
  };
}
