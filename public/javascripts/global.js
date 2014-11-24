var supernova = angular.module("supernova", []);

supernova.
    controller(
        "item-search",
        [
            "$scope",
            "ItemService",
            function($scope, ItemService) {
                $scope.results = [];
                $scope.itemSearch = function() {
                    ItemService.searchItems($scope.search, function(data) { $scope.results = data; });
                };
            }
        ]
    ).
    factory(
        "CharacterService",
        [
            "$http",
            function($http) {
                function CharacterService() {
                    this.getChars = function(fn) {
                        $http.get("/api/chars/mine").success(function(data) {
                            fn(data);
                        });
                    };

                    this.getChar = function(id, fn) {
                        $http.get("/api/chars/" + id).success(function(data) {
                            fn(data);
                        });
                    };

                    this.getAllChars = function(fn) {
                        $http.get("/api/chars").success(function(data) {
                            data.forEach(function(char) {
                                if(char.loggedin == 1) {
                                    char.loggedin = "true";
                                    char.status = "Logged In";
                                } else {
                                    char.loggedin = "false";
                                    char.status = "Logged Out";
                                }
                            });
                            fn(data);
                        });
                    }
                }
                return new CharacterService();
            }
        ]
    ).
    factory(
        "InventoryService",
        [
            "$http",
            "ItemService",
            function($http, ItemService) {
                function InventoryService() {
                    this.inventory = [];
                    for(var i = 0; i < 30; i++) {
                        this.inventory.push({itemId: 0, name: "-Empty-"});
                    }
                    var $this = this;
                    this.getInventory = function(id) {
                        $http.get("/api/chars/" + id + "/inventory").success(function(data) {
                            data.forEach(function(inventory) {
                                inventory.name = inventory.itemId;
                                $this.inventory[inventory.slot] = inventory;
                                ItemService.getItem(inventory.itemId, function(item) {
                                    $this.inventory[inventory.slot].name = item.name;
                                })
                            });
                        });
                    }
                }
                return new InventoryService();
            }
        ]
    ).
    factory(
        "ItemService",
        [
            "$http",
            function($http) {
                function ItemService() {
                    var items = {};
                    this.getItem = function(id, fn) {
                        if(items[id] != null) { return fn(items[id]); }
                        $http.get("/api/items/" + id).success(function(data) {
                            if(data.length != 0) {
                                items[id] = data[0];
                                fn(items[id]);
                            }
                        })
                    };
                    this.searchItems = function(name, fn) {
                        $http.get("/api/items?q=" + encodeURIComponent(name)).success(function(data) {
                            fn(data);
                        });
                    }
                }
                return new ItemService();
            }
        ]
    ).
    factory(
        "ZoneService",
        [
            "$http",
            function($http) {
                function ZoneService() {
                    var zones = {};
                    this.getZone = function(id, fn) {
                        if(zones[id] != null) { return fn(zones[id]); }
                        $http.get("/api/zones/" + id).success(function(data) {
                            zones[id] = data;
                            fn(zones[id]);
                        })
                    }
                }
                return new ZoneService();
            }
        ]
    ).
    factory(
        "AuctionHouseService",
        [
            "$http",
            function($http) {
                function AuctionHouseService() {
                    this.getItems = function(page, fn) {
                        $http.get("/api/ah?page=" + page).success(function(data) {
                            fn(data);
                        });
                    };
                    this.getLastSalePrice = function(itemid, fn) {
                        $http.get("/api/ah/" + itemid + "/last").success(function(data) {
                            fn(data);
                        });
                    };
                    this.getPageCount = function(fn) {
                        $http.get("/api/ah/count").success(function(data) {
                            fn(data.count);
                        });
                    }
                }
                return new AuctionHouseService();
            }
        ]
    );