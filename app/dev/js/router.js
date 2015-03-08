require(['backbone', 'jquery', 'Views/login',
        'Views/applicationIndex', 'Views/managmentUsers'
    ],
    
    function(Backbone, $, Login, ApplicationIndex, ManagmentUsers) {

        var myRouter = Backbone.Router.extend({

            routes: {
                "": "handleLogin",
                "applicationIndex": "applicationIndex",
                "managmentUsers":"managmentUsers"
            },
            handleLogin: function() {
                this.login = new Login();
            },
             applicationIndex: function() {
                 this.applicationIndex = new ApplicationIndex();
            },
              managmentUsers: function() {
                 this.managmentUsers = new ManagmentUsers();
            }



        });

        router = new myRouter();
        Backbone.history.start();
        return router;
    
    });