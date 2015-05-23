define(['backbone', 'jquery', 'hbs!Templates/headerApplication', 'hbs!Templates/initialApplicationPage',
        'hbs!Templates/login','Views/loginValidation'
    ],
    function(Backbone, $, headerApplication, initialApplicationPage, loginTemplate, loginValidation) {

        LoginView = Backbone.View.extend({
            el: $("#applicationContent"),
        
            events: {
                "click #login": "login"
            },

            initialize: function(argument) {
                var flagSession = sessionStorage.getItem('sessionActive');
                var userName = sessionStorage.getItem('userName');
                if (flagSession == 1) {
                    $('#header').html(headerApplication({userName: userName}));
                    $(this.el).html(initialApplicationPage());
                } else {
                    $(this.el).append(loginTemplate());
                }
                loginValidation.validateForm();

            },
            login: function() {
                var that = this;
                if(loginValidation.isValidForm()){
                    var rut = $("#rut").val();
                    var password = $("#password").val();

                    var getParamsService = rut + "/" + password;
                    var url = SwimmingPoolApplicationHost + "/SwimmingPoolServiceExample/rest/users/admin/login/" + getParamsService;

                    $.ajax({
                        async: false,
                        url: url,
                        type: "GET",
                        success: function(data, status) {
                            if (data) {
                                var userName = data.names;

                                $('#header').html(headerApplication({userName: userName}));
                                $(that.el).html(initialApplicationPage());
                                
                                sessionStorage.setItem('sessionActive', 1);
                                sessionStorage.setItem('userName', userName);
                            } else {
                                alertDGC("Usuario no existente o contraseña incorrecta, favor consultar administración para recuperación de clave");
                            }
                        },
                        error: function(request, error) {
                            alertDGC("Error Interno, favor intente más tarde");
                        },
                    });
                }
            },
        });

        return LoginView;

    });