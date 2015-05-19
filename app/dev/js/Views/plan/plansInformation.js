define(['backbone', 'jquery'],
    function(Backbone, $) {

        plansInformation = Backbone.View.extend({

            initialize: function(options) {

                var plansJson = this.plansInformation();

                if (plansJson) {
                    $(this.el).html(options.template({
                        plans: plansJson
                    }));
                }
            },
            plansInformation: function() {
                var url = SwimmingPoolApplicationHost + "/SwimmingPoolServiceExample/rest/plan/getAll";
                var plansJson;

                $.ajax({
                    async: false,
                    url: url,
                    type: "GET",
                    success: function(data, status) {
                            plansJson = data;
                    },
                    error: function(request, error) {
                        alert("Error Interno, favor intente más tarde");
                    },
                });

                return plansJson;
            }
        });
        return plansInformation;

    });