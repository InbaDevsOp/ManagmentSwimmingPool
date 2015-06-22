require(['backbone', 'marionette', 'jquery', 'Views/login', 
    'Views/swimmingPoolUser/addUser', 'Views/swimmingPoolUser/managmentUsers', 
    'Views/schedule/addSchedule', 'Views/schedule/managmentSchedules',
    'Views/plan/addPlan', 'Views/plan/managmentPlans', 'Views/payment/managmentPayments', 'Views/product/addProduct', 
    'Views/poolMember/changePass','Views/poolMember/poolMemberInfoActive',
    'Models/plan', 'Models/schedule', 'Models/User',
    ],
    function(Backbone, Marionette, $, login, addUser, managmentUsers, addSchedule, managmentSchedules, addPlan, 
        managmentPlans, managmentPayments, addProduct,
        changePass, poolMemberInfoActive, 
        planModel, scheduleModel, userModel) {


        var myRouter = Backbone.Router.extend({

            routes: {
                "": "handleLogin",
                "addUser": "addUser",
                "managmentUsers": "managmentUsers",
                "addSchedule": "addSchedule",
                "managmentSchedules": "managmentSchedules",
                "addPlan": "addPlan",
                "managmentPlans": "managmentPlans",
                "addProduct": "addProduct",
                "managmentPayments": "managmentPayments",
                "changePass":"changePass",
                "poolMemberInfoActive":"poolMemberInfoActive",
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
            addProduct: function() {
                this.switchView(new addProduct({
                    el: $("#applicationContent")
                }));
            },
            changePass: function() {
                this.switchView(this.changePass = new changePass({
                    model: new poolMemberModel({}),
                    el: $("#applicationContent")
                }));
            },
            poolMemberInfoActive: function() {
                this.switchView(this.poolMemberInfoActive = new poolMemberInfoActive({
                    model: new poolMemberModel({}),
                    el: $("#applicationContent")
                }));
            },
            managmentPlans: function() {
                this.switchView(new managmentPlans());
            },
            managmentPayments: function() {
                this.switchView(new managmentPayments());
            },
            exitUser: function() {
                sessionStorage.clear();
                window.location.href = "/corporateWebSite/index.html";
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