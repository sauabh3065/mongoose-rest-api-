const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const authenticate = require("../authenticate");
const Leaders = require("../models/leaders");
const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

// *********************************ROUTES FOR /:leader*************************************************************************

leaderRouter
  .route("/")
  .get((req, res) => {
    Leaders.find({}).then((leaders) => {
      console.log("working");
      res.statusCode = 200;
      res.setHeader("Content-Type", "appliation/json");
      res.json(leaders);
    }),
      (err) => {
        console.log(err);
      };
  })
  .post(authenticate.verifyUser,(req, res) => {
    Leaders.create(req.body).then((leader) => {
      console.log("leader created", leader);
      res.statusCode = 200;
      res.setHeader("Content-Type", "appliation/json");
      res.json(leader);
    }),
      (err) => {
        console.log(err);
      };
  })
  .put(authenticate.verifyUser,(req, res) => {
    res.statusCode = 403;
    res.end("put operation not suppoeted in leader");
  })
  .delete(authenticate.verifyUser,(req, res) => {
    Leaders.remove({}).then((response) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(response);
    }),
      (err) => {
        console.log(err);
      };
  });

// *********************************ROUTES FOR /:leaderId*************************************************************************

leaderRouter
  .route("/:leaderId")
  .get((req, res) => {
    Leaders.findById(req.params.leaderId).then(
      (leader) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(leader);
      },
      (err) => {
        console.log(err);
      }
    );
  })
  .post(authenticate.verifyUser,(req, res) => {
    res.statusCode = 403;
    res.end("POST operation not suppoeted on /dishes" + req.params.promold);
  })
  .put(authenticate.verifyUser,(req, res) => {
    Leaders.findByIdAndUpdate(
      req.params.leaderId,
      { $set: req.body },
      { new: true }
    ).then(
      (leader) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "applicaton/json");
        res.json(leader);
      },
      (err) => {
        console.log(err);
      }
    );
  })
  .delete(authenticate.verifyUser,(req, res) => {
    Leaders.findByIdAndDelete(req.params.leaderId).then(
      (resp) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(resp);
      },
      (err) => {
        console.log(err);
      }
    );
  });

module.exports = leaderRouter;
