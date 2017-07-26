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
	$routeProvider.when('/Restaurant/:RestaurantIndex', {
		templateUrl: 'pages/restaurantDetails.html'
	});
}
	
foodFinder.config(routeConfiguration);

//Login Controller
foodFinder.controller('loginController', function($scope, $location) {
	function goToHome(email,password) {																																							
		if (email && password) {																																		
			$location.url('home');																																										//Go to 'home' when submit button is clicked
		} else {
			console.log('not validated');
		}
	}
	$scope.goToHome = goToHome;
});

//Login Controller


//Restaurant Lists
foodFinder.service('restaurantService', function(){
	this.restaurantLists = [
		{
			name: 'Indian Accent',
			location: 'New Delhi',
			meal_for_two: 'Rs. 5000/-',
			recommended_for: 'A special occasion, birthday or anniversary',
			image: '1.jpg',
			rating: '4.5',
			favourites: {
				dish_name: 'The Tasting Menu',
				dish_image:''
			}
		},
		{
			name: 'Peshwari',
			location: 'Mumbai',
			meal_for_two: 'Rs. 5000/-',
			recommended_for: 'For your fix of great North-Indian food in a city where it’s fairly elusive',
			image: '2.jpg',
			rating: '4.1',
			favourites: {
				dish_name: 'Sikandari Raan and Dal Bukhara',
				dish_image:''
			}
		},
		{
			name: 'Villa Maya',
			location: 'Trivandrum',
			meal_for_two: 'Rs. 4000/-',
			recommended_for: 'Calm and peace and leaving the chaos of the world outside',
			image: '3.jpg',
			rating: '4.3',
			favourites: {
				dish_name: 'Kerala Special and Fish Tikka',
				dish_image:''
			}
		},
		{
			name: 'Bukhara',
			location: 'New Delhi',
			meal_for_two: 'Rs. 7000/-',
			recommended_for: 'Taking your International clients for an Indian meal',
			image: '4.jpg',
			rating: '4.0',
			favourites: {
				dish_name: 'Dal Bukhara is legendary (albeit creamy and heavy)',
				dish_image: ''
			}
		},
		{
			name: 'Pinch of Spice',
			location: 'Agra',
			meal_for_two: 'Rs. 1300/-',
			recommended_for: 'A quick meal when in town',
			image: '5.jpg',
			rating: '4.7',
			favourites: {
				dish_name: 'Punjabi meat',
				dish_image: ''
			}
		}
	]
});


//Restaurant Controller
foodFinder.controller('restaurantController', function($scope, restaurantService) {
	$scope.restaurantLists = restaurantService.restaurantLists;
});

//Details Controller
foodFinder.controller('detailsController', function($scope, restaurantService){
	$scope.restaurantLists = restaurantService.restaurantLists;
	var restaurantLists = restaurantService.restaurantLists;
	console.log('Details Controller');
});