define(['backbone', 'jquery', 'hbs!Templates/schedule/addSchedule', 'Modules/login', 'Modules/utilForm',
        'Modules/schedule/scheduleConfig', 'Views/schedule/addScheduleValidation', 'Models/schedule'
    ],
    function(Backbone, $, addScheduleTemplate, login, utilForm, scheduleConfig, addScheduleValidation, Schedule) {

        AddScheduleView = Backbone.View.extend({
            template: addScheduleTemplate,

            events: {
                "click #schedule td.nonSelected": "selectDaySection",
                "click #schedule td.selected": "deselectDaySection",
                "click #saveSchedule": "saveSchedule",
            },
            initialize: function() {

                if (login.verifyIsUserlogded()) {

                    var plansJson = this.findPlans();

                    $(this.el).html(addScheduleTemplate({
                        daySections: scheduleConfig,
                        name: this.model.get('name'),
                        description: this.model.get('description'),
                        plans: plansJson
                    }));

                    addScheduleValidation.validateForm();

                    this._deserializeSchedule(this.model);
                }
            },
            findPlans: function() {
                var url = SwimmingPoolApplicationHost + "/SwimmingPoolServiceExample/rest/plan/getAll";
                var dataJson;
                $.ajax({
                    async: false,
                    url: url,
                    type: "GET",
                    success: function(data, status) {
                        dataJson = data;
                    },
                    error: function(request, error) {
                        alertDGC("Error Interno, favor intente más tarde");
                    },
                });
                return dataJson;
            },
            selectDaySection: function(td) {
                $(td.toElement).removeClass("nonSelected");
                $(td.toElement).addClass("selected");
            },
            deselectDaySection: function(td) {

                if (td.toElement.getAttribute("id")) {
                    $(td.toElement).removeClass("selected");
                    $(td.toElement).addClass("nonSelected");
                }

            },
            saveSchedule: function() {
                var that = this;

                if (addScheduleValidation.isValidForm()) {

                    var scheduleJson = utilForm.serializeFormToObject("#addScheduleForm .serializable");
                    scheduleJson.plan = {
                        id: $("#plans option:selected").attr('id')
                    };
                    var scheduleDaySectionJson = this._serializeSchedule();
                    scheduleJson.daySection = scheduleDaySectionJson;

                    this.model.set(scheduleJson);

                    this.model.save({}, {
                        success: function(model, respose) {
                            alertDGC("Horario guardado exitosamente");
                            that._cleanSchedule();
                        },
                        error: function(model, response) {
                            alertDGC("Error Interno, favor intente más tarde");
                        }
                    });
                }

            },
            _cleanSchedule: function() {

                utilForm.cleanDataForm("#addScheduleForm");

                $('#schedule tr').each(function() {
                    $.each(this.cells, function() {
                        $(this).removeClass("selected");
                    });
                });

            },
            _serializeSchedule: function() {

                var daySectionSchedule = new Array();

                $("#schedule td.selected").each(function() {
                    daySectionSchedule.push({
                        id: $(this).attr("id")
                    });
                });
                return daySectionSchedule;
            },
            _deserializeSchedule: function(schedule) {

                var scheduleDaySections = schedule.get('daySection');
                for (var i = 0; i < scheduleDaySections.length; i++) {
                    var daySection = scheduleDaySections[i].id;
                    $("#scheduleModify table#schedule td#" + daySection).addClass("selected");
                }
            },


        });

        return AddScheduleView;

    });