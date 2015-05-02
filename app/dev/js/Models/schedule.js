define(['backbone', 'jquery'], function(Backbone, $) {

    Schedule = Backbone.Model.extend({
        urlRoot: SwimmingPoolApplicationHost + "/SwimmingPoolServiceExample/rest/schedule/add",
    });

    return Schedule;

});