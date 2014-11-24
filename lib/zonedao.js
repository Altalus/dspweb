var pool = require('./db-pool');

function getZoneById(id, fn) {
    pool.query("SELECT * FROM zone_settings WHERE zoneid = ?", [id], function(err, rows) {
        if(err) { return fn(err); }
        if(rows.length != 1) { return fn(new Error("Invalid zoneid")); }
        fn(null, rows[0]);
    });
}

module.exports = {
    getZoneById: getZoneById
};