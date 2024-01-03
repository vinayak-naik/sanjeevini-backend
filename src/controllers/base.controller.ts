import { NextFunction, Request, Response } from "express";
import BaseService from "../services/base.service";
import sendResponse from "../utils/sendResponse";

export default class BaseController {
  service: BaseService<any>;
  constructor(service: BaseService<any>) {
    this.service = service;
  }

  post = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resource = await this.service.post(req.body);
      res.send(resource);
    } catch (error) {
      next(error);
    }
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resource = await this.service.get();
      res.send(resource);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const resource = await this.service.getById(id);
      if (resource === null) {
        const notFoundMessage = "No data found";
        sendResponse(res, 400, false, resource, notFoundMessage);
        return;
      }
      res.send(resource);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const resource = await this.service.delete(id);
      res.send(resource);
    } catch (error) {
      next(error);
    }
  };
}
