import pinoLogger from "pino";
import dayjs from "dayjs";
import config from "../config";

const level = config.logLevel;

const logger = pinoLogger({
  transport: {
    target: "pino-pretty",
  },
  level,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default logger;
