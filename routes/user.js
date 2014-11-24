var express = require('express');
var router = express.Router();
var chardao = require('../lib/chardao');
var auth = require('../lib/auth');

router.get(
    '/',
    auth.ensureAuthenticated,
    function(req, res) {
        res.render('user', {user: req.user});
    }
);

router.get(
    '/chars',
    auth.ensureAuthenticated,
    function(req, res) {
        chardao.getCharsForUserId(req.user.id, function(err, chars) {
            res.send(chars);
        });
    }
);

module.exports = router;