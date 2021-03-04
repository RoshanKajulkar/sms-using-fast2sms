const express = require("express");
var bodyParser = require("body-parser");
require("dotenv").config();

const fast2sms = require("fast-two-sms");

const app = express();

app.listen(8000, () => {
  console.log("Server is Listerning at port 8000");
});

app.use(bodyParser.json());

app.post("/sendSMS", (req, res) => {
  
  const options = {
    authorization: process.env.API_KEY,
    message: req.body.message,
    numbers: req.body.numbers,
  };
  fast2sms.sendMessage(options).then((response) => {
    if (response.return) {
      return res.json({
        "sms-send": "true",
      });
    } else {
      return res.json({
        "sms-send": "false",
      });
    }
  });
});
