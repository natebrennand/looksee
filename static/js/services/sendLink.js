
angular.module('app.services', [])
.factory('sendLink', function ($http) {
    return function (link, number) {

        var get_url = function (params) {
            var payload = {
                url: params.link
            };
            $http.post('/short_url', payload)
                .success( function (data) {
                    var payload = {
                        number: user_data.phoneNumber,
                        message: 'Click this to stream your camera '+data.url+'.'
                    };
                    $http.post('/text', payload)
                        .success( function (data) {
                            console.log('Message sent!');
                        })
                        .error( function (err) {
                            console.log(err);
                        });
                })
                .error( function (err) {
                    console.log(err);
                });
        };

        console.log('USER DATA: '+link+', '+number);

        var user_data = {
            'link': link,
            'phoneNumber': number
        };

        return get_url(user_data);
    }
});


