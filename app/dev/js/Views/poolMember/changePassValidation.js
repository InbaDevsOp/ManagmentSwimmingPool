define(['jquery', 'jquery.validate'], function($, jqueryValidate) {

    changePassValidation = {

        validateForm: function() {

            $.validator.addMethod("regexp", function(value, element, regexpr) {
                var regexp = new RegExp(regexpr);
                return regexp.test(value);
            }, "Por Favor Ingrese un valor con el formato correcto.");

            $.validator.addMethod("iguales", function() {
                if ($("#password").val() == $("#passNewConfrm").val()) {
                    return true;
                }
                return false;
            }, "Error: Contrase&ntildea no coincide (deben ser iguales)");

            $.validator.addMethod("passconfirm", function() {
                if ($("#passOld").val() == sessionStorage.getItem('pass')) {
                    return true;
                }
                return false;
            }, "Error: Contrase&ntildea no coincide");


            $.validator.messages.required = "Campo requerido";

            $("#changePassForm").validate({
                ignore: [],
                rules: {
                    passOld: {
                        required: true,
                        passconfirm:true,
                        regexp: "^[0-9A-ZÑa-zñ ]+$"
                    },
                    password: {
                        required: true,
                        regexp: "^[0-9A-ZÑa-zñ ]+$"
                    },
                    passNewConfrm: {
                        required: true,
                        iguales:true,
                        regexp: "^[0-9A-ZÑa-zñ ]+$"
                    }
                },
                messages: {
                    name: {
                        regexp: "Formato Incorrecto: Solo números y letras"
                    },
                    plansScheduleCombo: {
                        required: "Por Favor seleccione algúna opción"
                    },
                    passNewConfrm: {
                        
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

        isValidForm: function() {
            return $("#changePassForm").valid();
        }

    }

    return changePassValidation;

});