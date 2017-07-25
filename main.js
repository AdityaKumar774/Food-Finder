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
foodFinder.controller('mainController', function($scope){
	console.log('Main Controller')
});