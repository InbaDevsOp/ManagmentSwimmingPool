define(['jquery', 'jquery.validate'], function($, jqueryValidate) {

    addPaymentValidation = {

        validateForm: function() {

            $.validator.addMethod("regexp", function(value, element, regexpr) {
                var regexp = new RegExp(regexpr);
                if (value) {
                    return regexp.test(value);
                } else {
                    return true;
                }

            }, "Por Favor Ingrese un valor con el formato correcto.");
            $.validator.messages.required = "Campo requerido";

            // $("#addProductForm").validate({
            //     ignore: '',
            //     rules: {
            //         usersCombo:{
            //             required: true
            //         },
            //         plansCombo:{
            //             required: true
            //         }
            //     },
            //     messages: {
            //         plansCombo:{
            //             required: "Seleccione alguna opción"
            //         },
            //         usersCombo:{
            //             required: "Seleccione alguna opción"
            //         }
            //     },
            //     errorPlacement: function(error, element) {
            //         error.css({
            //             'color': 'red'
            //         });
            //         error.insertAfter(element);
            //     }
            // });

            $("#addPaymentForm").validate({
                ignore: '',
                rules: {
                    numberOfTicket: {
                        required: true,
                        regexp: "^[0-9]+$"
                    },
                    usersCombo:{
                        required: true
                    },
                    plansCombo:{
                        required: true
                    },
                    startValidDate: {
                        required: true,
                        regexp: "^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/[0-9]{4}$"
                    },
                    endValidDate: {
                        required: true,
                        regexp: "^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/[0-9]{4}$"
                    },
                    formOfPayment: {
                        required: true,
                    },
                    chequeNumber:{
                        regexp: "^[0-9]+$"
                    }
                },
                messages: {
                    numberOfTicket: {
                        regexp: "Formato Incorrecto: Solo números"
                    },
                    startValidDate: {
                        regexp: "Formato Incorrecto: Ej: 31/12/1989"
                    },
                    endValidDate: {
                        regexp: "Formato Incorrecto: Ej: 31/12/1989"
                    },
                    chequeNumber: {
                        regexp: "Formato Incorrecto: Solo números"
                    },
                    plansCombo:{
                        required: "Seleccione alguna opción"
                    },
                    usersCombo:{
                        required: "Seleccione alguna opción"
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
            return $("#addPaymentForm").valid();// && $("#addProductForm").valid() ;
        }

    }

    return addPaymentValidation;

});