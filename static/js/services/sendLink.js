
angular.module('app.sendLink', [])
.factory('sendLink', function ($http) {
    return function (link, number) {

        var send_link = function (user_data) {
            $http.post(link, user_data)
                .success( function(data) {
                    console.log(data);
                })
                .error( function(err) {
                    console.log(err);
                });
        };

        console.log('USER DATA: '+link+', '+number);
        var user_data = {
            url     : link,
            number  : number,
            message : 'Click this to stream your camera {}.'
        };

        return send_link(user_data);
    }
});
