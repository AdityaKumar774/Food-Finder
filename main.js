//Initialisation
var foodFinder = angular.module('foodFinder', ['ngRoute']);

//Configuration
function routeConfiguration($routeProvider){
	$routeProvider.when('/', {
		templateUrl: 'pages/loginPage.html'
	});
	$routeProvider.when('/home', {
		templateUrl: 'pages/mainPage.html'
	});
}
	
foodFinder.config(routeConfiguration);

//Login Controller
foodFinder.controller('loginController', function($scope){
	console.log('Login Controller')
});

//Main Controller
foodFinder.service('restaurantService', function(){
	this.restaurantLists = [
		{
			name: 'Indian Accent',
			location: 'New Delhi',
			meal_for_two: 'Rs. 5000/-',
			favourites: 'The Tasting Menu',
			recommended_for: 'A special occasion, birthday or anniversary'
		},
		{
			name: 'Peshwari',
			location: 'Mumbai',
			meal_for_two: 'Rs. 5000/-',
			favourites: 'Sikandari Raan and Dal Bukhara',
			recommended_for: 'For your fix of great North-Indian food in a city where it’s fairly elusive'
		},
		{
			name: 'Villa Maya',
			location: 'Trivandrum',
			meal_for_two: 'Rs. 4000/-',
			favourites: 'Kerala Special and Fish Tikka',
			recommended_for: 'Calm and peace and leaving the chaos of the world outside'
		},
		{
			name: 'Bukhara',
			location: 'New Delhi',
			meal_for_two: 'Rs. 7000/-',
			favourites: 'Dal Bukhara is legendary (albeit creamy and heavy)',
			recommended_for: 'Taking your International clients for an Indian meal'
		},
		{
			name: 'Pinch of Spice',
			location: 'Agra',
			meal_for_two: 'Rs. 1300/-',
			favourites: 'Punjabi meat',
			recommended_for: 'A quick meal when in town'
		}
	]
});

foodFinder.controller('mainController', function($scope, restaurantService) {
	$scope.restaurantLists = restaurantService.restaurantLists;
});