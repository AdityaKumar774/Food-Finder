//Initialisation
var foodFinder = angular.module('foodFinder', ['ngRoute']);

//Configuration
function routeConfiguration($routeProvider){
	$routeProvider.when('/', {
		templateUrl: 'index.html'
	});
}
	
foodFinder.config(routeConfiguration);
	
foodFinder.controller('loginController', function($scope){
	console.log('Login Controller')
});