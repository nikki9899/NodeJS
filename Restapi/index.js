const express = require("express");
const mongoose = require("mongoose");

// const { connectMongoDb } = require("./connection");
const { logReqRes } = require("./middlewares");
const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

// Connection
// connectMongoDb("mongodb+srv://127.0.0.1:27017/youtube-app-1").then(() => console.log("MongoDB connected"));
 

mongoose.connect("mongodb://127.0.0.1:27017/youtube-app-1").then(()=>console.log("mongoconect"));
//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.text"));


//routes
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`server started `));
