const passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Jwt = require("jsonwebtoken");

const config = require("./config");

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = (User) => {
  return Jwt.sign(User, config.secretKey, { expiresIn: 3600 });
};

let opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPasspport = passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    console.log("jwt payLoad:", jwt_payload);
    User.findOne({ _id: jwt_payload._id}, (err, user) => {
      if (err) {
        return done(err, false); //err occurs
      } else if (user) {
        return done(null, user); // user found
      } else {
        return done(null, false); // cant find the user
      }
    });
  })
);

exports.verifyUser = passport.authenticate('jwt',{session : false});
