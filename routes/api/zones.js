var express = require('express');
var router = express.Router();
var zonedao = require('../../lib/zonedao');
var auth = require('../../lib/auth');

router.get(
    '/:id',
    auth.ensureAuthenticated,
    function(req, res) {
        zonedao.getZoneById(req.params.id, function(err, zone) {
            res.send(zone);
        })
    }
);

module.exports = router;