//Initialisation
var foodFinder = angular.module('foodFinder', ['ngRoute']);

//Configuration
function routeConfiguration($routeProvider){
	$routeProvider.when('/', {
		templateUrl: 'index.html'
	});
}
	
foodFinder.config(routeConfiguration);

//Login Controller
foodFinder.controller('loginController', function($scope){
	console.log('Login Controller')
});

