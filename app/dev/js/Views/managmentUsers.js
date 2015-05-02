define(['backbone', 'jquery', 'hbs!Templates/searchUsers', 'hbs!Templates/usersTable',
    'hbs!Templates/createdUser'
], function(Backbone, $, searchUsers, usersTable, createdUser) {

    managmentUsers = Backbone.View.extend({
        template: searchUsers,
        el: $("#applicationContent"),

        events: {
            "click #search": "searchUsers",
        },
        initialize: function() {
            if (login.verifyIsUserlogded()) {
                $(this.el).html(this.template());
            }
        },
        searchUsers: function() {
            var that = this;
            var rut = $("#userId").val();

            var getParamsService = rut;
            var url = SwimmingPoolApplicationHost + "/SwimmingPoolServiceExample/rest/users/swimmingPool/searchUsers/" + getParamsService;

            $.ajax({
                async: false,
                url: url,
                type: "GET",
                success: function(data, status) {
                    if (data.length == 0) {
                        alert("Usuario no encontrado, favor intente nuevamente");
                    } else {
                        $("#usersInfo").html("");
                        $("#usersInfo").append(usersTable({
                            users: data
                        }));

                        $("#usersInfo #viewUser").on("click", function(event) {
                            that.fillUserInformation($(this).parent().parent().parent());
                        });

                        $("#usersInfo #eliminateUser").on("click", function(event) {
                            that.eliminateUser($(this).parent().parent().parent());
                        });

                    }
                },
                error: function(request, error) {
                    alert("Error Interno, favor intente más tarde");
                },
            });

        },
        fillUserInformation: function(actualTr) {

            var getParamsService = $(actualTr).find("td").eq(3).html();
            var url = SwimmingPoolApplicationHost + "/SwimmingPoolServiceExample/rest/users/swimmingPool/searchById/" + getParamsService;

            $.ajax({
                async: false,
                url: url,
                type: "GET",
                success: function(data, status) {
                    if (data.rut != null) {
                        $("#userModify").html(createdUser({
                            tittle: "Usuario",
                            user: data
                        }));
                    }
                },
                error: function(request, error) {
                    alert("Error Interno, favor intente más tarde");
                },
            });

        },
        eliminateUser: function(actualTr) {
            var userId = $(actualTr).find("td").eq(3).html();
            var url = SwimmingPoolApplicationHost + "/SwimmingPoolServiceExample/rest/users/delete/" + userId;

            $.ajax({
                async: false,
                url: url,
                type: "DELETE",
                success: function(data, status) {
                    alert("Usuario de la Piscina Eliminado exitosamente");
                    $(actualTr).html("");
                },
                error: function(request, error) {
                    alert("Error Interno, favor intente más tarde");
                }
            });
        }
    });
    return managmentUsers;

});