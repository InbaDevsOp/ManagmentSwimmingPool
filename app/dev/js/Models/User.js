define(['backbone', 'jquery'], function(Backbone, $) {

    User = Backbone.Model.extend({
        urlRoot: "http://192.168.1.189:8080/SwimmingPoolServiceExample/rest/users/addUser",
    });

    return User;

});