var pool = require('./db-pool');

function getItemById(id, fn) {
    if(id == "65535") { return fn(null, [{name: "Gil"}]); }
    pool.query("(SELECT name FROM item_armor WHERE itemid = ?) UNION " +
    "(SELECT name FROM item_basic WHERE itemid = ?) UNION " +
    "(SELECT name FROM item_furnishing WHERE itemid = ?) UNION " +
    "(SELECT name FROM item_puppet WHERE itemid = ?) UNION " +
    "(SELECT name FROM item_usable WHERE itemid = ?) UNION " +
    "(SELECT name FROM item_weapon WHERE itemid = ?)", [id, id, id, id, id, id], function(err, rows) {
        if(err) { return fn(err); }
        fn(null, rows);
    });
}

function findItemsByName(name, fn) {
    var queryName = "%" + name.replace(" ", "_").replace("'", "").toLowerCase() + "%";
    pool.query("(SELECT 'armor' as type, itemid, name, level FROM item_armor WHERE name LIKE ?) UNION " +
    "(SELECT 'basic' as type, itemid, name, '' as level FROM item_basic WHERE name LIKE ?) UNION " +
    "(SELECT 'furnishing' as type, itemid, name, '' as level FROM item_furnishing WHERE name LIKE ?) UNION " +
    "(SELECT 'puppet' as type, itemid, name, '' as level FROM item_puppet WHERE name LIKE ?) UNION " +
    "(SELECT 'usable' as type, itemid, name, '' as level FROM item_usable WHERE name LIKE ?) UNION " +
    "(SELECT 'weapon' as type, itemid, name, '' as level FROM item_weapon WHERE name LIKE ?)",
        [queryName, queryName, queryName, queryName, queryName, queryName],
        function(err, rows) {
            if(err) { return fn(err); }
            fn(null, rows);
        }
    );
}

module.exports = {
    getItemById: getItemById,
    findItemsByName: findItemsByName
};