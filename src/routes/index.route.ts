import { Router } from "express";
import adminRouter from "./admin.route";
import userRouter from "./user.route";

const indexRouter = Router();

indexRouter.use("/admin", adminRouter);
indexRouter.use("/user", userRouter);

export default indexRouter;
