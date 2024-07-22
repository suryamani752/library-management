const express = require("express");
const {
  singUpController,
  loginController,
} = require("../controller/authController");

const router = express.Router();

router.post("/signup", singUpController);

router.post("/login", loginController);

module.exports = router;
