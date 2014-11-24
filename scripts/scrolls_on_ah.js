
function ScrollsOnAH() {

    this.enabled = true;
    this.name = "Place Scrolls On AH";
    var cost = 1;
    var seller = {id: 0, name: ""};
    var count = 10;
    this.interval = 0;

    this.defaultConfig = {
        scrolls_on_ah: {
            enabled: true,
            cost: 1,
            seller: {id: 0, name: "Undefined"},
            interval: 60,
            count: 10
        }
    };

    this.init = function (config) {
        this.enabled = config.enabled;
        cost = config.cost;
        seller = config.seller;
        count = config.count;
        this.interval = config.interval * 1000;
    };

    this.run = function (dbpool) {
        dbpool.query("SELECT * FROM item_usable WHERE name LIKE 'scroll_%'", function(err, scrolls) {
            scrolls.forEach(function(scroll) {
                dbpool.query("SELECT COUNT(*) AS count FROM auction_house WHERE itemid = ? AND buyer_name IS NULL", [scroll.itemid], function(err, rows) {
                    for(var i = rows[0].count; i < count; i++) {
                        dbpool.query("INSERT INTO auction_house (itemid, stack, seller, seller_name, date, price) " +
                        "VALUES (?, 1, ?, ?, unix_timestamp(), ?)",
                        [scroll.itemid, seller.id, seller.name, cost]);
                    }
                });
            });
        });
    }
}

module.exports = new ScrollsOnAH();