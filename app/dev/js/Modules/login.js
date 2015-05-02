define(['jquery', 'hbs!Templates/headerApplication'],
    function($, headerApplicationTemplate) {

        var Login = {

            verifyIsUserlogded: function() {
                var flagSession = localStorage.getItem('sessionActive');
                var userName = localStorage.getItem('userName');

                if (flagSession == 1) {

                    $('#header').html(headerApplicationTemplate({
                        userName: userName
                    }));

                    return true;
                } else {
                    localStorage.clear();
                    window.location.href = "/index.html"
                }
            }
        }
        return Login;
    });