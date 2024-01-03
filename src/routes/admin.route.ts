import { Router } from "express";
import AdminController from "../controllers/admin.controller";
import validateResource from "../middleware/validateResource";
import {
  createAdminSchema,
  loginAdminSchema,
  verifyOTPSchema,
} from "../schema/admin.schema";

const adminRouter = Router();
const adminController = new AdminController();

adminRouter.post(
  "/",
  validateResource(createAdminSchema),
  adminController.createAdmin,
);
adminRouter.post(
  "/login",
  validateResource(loginAdminSchema),
  adminController.loginAdmin,
);
adminRouter.post(
  "/verify",
  validateResource(verifyOTPSchema),
  adminController.verifyOTP,
);

export default adminRouter;
