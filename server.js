import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config.js";
import dbconfig from "./config/dbConfig.js";
import accountRouter from "./accountUsers/account.routes.js";
import bakiBillRouter from "./bakiBill/bakiBill.routes.js";
import accountMetaDataRouter from "./accountMetaData/accountMetaData.routes.js";
import bucketRouter from "./bucketOperations/bucketOperations.routes.js";

const app = express();
// const routes=require('./routes/posts');
app.use(bodyParser.json());
app.use(cookieParser());
//DB config
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// List of allowed origins
const allowedOrigins = [(process.env.ENVIRONMENT === 'LOCAL') ? process.env.LOCAL_FRONTEND_URL : process.env.DEVELOPMENT_FRONTEND_URL];
var corsOption = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }, // for now use * but in production allow only specified origin to pass (react-admin.com)
  methods: 'GET,HEAD,PATCH,POST,DELETE,PUT',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));


const PORT = process.env.PORT || 3500;
//connnect to mongo
// Add environment related db connections here
const db = dbconfig[process.env.ENVIRONMENT];
console.log(db);
mongoose
  .connect(db)
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

app.use("/bucket",bucketRouter);
app.use("/account", accountRouter);
app.use("/accountmetadata", accountMetaDataRouter);
app.use("/bakibill", bakiBillRouter)

// page not found error handling  middleware
app.use("*", (req, res) => {
  res.status(404).json({
    success: 0,
    message: "We didn't find what you are looking for !",
    data: null,
  });
});

//close
