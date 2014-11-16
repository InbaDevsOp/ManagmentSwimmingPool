require(['backbone', 'jquery', 'app/dev/js/Views/view1.js'], function (Backbone, $, View1){

var myRouter = Backbone.Router.extend({
    
    greeting: null,
    container: null,
    view1: null,
  
    
   /* initialize: function() {
        this.greeting = new GreetModel({ Message: "Hello world" });
        this.container = new ContainerView({ el: $("#rAppContainer"), model: this.greeting });
    },
*/
    routes: {
        "": "handleRouteHome",
        "view1": "handleRoute1",
    },

    handleRouteHome: function () {
    },

    handleRoute1: function () {
            this.view1 = new View1();
    },

   
});
    
    router = new myRouter();
    Backbone.history.start();
    return router;
});