define(['jquery', 'jquery.validate'], function($, jqueryValidate) {

    addPlanValidation = {

        validateForm: function() {

            $.validator.addMethod("regexp", function(value, element, regexpr) {
                var regexp = new RegExp(regexpr);
                return regexp.test(value);
            }, "Por Favor Ingrese un valor con el formato correcto.");

            $.validator.addMethod("plan", function() {
                if ($("tr:has(td.selected)").length) {
                    return true;
                }
                return false;
            }, "Error: Ingrese algún bloque al horario");

            $.validator.messages.required = "Campo requerido";

            $("#addPlanForm").validate({
                ignore: [],
                rules: {
                    name: {
                        required: true,
                        regexp: "^[0-9A-Za-zñ ]+$"
                    },
                    description: {
                        required: true
                    },
                    price: {
                        required: true,
                        regexp: "^[0-9]+$"
                    },
                    hoursPerWeek: {
                        required: true,
                        regexp: "^[0-9]+$"
                    }
                },
                messages: {
                    name: {
                        regexp: "Formato Incorrecto: Solo números y letras"
                    },
                    price: {
                        regexp: "Solo números Ej: 35000"
                    },
                    hoursPerWeek: {
                        regexp: "Solo números \"6\" = 6 horas a la semana "
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
            return $("#addPlanForm").valid();
        }

    }

    return addPlanValidation;

});