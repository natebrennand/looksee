
angular.module('app.client', [])
.controller('ClientRoomController', function ($scope, $routeParams) {
  $scope.id = $routeParams.id
  $scope.peerID = '';

  var peer = new Peer({key: 's7g9j5vc3ps3jtt9'});

  peer.on('open', function(id) {
    $scope.peerID = id;
    $scope.$apply();
  });
  peer.on('error', function(err){
    alert(err.message);
  });

  var initUserMedia = function() {
    navigator.getUserMedia({audio: true, video: true}, function(stream){
      $scope.localStream = stream;
      $('#my-video').prop('src', URL.createObjectURL(stream));
      callOperator();
    }, function(err){
      console.log('ERROR: ' + err)
    });
  };

  var callOperator = function() {
    var call = peer.call($scope.id, $scope.localStream);
    setupCall(call);
  };

  var setupCall = function(call) {
    if ($scope.existingCall) {
      $scope.existingCall.close();
    }

    call.on('stream', function(stream) {
      $('#operator-audio').prop('src', URL.createObjectURL(stream))
    })

    $scope.existingCall = call;
    call.on('close', function(){});
  };

  initUserMedia();
});
