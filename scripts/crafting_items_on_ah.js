
function CraftingItemsOnAH() {

    this.enabled = true;
    this.name = "Place Crafting Items On AH";
    var cost = 1;
    var seller = {id: 0, name: ""};
    var count = 10;
    this.interval = 0;
    var itemids = [
        4096, // fire_crystal
        4097, // ice_crystal
        4098, // wind_crystal
        4099, // earth_crystal
        4100, // lightning_crystal
        4101, // water_crystal
        4102, // light_crystal
        4103, // dark_crystal
        4104, // fire_cluster
        4105, // ice_cluster
        4106, // wind_cluster
        4107, // earth_cluster
        4108, // lightning_cluster
        4109, // water_cluster
        4110, // light_cluster
        4111 // dark_cluster
    ];

    this.defaultConfig = {
        crafting_items_on_ah: {
            enabled: false,
            cost: 1,
            seller: {id: 0, name: "Undefined"},
            interval: 60,
            count: 10,
            additional_items: []
        }
    };

    this.init = function (config) {
        this.enabled = config.enabled;
        cost = config.cost;
        seller = config.seller;
        count = config.count;
        config.additional_items.forEach(function(item) { itemids.push(item) });
        this.interval = config.interval * 1000;
    };

    this.run = function (dbpool) {
        itemids.forEach(function(itemid) {
            dbpool.query("SELECT COUNT(*) AS count FROM auction_house WHERE itemid = ? AND buyer_name IS NULL", [itemid], function(err, rows) {
                if(count > rows[0].count) {
                    console.log("Adding item " + itemid + " at " + cost + " gil to AH");
                }
                for(var i = rows[0].count; i < count; i++) {
                    dbpool.query("INSERT INTO auction_house (itemid, stack, seller, seller_name, date, price) " +
                        "VALUES (?, 1, ?, ?, unix_timestamp(), ?)",
                        [itemid, seller.id, seller.name, cost]);
                }
            });
        });
    }

}

module.exports = new CraftingItemsOnAH();