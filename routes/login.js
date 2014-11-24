var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var express = require('express');
var router = express.Router();
var userdao = require('../lib/userdao');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    userdao.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        userdao.authenticateUser(username, password, function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false, { message: 'Invalid username/password' }); }
            return done(null, user);
        })
    }
));

router.get('/', function(req, res) { res.render('login', {}); });

router.post(
    '/',
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: false }),
    function(req, res) {
        res.redirect('/');
    }
);

module.exports = router;