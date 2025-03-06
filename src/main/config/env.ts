import dotenv from "dotenv";

dotenv.config();

export default {
  MONGO_URL: process.env.MONGO_URL as string,
  PORT: process.env.PORT ? Number(process.env.PORT) : 5050,
};
