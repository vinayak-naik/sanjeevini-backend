import * as mongoose from "mongoose";
import ModelI from "../interfaces/model.interface";

export default class BaseService<T> {
  model: mongoose.Model<any, any>;
  constructor(modelI?: ModelI) {
    this.model = modelI.model;
  }

  post = async (data: T) => {
    const resource = await this.model.create(data);
    return resource;
  };

  get = async (filters = {}): Promise<T[]> => {
    const resource = (await this.model.find(filters)) as T[];
    return resource;
  };

  getByEmail = async (email: string): Promise<T> => {
    const resource = (await this.model.findOne({
      email,
    })) as T;
    return resource;
  };
  getById = async (id: string): Promise<T> => {
    const resource = (await this.model.findOne({
      _id: new mongoose.Types.ObjectId(id),
    })) as T;
    return resource;
  };

  delete = (id: string): void => {
    return this.model.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
  };

  findOne = async (match: Object) => {
    const resource = await this.model.findOne(match);
    return resource;
  };

  findOneAndUpdate = async (match: Object, update: Object) => {
    const resource = await this.model.findOneAndUpdate(match, update);
    return resource;
  };
}
