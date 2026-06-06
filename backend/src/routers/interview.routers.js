const express = require("express");
const interviewcontroller = require("../controllers/interview.contollers");
const multer = require("multer");
const interviewrouter = express.Router();
const authmiddleware=require('../middleware/auth.middleware')
const upload = multer({
  storage: multer.memoryStorage(),
});

interviewrouter.post(
  "/createpost",authmiddleware.authuser,
  upload.single("pdf"),
  interviewcontroller.createdata,
);
interviewrouter.get("/latest", authmiddleware.authuser, interviewcontroller.getlatest);
module.exports = interviewrouter;
