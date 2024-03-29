
angular.module('app.operator', [])
.controller('OperatorRoomController', function ($scope, sendLink) {
  $scope.peerID = '';
  $scope.connected = false;

  $scope.sendRoomLink = function () {
    sendLink(window.location.host + '/#/room/' + $scope.peerID, $scope.clientNumber);
  };

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  var peer = new Peer({key: 'nou8pr83nfwxko6r', debug: 3});

  peer.on('open', function(id) {
    $scope.peerID = id;
    $scope.$apply();
  });

  peer.on('call', function(call){
    // Answer the call automatically
    call.answer($scope.localStream);
    $scope.connected = true;
    setupCall(call);
  });
  peer.on('error', function(err){
    console.log(err);
    console.log(err.type);
    alert('ERROR: ' + err);
  });
  peer.on('connection', function(dataConnection){
    dataConnection.on('open', function(){
      $scope.dataConnection = dataConnection;
      window.dataConnected && window.dataConnected(dataConnection);
    });
  });

  var setupCall = function(call) {
    if ($scope.existingCall) {
      $scope.existingCall.close();
    }

    call.on('stream', function(stream) {
      console.log(stream);
      $('#client-video').prop('src', URL.createObjectURL(stream));
      window.videoConnected && window.videoConnected(stream);
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
