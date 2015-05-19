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

                //if (login.verifyIsUserlogded()) {

                    $(this.el).html(addPlanTemplate({
                        //name: this.model.get('name'),
                        //description: this.model.get('description')
                    }));

                    addPlanValidation.validateForm();

                //}
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

            },
            // _cleanSchedule: function() {

            //     utilForm.cleanDataForm("#addScheduleForm");

            //     $('#schedule tr').each(function() {
            //         $.each(this.cells, function() {
            //             $(this).removeClass("selected");
            //         });
            //     });

            // },
            // _serializeSchedule: function() {

            //     var daySectionSchedule = new Array();

            //     $("#schedule td.selected").each(function() {
            //         daySectionSchedule.push({
            //             id: $(this).attr("id")
            //         });
            //     });
            //     return daySectionSchedule;
            // },
            // _deserializeSchedule: function(schedule) {

            //     var scheduleDaySections = schedule.get('daySection');
            //     for (var i = 0; i < scheduleDaySections.length; i++) {
            //         var daySection = scheduleDaySections[i].id;
            //         $("#scheduleModify table#schedule td#" + daySection).addClass("selected");
            //     }
            // },


        });

        return AddPlanView;

    });