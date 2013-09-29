
angular.module('app.operator', [])
.controller('OperatorRoomController', function ($scope) {
  $scope.peerID = '';
  $scope.connected = false;

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  var peer = new Peer('22', {key: 's7g9j5vc3ps3jtt9'});

  peer.on('open', function(id) {
    $scope.peerID = id;
    $scope.$apply();
  });

  peer.on('call', function(call){
    // Answer the call automatically
    call.answer(window.localStream);
    $scope.connected = true;
    setupCall(call);
  });
  peer.on('error', function(err){
    alert(err.message);
  });

  var setupCall = function(call) {
    if ($scope.existingCall) {
      $scope.existingCall.close();
    }

    call.on('stream', function(stream) {
      $('#client-video').prop('src', URL.createObjectURL(stream))
    })

    $scope.existingCall = call;
    call.on('close', function(){});
  };

  var initUserMedia = function() {
    navigator.getUserMedia({audio: true, video: false}, function(stream){
      $scope.localStream = stream;
    }, function(err){
      console.log('ERROR: ' + err)
    });
  };

  initUserMedia();
});
