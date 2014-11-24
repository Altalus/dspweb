var express = require('express');
var router = express.Router();
var chardao = require('../../lib/chardao');
var auth = require('../../lib/auth');

router.get(
    '/',
    function(req, res) {
        console.log("Getting stuffs");
        chardao.getAllChars(function(err, rows) {
            console.log(rows);
            res.send(rows);
        });
    }
);

router.get(
    '/mine',
    auth.ensureAuthenticated,
    function(req, res) {
        chardao.getCharsForUserId(req.user.id, function(err, chars) {
            res.send(chars);
        });
    }
);

router.get(
    '/:id',
    auth.ensureAuthenticated,
    function(req, res) {
        chardao.getCharByUserIdAndCharId(req.user.id, req.params.id, function(err, char) {
            res.send(char);
        });
    }
);

router.get(
    '/:id/inventory',
    auth.ensureAuthenticated,
    function(req, res) {
        chardao.getCharInventory(req.user.id, req.params.id, function(err, inventory) {
            res.send(inventory)
        });
    }
);

module.exports = router;