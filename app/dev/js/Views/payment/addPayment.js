define(['backbone', 'jquery', 'hbs!Templates/payment/addPayment', 'Modules/login', 'Modules/utilForm',
        'Views/payment/addPaymentValidation',
        'Views/swimmingPoolUser/usersInformation', 'hbs!Templates/swimmingPoolUser/usersCombo',
        'Views/swimmingPoolUser/userDetailInformation', 'hbs!Templates/swimmingPoolUser/userDetailInformation',
        'Views/plan/plansInformation', 'hbs!Templates/plan/plansCombo',
        'Views/plan/planDetailInformation', 'hbs!Templates/plan/planDetailInformation',
        'Views/schedule/schedulesInformation', 'hbs!Templates/schedule/schedulesCombo',
        'Views/schedule/scheduleDetailInformation', 'Views/schedule/scheduleFreeHoursPerWeekDetailInformation', 'hbs!Templates/schedule/scheduleDetailInformation',
        'Models/payment'
    ],
    function(Backbone, $, addPaymentTemplate, login, utilForm, addPaymentValidation,
        usersInformationView, usersInformationTemplate,
        userDetailInformationView, userDetailInformationTemplate,
        plansInformationView, plansInformationTemplate,
        planDetailInformationView, planDetailInformationTemplate,
        schedulesInformationView, schedulesInformationTemplate,
        scheduleDetailInformationView, scheduleFreeHoursPerWeekDetailInformationView, scheduleDetailInformationTemplate,
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
                    addPaymentValidation.validateForm();
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

                $("#userDetailInformation").html('');
                var userId = $(event.currentTarget).find("option:selected").attr("id")
                new userDetailInformationView({
                    el: $("#userDetailInformation"),
                    template: userDetailInformationTemplate,
                    userId: userId
                });

                $("#plansInformation").html('');
                new plansInformationView({
                    el: $("#plansInformation"),
                    template: plansInformationTemplate
                });

            },
            fillPlanInformation: function(event) {

                $("#planDetailInformation").html('');
                var planId = $(event.currentTarget).find("option:selected").attr("id");
                new planDetailInformationView({
                    el: $("#planDetailInformation"),
                    template: planDetailInformationTemplate,
                    planId: planId
                });

                var typeOfPlan = $(event.currentTarget).find("option:selected").attr("typeOfPlan");

                if (typeOfPlan == "typeBlocksPerWeek") {

                    $("#schedulesInformation").html('');
                    $("#scheduleDetailInformation").html('');
                    new schedulesInformationView({
                        el: $("#schedulesInformation"),
                        template: schedulesInformationTemplate,
                        searchSchedulePattern: $(event.currentTarget).find("option:selected").attr("blocksPerWeek")
                    });

                } else if (typeOfPlan == "typeHoursPerWeek") {

                    $("#schedulesInformation").html('');
                    $("#scheduleDetailInformation").html('');
                    new scheduleFreeHoursPerWeekDetailInformationView({
                        el: $("#scheduleDetailInformation"),
                        template: scheduleDetailInformationTemplate,
                        hoursPerWeek: $(event.currentTarget).find("option:selected").attr("hoursPerWeek")
                    });
                    
                    $("#addPaymentForm").hide();
                    $("#addPaymentForm").show();
                }

            },
            fillScheduleInformation: function(event) {

                $("#scheduleDetailInformation").html('');
                var scheduleId = $(event.currentTarget).find("option:selected").attr("id");
                new scheduleDetailInformationView({
                    el: $("#scheduleDetailInformation"),
                    template: scheduleDetailInformationTemplate,
                    scheduleId: scheduleId
                });
                $("#addPaymentForm").hide();
                $("#addPaymentForm").show();

            },
            savePayment: function() {
                var that = this;

                if (addPaymentValidation.isValidForm()) {

                    var paymentJson = this.serializeFormToObject();
                    this.model.set(paymentJson);

                    this.model.save({}, {
                        success: function(model, respose) {
                            alertDGC("Pago guardado exitosamente");
                            that.cleanDataForm();
                        },
                        error: function(model, response) {
                            alertDGC("Error Interno, favor intente más tarde");
                        }
                    });

                }
            },
            serializeFormToObject: function() {

                var paymentJson = {
                    swimmingPoolUser: {
                        id: $("#usersCombo").find("option:selected").attr("id")
                    },
                    product: {
                        productPK: {
                            plan: {
                                id: $("#plansCombo").find("option:selected").attr("id")
                            }
                        }
                    }
                };

                if ($("#schedulesCombo").find("option:selected").attr("id")) {

                    paymentJson.product.productPK["schedule"] = {
                        id: $("#schedulesCombo").find("option:selected").attr("id")
                    };
                }

                var paymentDataJson = utilForm.serializeFormToObject("#addPaymentForm :visible");

                paymentJson["bank"] = paymentDataJson.bank;
                paymentJson["chequeNumber"] = paymentDataJson.chequeNumber;
                paymentJson["formOfPayment"] = paymentDataJson.formOfPayment;
                paymentJson.product["startValidDate"] = paymentDataJson.startValidDate;
                paymentJson.product["endValidDate"] = paymentDataJson.endValidDate;
                paymentJson["observations"] = paymentDataJson.observations;
                paymentJson["numberOfTicket"] = paymentDataJson.numberOfTicket;


                return paymentJson;

            },
            cleanDataForm: function() {

                utilForm.cleanDataForm("#addPaymentForm");
                $("#addPaymentForm").hide('');
                $("#usersInformation").html('');
                $("#userDetailInformation").html('');
                $("#plansInformation").html('');
                $("#planDetailInformation").html('');
                $("#schedulesInformation").html('');
                $("#scheduleDetailInformation").html('');

            }

        });

        return AddPaymentView;

    });