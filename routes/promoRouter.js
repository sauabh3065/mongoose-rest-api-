const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authenticate = require("../authenticate");
const Promos = require("../models/promotion");
const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

// *********************************ROUTES FOR /:promo*************************************************************************

promoRouter
  .route("/")
  .get((req, res) => {
    Promos.find({}).then((promos) => {
      console.log("working");
      res.statusCode = 200;
      res.setHeader("Content-Type", "appliation/json");
      res.json(promos);
    }),
      (err) => {
        console.log(err);
      };
  })
  .post(authenticate.verifyUser,(req, res) => {
    Promos.create(req.body).then((promo) => {
      console.log("promo created", promo);
      res.statusCode = 200;
      res.setHeader("Content-Type", "appliation/json");
      res.json(promo);
    }),
      (err) => {
        console.log(err);
      };
  })
  .put(authenticate.verifyUser,(req, res) => {
    res.statusCode = 403;
    res.end("put operation not suppoeted in promo");
  })
  .delete(authenticate.verifyUser,(req, res) => {
    Promos.remove({}).then((response) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(response);
    }),
      (err) => {
        console.log(err);
      };
  });

// *********************************ROUTES FOR /:promoId*************************************************************************

promoRouter
  .route("/:promoId")
  .get((req, res) => {
    Promos.findById(req.params.promoId).then(
      (promo) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promo);
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
    Promos.findByIdAndUpdate(
      req.params.promoId,
      { $set: req.body },
      { new: true }
    ).then(
      (promo) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "applicaton/json");
        res.json(promo);
      },
      (err) => {
        console.log(err);
      }
    );
  })
  .delete(authenticate.verifyUser,(req, res) => {
    Promos.findByIdAndDelete(req.params.promoId).then(
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

module.exports = promoRouter;
