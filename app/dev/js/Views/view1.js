define(['backbone', 'jquery', 'handlebars', 'hbs!Templates/view1'], function (Backbone, $, Handlebars, View1Temp){

var View1 = Backbone.View.extend({
    template: View1Temp,      
    el: $('#content'), 
    
    initialize: function() {
        this.render();
    },
    
    render: function (){
    var data = { 
    users: [ { 
        person: {
            firstName: "Garry", 
            lastName: "Finch"
        },
        jobTitle: "Front End Technical Lead",
        twitter: "gazraa" 
    }, {
        person: {
            firstName: "Garry", 
            lastName: "Finch"
        }, 
        jobTitle: "Photographer",
        twitter: "photobasics"
    }, {
        person: {
            firstName: "Garry", 
            lastName: "Finch"
        }, 
        jobTitle: "LEGO Geek",
        twitter: "minifigures"
    } ]
};       
        $(this.el).append(this.template(data));
    }
    
});
  
    return View1;
    
});


