define(['backbone', 'jquery', 'Modules/login', 'Modules/utilForm',
        'hbs!Templates/swimmingPoolUser/createdUser', 'Views/swimmingPoolUser/addSwimmingPoolUserValidation'
    ],
    function(Backbone, $, login, utilForm, createdUser, addSwimmingPoolUserValidation) {

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

                    addSwimmingPoolUserValidation.validateForm();
                    
                    //verify if move code to model
                    this.model.on('invalid', function(model, error) {
                        alert(error);
                    });
                }

            },
            remove: function() {
                this.$el.html('');
                this.stopListening();
                return this;
            },
            saveUser: function() {

                if (addSwimmingPoolUserValidation.isValidForm()) {

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

                }
            }

        });

        return addUserView;

    });