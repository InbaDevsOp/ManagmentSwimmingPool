define(['backbone', 'jquery', 'jquery.validate', 'Modules/login', 'Modules/utilForm', 'hbs!Templates/swimmingPoolUser/createdUser', 'Models/User'],
    function(Backbone, $, jqueryValidate, login, utilForm, createdUser, User) {

        addUserView = Backbone.View.extend({
            template: createdUser,

            events: {
                "click #save": "saveUser"
            },
            initialize: function(options) {

                if (login.verifyIsUserlogded()) {
                
                    if (!this.model.isNew()) {
                        $(this.el).html(this.template({
                            disabledIdUser: "disabled",
                            user: this.model.toJSON()
                        }));
                    } else {
                        $(this.el).html(this.template({
                            user: this.model.toJSON()
                        }));
                    }
                    this.validateForm();
                }

            },
            remove: function() {
                this.$el.html('');
                this.stopListening();
                return this;
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
                    this.model.set(modelJson);

                    this.model.save({}, {
                        success: function(model, respose) {
                            alert("Usuario de la Piscina guardado exitosamente");
                            utilForm.cleanDataForm("#addUserform");

                        },
                        error: function(model, response) {
                            alert("Error Interno, favor intente más tarde");
                        }
                    });

                    // if (!this.model.isNew()) {
                    //     this.remove();
                    // }
                }
            }

        });

        return addUserView;

    });