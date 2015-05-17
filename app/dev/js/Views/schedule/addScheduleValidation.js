define(['jquery', 'jquery.validate'], function($, jqueryValidate) {

    addScheduleValidation = {

        validateForm: function() {

            $.validator.addMethod("regexp", function(value, element, regexpr) {
                var regexp = new RegExp(regexpr);
                return regexp.test(value);
            }, "Por Favor Ingrese un valor con el formato correcto.");

            $.validator.addMethod("schedule", function() {
                if ($("tr:has(td.selected)").length) {
                    return true;
                }
                return false;
            }, "Error: Ingrese algún bloque al horario");

            $.validator.messages.required = "Campo requerido";

            $("#addScheduleForm").validate({
                ignore: [],
                rules: {
                    name: {
                        required: true,
                        regexp: "^[0-9A-Za-zñ ]+$"
                    },
                    description: {
                        required: true
                    },
                    scheduleValidation: {
                        schedule: true
                    }
                },
                messages: {
                    name: {
                        regexp: "Formato Incorrecto: Solo números y letras"
                    }
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
            return $("#addScheduleForm").valid();
        }

    }

    return addScheduleValidation;

});