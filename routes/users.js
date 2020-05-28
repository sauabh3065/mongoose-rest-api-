const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const bodyParser = require("body-parser");

let router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", (req, res, next) => {
  console.log("working");
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user != null) {     //already exist or not
        let err = new Error("User" + " " + req.body.username +' ' + "already exist");
        err.status = 403;
        next(err);
      } else {
         User.create({
          username: req.body.username,
          password: req.body.password,
        });
      }
    })
    .then(
      (user) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ status: "Registration Succesfull", user: user });
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

router.post("/login", (req, res, next) => {
  if (!req.session.user) {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
      let err = new Error("You are not authenticated!");
      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
      return next(err);
    }

    let auth = new Buffer.from(authHeader.split(" ")[1], "base64")
      .toString()
      .split(":");
    let username = auth[0];
    let password = auth[1];
    User.findOne({ username: username })
      .then((user) => {
        if (user === null) {
          let err = new Error("User " + username + "does'nt exist");
          res.setHeader("WWW-Authenticate", "Basic");
          err.status = 401;
          return next(err);
        } else if (user.password !== password) {
          let err = new Error("PASSWORD is wrong, please check it");
          res.setHeader("WWW-Authenticate", "Basic");
          err.status = 401;
          return next(err);
        } else if (user.username === username && user.password === password) {
          req.session.user = "authenticated"; //used in app.js
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/plain");
          res.end("YOU are authenticated");
        } else {
          let err = new Error("You are not authenticated!");
          res.setHeader("WWW-Authenticate", "Basic");
          err.status = 401;
          return next(err);
        }
      })
      .catch((err) => next(err));
  } else {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("YOU are already authenticated");
  }
});

router.get("/logout", (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id");
    res.redirect("/");
  } else {
    let err = new Err("You are not logged in");
    err.status = 403;
    next(err);
  }
});

module.exports = router;
