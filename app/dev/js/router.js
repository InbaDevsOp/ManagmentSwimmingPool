require(['backbone', 'jquery', 'Views/login',
        'Views/applicationIndex', 'Views/managmentUsers'
    ],
    
    function(Backbone, $, Login, ApplicationIndex, ManagmentUsers) {

        var myRouter = Backbone.Router.extend({

            routes: {
                "": "handleLogin",
                "applicationIndex": "applicationIndex",
                "managmentUsers":"managmentUsers",
                "exitUser": "exitUser"
            },
            handleLogin: function() {
                this.login = new Login();
            },
             applicationIndex: function() {
                 this.applicationIndex = new ApplicationIndex();
            },
              managmentUsers: function() {
                 this.managmentUsers = new ManagmentUsers();
            },
            exitUser: function () {
                localStorage.clear();
                 window.location.href = "/index.html"
            }



        });

        router = new myRouter();
        Backbone.history.start();
        return router;
    
    });