import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config.js";
import dbconfig from "./config/dbConfig.js";
import accountRouter from "./accountUsers/account.routes.js";
import bakiBillRouter from "./bakiBill/bakiBill.routes.js";

const app = express();
// const routes=require('./routes/posts');
app.use(bodyParser.json());
app.use(cookieParser());
//DB config
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

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

app.use("/account", accountRouter);
app.use("/bakibill",bakiBillRouter)

// page not found error handling  middleware
app.use("*", (req, res) => {
  res.status(404).json({
    success: 0,
    message: "We didn't find what you are looking for !",
    data: null,
  });
});

//close
