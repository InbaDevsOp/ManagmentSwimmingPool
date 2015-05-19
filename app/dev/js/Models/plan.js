define(['backbone', 'jquery'], function(Backbone, $) {

    Plan = Backbone.Model.extend({
        url: SwimmingPoolApplicationHost + "/SwimmingPoolServiceExample/rest/plan/",
    	
    	getCustomUrl: function (method) {
        switch (method) {
            case 'read':
                return this.url + this.id;
                break;
            case 'create':
                return this.url + 'add';
                break;
            case 'update':
                return this.url + 'modify';
                break;
            case 'delete':
                return this.url + 'delete' + this.id;
                break;
        }
    },
    sync: function (method, model, options) {
        options || (options = {});
        options.url = this.getCustomUrl(method.toLowerCase());
        
        return Backbone.sync.apply(this, arguments);
    }

    });

    return Plan;

});