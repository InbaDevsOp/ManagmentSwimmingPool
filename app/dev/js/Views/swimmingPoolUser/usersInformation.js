define(['backbone', 'jquery'],
    function(Backbone, $) {

        usersInformation = Backbone.View.extend({

            initialize: function(options) {
                $(this.el).html(options.template({
                    users: this.usersInformation(options.searchUserPattern)
                }));
            },
            usersInformation: function(searchUserPattern) {
                var url = SwimmingPoolApplicationHost + "/SwimmingPoolServiceExample/rest/users/swimmingPool/searchUsers/" + searchUserPattern;
                var usersJson;

                $.ajax({
                    async: false,
                    url: url,
                    type: "GET",
                    success: function(data, status) {
                        if (data.length == 0) {
                            alert("Usuario no encontrado, favor intente nuevamente");
                        } else {
                            usersJson = data;
                        }
                    },
                    error: function(request, error) {
                        alert("Error Interno, favor intente más tarde");
                    },
                });

                return usersJson;
            }
        });
        return usersInformation;

    });