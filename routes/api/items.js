var express = require('express');
var router = express.Router();
var itemdao = require('../../lib/itemdao');
var auth = require('../../lib/auth');

router.get(
    "/",
    auth.ensureAuthenticated,
    function(req, res) {
        itemdao.findItemsByName(req.query.q, function(err, items) {
            console.log(err);
            res.send(items);
        });
    }
);

router.get(
    '/:id',
    auth.ensureAuthenticated,
    function(req, res) {
        itemdao.getItemById(req.params.id, function(err, inventory) {
            res.send(inventory);
        });
    }
);

module.exports = router;