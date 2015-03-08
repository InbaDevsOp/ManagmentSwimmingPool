define(['backbone', 'jquery', 'hbs!Templates/createdUser', 'hbs!Templates/errorMessage', 'Models/User'],
    function(Backbone, $, createdUser, errorMessage, User) {

        applicationIndex = Backbone.View.extend({
            template: createdUser,
            el: $(".informationContainerSchool"),

            events: {
                "click #save": "saveUser"
            },
            initialize: function() {
                // alert("created index applicationIndex");
                $(".informationContainerSchool").html('');
                $(this.el).append(this.template({tittle: "Ingresa el nuevo Usuario de la Piscina"}));

            },
            saveUser: function() {

                var modelJson = this.serializeFormToJson("#addUserform");

                this.model = new User();

                this.model.save(modelJson, {
                    success: function(model, respose) {
                        alert("Usuario de la Piscina guardado exitosamente");
                       // $(this.el).append(errorMessage({errorMessage : "Error Interno, favor intente más tarde"}))

                    },
                    error: function(model, response) {
                        alert("Error Interno, favor intente más tarde");
                       // $(".informationContainerSchool").append(errorMessage({errorValue : "Error Interno, favor intente más tarde"}))

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
                // login: function() {
                //     var rut = $("#rut").val();
                //     var password = $("#password").val();

            //     var getParamsService = rut + "/" + password;

            //     $.get("http://localhost:8080/SwimmingPoolServiceExample/rest/users/login/" +
            //         getParamsService,
            //         function(data, status) {
            //             alert("Data: " + data + "\nStatus: " + status);


            //             if (data.status == "successful") {
            //                 alert("Logueado");
            //                 LoginView.loginFlag = true;

            //             } else {
            //                 alert("No existe");
            //                 LoginView.loginFlag = false;
            //             }

            //         });
            // }

        });

        return applicationIndex;

    });