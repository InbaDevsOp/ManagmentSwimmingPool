define(['backbone', 'jquery'],
    function(Backbone, $) {

        LoginView = Backbone.View.extend({
            el: $("#login-form"),

            events: {
                "click #login": "login"
            },

            login: function() {
                var rut = $("#rut").val();
                var password = $("#password").val();

                var getParamsService = rut + "/" + password;
                var url = "http://192.168.1.189:8080/SwimmingPoolServiceExample/rest/users/login/" + getParamsService;

                $.ajax({
                    async: false,
                    url: url,
                    type: "GET",
                    success: function(data, status) {
                        if (data.status == "SUCCESSFUL") {
                            console.log("Logueado");
                            $(location).attr('href', "#applicationIndex");
                        } else {
                            alert("Usuario no existente, favor consultar administración para recuperación de clave");
                            //this.initialize();
                        }
                    },
                    error: function(request, error) {
                             alert("Error Interno, favor intente más tarde");
                    },
                });
            },


        });

        return LoginView;

    });