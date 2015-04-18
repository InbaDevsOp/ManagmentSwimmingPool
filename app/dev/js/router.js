require(['backbone', 'jquery', 'Views/login',
        'Views/addUser', 'Views/managmentUsers'
    ],

    function(Backbone, $, Login, addUser, ManagmentUsers) {

        var myRouter = Backbone.Router.extend({

            routes: {
                "": "handleLogin",
                "addUser": "addUser",
                "managmentUsers": "managmentUsers",
                "exitUser": "exitUser"
            },
            handleLogin: function() {
                this.login = new Login();
            },
            applicationIndex: function() {
                this.addUser = new addUSer();
            },
            managmentUsers: function() {
                this.managmentUsers = new ManagmentUsers();
            },
            exitUser: function() {
                localStorage.clear();
                window.location.href = "/index.html"
            }



        });

        router = new myRouter();
        Backbone.history.start();
        return router;

    });