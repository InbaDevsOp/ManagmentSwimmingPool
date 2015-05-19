define(['backbone', 'jquery', 'Modules/login', 'hbs!Templates/plan/managmentPlans', 'hbs!Templates/plan/plansTable',
    'Views/plan/addPlan', 'Models/plan'
], function(Backbone, $, login, managmentPlansTemplate, plansTableTemplate, addplanView, planModel) {

    managmentplans = Backbone.View.extend({
        template: managmentPlansTemplate,

        el: $("#applicationContent"),

        childView: null,

        events: {
            "click #search": "searchPlans",
            "click #planInfo #viewPlan": "fillPlanInformation",
            "click #planInfo #deletePlan": "eliminatePlan"
        },

        initialize: function() {
            if (login.verifyIsUserlogded()) {
                $(this.el).html(this.template());
                this.searchPlans();
            }
        },
        searchPlans: function() {
            var that = this;
            var url = SwimmingPoolApplicationHost + "/SwimmingPoolServiceExample/rest/plan/getAll";

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
        fillPlanInformation: function(eventTd) {
            var that = this;
            var plan = eventTd.currentTarget.closest("tr");
            var url = SwimmingPoolApplicationHost + "/SwimmingPoolServiceExample/rest/plan/" + plan.id;

            $.ajax({
                async: false,
                url: url,
                type: "GET",
                success: function(data, status) {
                    if (data) {

                        var plan = new planModel(data);

                        if (that.childView) {
                            that.childView.$el.html('')
                            that.childView.undelegateEvents();
                            that.childView.stopListening();
                            that.childView = null;
                        }

                        that.childView = new addplanView({
                            model: plan,
                            el: $("#planModify")
                        });

                        that.childView.model.on('sync', function() {
                            that.$el.html('');
                            that.initialize();
                            that.render();
                            return that;
                        }, that);
                    }
                },
                error: function(request, error) {
                    alertDGC("Error Interno, favor intente más tarde");
                },
            });

        },
        eliminatePlan: function(eventTd) {
            var that = this;
            var plan = eventTd.currentTarget.closest("tr");
            var url = SwimmingPoolApplicationHost + "/SwimmingPoolServiceExample/rest/plan/delete/" + plan.id;

            $.ajax({
                async: false,
                url: url,
                type: "DELETE",
                success: function(data, status) {
                    alertDGC("Plan Eliminado exitosamente");
                    $(eventTd.currentTarget.closest("tr")).html("");

                    //TODO managment in a backbone Collection
                    if (!$.isEmptyObject(that.childView) && (that.childView.model.get("id") == plan.id)) {
                        that.childView.$el.html('')
                        that.childView.undelegateEvents();
                        that.childView.stopListening();
                        that.childView = null;
                    }
                },
                error: function(request, error) {
                    alertDGC("Error Interno, favor intente más tarde");
                }
            });
        }
    });
    return managmentplans;

});