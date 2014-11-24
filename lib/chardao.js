var pool = require('./db-pool');

function getCharsForUserId(id, fn) {
    pool.query("SELECT * FROM chars WHERE accid = ?", [id], function(err, rows) {
        if(err) { return fn(err); }
        fn(null, rows);
    });
}

function getCharByUserIdAndCharId(userId, charId, fn) {
    pool.query("SELECT * FROM chars WHERE accid = ? AND charid = ?", [userId, charId], function(err, rows) {
        if(err) { return fn(err); }
        if(rows.length != 1) { return fn(new Error("Too many rows")); }
        fn(null, rows[0]);
    });
}

function getCharInventory(userId, charId, fn) {
    pool.query("SELECT * FROM chars JOIN char_inventory USING(charid) WHERE accid = ? AND charid = ? ORDER BY slot ASC", [userId, charId], function(err, rows) {
        if(err) { return fn(err); }
        fn(null, rows);
    });
}

function getAllChars(fn) {
    pool.query("select charname, IF(accounts_sessions.charid IS NULL, false, true) as loggedin from chars LEFT JOIN accounts_sessions USING(charid)", function(err, rows) {
        if(err) { return fn(err); }
        fn(null, rows);
    })
}

module.exports = {
    getCharsForUserId: getCharsForUserId,
    getCharByUserIdAndCharId: getCharByUserIdAndCharId,
    getCharInventory: getCharInventory,
    getAllChars: getAllChars
};