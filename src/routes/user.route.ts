import { Router } from "express";
import UserController from "../controllers/user.controller";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/", userController.createUser);

userRouter.post("/login", userController.loginUser);

// userRouter.post("/verify", userController.verifyOTP);

// userRouter.patch("/add-balance", requireUser, userController.addBalance);

export default userRouter;
