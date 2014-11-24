var express = require('express');
var router = express.Router();
var chardao = require('../lib/chardao');
var auth = require('../lib/auth');

router.get(
    '/:id',
    auth.ensureAuthenticated,
    function(req, res) {
        chardao.getCharByUserIdAndCharId(req.user.id, req.params.id, function(err, data) {
            res.render("char", {char: data, user: req.user});
        });
    }
);

module.exports = router;