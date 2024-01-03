import mongoose from "mongoose";
import config from "./config";
import logger from "./utils/logger";

const connectDb = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    logger.info("mongoDB connected");
  } catch (error) {
    logger.info("Could not connect to mongoDB");
    process.exit(1);
  }
};
export default connectDb;
