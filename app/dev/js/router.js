require(['backbone', 'marionette', 'jquery', 'Views/login', 'Views/swimmingPoolUser/addUser',
        'Views/swimmingPoolUser/managmentUsers', 'Views/schedule/addSchedule', 'Views/schedule/managmentSchedules',
        'Models/schedule', 'Models/User'
    ],
    function(Backbone, Marionette, $, login, addUser, managmentUsers, addSchedule, managmentSchedules,
        scheduleModel, userModel) {

        var myRouter = Backbone.Router.extend({

            routes: {
                "": "handleLogin",
                "addUser": "addUser",
                "managmentUsers": "managmentUsers",
                "addSchedule": "addSchedule",
                "managmentSchedules": "managmentSchedules",
                "exitUser": "exitUser"
            },

            currentView: null,

            handleLogin: function() {
                this.login = new login();
            },
            addUser: function() {
                this.switchView(this.addUser = new addUser({
                    model: new userModel({}),
                    el: $("#applicationContent")
                }));
            },
            managmentUsers: function() {
                this.switchView(new managmentUsers());
            },
            addSchedule: function() {
                this.switchView(new addSchedule({
                    model: new scheduleModel({}),
                    el: $("#applicationContent")
                }));
            },
            managmentSchedules: function() {
                this.switchView(new managmentSchedules());
            },
            exitUser: function() {
                localStorage.clear();
                window.location.href = "/index.html"
            },
            switchView: function(view) {
                if (this.currentView) {
                    this.currentView.undelegateEvents();
                    this.currentView.stopListening();
                    this.currentView = null;
                }
                this.currentView = view;
            },


        });

        router = new myRouter();
        Backbone.history.start();
        return router;

    });