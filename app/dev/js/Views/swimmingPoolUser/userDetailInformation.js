define(['backbone', 'jquery', 'Modules/login', 'hbs!Templates/swimmingPoolUser/managmentUsers', 'hbs!Templates/swimmingPoolUser/usersTable',
    'Views/swimmingPoolUser/addUser', 'Models/User'
], function(Backbone, $, login, managmentUsers, usersTable, addUserView, userModel) {

    managmentUsers = Backbone.View.extend({
        template: managmentUsers,

        
        initialize: function(options) {
            if (login.verifyIsUserlogded()) {
                $(this.el).html(this.template());
            }
        },
        fillUserInformation: function(userId) {
            var that = this;
            var user = eventTd.currentTarget.closest("tr");
            var url = SwimmingPoolApplicationHost + "/SwimmingPoolServiceExample/rest/users/swimmingPool/" + userId;

            $.ajax({
                async: false,
                url: url,
                type: "GET",
                success: function(data, status) {
                    if (data.rut != null) {

                        var user = new userModel(data);

                        that.childView = new addUserView({
                            model: user,
                            el: $("#userModify")
                        });

                        that.childView.model.on('sync', function() {
                            that.$el.html('');
                            that.initialize();
                            that.render();
                            that.searchUsers(that.searchUserPattern);
                            return that;
                        }, that);
                    }
                },
                error: function(request, error) {
                    alert("Error Interno, favor intente más tarde");
                },
            });

        },
        eliminateUser: function(eventTd) {
            var that = this;
            var user = eventTd.currentTarget.closest("tr");
            var url = SwimmingPoolApplicationHost + "/SwimmingPoolServiceExample/rest/users/delete/" + user.id;

            $.ajax({
                async: false,
                url: url,
                type: "DELETE",
                success: function(data, status) {
                    alert("Usuario de la Piscina Eliminado exitosamente");
                    $(eventTd.currentTarget.closest("tr")).html("");

                    //TODO managment in a backbone Collection
                    if (!$.isEmptyObject(that.childView) && (that.childView.model.get("id") == user.id)) {
                        that.childView.$el.html('')
                        that.childView.undelegateEvents();
                        that.childView.stopListening();
                        that.childView = null;
                    }
                },
                error: function(request, error) {
                    alert("Error Interno, favor intente más tarde");
                }
            });
        }
    });
    return managmentUsers;

});