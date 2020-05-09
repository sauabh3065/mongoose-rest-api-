const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());


dishRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200; //ok
    res.setHeader("Content-Type", "text/plain");
    next();
})
.get((req, res) => {
    res.send("will send all the dishes to you");
})
.post((req, res) => {
    res.end(
      "will add the dish: " + req.body.name +' '+"with details " + req.body.description
    );
})
.put((req, res) => {
      res.statusCode= 403;
      res.end("put operation not suppoeted in dishes");
})
.delete((req, res) => {
      res.statusCode= 403;
      res.end("deleting  all the dishees");
});

dishRouter.route('/:dishId')
.get((req, res) => {
    res.send("will send details of the dish:"+ req.params.dishId);
})
.post( (req, res) => {
      res.statusCode= 403;
      res.end("POST operation not suppoeted on /dishes"+req.params.dishId);
})
.put( (req, res) => {
      res.write("updating the  dish:"+ req.params.dishId + '\n');
      res.end("will update the dish:" + req.body.name +"with detais:"+ req.body.description); 
})
.delete( (req, res) => {
     res.end("deleting dish:" + req.params.dishId);
});

module.exports = dishRouter;

