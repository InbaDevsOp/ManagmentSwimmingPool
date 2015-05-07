define(['backbone', 'jquery', 'Modules/login', 'Modules/schedule/scheduleConfig',
        'hbs!Templates/schedule/managmentSchedules',
        'hbs!Templates/schedule/schedulesTable', 'hbs!Templates/schedule/addSchedule',
        'Models/schedule'
    ],
    function(Backbone, $, login, scheduleConfig, managmentSchedules, schedulesTable, addSchedule, schedule) {

        managmentSchedules = Backbone.View.extend({
            template: managmentSchedules,
            schedules: {
                count: 0,
                group: 5,
                array: []
            },
            el: $("#applicationContent"),

            events: {
                "click #save": "saveUser",
                "click #backwardGroupSchedule": "backwardGroupSchedule",
                "click #forwardGroupSchedule": "forwardGroupSchedule",
                "click #scheduleInformation #viewSchedule": "fillScheduleInformation",
                "click #scheduleInformation #deleteSchedule": "eliminateSchedule"
            },
            initialize: function() {
                if (login.verifyIsUserlogded()) {
                    $(this.el).html(this.template());
                    this.searchSchedules();
                }
            },
            searchSchedules: function() {
                var that = this;
                var url = SwimmingPoolApplicationHost + "/SwimmingPoolServiceExample/rest/schedule/getAll";

                $.ajax({
                    async: false,
                    url: url,
                    type: "GET",
                    success: function(data, status) {
                        that.schedules.array = data;

                        $("#scheduleInfo").html(schedulesTable({
                           // schedules: that.schedules.array.slice(that.schedules.count, that.schedules.count += that.schedules.group)
                            schedules: that.schedules.array
                        }));
                    },
                    error: function(request, error) {
                        alert("Error Interno, favor intente más tarde");
                    },
                });

            },
            // backwardGroupSchedule: function() {
            //     if (this.schedules.count > this.schedules.group) {
            //         console.log("atras" + this.schedules.count);
            //         $("#scheduleInfo").html(schedulesTable({
            //             schedules: this.schedules.array.slice(this.schedules.count -= (this.schedules.group * 2), this.schedules.count += this.schedules.group)
            //         }));
            //     }
            // },
            // forwardGroupSchedule: function() {
            //     if (this.schedules.count < this.schedules.array.length) {
            //         console.log("adelante" + this.schedules.count);
            //         $("#scheduleInfo").html(schedulesTable({
            //             schedules: this.schedules.array.slice(this.schedules.count, this.schedules.count += this.schedules.group)
            //         }));
            //     }
            // },
            fillScheduleInformation: function(eventTd) {

                var id = $(eventTd.currentTarget.closest("tr")).index();
                var schedule = this.schedules.array[id];

                $("#scheduleModify").html(addSchedule({
                    daySections: scheduleConfig,
                    name: schedule.name,
                    description: schedule.description
                }));

                this._deserializeSchedule(schedule);

            },
            _deserializeSchedule: function(scheduleArray) {

                var scheduleDaySections = scheduleArray.daySection;
                for (var i = 0; i < scheduleDaySections.length; i++) {
                    var daySection = scheduleDaySections[i].id;
                    $("#scheduleModify table#schedule td#" + daySection).addClass("selected");
                }

            },
            modifySchedule: function(eventTd) {
                var scheduleJson = eventTd.currentTarget.closest("tr");
                //var url = SwimmingPoolApplicationHost + "/SwimmingPoolServiceExample/rest/schedule/delete/" + schedule.id;

                this.model = new schedule();
                this.model.set();
                this.model.save(scheduleJson, {
                    success: function(model, respose) {
                        alert("Horario modificado exitosamente");
                        that._cleanSchedule();
                    },
                    error: function(model, response) {
                        alert("Error Interno, favor intente más tarde");
                    }
                });

            },
            eliminateSchedule: function(eventTd) {
                var schedule = eventTd.currentTarget.closest("tr");
                var url = SwimmingPoolApplicationHost + "/SwimmingPoolServiceExample/rest/schedule/delete/" + schedule.id;

                $.ajax({
                    async: false,
                    url: url,
                    type: "DELETE",
                    success: function(data, status) {
                        alert("Horario Eliminado exitosamente");
                        $(eventTd.currentTarget).closest("tr").html("");
                    },
                    error: function(request, error) {
                        alert("Error Interno, favor intente más tarde");
                    }
                });
            }
        });
        return managmentSchedules;

    });