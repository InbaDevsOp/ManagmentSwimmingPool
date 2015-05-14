define(['backbone', 'jquery', 'Modules/login', 'hbs!Templates/swimmingPoolUser/managmentUsers', 'hbs!Templates/swimmingPoolUser/usersTable',
    'Views/swimmingPoolUser/addUser', 'Models/User'
], function(Backbone, $, login, managmentUsers, usersTable, addUserView, userModel) {

    managmentUsers = Backbone.View.extend({
        template: managmentUsers,

        el: $("#applicationContent"),

        childView: {},

        searchUserPattern: '',

        events: {
            "click #search": "searchUsers",
            "click #usersInfo #viewUser": "fillUserInformation",
            "click #usersInfo #eliminateUser": "eliminateUser"
        },

        initialize: function() {
            if (login.verifyIsUserlogded()) {
                $(this.el).html(this.template());
            }
        },
        searchUsers: function() {
            var that = this;
            this.searchUserPattern = this.searchUserPattern || $("#userId").val();

            var url = SwimmingPoolApplicationHost + "/SwimmingPoolServiceExample/rest/users/swimmingPool/searchUsers/" + this.searchUserPattern;

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
                    }
                },
                error: function(request, error) {
                    alert("Error Interno, favor intente más tarde");
                },
            });

        },
        fillUserInformation: function(eventTd) {
            var that = this;
            var idUser = $(eventTd.currentTarget.closest("tr")).find("td#idUser").html();
            var url = SwimmingPoolApplicationHost + "/SwimmingPoolServiceExample/rest/users/swimmingPool/searchById/" + idUser;

            $.ajax({
                async: false,
                url: url,
                type: "GET",
                success: function(data, status) {
                    if (data.rut != null) {

                        var user = new userModel(data);

                        this.childView = new addUserView({
                            model: user,
                            el: $("#userModify")
                        });

                        this.childView.model.on('sync', function() {
                            that.initialize();
                            that.searchUsers(that.searchUserPattern);
                        }, that);
                    }
                },
                error: function(request, error) {
                    alert("Error Interno, favor intente más tarde");
                },
            });

        },
        eliminateUser: function(eventTd) {
            var userId = $(eventTd.currentTarget.closest("tr")).find("td#idUser").html();
            var url = SwimmingPoolApplicationHost + "/SwimmingPoolServiceExample/rest/users/delete/" + userId;

            $.ajax({
                async: false,
                url: url,
                type: "DELETE",
                success: function(data, status) {
                    alert("Usuario de la Piscina Eliminado exitosamente");
                    $(eventTd.currentTarget.closest("tr")).html("");
                },
                error: function(request, error) {
                    alert("Error Interno, favor intente más tarde");
                }
            });
        }
    });
    return managmentUsers;

});