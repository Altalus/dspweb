supernova.
    controller(
        "characters",
        [
            "$scope",
            "CharacterService",
            function($scope, CharacterService) {
                $scope.chars = [];
                CharacterService.getChars(function(chars) { $scope.chars = chars; });
            }
        ]
    );