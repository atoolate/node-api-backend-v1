const passport = require('passport');
const User = require('../models/User');
const Admin = require('../models/Admin');

passport.use(User.createStrategy());
passport.use(Admin.createStrategy());



// optional, use if you want to store user in session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());