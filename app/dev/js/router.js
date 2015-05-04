require(['backbone', 'jquery', 'Views/login', 'Views/swimmingPoolUser/addUser',
        'Views/swimmingPoolUser/managmentUsers', 'Views/schedule/addSchedule', 'Views/schedule/managmentSchedules'
    ],
    function(Backbone, $, login, addUser, managmentUsers, addSchedule, managmentSchedules) {

        var myRouter = Backbone.Router.extend({

            routes: {
                "": "handleLogin",
                "addUser": "addUser",
                "managmentUsers": "managmentUsers",
                "addSchedule": "addSchedule",
                "managmentSchedules": "managmentSchedules",
                "exitUser": "exitUser"
            },
            handleLogin: function() {
                this.login = new login();
            },
            addUser: function() {
                this.addUser = new addUser();
            },
            managmentUsers: function() {
                this.managmentUsers = new managmentUsers();
            },
            addSchedule: function() {
                this.addSchedule = new addSchedule();
            },
            managmentSchedules: function() {
                this.managmentSchedules = new managmentSchedules();
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