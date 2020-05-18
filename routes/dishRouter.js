const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const Dishes = require("../models/dishes");


const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

// below routes for  /dishes

dishRouter.route('/')
.get((req, res) => {
    Dishes.find({}).then((dishes)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(dishes)
    }, (err) => {
        console.log(err);
    });
    
})
.post((req, res) => {
    Dishes.create(req.body)
    .then((dish)=>{
        console.log('Dish created ',dish);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(dish);
    }, (err) => {
        console.log(err);
    });
})
.put((req, res) => {
    res.statusCode = 403;
    res.end("put operation is not supported on /dishes");

})
.delete((req, res) => {
    Dishes.remove({}).then((resp)=> {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err) => {
        console.log(err);
    });
});


// below routes for /:dishid

dishRouter.route('/:dishId')
.get((req, res) => {
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        res.statusCode = 200;
        res.setHeader("Content-Type",'applicaton/json');
        res.json(dish);
    }, (err) => {
        console.log(err);
    });
})
.post( (req, res) => {
      res.statusCode= 403;
      res.end("POST operation not suppoeted on /dishes"+req.params.dishId);
})
.put( (req, res) => {
     Dishes.findByIdAndUpdate(req.params.dishId,{$set : req.body},{new : true})
     .then((dish)=>{
        res.statusCode = 200;
        res.setHeader("Content-Type",'applicaton/json');
        res.json(dish);
    }, (err) => {
        console.log(err);
    });
})
.delete( (req, res) => {
    Dishes.findByIdAndDelete(req.params.dishId)
    .then((resp)=> {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err) => {
        console.log(err);
    });
});

module.exports = dishRouter;

