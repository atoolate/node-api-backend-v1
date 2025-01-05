const passport = require('passport');
const User = require('../models/User');
const Admin = require('../models/Admin');

passport.use(User.createStrategy());
passport.use(Admin.createStrategy());

// optional, use if you want to store user in session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// JWT Strategy
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'extrapuntjevoordemoeite';

passport.use(new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    const user = await User.findById(jwt_payload && jwt_payload.uid);
    const admin = await Admin.findById(jwt_payload && jwt_payload.uid);
    if (user) {
        return done(null, user);
    } else if (admin) {
        return done(null, admin);
    } else {
        return done(null, false);
    }
}
));

module.exports = passport;
