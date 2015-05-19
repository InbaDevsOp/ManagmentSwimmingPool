define(['backbone', 'jquery', 'hbs!Templates/plan/addPlan', 'Modules/login', 'Modules/utilForm',
        'Views/plan/addPlanValidation', 'Models/plan'
    ],
    function(Backbone, $, addPlanTemplate, login, utilForm, addPlanValidation, planModel) {

        AddPlanView = Backbone.View.extend({
            template: addPlanTemplate,

            events: {
                "click #savePlan": "savePlan",
            },
            initialize: function() {

                if (login.verifyIsUserlogded()) {

                    $(this.el).html(addPlanTemplate({
                        plan: this.model.toJSON()
                    }));

                    addPlanValidation.validateForm();

                }
            },
            savePlan: function() {
                var that = this;

                if (addPlanValidation.isValidForm()) {

                    var planJson = utilForm.serializeFormToObject("#addPlanForm :visible");

                    this.model.set(planJson);

                    this.model.save({}, {
                        success: function(model, respose) {
                            alertDGC("Plan guardado exitosamente");
                            utilForm.cleanDataForm("#addPlanForm");
                        },
                        error: function(model, response) {
                            alertDGC("Error Interno, favor intente más tarde");
                        }
                    });
                }

            }


        });

        return AddPlanView;

    });