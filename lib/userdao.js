var pool = require('./db-pool');

function findById(id, fn) {
    pool.query("SELECT * FROM accounts WHERE id = ?", [id], function(err, rows) {
        if(err) {
            fn(new Error(err));
        } else if(rows.length != 1) {
            fn(new Error("Got too many users"))
        } else {
            fn(null, rows[0]);
        }
    });
}
function authenticateUser(username, password, fn) {
    pool.query("SELECT * FROM accounts WHERE login = ? AND password = PASSWORD(?)", [username, password], function(err, rows) {
        if(err) {
            console.log("Got error " + err);
            return fn(null, null);
        }
        if(rows.length != 1) {
            console.log("Got too many records");
            return fn(null, null);
        }
        return fn(null, rows[0]);
    });
}

module.exports = {
    findById: findById,
    authenticateUser: authenticateUser
};