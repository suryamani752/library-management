const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const express = require("express");
const userModel = require("../Models/user");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    console.log("not authorized");
    return res.status(422).send({
      message: "must be logged in",
      success: false,
    });
  }
  try {
    const token = authorization.replace("Bearer", "");
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      if (err) {
        return res.status(422).send({
          message: "must be logged in",
          success: false,
        });
      }
      const { userId } = payload;
      const user = await userModel.findById(userId);
      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Auth failed",
      success: false,
    });
  }
};
