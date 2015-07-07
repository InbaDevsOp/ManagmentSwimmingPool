define(['backbone', 'jquery', 'hbs!Templates/headerApplication', 'hbs!Templates/initialApplicationPage',
        'hbs!Templates/login','Views/loginValidation','hbs!Templates/headerMember'
    ],
    function(Backbone, $, headerApplication, initialApplicationPage, loginTemplate, loginValidation, headerMember) {

        LoginView = Backbone.View.extend({
            el: $("#applicationContent"),
        
            events: {
                "click #login": "login"
            },

            initialize: function(argument) {
                var flagSession = sessionStorage.getItem('sessionActive');
                var userName = sessionStorage.getItem('userName');
                var userProfile = sessionStorage.getItem('userProfile');
                var flag = sessionStorage.getItem('flag');
                var pass = sessionStorage.getItem('pass');
                var info = sessionStorage.getItem('info');
                if (flagSession == 1) {
                    switch (userProfile){
                        case "2":
                            $('#header').html(headerApplication({userName: userName}));
                            $(this.el).html(initialApplicationPage());
                            break;
                        case "1":
                            $('#header').html(headerMember({userName: userName}));
                            $(this.el).html(initialApplicationPage());
                            break;
                    }
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
                    var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/users/login/" + getParamsService;

                    $.ajax({
                        async: false,
                        url: url,
                        type: "GET",
                        success: function(data, status) {
                            if (data) {
                                sessionStorage.info = data;
                                var userName = data.names;
                                var userNew = data.id_profile;
                                var flag = data.id;
                                var pass = data.password;
                                switch (data.id_profile){
                                    case 2:
                                        $('#header').html(headerApplication({userName: userName}));
                                        $(that.el).html(initialApplicationPage());
                                        break;
                                    case 1:
                                        $('#header').html(headerMember({userName: userName}));
                                        $(that.el).html(initialApplicationPage());
                                        break;
                                }
                                sessionStorage.setItem('sessionActive', 1);
                                sessionStorage.setItem('userName', userName);
                                sessionStorage.setItem('userProfile', userNew);
                                sessionStorage.setItem('flag', flag);
                                sessionStorage.setItem('pass', pass);
                                
                                //sessionStorage.setItem('info', info);
                               
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