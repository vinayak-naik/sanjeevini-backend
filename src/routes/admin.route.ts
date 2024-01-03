import { Router } from "express";
import AdminController from "../controllers/admin.controller";

const adminRouter = Router();
const adminController = new AdminController();

adminRouter.post("/", adminController.createAdmin);
adminRouter.post("/login", adminController.loginAdmin);
adminRouter.post("/verify", adminController.verifyOTP);

export default adminRouter;
