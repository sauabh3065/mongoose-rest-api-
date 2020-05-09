const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());


promoRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200; //ok
    res.setHeader("Content-Type", "text/plain");
    next();
})
.get((req, res) => {
    res.send("will send all the promo to you");
})
.post((req, res) => {
    res.end(
      "will add the promo: " + req.body.name +' '+"with details " + req.body.description
    );
})
.put((req, res) => {
      res.statusCode= 403;
      res.end("put operation not suppoeted in promo");
})
.delete((req, res) => {
      res.statusCode= 403;
      res.end("deleting  all the promos");
});


promoRouter.route('/:promold')
.get((req, res) => {
    res.send("will send details of the promo:"+ req.params.promold +' ' + 'to you.');
})
.post( (req, res) => {
      res.statusCode= 403;
      res.end("POST operation not suppoeted on /dishes"+req.params.promold);
})
.put( (req, res) => {
      res.write("updating the  promo: "+ req.params.promold + '\n');
      res.end("will update the promo: " + req.body.name +' ' + "with detais:" + req.body.description);
})
.delete( (req, res) => {
     res.end("deleting promo:" + req.params.promoold);
});

module.exports = promoRouter;







