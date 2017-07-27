//Initialisation
var foodFinder = angular.module('foodFinder', ['ngRoute']);

//Configuration
function routeConfiguration($routeProvider){
	$routeProvider.when('/', {
		templateUrl: 'pages/loginPage.html'
	});
	$routeProvider.when('/home', {
		templateUrl: 'pages/restaurantName.html'
	});
	$routeProvider.when('/Restaurants/:RestaurantIndex', {
		templateUrl: 'pages/restaurantDetails.html'
	});
}
	
foodFinder.config(routeConfiguration);

//Login Controller
foodFinder.controller('loginController', function($scope, $location) {
	function goToHome(email,password) {																																							
		if (email && password) {																																		
			$location.url('home');																																									//Go to 'home' when submit button is clicked
		} else {
			console.log('not validated');
		}
	}
	$scope.goToHome = goToHome;
});

//Restaurant Lists
foodFinder.service('restaurantService', function(){
	this.restaurantLists = [
		{
			name: 'Indian Accent',
			location: 'New Delhi',
			meal_for_two: '₹ 5000/-',
			recommended_for: 'A special occasion, birthday or anniversary',
			image: '1.jpg',
			rating: '4.5',
			favourites: {
				dish_name: 'The Tasting Menu',
				url:'http://i.ndtvimg.com/i/2015-06/fusion-food_625x350_71434106320.jpg'
			}
		},
		{
			name: 'Peshwari',
			location: 'Mumbai',
			meal_for_two: '₹ 5000/-',
			recommended_for: 'For your fix of great North-Indian food in a city where it’s fairly elusive',
			image: '2.jpg',
			rating: '4.1',
			favourites: {
				dish_name: 'Sikandari Raan and Dal Bukhara',
				url:'http://i.ndtvimg.com/i/2017-05/raan_620x333_81495781975.jpg'
			}
		},
		{
			name: 'Villa Maya',
			location: 'Trivandrum',
			meal_for_two: '₹ 4000/-',
			recommended_for: 'Calm and peace and leaving the chaos of the world outside',
			image: '3.jpg',
			rating: '4.3',
			favourites: {
				dish_name: 'Kerala Special and Fish Tikka',
				url:'http://www.tinyurbankitchen.com/wp-content/uploads/2012/09/7877877680_7f35977dab_z.jpg'
			}
		},
		{
			name: 'Bukhara',
			location: 'New Delhi',
			meal_for_two: '₹ 7000/-',
			recommended_for: 'Taking your International clients for an Indian meal',
			image: '4.jpg',
			rating: '4.0',
			favourites: {
				dish_name: 'Dal Bukhara is legendary (albeit creamy and heavy)',
				url: 'http://ungree.com/blog/wp-content/uploads/2015/11/Dal-Bukhara-Dal-Makhani.jpg'
			}
		},
		{
			name: 'Pinch of Spice',
			location: 'Agra',
			meal_for_two: '₹ 1300/-',
			recommended_for: 'A quick meal when in town',
			image: '5.jpg',
			rating: '4.7',
			favourites: {
				dish_name: 'Punjabi meat',
				url: 'http://media2.intoday.in/indiatoday/images/stories/mutton1-meatbhatindewala-story_647_070116125012.jpg'
			}
		}
	]
});


//Restaurant Controller
foodFinder.controller('restaurantController', function($scope, restaurantService) {
	$scope.restaurantLists = restaurantService.restaurantLists;
});

//Restaurant Details Controller
foodFinder.controller('detailsController', function($scope, restaurantService, $routeParams, $http){
	var list = restaurantService.restaurantLists;
	$scope.showDetails = false;
	$scope.Restaurant = list[$routeParams.RestaurantIndex];
	$scope.ingredients = [];

//API Functioning
	$scope.showDishDetails = function(url){
		var data = '{"inputs":[{"data":{"image":{"url":"' + url + '"}}}]}';
		$http({
				'method': 'POST',
				'url': 'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs',
				'headers': {
					'Authorization': 'Key f6d876aa272f4138bd669112435e40f7',
					'Content-Type': 'application/json'
				},
				'data': data,
		}).then (function(response) {
			var ingredients = response.data.outputs[0].data.concepts;
			console.log(response);
			var list = '';
			for (var i =0; i < ingredients.length; i++) {
							$scope.ingredients.push(ingredients[i].name);
			}
		})
		};
});




