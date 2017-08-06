var controllers = angular.module('controllers', []);
var catDict = {};
var mediaDict = {};
var mediaImgDict = {};
var imgPath = "";
controllers.controller('rating_controller', ['$scope', '$http', '$q', function($scope, $http, $q) {
    console.log("Processing configuration...");
	$http.get('../../conf.json')
            .success(function(response) {
				imgPath = response.config[0]['img-path'] == null ? "" : response.config[0]['img-path'];
				main(response.config[0]['category-file'],
					response.config[0]['medialist-file'],
					response.config[0]['rankings-file']);
            })
            .error(function() {
                main('defaultCategories.json', 'exampleMediaFile.json', 'exampleRankings.json');
            });
	
	function main(catFile, mediaFile, rankFile) {
		p1 = getCategories(catFile);
		p2 = getMedia(mediaFile);
		//p3 = getRanks(rankFile);
		
		$q.all([p1, p2]).then(function(values) {
				parseData(values[0].data, values[1].data);
				//console.log(values);
			});	
	}
	
	function parseData(categoriesObj, mediaObj) {
		var mediaDict = {};
		var mediaList = mediaObj.media;
		for (i = 0; i < mediaList.length; i++) {
			id = '' + (mediaList[i]['id']);
			mediaDict[id] = mediaList[i]['name'];
			if(mediaList[i]['img'] == null){
				mediaImgDict[id] = '../../resources/unassigned.jpg';
			} else {
				mediaImgDict[id] = '../../' + imgPath + '/' + mediaList[i]['img'];
			}
		}
		
		var catDict = {};
		var cats = categoriesObj.categories;
		for (i = 0; i < cats.length; i++) {
			catDict[cats[i]['id']] = cats[i]['name'];
		}

		console.log(mediaDict);
		console.log(mediaImgDict);
		console.log(catDict);
		
		
		var mediaNgList = []
		$.each(mediaDict, function(key, value) {
			obj = {};
			obj['id'] = key;
			obj['name'] = value;
			obj['img'] = mediaImgDict[key];
			
			mediaNgList.push(obj);
			console.log(key, value);
		});
		
		$scope.mediaList = mediaNgList;
		
		// Object.keys(mediaDict).forEach(function(currentKey) {
			// console.log('foo')
		// });
		
		// for (var key in mediaDict) {
			// console.log('foo')
		// }

		// for (var key in catDict) {
			// console.log(key)
			// if (catDict.hasOwnProperty(key)) {
				// console.log(key, catDict[key]);
			// }
		// }
		
	}
	
	
	
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
    
	
	function getCategories(file) {
		promise = $http.get('../../' + file)
            .success(function(response) {
				return response;
            })
            .error(function() {
                console.log('Category file [' + file + '] not found.');
				return {};
            });
		return promise;
	}
		
	function getMedia(file) {
		promise = $http.get('../../' + file)
            .success(function(response) {
				return response;
            })
            .error(function() {
                console.log('Media file [' + file + '] not found.');
				return {};
            })
		return promise;
	}
	
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



