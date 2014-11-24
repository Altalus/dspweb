var mysql = require('mysql');

var pool  = mysql.createPool({
    connectionLimit : 10,
    database        : 'dspdb',
    host            : 'localhost',
    port            : '3306',
    user            : 'root',
    password        : ''
});

/*var pool  = mysql.createPool({
 connectionLimit : 10,
 database        : 'dspdb',
 host            : 'localhost',
 port            : '33060',
 user            : 'root',
 password        : 'tester'
});*/

module.exports = pool;