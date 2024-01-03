import { Router } from "express";
import adminRouter from "./admin.route";
import userRouter from "./user.route";

const indexRouter = Router();

indexRouter.use("/user", userRouter);
indexRouter.use("/admin", adminRouter);

export default indexRouter;
