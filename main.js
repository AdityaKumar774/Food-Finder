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
			id: 0,
			name: 'Indian Accent',
			location: 'New Delhi',
			meal_for_two: '₹ 5000/-',
			recommended_for: 'A special occasion, birthday or anniversary',
			image: '1.jpg',
			rating: '4.5',
			favourites: {
				dish_name: 'The Tasting Menu',
				url:'http://www.indianaccent.com/newdelhi/images/gallery-images/high-res/5.jpg'
			}
		},
		{
			id: 1,
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
			id: 2,
			name: 'Villa Maya',
			location: 'Trivandrum',
			meal_for_two: '₹ 4000/-',
			recommended_for: 'Calm and peace and leaving the chaos of the world outside',
			image: '3.jpg',
			rating: '4.3',
			favourites: {
				dish_name: 'Kerala Special and Fish Tikka',
				url:'http://www.royalindiarestobar.com.au/wp-content/uploads/2016/06/Fish-Tikka.jpg'
			}
		},
		{
			id: 3,
			name: 'Bukhara',
			location: 'New Delhi',
			meal_for_two: '₹ 7000/-',
			recommended_for: 'Taking your International clients for an Indian meal',
			image: '4.jpg',
			rating: '4.0',
			favourites: {
				dish_name: 'Dal Bukhara is legendary (albeit creamy and heavy)',
				url: 'https://i.ytimg.com/vi/bOOIjf2qLUY/hqdefault.jpg'
			}
		},
		{
			id: 4,
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
	$scope.nonVegDish = false;
	$scope.vegDish = false;
	$scope.Restaurant = list[$routeParams.RestaurantIndex];
	$scope.ingredients = [];
	var nonVegList = ['egg', 'chicken', 'meat', 'pork', 'fish', 'lamb'];							//Non-Veg items list

//API Functioning
	$scope.showDishDetails = function(url){
		var data = '{"inputs":[{"data":{"image":{"url":"' + url + '"}}}]}';
		$http({
				'method': 'POST',
				'url': 'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs',
				'headers': {
					'Authorization': 'Key f6d876aa272f4138bd669112435e40f7',													//key generated from www.clarifai.com
					'Content-Type': 'application/json'
				},
			'data': data,
			}).then (function(response) {
			var ingredient = response.data.outputs[0].data.concepts;
			console.log(response);
			var list = '';
			for (var i =0; i < ingredient.length; i++) {																												//Showing the ingredients in html page
				$scope.ingredients.push(ingredient[i].name);
				if(nonVegList.indexOf(ingredient[i].name) != -1 && $scope.nonVegDish != true)						//Checking Vegetarian or Non-Vegetarian
					$scope.nonVegDish = true;
			}
			 if(!$scope.nonVegDish)
					$scope.vegDish = true;
		})
	}
});