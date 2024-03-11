const express = require("express");
const urlRoute = require("./routes/url");
const mongoose = require("mongoose");
const URL = require("./models/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const path = require("path");
const cookieParser = require("cookie-parser");
const {restrictToLoggedinUserOnly, checkAuth} = require("./middleware/auth");

const app = express();
const PORT = 8001;

// mongoose.connect("mongodb://localhost:27017/short-url").then(()=>console.log("mongodbconect"));

mongoose
  .connect("mongodb://127.0.0.1:27017/short-url", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));



app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use("/url",restrictToLoggedinUserOnly, urlRoute);
app.use("/",checkAuth,staticRoute);
app.use("/user",userRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
            timestamp: Date.now(),
        },
      },
    }
  );
//   res.redirect(entry.redirectURL)
});

app.listen(PORT, () => console.log(`server started at : ${PORT}`));
