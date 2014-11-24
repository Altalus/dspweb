supernova.
    controller(
        "index",
        [
            "$scope",
            "CharacterService",
            function($scope, CharacterService) {
                $scope.characters = [];
                CharacterService.getAllChars(function(characters) {
                    $scope.characters = characters;
                })
            }
        ]
    );