define(['jquery', 'jquery.validate'], function($, jqueryValidate) {

    addSwimmingPoolValidation = {

        validateForm: function() {

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
                        regexp: "^[A-Za-zñ ]+$"
                    },
                    firstLastName: {
                        required: true,
                        regexp: "^[A-Za-zñ ]+$"
                    },
                    secondLastName: {
                        required: true,
                        regexp: "^[A-Za-zñ ]+$"
                    },
                    birthDate: {
                        required: true,
                        regexp: "^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/[0-9]{4}$"
                    },
                    address: {
                        required: true,
                        regexp: "^[0-9a-zA-zñ ]+$"
                    },
                    state: {
                        required: true,
                        regexp: "^[A-Za-zñ ]+$"
                    },
                    password: {
                        required: true,
                        regexp: "^.{6,15}$"
                    },
                    email: {
                        required: true,
                        regexp: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$"
                    },
                    phone: {
                        required: true,
                        regexp: "^\\+56(9|2)[0-9]{8}$"
                    },
                    sickness: {},
                    comments: {}
                },
                messages: {
                    rut: {
                        regexp: "Formato Incorrecto, Ej: 00000000-k (Sin puntos y con guión)"
                    },
                    names: {
                        regexp: "Formato Incorrecto: Solo letras"
                    },
                    firstLastName: {
                        regexp: "Formato Incorrecto: Solo letras"
                    },
                    secondLastName: {
                        regexp: "Formato Incorrecto: Solo letras"
                    },
                    birthDate: {
                        regexp: "Formato Incorrecto: Ej: 31/12/1989"
                    },
                    address: {
                        regexp: "Formato Incorrecto: Números y letras"
                    },
                    state: {
                        regexp: "Formato Incorrecto: Solo letras"
                    },
                    password: {
                        regexp: "Formato Incorrecto: De 6 a 15 caracteres"
                    },
                    email: {
                        regexp: "Formato Incorrecto: Ej: Nombre_Apellido@dominio.com"
                    },
                    phone: {
                        regexp: "Formato Incorrecto: Ej: +56227765435, +56967823454"
                    },
                },
                errorPlacement: function(error, element) {
                    error.css({
                        'color': 'red'
                    });
                    error.insertAfter(element);
                }
            });

        },
        isValidForm: function(){
            return $("#addUserform").valid();
        }
    }

    return addSwimmingPoolValidation;

});