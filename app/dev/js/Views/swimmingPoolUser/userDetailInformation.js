define(['backbone', 'jquery'], function(Backbone, $) {

    userDetailInformation = Backbone.View.extend({

        initialize: function(options) {
            userJson = this.fillUserInformation(options.userId);
            
            if (userJson) {
                $(this.el).html(options.template({
                        user: userJson
                }));
            }
        },
        fillUserInformation: function(userId) {
            var url = SwimmingPoolApplicationHost + "/SwimmingPoolServiceExample/rest/users/swimmingPool/" + userId;
            var userJson;
            $.ajax({
                async: false,
                url: url,
                type: "GET",
                success: function(data, status) {
                    if (data.rut != null) {
                        userJson = data;
                    }
                },
                error: function(request, error) {
                    alert("Error Interno, favor intente más tarde");
                },
            });

            return userJson;
        },

    });
    return userDetailInformation;

});