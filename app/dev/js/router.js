require(['backbone', 'marionette', 'jquery', 'Views/login', 'Views/swimmingPoolUser/addUser',
        'Views/swimmingPoolUser/managmentUsers', 'Views/schedule/addSchedule', 'Views/schedule/managmentSchedules',
        'Views/plan/addPlan', 'Views/plan/managmentPlans', 'Views/payment/addPayment', 'Models/plan', 
        'Models/schedule', 'Models/User', 'Models/payment'
    ],
    function(Backbone, Marionette, $, login, addUser, managmentUsers, addSchedule, managmentSchedules, addPlan, 
        managmentPlans, addPayment, planModel, scheduleModel, userModel, paymentModel) {

        var myRouter = Backbone.Router.extend({

            routes: {
                "": "handleLogin",
                "addUser": "addUser",
                "managmentUsers": "managmentUsers",
                "addSchedule": "addSchedule",
                "managmentSchedules": "managmentSchedules",
                "addPlan": "addPlan",
                "managmentPlan": "managmentPlan",
                "addPayment": "addPayment",
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
            addPlan: function() {
                this.switchView(new addPlan({
                    model: new planModel({}),
                    el: $("#applicationContent")
                }));
            },
            addPayment: function() {
                this.switchView(new addPayment({
                    model: new paymentModel({}),
                    el: $("#applicationContent")
                }));
            },
            managmentPlans: function() {
                this.switchView(new managmentPlans());
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