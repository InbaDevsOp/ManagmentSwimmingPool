define(['backbone', 'jquery'], function(Backbone, $) {

    User = Backbone.Model.extend({
        urlRoot: SwimmingPoolApplicationHost + "/SwimmingPoolServiceExample/rest/users/addUser",
    });

    return User;

});