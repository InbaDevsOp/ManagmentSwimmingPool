define(['backbone', 'jquery', 'hbs!Templates/searchUsers', 'hbs!Templates/usersTable',
    'hbs!Templates/createdUser'
], function(Backbone, $, searchUsers, usersTable, createdUser) {

    managmentUsers = Backbone.View.extend({
        template: searchUsers,
        el: $(".informationContainerSchool"),

        events: {
            "click #search": "searchUsers",
           // "click #usersInfo tbody tr": "fillUserInformation"
        },
        initialize: function() {
            // alert("created index applicationIndex");
            $(".informationContainerSchool").html('');
            $(this.el).append(this.template());

        },
        searchUsers: function() {
            var that = this;
            var rut = $("#userId").val();

            var getParamsService = rut;
            var url = "http://192.168.1.189:8080/SwimmingPoolServiceExample/rest/users/searchUsers/" + getParamsService;

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

                        $( "#usersInfo tbody tr" ).on( "click", function( event ) {
                            that.fillUserInformation(this);
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
            var url = "http://192.168.1.189:8080/SwimmingPoolServiceExample/rest/users/searchById/" + getParamsService;

            $.ajax({
                async: false,
                url: url,
                type: "GET",
                success: function(data, status) {
                    if (data.idUser != null) {
                        $("#userModify").html(createdUser({tittle: "Usuario", user: data}));
                    }
                },
                error: function(request, error) {
                    alert("Error Interno, favor intente más tarde");
                },
            });

        }

    });

    return managmentUsers;

});