import { injectable } from "tsyringe";
import AdminSI from "../interfaces/admin.interface";
import AdminModel from "../models/admin.model";
import BaseService from "./base.service";

import { signJwt } from "../utils/jwt";
import { get, omit } from "lodash";

@injectable()
export default class AdminService extends BaseService<AdminSI> {
  constructor(modelI?: AdminModel) {
    super(modelI);
  }

  signAccessToken = async (admin: AdminSI) => {
    const payload = omit(admin.toJSON(), ["password"]);

    const accessToken = signJwt(payload, "accessTokenPrivateKey", {
      expiresIn: "15m",
    });

    return accessToken;
  };
  signRefreshToken = async (admin: AdminSI) => {
    const objectId = get(admin.toJSON(), ["_id"]);
    const payload = { adminId: objectId.valueOf() };
    const refreshToken = signJwt(payload, "refreshTokenPrivateKey", {
      expiresIn: "1y",
    });
    return refreshToken;
  };
}
