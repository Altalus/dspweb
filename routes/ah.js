var express = require('express');
var router = express.Router();
var auth = require('../lib/auth');

router.get(
    '/',
    auth.ensureAuthenticated,
    function(req, res) {
        res.render("ah", {user: req.user});
    }
);

module.exports = router;