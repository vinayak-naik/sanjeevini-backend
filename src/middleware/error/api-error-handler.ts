// src/middleware/errorHandler.ts
import { Request, Response } from "express";
import AppError from "./app-error";
import logger from "../../utils/logger";

const errorHandler = (err: Error, req: Request, res: Response) => {
  if (err instanceof AppError) {
    // Handle application-specific errors
    return res.status(err.statusCode).json({ error: err.message });
  }

  // Handle other types of errors
  logger.error(err);
  return res.status(500).json({ error: err.message });
};

export default errorHandler;
