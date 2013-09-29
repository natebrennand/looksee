
var app = angular.module('app', [
  'ngRoute',
  'app.home',
  'app.client',
  'app.operator',
  'app.services'
]);

app.config(function ($routeProvider) {
	$routeProvider
		// routes
		.when('/', {
      templateUrl: 'static/partials/home.html',
      controller: "HomeController"
    })
    .when('/room/:id', {
      templateUrl: 'static/partials/client-room.html',
      controller: 'ClientRoomController'
    })
    .when('/operator', {
      templateUrl: 'static/partials/operator-room.html',
      controller: 'OperatorRoomController'
    })
		// default
		.otherwise({redirectTo: '/'});
});
