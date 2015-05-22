define(['backbone', 'jquery', 'hbs!Templates/payment/addPayment', 'Modules/login', 'Modules/utilForm',
        'Views/payment/addPaymentValidation',
        'Views/swimmingPoolUser/usersInformation', 'hbs!Templates/swimmingPoolUser/usersCombo',
        'Views/swimmingPoolUser/userDetailInformation', 'hbs!Templates/swimmingPoolUser/userDetailInformation',
        'Views/plan/plansInformation', 'hbs!Templates/plan/plansCombo',
        'Views/plan/planDetailInformation', 'hbs!Templates/plan/planDetailInformation',
        'Views/schedule/schedulesInformation', 'hbs!Templates/schedule/schedulesCombo',
        'Views/schedule/scheduleDetailInformation', 'hbs!Templates/schedule/scheduleDetailInformation',
        'Models/payment'
    ],
    function(Backbone, $, addPaymentTemplate, login, utilForm, addPaymentValidation,
        usersInformationView, usersInformationTemplate,
        userDetailInformationView, userDetailInformationTemplate,
        plansInformationView, plansInformationTemplate,
        planDetailInformationView, planDetailInformationTemplate,
        schedulesInformationView, schedulesInformationTemplate,
        scheduleDetailInformationView, scheduleDetailInformationTemplate,
        paymentModel) {

        AddPaymentView = Backbone.View.extend({
            template: addPaymentTemplate,

            events: {
                "click #searchUsers": "searchUsers",
                "click #savePayment": "savePayment",
                "change #usersCombo": "fillUserInformation",
                "change #plansCombo": "fillPlanInformation",
                "change #schedulesCombo": "fillScheduleInformation",
            },
            initialize: function() {

                if (login.verifyIsUserlogded()) {

                    $(this.el).html(addPaymentTemplate({}));
                    //addPlanValidation.validateForm();
                }
            },
            searchUsers: function() {

                new usersInformationView({
                    el: $("#usersInformation"),
                    template: usersInformationTemplate,
                    searchUserPattern: $("#userId").val()
                });

            },
            fillUserInformation: function(event) {

                new userDetailInformationView({
                    el: $("#userDetailInformation"),
                    template: userDetailInformationTemplate,
                    userId: $(event.currentTarget).find("option:selected").attr("id")
                });

                new plansInformationView({
                    el: $("#plansInformation"),
                    template: plansInformationTemplate
                });

            },
            fillPlanInformation: function(event) {

                new planDetailInformationView({
                    el: $("#planDetailInformation"),
                    template: planDetailInformationTemplate,
                    planId: $(event.currentTarget).find("option:selected").attr("id")
                });

                new schedulesInformationView({
                    el: $("#schedulesInformation"),
                    template: schedulesInformationTemplate,
                    searchSchedulePattern: $(event.currentTarget).find("option:selected").attr("name")
                });

            },
            fillScheduleInformation: function(event) {

                new scheduleDetailInformationView({
                    el: $("#scheduleDetailInformation"),
                    template: scheduleDetailInformationTemplate,
                    scheduleId: $(event.currentTarget).find("option:selected").attr("id")
                });


            },
            savePayment: function() {
                var that = this;

                //if (addScheduleValidation.isValidForm()) {

                var paymentJson = utilForm.serializeFormToObject("#addPaymentForm :visible");

                this.model.set(paymentJson);

                this.model.save({}, {
                    success: function(model, respose) {
                        alertDGC("Payment guardado exitosamente");
                        utilForm.cleanDataForm("#addPaymentForm");
                    },
                    error: function(model, response) {
                        alertDGC("Error Interno, favor intente más tarde");
                    }
                });
            },

        });

        return AddPaymentView;

    });