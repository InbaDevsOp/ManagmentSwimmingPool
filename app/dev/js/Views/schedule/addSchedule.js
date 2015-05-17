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

                    $(this.el).html(addScheduleTemplate({
                        daySections: scheduleConfig,
                        name: this.model.get('name'),
                        description: this.model.get('description')
                    }));

                    addScheduleValidation.validateForm();

                    this._deserializeSchedule(this.model);
                }
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

                    var scheduleJson = utilForm.serializeFormToObject("#addScheduleForm :visible");
                    var scheduleDaySectionJson = this._serializeSchedule();
                    scheduleJson.daySection = scheduleDaySectionJson;

                    this.model.set(scheduleJson);

                    this.model.save({}, {
                        success: function(model, respose) {
                            alert("Horario guardado exitosamente");
                            that._cleanSchedule();
                        },
                        error: function(model, response) {
                            alert("Error Interno, favor intente más tarde");
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