define(['backbone', 'jquery', 'hbs!Templates/headerApplication', 'hbs!Templates/initialApplicationPage',
        'hbs!Templates/login'
    ],
    function(Backbone, $, headerApplication, initialApplicationPage, loginTemplate) {

        LoginView = Backbone.View.extend({
            el: $("#applicationContent"),
        
            events: {
                "click #login": "login"
            },

            initialize: function(argument) {
                var flagSession = localStorage.getItem('sessionActive');
                var userName = localStorage.getItem('names');
                
                if (flagSession == 1) {
                    $('#header').html(headerApplication({userName: userName}));
                    $(this.el).html(initialApplicationPage());
                } else {
                    $(this.el).append(loginTemplate());
                }

            },
            login: function() {
                var that = this;
                var rut = $("#rut").val();
                var password = $("#password").val();

                var getParamsService = rut + "/" + password;
                var url = SwimmingPoolApplicationHost + "/SwimmingPoolServiceExample/rest/users/login/" + getParamsService;

                $.ajax({
                    async: false,
                    url: url,
                    type: "GET",
                    success: function(data, status) {
                        if (data.result == true) {
                            var userName = data.idUser;

                            $('#header').html(headerApplication({userName: userName}));
                            $(that.el).html(initialApplicationPage());
                            
                            localStorage.setItem('sessionActive', 1);
                            localStorage.setItem('userName', userName);
                        } else {
                            alert("Usuario no existente, favor consultar administración para recuperación de clave");
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