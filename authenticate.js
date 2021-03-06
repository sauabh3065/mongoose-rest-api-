const passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Jwt = require("jsonwebtoken");
const facebokTokenStrategy = require("passport-facebook-token");

const config = require("./config");
const { propfind } = require("./routes/uploadRouter");

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
    User.findOne({ _id: jwt_payload._id }, (err, user) => {
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

exports.verifyAdmin = (req, res, next) => {
  if (req.body.admin !== true) {
    return next(err);
  } else {
    return next();
  }
};

exports.verifyUser = passport.authenticate("jwt", { session: false });
exports.facebookPassport = passport.use(
  new facebokTokenStrategy(
    {
      clientID: config.facebook.clientid,
      clientSecret: config.facebook.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ facebookId: profile.id }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (!err && user !== null) {
          return done(null, user);
        } else {
          user = new User({ username: profile.displayName });
          user.facebookId = profile.id;
          user.firstname = profile.name.givenName;
          user.lastname = profile.name.familyName;
          user.save((err, user) => {
            if (err) {
              return done(err, false);
            } else {
              return done(null, user);
            }
          });
        }
      });
    }
  )
);
