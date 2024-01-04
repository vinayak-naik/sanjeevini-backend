import { Router } from "express";
import adminRouter from "./admin.route";
import userRouter from "./user.route";

const indexRouter = Router();

indexRouter.use("/admin", adminRouter);

indexRouter.use("/user", userRouter);

indexRouter.use("/", (req, res) => res.send("Server is running"));

export default indexRouter;
