define(['backbone', 'jquery', 'hbs!Templates/poolMember/poolMemberInfoActive', 'Modules/login', 'Modules/utilForm',
        'Views/poolMember/changePassValidation', 'Models/poolMember'
    ],
    function(Backbone, $, infoActiveTemplate, login, utilForm, poolMemberModel) {

        InfoActiveView = Backbone.View.extend({
            template: infoActiveTemplate,


            initialize: function() {

                if (login.verifyIsUserlogded()) {

                    $(this.el).html(infoActiveTemplate({
                        infoActive: this.model.toJSON()
                    }));

                    var id =sessionStorage.getItem('flag');

                }
            },

            searchPlans: function() {
                var that = this;
                var url = SwimmingPoolApplicationHost + "/SwimmingPoolServiceExample/rest/plan";

                $.ajax({
                    async: false,
                    url: url,
                    type: "GET",
                    success: function(data, status) {

                        $("#planInfo").html(plansTableTemplate({
                            plans: data
                        }));
                    },
                    error: function(request, error) {
                        alertDGC("Error Interno, favor intente más tarde");
                    },
                });

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
                        alertDGC("Error Interno, favor intente más tarde");
                    },
                });

            }


        });

        return InfoActiveView;

    });
