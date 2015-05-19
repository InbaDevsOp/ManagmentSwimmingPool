define(['backbone', 'jquery'], function(Backbone, $) {

    planDetailInformation = Backbone.View.extend({

        initialize: function(options) {
            if (options.planId) {
             
                planJson = this.fillPlanInformation(options.planId);
                if (planJson) {
                    $(this.el).html(options.template({
                        plan: planJson
                    }));
                }
            }
        },
        fillPlanInformation: function(planId) {
            var url = SwimmingPoolApplicationHost + "/SwimmingPoolServiceExample/rest/plan/" + planId;
            var planJson;
            $.ajax({
                async: false,
                url: url,
                type: "GET",
                success: function(data, status) {
                    planJson = data;
                },
                error: function(request, error) {
                    alert("Error Interno, favor intente más tarde");
                },
            });

            return planJson;
        },

    });
    return planDetailInformation;

});