define(['jquery', 'hbs!Templates/headerApplication'],
    function($, headerApplicationTemplate) {

        var Login = {

            verifyIsUserlogded: function() {
                var flagSession = sessionStorage.getItem('sessionActive');
                var userName = sessionStorage.getItem('userName');

                if (flagSession == 1) {

                    $('#header').html(headerApplicationTemplate({
                        userName: userName
                    }));
                    return true;
                    
                } else {
                    sessionStorage.clear();
                    window.location.href = "/corporateWebSite/index.html";
                }
            }
        }
        return Login;
    });