const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());


leaderRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200; //ok
    res.setHeader("Content-Type", "text/plain");
    next();
})
.get((req, res) => {
    res.send("will send all the leader to you");
})
.post((req, res) => {
    res.end(
      "will add the leader: " + req.body.name +' '+"with details " + req.body.description
    );
})
.put((req, res) => {
      res.statusCode= 403;
      res.end("put operation not suppoeted in leader");
})
.delete((req, res) => {
      res.statusCode= 403;
      res.end("deleting  all the leaders");
});


leaderRouter.route('/:leaderId')
.get((req, res) => {
    res.send("will send details of the leader:"+ req.params.leaderId +' ' + 'to you.');
})
.post( (req, res) => {
      res.statusCode= 403;
      res.end("POST operation not suppoeted on /dishes"+req.params.leaderId);
})
.put( (req, res) => {
      res.write("updating the  leader: "+ req.params.leaderId + '\n');
      res.end("will update the leader: " + req.body.name +' ' + "with detais:" + req.body.description);
})
.delete( (req, res) => {
     res.end("deleting leader:" + req.params.leaderId);
});

module.exports = leaderRouter;







