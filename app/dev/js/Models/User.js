define(['backbone', 'jquery'], function(Backbone, $) {

    User = Backbone.Model.extend({
        urlRoot: SwimmingPoolApplicationHost + "/SwimmingPoolServiceExample/rest/users/swimmingPool/add",
    });

    return User;

});