var express = require('express');
var router = express.Router();
var ahdao = require('../../lib/ahdao');
var auth = require('../../lib/auth');

router.get(
    '/',
    auth.ensureAuthenticated,
    function(req, res) {
        ahdao.getItemsOnAH(req.query.page - 1, function(err, items) {
            res.send(items);
        });
    }
);

router.get(
    '/count',
    auth.ensureAuthenticated,
    function(req, res) {
        ahdao.getPageCount(function(cnt) {
            res.send({count: Math.round(cnt / 10) + 1});
        });
    }
);

router.get(
    '/:id/last',
    auth.ensureAuthenticated,
    function(req, res) {
        ahdao.getLastSalePrice(req.params.id, function(err, price) {
            res.send(price);
        });
    }
);

module.exports = router;