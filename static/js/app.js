
var app = angular.module('app', [
  'ngRoute',
  'app.home',
  'app.client',
  'app.photos',
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
    // Photo paths below
    .when('/send/:id', {
      templateUrl: 'static/partials/send-photos.html',
      controller: 'SendRoomController'
    })
    .when('/view',{
      templateUrl: 'static/partials/view-photos.html',
      controller: 'ViewPhotosController'
    })
		.otherwise({redirectTo: '/'});
});
