import "dotenv/config";

const mongo = {
  DEVELOPMENT: process.env.MONGO_URL_DEV,
  LOCAL: "mongodb://127.0.0.1:27017/Dealers",
};
export default mongo;
