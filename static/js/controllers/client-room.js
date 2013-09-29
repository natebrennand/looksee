
angular.module('app.client', [])
.controller('ClientRoomController', function ($scope, $routeParams) {
  $scope.id = $routeParams.id
  $scope.peerID = '';
  $scope.connected = false;

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  var peer = new Peer({key: 'nou8pr83nfwxko6r'});

  peer.on('open', function(id) {
    $scope.peerID = id;
    $scope.$apply();
  });
  peer.on('error', function(err){
    alert('ERROR: ' + err);
    console.log(err);
  });

  var initUserMedia = function() {
    navigator.getUserMedia({audio: true, video: true}, function(stream){
      $scope.localStream = stream;
      $('#my-video').prop('src', URL.createObjectURL(stream));
      callOperator();
      startDataStream();
    }, function(err){
      console.log('ERROR: ' + err)
    });
  };

  var callOperator = function() {
    var call = peer.call($scope.id, $scope.localStream);
    $scope.connected = true;
    setupCall(call);
  };

  var startDataStream = function() {
    if (!util.supports.data) {
      alert('Data stream is not supported.');
    }
    $scope.dataConnection = peer.connect($scope.id);
    window.clientDataConnected && window.clientDataConnected($scope.dataConnection);
  };

  var setupCall = function(call) {

    call.on('stream', function(stream) {
      if ($scope.existingCall) {
        $scope.existingCall.close();
      }
      $scope.existingCall = call;
      console.log(stream);
      $('#operator-audio').prop('src', URL.createObjectURL(stream))
    })

    call.on('close', function(){
      console.log('Call closed.');
    });
  };

  initUserMedia();
});
