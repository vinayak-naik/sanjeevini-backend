import { Response } from "express";

const sendResponse = (
  res: Response,
  statusCode: number,
  success: boolean,
  data: any,
  message: string,
) => {
  res.status(statusCode).json({
    success,
    data,
    message,
  });
};
export default sendResponse;
