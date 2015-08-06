define(['backbone', 'jquery', 'jquery.table2excel', 'hbs!Templates/payment/closeTurn','hbs!Templates/payment/closeTurnTable', 'Modules/login', 'Modules/utilForm',
    'Models/payment'
    ],
    function(Backbone, $, jqueryExportExcel,closeTurnTemplate,closeTurnTable, login, utilForm,
        paymentModel) {

        CloseTurnView = Backbone.View.extend({
            events: {
                "click #btnCloseTurn": "CloseTurn",
                "click #btnExport":"ExportToExcel"
            },

            initialize: function() {
                if (login.verifyIsUserlogded()) {
                    $(this.el).html(closeTurnTemplate({}));
                }
            },
            CloseTurn: function(event) {
                var userId = sessionStorage.getItem('flag');
                var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/payment/closeTurn/" + userId;


                $.ajax({
                    async: false,
                    url: url,
                    type: "GET",
                    success: function(data, status) {
                        var dataTotal=data;
                        var sum=0;
                        for (var i = 0; i < dataTotal.length; i++) {
                            sum=dataTotal[i].product.productPK.plan.price+sum;
                        };
                        $("#closeTurnInformation").html(closeTurnTable({
                            closeTurnInfo: data,
                            addTotal:sum
                        }));
                        

                    },
                    error: function(request, error) {
                        alertDGC("Error Interno, favor intente más tarde");
                    },
                });

            },

            ExportToExcel: function(event) {
                var f = new Date();
                var d= f.getDate() + "_" + (f.getMonth() +1) + "_" + f.getFullYear() + "_" + f.getHours() +"_"+ f.getMinutes() + sessionStorage.getItem('userName');;
                $("#closeTurnInformation").table2excel({
                    exclude: ".excludeThisClass",
                    name: "Worksheet Name",
                    filename: d //do not include extension
                });

            },

        });

        return CloseTurnView;

    });