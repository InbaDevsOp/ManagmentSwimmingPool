define(['jquery', 'hbs!Templates/headerApplication', 'hbs!Templates/headerMember', 'hbs!Templates/initialApplicationPage'],
    function($, headerApplication,headerMember, initialApplicationPage) {

        var Login = {

            verifyIsUserlogded: function() {
                var flagSession = sessionStorage.getItem('sessionActive');
                var userName = sessionStorage.getItem('userName');
                var userProfile = sessionStorage.getItem('userProfile');
                var adminUserIdentificator = sessionStorage.getItem('adminUserIdentificator');
                var pass = sessionStorage.getItem('pass');
                var info = sessionStorage.getItem('info');
                if (flagSession == 1) {

                    switch (userProfile){
                        case "2":
                            $('#header').html(headerApplication({userName: userName}));
                            $(this.el).html(initialApplicationPage());
                            break;
                        case "1":
                            $('#header').html(headerMember({userName: userName}));
                            $(this.el).html(initialApplicationPage());
                            break;
                    }
                    return true;
                    
                } else {
                    sessionStorage.clear();
                    window.location.href = "/corporateWebSite/index.html";
                }
            }
        }
        return Login;
    });