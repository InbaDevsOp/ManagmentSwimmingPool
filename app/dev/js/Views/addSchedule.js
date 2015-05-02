define(['backbone', 'jquery', 'hbs!Templates/addSchedule', 'Modules/login', 'Modules/utilForm', 'Models/schedule'],
    function(Backbone, $, scheduleTemplate, login, utilForm, Schedule) {

        AddScheduleView = Backbone.View.extend({
            template: scheduleTemplate,
            el: $("#applicationContent"),

            events: {
                "click td": "selectDaySection",
                "click #saveSchedule": "saveSchedule"
            },
            initialize: function() {

                if (login.verifyIsUserlogded()) {

                    var jsonTemplate = [{
                        "title": "7:00 - 8:00 am",
                        "daySectionId": [1, 2, 3, 4, 5, 6, 7]
                    }, {
                        "title": "8:00 - 9:00 am",
                        "daySectionId": [8, 9, 10, 11, 12, 13, 14]
                    }, {
                        "title": "9:00 - 10:00 am",
                        "daySectionId": [15, 16, 17, 18, 19, 20, 21]
                    }, {
                        "title": "10:00 - 11:00 am",
                        "daySectionId": [22, 23, 24, 25, 26, 27, 28]
                    }, {
                        "title": "11:00 - 12:00 pm",
                        "daySectionId": [29, 30, 31, 32, 33, 34, 35]
                    }, {
                        "title": "12:00 - 13:00 pm",
                        "daySectionId": [36, 37, 38, 39, 40, 41, 42]
                    }];

                    $(this.el).html(this.template({
                        daySections: jsonTemplate
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