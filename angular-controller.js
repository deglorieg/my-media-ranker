var controllers = angular.module('controllers', []);

controllers.controller('rating_controller', ['$scope', '$http', function($scope, $http) {
    console.log("foo");
    // $http.get('http://gaming.deglorie.be/get_games.php').then(function(response) {
        // $scope.gameMatrix = listToMatrix(response.data,3);
        // $scope.games = response.data;
    // });
    
    // $scope.selectedGame = {
        // image: "img/null_img.jpg",
        // name: '',
        // genre: ''
    // };
    
    // $scope.selectGame = function(game_entry) {
        // var id = game_entry.id;
        // if(id != -1) {
            // $scope.selectedGame.image = "img/games/" + id + ".jpg";
            // $scope.selectedGame.name = game_entry.name;
        // }
    // }
    
    // function listToMatrix(list, elementsPerSubArray) {
        // var matrix = [], i, k;

        // for (i = 0, k = -1; i < list.length; i++) {
            // if (i % elementsPerSubArray === 0) {
                // k++;
                // matrix[k] = [];
            // }

            // matrix[k].push(list[i]);
        // }

        // return matrix;
    // }
}]);



