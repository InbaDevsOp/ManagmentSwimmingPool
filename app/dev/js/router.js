require(['backbone', 'marionette', 'jquery', 'Views/login', 'Views/swimmingPoolUser/addUser',
        'Views/swimmingPoolUser/managmentUsers', 'Views/schedule/addSchedule', 'Views/schedule/managmentSchedules',
        'Models/schedule', 'Models/User'
    ],
    function(Backbone, Marionette, $, login, addUser, managmentUsers, addSchedule, managmentSchedules,
        scheduleModel, userModel) {

        var myRouter = Backbone.Marionette.AppRouter.extend({

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
                this.addUser = new addUser({
                    model: new userModel({}),
                    el: $("#applicationContent")
                });
            },
            managmentUsers: function() {
                this.managmentUsers = new managmentUsers();
            },
            addSchedule: function() {
                this.addSchedule = new addSchedule({
                    model: new scheduleModel({}),
                    el: $("#applicationContent")
                });
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