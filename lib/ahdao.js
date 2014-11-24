var pool = require('./db-pool');

function getItemsOnAH(page, fn) {
    pool.query("SELECT itemid, count(*) AS count FROM auction_house WHERE buyer_name IS NULL GROUP BY itemid ORDER BY itemid DESC LIMIT ?, ?",
        [page * 10, 10], fn);
}

function getLastSalePrice(id, fn) {
    pool.query("SELECT * FROM auction_house WHERE buyer_name IS NOT NULL AND itemid = ? ORDER BY sell_date DESC LIMIT 1", [id], fn);
}

function getPageCount(fn) {
    pool.query("SELECT COUNT(DISTINCT itemid) AS count FROM auction_house WHERE buyer_name IS NULL", function(err, rows) {
        if(rows.length != 1) { return fn(0); }
        fn(rows[0].count);
    });
}

module.exports = {
    getItemsOnAH: getItemsOnAH,
    getLastSalePrice: getLastSalePrice,
    getPageCount: getPageCount
};