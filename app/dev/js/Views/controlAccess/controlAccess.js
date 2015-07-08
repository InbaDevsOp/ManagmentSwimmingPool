define(['backbone', 'jquery', 'Modules/login',
        'hbs!Templates/controlAccess/controlAccess', 'hbs!Templates/controlAccess/paymentsTable', 'Models/payment',
        'Views/swimmingPoolUser/usersInformation', 'hbs!Templates/swimmingPoolUser/usersCombo',  'hbs!Templates/controlAccess/productResume',
    ],
    function(Backbone, $, login,
        managmentPayments, paymentsTableTemplate, paymentModel,
        usersInformationView, usersInformationTemplate, productResumeTemplate) {

        managmentPayments = Backbone.View.extend({
            template: managmentPayments,

            el: $("#applicationContent"),

            events: {
                "click #searchUsers": "searchUsers",
                "change #usersInformation": "fillPaymentsTable",
                "click #entrance": "entranceSwimmingPool",
                "click #exit": "exitSwimmingPool",
            },
            initialize: function() {

                if (login.verifyIsUserlogded()) {
                    $(this.el).html(this.template());
                }
            },
            searchUsers: function() {

                new usersInformationView({
                    el: $("#usersInformation"),
                    template: usersInformationTemplate,
                    searchUserPattern: $("#userId").val()
                });

            },
            fillPaymentsTable: function(event) {
                var userId = $(event.currentTarget).find("option:selected").attr("id");
                var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/payment/swimmingPoolUser/" + userId;


                $.ajax({
                    async: false,
                    url: url,
                    type: "GET",
                    success: function(data, status) {

                        $("#paymentsInformation").html(paymentsTableTemplate({
                            payments: data
                        }));
                    },
                    error: function(request, error) {
                        alertDGC("Error Interno, favor intente más tarde");
                    },
                });

            },
            entranceSwimmingPool: function(event){
                var productId = $(event.currentTarget).closest("td").attr("productId");
                var userId = $("#usersInformation option:selected").attr("id");           

                if(productId && userId){

                var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/accessControl/entrance/" + userId + "/" + productId;

                $.ajax({
                    async: false,
                    url: url,
                    type: "GET",
                    success: function(data, status) {

                        $("#productInformationData").html(productResumeTemplate({
                            product: data
                        }));
                    },
                    error: function(request, error) {
                        if(error){
                        alertDGC(error);
                        }
                        else{

                        }
                    },
                });
                }

            },

            exitSwimmingPool: function(event){
                var productId = $(event.currentTarget).closest("td").attr("productId");
                var userId = $("#usersInformation option:selected").attr("id");           

                if(productId && userId){

                var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/accessControl/exit/" + userId + "/" + productId;

                $.ajax({
                    async: false,
                    url: url,
                    type: "GET",
                    success: function(data, status) {

                        $("#productInformationData").html(productResumeTemplate({
                            product: data
                        }));
                    },
                    error: function(request, error) {
                        if(error){
                        alertDGC(error);
                        }
                        else{

                        }
                    },
                });
                }

            },

        })

        return managmentPayments;

    });