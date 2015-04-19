define(['backbone', 'jquery', 'hbs!Templates/createdUser', 'hbs!Templates/errorMessage', 'hbs!Templates/headerApplication', 'Models/User'],
    function(Backbone, $, createdUser, errorMessage, headerApplication, User) {

        applicationIndex = Backbone.View.extend({
            template: createdUser,
            el: $("#applicationContent"),

            events: {
                "click #save": "saveUser"
            },
            initialize: function() {

                var flagSession = localStorage.getItem('sessionActive');
                var userName = localStorage.getItem('names');

                if (flagSession == 1) {
                    $('#header').html(headerApplication({
                        userName: userName
                    }));
                    $(this.el).html(this.template({
                        tittle: "Ingresa el nuevo Usuario de la Piscina"
                    }));
                } else {
                    localStorage.clear();
                    window.location.href = "/index.html"
                }

            },
            saveUser: function() {

                var modelJson = this.serializeFormToJson("#addUserform");
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
            },
            serializeFormToJson: function(formSelector) {
                    var jsonData = {};
                    var formData = $(formSelector).serializeArray();
                    $.each(formData, function() {
                        if (jsonData[this.name]) {
                            if (!jsonData[this.name].push) {
                                jsonData[this.name] = [jsonData[this.name]];
                            }
                            jsonData[this.name].push(this.value || '');
                        } else {
                            jsonData[this.name] = this.value || '';
                        }

                    });
                    return jsonData;
                    console.log(jsonData);
                }
        });

        return applicationIndex;

    });