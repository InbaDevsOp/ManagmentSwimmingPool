define(['backbone', 'jquery', 'hbs!Templates/schedule/addSchedule', 'Modules/login', 'Modules/utilForm',
        'Modules/schedule/scheduleConfig', 'Models/schedule'
    ],
    function(Backbone, $, scheduleTemplate, login, utilForm, scheduleConfig, Schedule) {

        AddScheduleView = Backbone.View.extend({
            template: scheduleTemplate,
            el: $("#applicationContent"),

            events: {
                "click td": "selectDaySection",
                "click #saveSchedule": "saveSchedule"
            },
            initialize: function() {

                if (login.verifyIsUserlogded()) {

                    $(this.el).html(this.template({
                        daySections: scheduleConfig
                    }));

                }
            },
            selectDaySection: function(td) {

                if ($("tr  .selected#" + td.toElement.getAttribute("id")).length) {
                    $(td.toElement).removeClass("selected");
                } else {
                    $(td.toElement).addClass("selected");
                }
            },
            saveSchedule: function() {
                var that = this;
                var scheduleJson = utilForm.serializeFormToObject("#addScheduleForm");
                var scheduleDaySectionJson = this._serializeSchedule();

                scheduleJson.daySection = scheduleDaySectionJson;

                this.model = new Schedule();
                this.model.save(scheduleJson, {
                    success: function(model, respose) {
                        alert("Horario guardado exitosamente");
                        that._cleanSchedule();
                    },
                    error: function(model, response) {
                        alert("Error Interno, favor intente más tarde");
                    }
                });

            },
            _cleanSchedule: function() {
                $('#addScheduleForm').each(function() {
                    this.reset();
                });

                $('#schedule tr').each(function() {
                    //TODO verify performance double each
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
            }

        });

        return AddScheduleView;

    });