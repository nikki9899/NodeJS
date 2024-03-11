const express = require("express");
const {handlegenrateNewShortURL, handleGetAnalytics} = require("../controllers/url");

const router = express.Router();

router.post("/", handlegenrateNewShortURL);

router.get("/anaytics/:shortId", handleGetAnalytics);
module.exports = router;