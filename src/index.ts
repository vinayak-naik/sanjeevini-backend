import app from "./app";
import connectDb from "./utils/database";
import config from "config";
import logger from "./utils/logger";

const port = config.get("port");
connectDb().then(() => {
  app.listen(port, async () => {
    logger.info(`Server is running http://localhost:${port}`);
  });
});
