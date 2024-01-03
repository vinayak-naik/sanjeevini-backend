import app from "./app";
import connectDb from "./database";
import config from "./config";
import logger from "./utils/logger";

connectDb().then(() => {
  app.listen(config.port, async () => {
    logger.info(`Server is running http://localhost:${config.port}`);
  });
});
