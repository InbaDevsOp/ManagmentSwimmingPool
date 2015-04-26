require(['backbone', 'jquery', 'Views/login',
        'Views/addUser', 'Views/managmentUsers', 'Views/addSchedule'
    ],

    function(Backbone, $, Login, addUser, ManagmentUsers, AddSchedule) {

        var myRouter = Backbone.Router.extend({

            routes: {
                "": "handleLogin",
                "addUser": "addUser",
                "managmentUsers": "managmentUsers",
                "addSchedule": "addSchedule",
                "exitUser": "exitUser"
            },
            handleLogin: function() {
                this.login = new Login();
            },
            addUser: function() {
                this.addUser = new addUser();
            },
            managmentUsers: function() {
                this.managmentUsers = new ManagmentUsers();
            },
            addSchedule: function() {
                this.addSchedule = new AddSchedule();
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