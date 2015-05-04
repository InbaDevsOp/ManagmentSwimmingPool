define(['backbone', 'jquery', 'jquery.validate', 'Modules/login', 'Modules/utilForm', 'hbs!Templates/swimmingPoolUser/createdUser', 'Models/User'],
    function(Backbone, $, jqueryValidate, login, utilForm, createdUser, User) {

        applicationIndex = Backbone.View.extend({
            template: createdUser,
            el: $("#applicationContent"),

            events: {
                "click #save": "saveUser"
            },
            initialize: function() {

                if (login.verifyIsUserlogded()) {   
                    $(this.el).html(this.template({
                        tittle: "Ingresa el nuevo Usuario de la Piscina"
                    }));
                    this.validateForm();
                }
            },
            validateForm: function(form) {

                $.validator.addMethod("regexp", function(value, element, regexpr) {
                    var regexp = new RegExp(regexpr);
                    return regexp.test(value);
                }, "Por Favor Ingrese un valor con el formato correcto.");
                $.validator.messages.required = "Campo requerido";


                // validate signup form on keyup and submit
                $("#addUserform").validate({
                    rules: {
                        rut: {
                            required: true,
                            regexp: "^([0-9]+)-[0-9|kK]$"
                        },
                        names: {
                            required: true,
                            regexp: "^[A-Za-z ]+$"
                        },
                        firstLastName: {
                            required: true,
                            regexp: "^[A-Za-z ]+$"
                        },
                        secondLastName: {
                            required: true,
                            regexp: "^[A-Za-z ]+$"
                        },
                        birthDate: {
                            required: true,
                            regexp: "^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$"
                        },
                        address: {
                            required: true,
                            regexp: "^[0-9a-zA-z ]+$"
                        },
                        state: {
                            required: true,
                            regexp: "^[A-Za-z ]+$"
                        },
                        password: {
                            required: true
                        },
                        email: {
                            required: true,
                            regexp: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
                        },
                        phone: {
                            required: true,
                            regexp: "^[0-9]+$"
                        },
                        sickness: {},
                        comments: {}
                    },
                    messages: {
                        required: "Campo requerido"
                    },
                    errorPlacement: function(error, element) {
                        error.css({
                            'color': 'red'
                        });
                        error.insertAfter(element);
                    }
                });

            },
            saveUser: function() {

                if ($("#addUserform").valid()) {

                    var modelJson = utilForm.serializeFormToJson("#addUserform");
                    this.model = new User();

                    this.model.save(modelJson, {
                        success: function(model, respose) {
                            alert("Usuario de la Piscina guardado exitosamente");
                            $('#addUserform').each(function() {
                                this.reset();
                            });
                        },
                        error: function(model, response) {
                            alert("Error Interno, favor intente más tarde");
                        }
                    });

                }

            }

        });

        return applicationIndex;

    });