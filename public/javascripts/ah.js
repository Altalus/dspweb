supernova.
    controller(
        "auctionhouse",
        [
            "$scope",
            "ItemService",
            "AuctionHouseService",
            function($scope, ItemService, AuctionHouseService) {
                $scope.items = [];
                $scope.page = 1;
                $scope.last_page = 1;
                AuctionHouseService.getPageCount(function(cnt) {
                    $scope.last_page = cnt;
                });
                $scope.next = function() {
                    if($scope.page >= $scope.last_page) { return; }
                    $scope.page = $scope.page + 1;
                    $scope.loadPage();
                };
                $scope.back = function() {
                    if($scope.page <= 1) { return; }
                    $scope.page = $scope.page - 1;
                    $scope.loadPage();
                };
                $scope.loadPage = function() {
                    AuctionHouseService.getItems($scope.page, function(newitems) {
                        $scope.items = newitems;
                        $scope.items.forEach(function(saleItem) {
                            saleItem.name = saleItem.itemid;
                            saleItem.date = new Date(saleItem.date * 1000).toDateString();
                            ItemService.getItem(saleItem.itemid, function(item) {
                                saleItem.name = item.name;
                            });
                            AuctionHouseService.getLastSalePrice(saleItem.itemid, function(sale) {
                             if(sale.length == 0) {
                             saleItem.last_sale = {sale: 0};
                             } else {
                             saleItem.last_sale = sale[0];
                             }
                             });
                        });
                    });
                };
                $scope.init = function() {
                    $scope.loadPage();
                }
            }
        ]
    );